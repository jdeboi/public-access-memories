import React, { useEffect, useState, useCallback } from "react";
import { SindersSubmissionType } from "./GallerySinders";

const TOKEN_KEY = "pamAdminToken";

export default function ApproveSindersSubmissions() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY)
  );
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const [items, setItems] = useState<SindersSubmissionType[]>([]);
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
      if (!data.isValid || !data.token) {
        setAuthError("Invalid password");
        return;
      }
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
    } catch (e: any) {
      setAuthError(e.message ?? "Login failed");
    }
  }, [password]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setItems([]);
    setErr(null);
    setAuthError(null);
  }, []);

  // --- data ---
  const fetchUnapproved = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const params = new URLSearchParams();
      params.set("approved", "false");
      params.set("hidden", "false");
      params.set("limit", "100"); // adjust if needed

      const res = await fetch(`/api/submissions?${params.toString()}`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to load submissions");
      setItems(data.items || []);
    } catch (e: any) {
      setErr(e.message ?? "Error loading submissions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // auto-fetch if already “logged in”
    if (token) fetchUnapproved();
  }, [token, fetchUnapproved]);

  // --- actions ---
  const approveOne = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/submissions/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ approved: true }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok)
          throw new Error(data.error || "Approve failed");
        // remove from local list
        setItems((prev) => prev.filter((s) => s._id !== id));
      } catch (e: any) {
        alert(e.message ?? "Approve failed");
      }
    },
    [token]
  );

  const deleteOne = useCallback(
    async (id: string) => {
      //   if (!confirm("Delete this submission? This cannot be undone.")) return;
      try {
        const res = await fetch(`/api/submissions/${id}`, {
          method: "DELETE",
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error(data.error || "Delete failed");
        setItems((prev) => prev.filter((s) => s._id !== id));
      } catch (e: any) {
        alert(e.message ?? "Delete failed");
      }
    },
    [token]
  );

  // --- views ---
  if (!token) {
    return (
      <div style={pageWrap}>
        <div style={card}>
          <h2 style={{ margin: 0 }}>Approve Sinders Submissions</h2>
          <p style={{ opacity: 0.8, marginTop: 8 }}>
            Enter admin password to continue (lightweight gating only).
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
        <h2 style={{ margin: 0 }}>Unapproved Submissions</h2>
        <div>
          <button
            onClick={fetchUnapproved}
            style={secondaryBtn}
            disabled={loading}
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>{" "}
          <button onClick={logout} style={linkBtn}>
            Log out
          </button>
        </div>
      </div>

      {err && <div style={errorBox}>{err}</div>}

      {items.length === 0 ? (
        <div style={{ opacity: 0.7, marginTop: 16 }}>
          {loading ? "Loading…" : "No unapproved submissions."}
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: "12px 0" }}>
          {items.map((s) => (
            <li key={s._id} style={row}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {s.title}
                </div>
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>
                  {s.author ? `by ${s.author}` : ""}{" "}
                  {s.createdAt
                    ? `• ${new Date(s.createdAt).toLocaleString()}`
                    : ""}
                </div>
                <div style={{ fontSize: 13, marginTop: 6, opacity: 0.9 }}>
                  {(s.content || "").slice(0, 240)}
                  {(s.content || "").length > 240 ? "…" : ""}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, marginLeft: 12 }}>
                <button onClick={() => approveOne(s._id)} style={approveBtn}>
                  Approve
                </button>
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

/* --- tiny inline styles to keep it standalone --- */
const pageWrap: React.CSSProperties = {
  maxWidth: 880,
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
