import React, { useEffect, useMemo, useState, useCallback } from "react";
import GallerySindersSketch from "./GallerySindersSketch";
import CenterModal from "../../../components/CenterModal/CenterModal";
import { GallerySketch1Props } from "../../Gallery/Gallery1/GallerySketchTemplate1";
import Frame from "../../../components/Frame/Frame";
import { useGoogleSheetSubmissions } from "./useGoogleSheetSubmissions";
import BrizModal from "../R_01/BrizModal";
import SindersReadme from "./SindersReadme";
import CustomPill from "../../pages/templates/CustomPill";
import { getTagColor } from "./postPositionHelper";

export type SindersSubmissionType = {
  _id: string; // Mongo ID or synthesized for CSV
  title: string;
  content: string;
  reactContent?: React.ReactNode;
  artist?: string;
  isPersonalData: boolean;
  url?: string;
  contributor?: string;
  tags?: string[];
  approved?: boolean;
  hidden?: boolean;
  createdAt?: string;
  updatedAt?: string;
  x?: number;
  y?: number;
  currentlyFilteredOut?: boolean;
};

interface GallerySindersProps extends GallerySketch1Props {}

const GallerySinders = (props: GallerySindersProps) => {
  const [submissionHidden, setSubmissionHidden] = useState(true);
  const [mongoSubmissions, setMongoSubmissions] = useState<
    SindersSubmissionType[]
  >([]);
  const [query, setQuery] = useState("");

  // form state (inside modal)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [contributor, setContributor] = useState("");
  const [isPersonalData, setIsPersonalData] = useState(false);

  const [loadingMongo, setLoadingMongo] = useState(false);
  const [errMongo, setErrMongo] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isFilterHidden, setFilterIsHidden] = useState(false);

  const [postOpen, setPostOpen] = useState<null | SindersSubmissionType>(null);

  // ---- Google Sheet (CSV) ----
  // Your hook should return the raw sheet rows with the columns:
  // Contributor, Title, Artist, Tags, Url, Notes, Approved
  const {
    rows: sheetItems,
    loading: loadingSheet,
    err: errSheet,
  } = useGoogleSheetSubmissions();

  // Map the sheet row -> SindersSubmissionType
  const mapSheetRowToSubmission = (r: any): SindersSubmissionType => {
    const Title = (r.Title ?? "").toString().trim();
    const Notes = (r.Notes ?? "").toString().trim();
    const Artist = (r.Artist ?? "").toString().trim();
    const Url = (r.Url ?? "").toString().trim();
    const Contributor = (r.Contributor ?? "").toString().trim();
    const CreatedDate = (r.CreatedDate ?? "").toString().trim();
    const x = typeof r.x === "string" ? parseFloat(r.x) : r.x;
    const y = typeof r.y === "string" ? parseFloat(r.y) : r.y;
    const Tags = Array.isArray(r.Tags)
      ? r.Tags
      : typeof r.Tags === "string"
      ? r.Tags.split(",")
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [];

    // synthesize a stable-ish id for CSV rows
    const syntheticId = Url || `${Title}::${Artist}`;

    return {
      _id: syntheticId,
      title: Title,
      content: Notes,
      artist: Artist || undefined,
      isPersonalData: false, // CSV doesn’t carry this; default to false
      url: Url || undefined,
      contributor: Contributor || undefined,
      tags: Tags,
      approved: true,
      hidden: false,
      currentlyFilteredOut: false,
      createdAt: CreatedDate || undefined,
      updatedAt: undefined,
      x: x,
      y: y,
    };
  };

  const sheetSubmissions: SindersSubmissionType[] = useMemo(
    () => (sheetItems || []).map(mapSheetRowToSubmission),
    [sheetItems]
  );

  // ---- Mongo fetch ----
  const fetchMongoSubmissions = useCallback(async (q: string) => {
    setLoadingMongo(true);
    setErrMongo(null);
    try {
      const params = new URLSearchParams();
      // if (q.trim()) params.set("q", q.trim());
      params.set("approved", "true");
      params.set("hidden", "false");

      const res = await fetch(`/api/submissions?${params.toString()}`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to load submissions");

      // Ensure each Mongo item conforms to SindersSubmissionType
      const normalized: SindersSubmissionType[] = (data.items || []).map(
        (s: any) => ({
          _id: String(s._id),
          title: String(s.title ?? s.Title ?? ""),
          content: String(s.content ?? s.Notes ?? ""),
          artist:
            (s.artist ?? s.Artist ?? s.contributor ?? s.Contributor ?? "") ||
            undefined,
          isPersonalData: Boolean(s.isPersonalData ?? false),
          url: (s.url ?? s.Url ?? "") || undefined,
          contributor: (s.contributor ?? s.Contributor ?? "") || undefined,
          tags: Array.isArray(s.tags ?? s.Tags)
            ? (s.tags ?? s.Tags)
                .map((t: any) => String(t).trim())
                .filter(Boolean)
            : typeof (s.tags ?? s.Tags) === "string"
            ? String(s.tags ?? s.Tags)
                .split(",")
                .map((t: string) => t.trim())
                .filter(Boolean)
            : undefined,
          approved: typeof s.approved === "boolean" ? s.approved : s.Approved,
          hidden: typeof s.hidden === "boolean" ? s.hidden : s.Hidden,
          x: s.x ?? 50,
          y: s.y ?? 50,
          currentlyFiltered: false,
          createdAt: s.createdAt ? String(s.createdAt) : undefined,
          updatedAt: s.updatedAt ? String(s.updatedAt) : undefined,
        })
      );

      setMongoSubmissions(normalized);
    } catch (e: any) {
      setErrMongo(e.message ?? "Error fetching submissions");
    } finally {
      setLoadingMongo(false);
    }
  }, []);

  useEffect(() => {
    fetchMongoSubmissions(query);
  }, [fetchMongoSubmissions, query]);

  // Submit -> Mongo (unchanged)
  const handleShowSubmissions = useCallback(() => {
    setSubmissionHidden(false);
    setSubmitted(false);
    setErrMongo(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!title.trim() || !content.trim()) {
      setErrMongo("Please provide a title and description.");
      return;
    }
    setErrMongo(null);
    setLoadingMongo(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          artist: artist.trim() || undefined,
          contributor: contributor.trim() || undefined,
          tags: tags.map((t) => t.trim()).filter(Boolean) || undefined,
          url: url.trim() || undefined,
          x: Math.random() * 1000,
          y: Math.random() * 1000,
          isPersonalData,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to submit");

      await fetchMongoSubmissions(query);

      setTitle("");
      setContent("");
      setArtist("");
      setUrl("");
      setContributor("");
      setTags([]);
      setIsPersonalData(false);
      setSubmitted(true);
    } catch (e: any) {
      setErrMongo(e.message ?? "Error submitting");
    } finally {
      setLoadingMongo(false);
    }
  }, [
    title,
    content,
    artist,
    url,
    tags,
    contributor,
    isPersonalData,
    fetchMongoSubmissions,
    query,
  ]);

  // Merge + de-dupe (prefer Mongo version when both exist)
  const mergedSubmissions = useMemo(() => {
    const byKey = new Map<string, SindersSubmissionType>();

    // First put CSV (lower priority)
    for (const s of sheetSubmissions) {
      const key = s._id || s.url || `${s.title}::${s.artist ?? ""}`;
      if (!byKey.has(key)) byKey.set(key, s);
    }

    // Overwrite with Mongo (higher priority, has true _id)
    for (const s of mongoSubmissions) {
      const key = s._id || s.url || `${s.title}::${s.artist ?? ""}`;
      byKey.set(key, s);
    }

    return Array.from(byKey.values());
  }, [sheetSubmissions, mongoSubmissions]);

  // Filter + only approved & not hidden
  const filteredSubmissions = useMemo(() => {
    const q = query.trim().toLowerCase();

    const submissions = mergedSubmissions
      .filter((s) => s.approved === true && s.hidden !== true)
      .filter((s) =>
        !q
          ? true
          : (s.title ?? "").toLowerCase().includes(q) ||
            (s.content ?? "").toLowerCase().includes(q) ||
            (s.artist ?? "").toLowerCase().includes(q) ||
            (s.contributor ?? "").toLowerCase().includes(q) ||
            (s.tags ?? []).some((t) => t.toLowerCase().includes(q))
      )
      .sort((a, b) => {
        // Prefer createdAt desc when available, else fallback to title
        const at = a.createdAt ? Date.parse(a.createdAt) : 0;
        const bt = b.createdAt ? Date.parse(b.createdAt) : 0;
        if (bt !== at) return bt - at;
        return (a.title || "").localeCompare(b.title || "");
      });
    return submissions;
  }, [mergedSubmissions, query]);

  const loadingAny = loadingMongo || loadingSheet;
  const errAny = errMongo || errSheet || null;

  return (
    <>
      <GallerySindersSketch
        {...props}
        submissions={filteredSubmissions}
        showSubmissionForm={handleShowSubmissions}
        setPostOpen={setPostOpen}
        showReadme={() => {
          setPostOpen({
            _id: "readme",
            title: "README",
            content: "",
            reactContent: <SindersReadme />,
            isPersonalData: false,
          });
        }}
      />

      <BrizModal
        visible={!!postOpen}
        onClose={() => setPostOpen(null)}
        content={
          postOpen ? (
            <div className="">
              <h3 className="text-xl font-bold mb-2">{postOpen.title}</h3>

              {postOpen.isPersonalData && (
                <div className="italic mb-2 text-slate-600">
                  * Personal Data Submission *
                </div>
              )}
              {postOpen.tags && postOpen.tags.length > 0 && (
                <div className="mb-6 flex gap-2">
                  {postOpen.tags.map((tag, index) => (
                    <CustomPill
                      key={index}
                      text={tag}
                      bgHex={getTagColor(tag)}
                    />
                  ))}
                </div>
              )}
              {postOpen.artist && (
                <div className="text-xl text-blue-600 mb-4">
                  {postOpen.artist}
                </div>
              )}
              {postOpen.contributor && (
                <div className="italic mb-2">
                  Contributed by {postOpen.contributor}
                </div>
              )}
              {postOpen.createdAt && (
                <div className="italic mb-2">
                  Created At: {postOpen.createdAt}
                </div>
              )}
              {postOpen.content && (
                <div className="whitespace-pre-wrap mb-4 mt-4">
                  {postOpen.content}
                </div>
              )}
              {postOpen.reactContent && (
                <div className="mb-4 mt-4">{postOpen.reactContent}</div>
              )}
              {postOpen.url && (
                <div>
                  <a
                    href={postOpen.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    URL
                  </a>
                </div>
              )}
            </div>
          ) : null
        }
      />

      <BrizModal
        visible={!submissionHidden}
        onClose={() => {
          setSubmissionHidden(true);
          setSubmitted(false);
        }}
        content={
          <div className="p-2 flex-col flex-1 text-left">
            {submitted ? (
              <div className="grid h-full place-items-center text-center">
                <div>
                  <p className="mb-2 font-bold">
                    Thank you for your submission.
                  </p>
                  <p>Our administrators are approving everything within 24h.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {errAny && (
                  <div className="text-red-400 text-sm border border-red-500/40 rounded p-2">
                    {errAny}
                  </div>
                )}
                <div className="text-2xl text-center mb-3 font-bold">
                  Submit Your Feminist Data
                </div>

                {/* toggle is original data (toggled off by default) */}
                <div className="w-full p-2 rounded bg-white/30 border border-white/10">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isPersonalData}
                      onChange={(e) => setIsPersonalData(e.target.checked)}
                      disabled={loadingAny}
                    />
                    <span className="text-sm">
                      Check this box if you want to submit your own data.
                    </span>
                  </label>
                </div>
                <input
                  className="w-full p-2 rounded bg-white/30 border border-white/10"
                  placeholder="Your Name (optional)"
                  value={contributor}
                  onChange={(e) => setContributor(e.target.value)}
                  disabled={loadingAny}
                />
                <input
                  className="w-full p-2 rounded bg-white/30 border border-white/10"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={loadingAny}
                />

                <textarea
                  className="w-full p-2 rounded bg-white/30 border border-white/10"
                  placeholder={isPersonalData ? "Your Data" : "Description"}
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={loadingAny}
                />

                {!isPersonalData && (
                  <input
                    className="w-full p-2 rounded bg-white/30 border border-white/10"
                    placeholder="Artist (optional)"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    disabled={loadingAny}
                  />
                )}

                <input
                  className="w-full p-2 rounded bg-white/30 border border-white/10"
                  placeholder="URL (optional)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loadingAny}
                />
              </div>
            )}

            {submitted ? (
              <div className="w-full flex justify-center mt-6">
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
              <div className="center-buttons flex gap-2 mt-6">
                <button
                  className="standardButton primary"
                  onClick={handleSubmit}
                  disabled={loadingAny}
                >
                  {loadingAny ? "Submitting…" : "Submit"}
                </button>
                <button
                  className="standardButton secondary"
                  onClick={() => {
                    setSubmissionHidden(true);
                    setSubmitted(false);
                  }}
                  disabled={loadingAny}
                >
                  Cancel
                </button>
              </div>
            )}
            <div className="mb-3 text-xs text-gray-500 mt-4">
              * This is a trans inclusive dataset. We will reject anything
              non-intersectional.
            </div>
          </div>
        }
      />

      {/* Filter UI */}
      <Frame
        title=""
        isHidden={isFilterHidden}
        unbounded={false}
        onHide={() => setFilterIsHidden(true)}
        windowStyle={{ background: "#ffffffaa" }}
        content={
          <div className="w-full px-2 py-2">
            <input
              type="text"
              className="w-full bg-white rounded-lg p-2"
              placeholder={loadingAny ? "Loading…" : "Filter submissions…"}
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
