import { useEffect, useState, useCallback } from "react";
import Papa from "papaparse";

export type SheetRow = {
  Contributor: string;
  Title: string;
  Artist: string;
  Tags: string; // comma/semicolon/newline separated is fine
  Url: string;
  Notes: string;
  x: number | string;
  y: number | string;
  CreatedDate: string;
  Approved: string; // "TRUE"/"FALSE", "Yes"/"No", etc.
};

function toBool(v: unknown): boolean {
  const s = String(v ?? "")
    .trim()
    .toLowerCase();
  return ["true", "yes", "y", "1"].includes(s);
}

const toNumberOr = (v: unknown, fallback: number) => {
  const n =
    typeof v === "string" ? parseFloat(v) : typeof v === "number" ? v : NaN;
  return Number.isFinite(n) ? n : fallback;
};

const parseCsvText = (text: string) => {
  // Guard: Google can occasionally return HTML for a beat
  const trimmed = text.trim();
  if (trimmed.startsWith("<!doctype html") || trimmed.startsWith("<html")) {
    throw new Error("Got HTML instead of CSV (Google Sheets not ready)");
  }

  const parsed = Papa.parse(trimmed, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (h) => String(h ?? "").trim(),
    transform: (val) => (typeof val === "string" ? val.trim() : val),
  });

  if (parsed.errors && parsed.errors.length > 0) {
    // You can log parsed.errors for diagnosis
    // If needed, only throw for fatal errors:
    const fatal = parsed.errors.find(
      (e) => e.type === "FieldMismatch" || e.code === "TooFewFields"
    );
    if (fatal)
      throw new Error(`CSV parse error: ${fatal.message || fatal.code}`);
  }

  const raw = (parsed.data as any[]) || [];
  const data: SheetRow[] = raw.map((r) => ({
    Contributor: r["Contributor"] ?? "",
    Title: r["Title"] ?? "",
    Artist: r["Artist"] ?? "",
    Tags: r["Tags"] ?? "",
    Url: r["Url"] ?? "",
    Notes: r["Notes"] ?? "",
    CreatedDate: r["CreatedDate"] ?? "",
    Approved: r["Approved"] ?? "",
    // Safe positions: default to 50, not random
    x: toNumberOr(r["x"], 50),
    y: toNumberOr(r["y"], 50),
  }));

  return data;
};

export function useGoogleSheetSubmissions() {
  // Cache-buster helps avoid edge CDN staleness even with no-store
  const baseUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJ9ialTviBSvKMB9G0lQLQrlCKDLMvfxTgu6wLWpyJW2LQNbvqRrHomW1QK-f2IDyZoDdslaQWyPtk/pub?gid=0&single=true&output=csv";
  const csvUrl = `${baseUrl}&_=${Date.now()}`;

  const [rows, setRows] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(
    async (signal?: AbortSignal, attempt = 1): Promise<void> => {
      if (signal?.aborted) return;
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(csvUrl, { cache: "no-store", signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        const data = parseCsvText(text);

        // Retry once if we got a valid response but zero rows (publish lag)
        if (data.length === 0 && attempt === 1) {
          await new Promise((r) => setTimeout(r, 600));
          return load(signal, 2);
        }

        if (!signal?.aborted) setRows(data);
      } catch (e: any) {
        if (!signal?.aborted) setErr(e?.message ?? "Failed to load sheet");
      } finally {
        if (!signal?.aborted) setLoading(false);
      }
    },
    [csvUrl]
  );

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return { rows, loading, err, reload: () => load(), toBool };
}
