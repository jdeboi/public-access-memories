import { useEffect, useState, useCallback } from "react";
import Papa from "papaparse";

export type SheetRow = {
  Contributor: string;
  Title: string;
  Artist: string;
  Tags: string; // comma-separated in the sheet
  Url: string;
  Notes: string;
  x: number | string;
  y: number | string;
  Approved: string; // "TRUE"/"FALSE", "Yes"/"No", etc.
};

function toBool(v: unknown): boolean {
  const s = String(v ?? "")
    .trim()
    .toLowerCase();
  return ["true", "yes", "y", "1"].includes(s);
}

export function useGoogleSheetSubmissions() {
  const csvUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQJ9ialTviBSvKMB9G0lQLQrlCKDLMvfxTgu6wLWpyJW2LQNbvqRrHomW1QK-f2IDyZoDdslaQWyPtk/pub?gid=0&single=true&output=csv";

  const [rows, setRows] = useState<SheetRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(csvUrl, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();

      const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
      const data = (parsed.data as any[]).map((r) => ({
        Contributor: r["Contributor"] ?? "",
        Title: r["Title"] ?? "",
        Artist: r["Artist"] ?? "",
        Tags: r["Tags"] ?? "",
        Url: r["Url"] ?? "",
        Notes: r["Notes"] ?? "",
        Approved: r["Approved"] ?? "",
        x: r["x"] ?? Math.random() * 1000,
        y: r["y"] ?? Math.random() * 1000,
      }));
      setRows(data);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load sheet");
    } finally {
      setLoading(false);
    }
  }, [csvUrl]);

  useEffect(() => {
    load();
  }, [load]);

  return { rows, loading, err, reload: load, toBool };
}
