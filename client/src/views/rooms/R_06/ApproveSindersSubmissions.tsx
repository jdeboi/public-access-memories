// "use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import type { SindersSubmissionType as BaseSubmission } from "./GallerySinders";

const TOKEN_KEY = "pamAdminToken";

type TabKey = "approved" | "rejected";

// Extend the imported type locally with the fields we want to edit.
// (If you add x/y in the source type, you can remove this intersection.)
type SindersSubmissionType = BaseSubmission & {
  tags?: string[] | null;
  x?: number | null;
  y?: number | null;
};

export default function ApproveSindersSubmissions() {
  // token (guard localStorage if SSR)
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    try {
      const t =
        typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
      setToken(t);
    } catch {
      setToken(null);
    }
  }, []);

  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  // two lists
  const [approvedItems, setApprovedItems] = useState<SindersSubmissionType[]>(
    []
  );
  const [rejectedItems, setRejectedItems] = useState<SindersSubmissionType[]>(
    []
  );
  const [activeTab, setActiveTab] = useState<TabKey>("rejected"); // default to moderation queue
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // --- auth ---
  const login = useCallback(async () => {
    setAuthError(null);
    try {
      const res = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!data?.isValid || !data?.token) {
        setAuthError("Invalid password");
        return;
      }
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
    } catch (e: any) {
      setAuthError(e?.message ?? "Login failed");
    }
  }, [password]);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
    setToken(null);
    setApprovedItems([]);
    setRejectedItems([]);
    setErr(null);
    setAuthError(null);
  }, []);

  // --- data fetchers ---
  const fetchByApproved = useCallback(
    async (approvedFlag: boolean) => {
      const params = new URLSearchParams();
      params.set("approved", approvedFlag ? "true" : "false");
      params.set("hidden", "false");
      params.set("limit", "100");
      const res = await fetch(`/api/submissions?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const data = await res.json();
      if (!res.ok || !data.ok)
        throw new Error(data.error || "Failed to load submissions");
      const items: SindersSubmissionType[] = Array.isArray(data.items)
        ? data.items
        : [];
      // sort newest first
      items.sort((a, b) => {
        const at = a.createdAt ? Date.parse(a.createdAt) : 0;
        const bt = b.createdAt ? Date.parse(b.createdAt) : 0;
        return bt - at;
      });
      console.log("fetched", items);
      return items;
    },
    [token]
  );

  const refreshApproved = useCallback(async () => {
    const list = await fetchByApproved(true);
    setApprovedItems(list);
  }, [fetchByApproved]);

  const refreshRejected = useCallback(async () => {
    const list = await fetchByApproved(false);
    setRejectedItems(list);
  }, [fetchByApproved]);

  const refreshCurrent = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      if (activeTab === "approved") {
        await refreshApproved();
      } else {
        await refreshRejected();
      }
    } catch (e: any) {
      setErr(e?.message ?? "Refresh failed");
    } finally {
      setLoading(false);
    }
  }, [activeTab, refreshApproved, refreshRejected]);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const [a, r] = await Promise.all([
        fetchByApproved(true),
        fetchByApproved(false),
      ]);
      setApprovedItems(a);
      setRejectedItems(r);
    } catch (e: any) {
      setErr(e?.message ?? "Refresh failed");
    } finally {
      setLoading(false);
    }
  }, [fetchByApproved]);

  useEffect(() => {
    if (!token) return;
    // initial load both lists
    refreshAll();
  }, [token, refreshAll]);

  // --- actions ---
  const setStatus = useCallback(
    async (id: string, approvedFlag: boolean) => {
      const res = await fetch(`/api/submissions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ approved: approvedFlag }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok)
        throw new Error(data.error || "Status update failed");

      // move item between lists optimistically
      if (approvedFlag) {
        setRejectedItems((prev) => prev.filter((s) => s._id !== id));
        const found =
          data.item ||
          approvedItems.find((s) => s._id === id) ||
          rejectedItems.find((s) => s._id === id);
        const updated: SindersSubmissionType = {
          ...(found || { _id: id, title: "", content: "" }),
          approved: true,
        };
        setApprovedItems((prev) => [
          updated,
          ...prev.filter((s) => s._id !== id),
        ]);
      } else {
        setApprovedItems((prev) => prev.filter((s) => s._id !== id));
        const found =
          data.item ||
          rejectedItems.find((s) => s._id === id) ||
          approvedItems.find((s) => s._id === id);
        const updated: SindersSubmissionType = {
          ...(found || { _id: id, title: "", content: "" }),
          approved: false,
        };
        setRejectedItems((prev) => [
          updated,
          ...prev.filter((s) => s._id !== id),
        ]);
      }
    },
    [token, approvedItems, rejectedItems]
  );

  const deleteOne = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/submissions/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Delete failed");
      setApprovedItems((prev) => prev.filter((s) => s._id !== id));
      setRejectedItems((prev) => prev.filter((s) => s._id !== id));
    },
    [token]
  );

  // --- update editor fields (tags/x/y) ---
  const updateFields = useCallback(
    async (
      id: string,
      patch: Partial<Pick<SindersSubmissionType, "tags" | "x" | "y">>
    ) => {
      const prev = approvedItems.find((s) => s._id === id);
      if (!prev) return;
      // optimistic
      setApprovedItems((list) =>
        list.map((s) => (s._id === id ? { ...s, ...patch } : s))
      );
      try {
        const res = await fetch(`/api/submissions/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(patch),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error(data.error || "Update failed");
        // re-sync with server version if provided
        if (data.item) {
          setApprovedItems((list) =>
            list.map((s) => (s._id === id ? { ...s, ...data.item } : s))
          );
        }
      } catch (e) {
        // rollback on error
        setApprovedItems((list) => list.map((s) => (s._id === id ? prev : s)));
        setErr((e as any)?.message ?? "Update failed");
      }
    },
    [approvedItems, token]
  );

  const list = activeTab === "approved" ? approvedItems : rejectedItems;

  if (!token) {
    return (
      <div style={pageWrap}>
        <div style={card}>
          <h2 style={{ margin: 0 }}>Approve Sinders Submissions</h2>
          <p style={{ opacity: 0.8, marginTop: 8 }}>
            Enter admin password to continue
          </p>
          {authError && <div style={errorBox}>{authError}</div>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />
          <button onClick={login} style={primaryBtn} disabled={!password}>
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrap}>
      <div style={{ ...headerRow }}>
        <h2 style={{ margin: 0 }}>Submissions</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={tabBar}>
            <button
              onClick={() => setActiveTab("approved")}
              style={{
                ...tabBtn,
                ...(activeTab === "approved" ? tabBtnActive : {}),
              }}
            >
              Approved ({approvedItems.length})
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              style={{
                ...tabBtn,
                ...(activeTab === "rejected" ? tabBtnActive : {}),
              }}
            >
              Rejected ({rejectedItems.length})
            </button>
          </div>
          <button
            onClick={refreshCurrent}
            style={secondaryBtn}
            disabled={loading}
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button onClick={refreshAll} style={secondaryBtn} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh All"}
          </button>
          <button onClick={logout} style={linkBtn}>
            Log out
          </button>
        </div>
      </div>

      {err && <div style={errorBox}>{err}</div>}

      {list.length === 0 ? (
        <div style={{ opacity: 0.7, marginTop: 16 }}>
          {loading
            ? "Loading…"
            : activeTab === "approved"
            ? "No approved submissions."
            : "No rejected submissions."}
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: "12px 0" }}>
          {list.map((s) => (
            <li key={s._id} style={row}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={s.title}
                >
                  {s.title}
                </div>
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>
                  {s.contributor || s.artist
                    ? `by ${s.contributor || s.artist}`
                    : ""}{" "}
                  {s.createdAt
                    ? `• ${new Date(s.createdAt).toLocaleString()}`
                    : ""}
                </div>
                <div style={{ fontSize: 13, marginTop: 6, opacity: 0.9 }}>
                  {(s.content || "").slice(0, 240)}
                  {(s.content || "").length > 240 ? "…" : ""}
                </div>
                {s.url && (
                  <div style={{ fontSize: 12, marginTop: 6 }}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#93c5fd" }}
                    >
                      {s.url}
                    </a>
                  </div>
                )}

                {/* --- Inline editor only for Approved tab --- */}
                {activeTab === "approved" && (
                  <InlineEditor
                    submission={s}
                    onSave={(patch) => updateFields(s._id, patch)}
                  />
                )}
              </div>

              <div style={{ display: "flex", gap: 8, marginLeft: 12 }}>
                {activeTab === "approved" ? (
                  <button
                    onClick={() => setStatus(s._id, false)}
                    style={rejectBtn}
                  >
                    Reject
                  </button>
                ) : (
                  <button
                    onClick={() => setStatus(s._id, true)}
                    style={approveBtn}
                  >
                    Approve
                  </button>
                )}
                <button onClick={() => deleteOne(s._id)} style={dangerBtn}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** ---------- Inline editor for tags + x/y ---------- */
function InlineEditor({
  submission,
  onSave,
}: {
  submission: SindersSubmissionType;
  onSave: (
    patch: Partial<Pick<SindersSubmissionType, "tags" | "x" | "y">>
  ) => Promise<void> | void;
}) {
  const [tagsText, setTagsText] = useState<string>(
    (submission.tags ?? [])
      .filter(Boolean)
      .map((t) => String(t))
      .join(", ")
  );
  const [xStr, setXStr] = useState<string>(
    submission.x == null ? "" : String(submission.x)
  );
  const [yStr, setYStr] = useState<string>(
    submission.y == null ? "" : String(submission.y)
  );
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const dirty =
    tagsText !== (submission.tags ?? []).join(", ") ||
    xStr !== (submission.x == null ? "" : String(submission.x)) ||
    yStr !== (submission.y == null ? "" : String(submission.y));

  const parseTags = (s: string): string[] =>
    s
      .toUpperCase()
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

  const toNum = (s: string): number | null => {
    if (s.trim() === "") return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  };

  const doSave = async () => {
    setErr(null);
    setSaving(true);
    try {
      const parsedX = toNum(xStr); // number | null
      const parsedY = toNum(yStr); // number | null

      await onSave({
        tags: parseTags(tagsText),
        x: parsedX ?? undefined,
        y: parsedY ?? undefined,
      });
      setSavedAt(Date.now());
    } catch (e: any) {
      setErr(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  };
  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      e.key === "Enter" &&
      (e.metaKey || e.ctrlKey || (e.currentTarget as any).type === "number")
    ) {
      e.preventDefault();
      if (dirty && !saving) void doSave();
    }
  };

  const justSaved = savedAt != null && Date.now() - savedAt < 2000; // 2s flash

  return (
    <div style={editorWrap}>
      <div style={editorRow}>
        <label style={label}>Tags</label>
        <input
          style={input}
          placeholder="comma,separated,tags"
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
          onBlur={() => dirty && !saving && doSave()}
          onKeyDown={onKeyDown}
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ ...editorRow, flex: 1 }}>
          <label style={label}>X</label>
          <input
            style={input}
            type="number"
            step="any"
            value={xStr}
            onChange={(e) => setXStr(e.target.value)}
            onBlur={() => dirty && !saving && doSave()}
            onKeyDown={onKeyDown}
            placeholder="e.g., 0.25"
          />
        </div>
        <div style={{ ...editorRow, flex: 1 }}>
          <label style={label}>Y</label>
          <input
            style={input}
            type="number"
            step="any"
            value={yStr}
            onChange={(e) => setYStr(e.target.value)}
            onBlur={() => dirty && !saving && doSave()}
            onKeyDown={onKeyDown}
            placeholder="e.g., 0.66"
          />
        </div>
      </div>

      <div
        style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}
      >
        <button
          style={{ ...secondaryBtn, padding: "6px 10px" }}
          disabled={saving || !dirty}
          onClick={doSave}
          title="Cmd/Ctrl+Enter to save from fields"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        {justSaved && (
          <span style={{ fontSize: 12, opacity: 0.8 }}>Saved ✓</span>
        )}
        {err && <span style={{ ...tinyErr }}>{err}</span>}
      </div>
    </div>
  );
}

/* --- tiny inline styles to keep it standalone --- */
const pageWrap: React.CSSProperties = {
  maxWidth: 940,
  margin: "40px auto",
  padding: "0 16px",
  fontFamily:
    "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  color: "#e8eaed",
};
const card: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  padding: 16,
};
const headerRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
};
const tabBar: React.CSSProperties = {
  display: "inline-flex",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 10,
  overflow: "hidden",
};
const tabBtn: React.CSSProperties = {
  padding: "8px 12px",
  background: "transparent",
  border: "none",
  color: "inherit",
  cursor: "pointer",
};
const tabBtnActive: React.CSSProperties = {
  background: "rgba(255,255,255,0.12)",
};
const row: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
  padding: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  marginBottom: 10,
  background: "rgba(255,255,255,0.04)",
};
const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(0,0,0,0.35)",
  color: "inherit",
  margin: "10px 0 12px",
};
const primaryBtn: React.CSSProperties = {
  padding: "8px 12px",
  background: "#2563EB",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 8,
  color: "white",
  cursor: "pointer",
};
const secondaryBtn: React.CSSProperties = {
  padding: "8px 12px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: 8,
  color: "inherit",
  cursor: "pointer",
};
const linkBtn: React.CSSProperties = {
  padding: "8px 10px",
  background: "transparent",
  border: "none",
  color: "#93c5fd",
  cursor: "pointer",
  textDecoration: "underline",
};
const approveBtn: React.CSSProperties = {
  padding: "6px 10px",
  background: "#16a34a",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 8,
  color: "white",
  cursor: "pointer",
};
const rejectBtn: React.CSSProperties = {
  padding: "6px 10px",
  background: "#f59e0b",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 8,
  color: "black",
  cursor: "pointer",
};
const dangerBtn: React.CSSProperties = {
  padding: "6px 10px",
  background: "#dc2626",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 8,
  color: "white",
  cursor: "pointer",
};
const errorBox: React.CSSProperties = {
  color: "#fecaca",
  background: "rgba(239, 68, 68, 0.18)",
  border: "1px solid rgba(239, 68, 68, 0.35)",
  padding: 8,
  borderRadius: 8,
  marginTop: 8,
};

const editorWrap: React.CSSProperties = {
  marginTop: 10,
  paddingTop: 10,
  borderTop: "1px dashed rgba(255,255,255,0.2)",
};
const editorRow: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};
const label: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.7,
  marginBottom: 4,
};
const tinyErr: React.CSSProperties = {
  color: "#fecaca",
  fontSize: 12,
  opacity: 0.9,
};
