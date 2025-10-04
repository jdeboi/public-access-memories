import React, { useEffect, useMemo, useState, useCallback } from "react";
import GallerySindersSketch from "./GallerySindersSketch";
import CenterModal from "../../../components/CenterModal/CenterModal";
import { GallerySketch1Props } from "../../Gallery/Gallery1/GallerySketchTemplate1";
import Frame from "../../../components/Frame/Frame";

export type SindersSubmissionType = {
  _id: string; // Mongo ID
  title: string;
  content: string;
  author?: string;
  email?: string;
  tags?: string[];
  room?: string;
  approved?: boolean;
  hidden?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

interface GallerySindersProps extends GallerySketch1Props {}

const GallerySinders = (props: GallerySindersProps) => {
  const [submissionHidden, setSubmissionHidden] = useState(true);
  const [submissions, setSubmissions] = useState<SindersSubmissionType[]>([]);
  const [query, setQuery] = useState("");

  // form state (inside modal)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isFilterHidden, setFilterIsHidden] = useState(false);

  const pastelStyle = {
    background:
      "linear-gradient(135deg, rgba(255,182,193,.8), rgba(173,216,230,.8))", // pastel pink→blue
    backdropFilter: "blur(12px)", // blur stuff behind (Chrome/Edge/FF)
    WebkitBackdropFilter: "blur(12px)", // Safari
    border: "1px solid rgba(255,255,255,0.35)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
    borderRadius: "14px",
  };

  const pastelStyle2 = {
    background: `linear-gradient(135deg,
            rgba(255,150,170,0.95) 0%,
            rgba(255,225,235,0.80) 45%,
            rgba(140,195,255,0.95) 100%
          )`,
  };

  const fetchSubmissions = useCallback(async (q: string) => {
    setLoading(true);
    setErr(null);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      params.set("approved", "true"); // <- ONLY approved from the server
      params.set("hidden", "false"); // <- (optional) skip hidden if you use it

      const res = await fetch(`/api/submissions?${params.toString()}`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to load submissions");
      setSubmissions(data.items);
    } catch (e: any) {
      setErr(e.message ?? "Error fetching submissions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions(query);
  }, [fetchSubmissions, query]);

  const handleShowSubmissions = useCallback(() => {
    // opening fresh: reset form + flags
    setSubmissionHidden(false);
    setSubmitted(false);
    setErr(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!title.trim() || !content.trim()) {
      setErr("Please provide a title and content.");
      return;
    }
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          author: author.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to submit");

      await fetchSubmissions(query);

      // clear form and show success message (do NOT close modal)
      setTitle("");
      setContent("");
      setAuthor("");
      setEmail("");
      setSubmitted(true);
    } catch (e: any) {
      setErr(e.message ?? "Error submitting");
    } finally {
      setLoading(false);
    }
  }, [title, content, author, email, fetchSubmissions, query]);

  const filteredSubmissions = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return submissions
      .filter((s) => s.approved === true && s.hidden !== true) // UI guard
      .filter((s) =>
        !q
          ? true
          : (s.title ?? "").toLowerCase().includes(q) ||
            (s.content ?? "").toLowerCase().includes(q) ||
            (s.author ?? "").toLowerCase().includes(q)
      );
  }, [submissions, query]);

  return (
    <>
      <GallerySindersSketch
        {...props}
        submissions={filteredSubmissions}
        showSubmissionForm={handleShowSubmissions}
      />

      <CenterModal
        title={"Submission"}
        z={2501}
        isHidden={submissionHidden}
        onHide={() => {
          setSubmissionHidden(true);
          setSubmitted(false);
        }}
        isRelative={false}
        classN="FAQ"
        windowStyle={pastelStyle2}
        content={
          <div className="p-2 flex-col flex-1 text-center">
            {submitted ? (
              <div className="grid h-full place-items-center text-center">
                <div>
                  <p className="mb-2 font-bold">
                    Thank you for your submission.
                  </p>
                  <p>Please wait for it to be approved.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {err && (
                  <div className="text-red-400 text-sm border border-red-500/40 rounded p-2">
                    {err}
                  </div>
                )}
                <input
                  className="w-full p-2 rounded bg-white/30 border border-white/10"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loading}
                />
                <textarea
                  className="w-full p-2 rounded bg-white/30 border border-white/10"
                  placeholder="Content"
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
          </div>
        }
        buttons={
          submitted ? (
            <div className="center-buttons flexItem gap-2">
              <button
                className="standardButton primary"
                onClick={() => {
                  setSubmissionHidden(true);
                  setSubmitted(false);
                }}
              >
                OK
              </button>
            </div>
          ) : (
            <div className="center-buttons flexItem gap-2">
              <button
                className="standardButton primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting…" : "Submit"}
              </button>
              <button
                className="standardButton secondary"
                onClick={() => {
                  setSubmissionHidden(true);
                  setSubmitted(false);
                }}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          )
        }
      />

      {/* Filter UI */}
      <Frame
        title=""
        isHidden={isFilterHidden}
        unbounded={false}
        onHide={() => setFilterIsHidden(true)}
        windowStyle={pastelStyle}
        content={
          <div className="w-full px-2 py-2">
            <input
              type="text"
              className="w-full bg-white rounded-lg p-2"
              placeholder="Filter submissions…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        }
        width={250}
        height={56}
        x={20}
        y={20}
        z={100}
      />
    </>
  );
};

export default GallerySinders;
