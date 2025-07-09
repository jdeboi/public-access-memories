import { useEffect, useState } from "react";

export default function ReadMeViewer({ url }: { url: string }) {
  const [entries, setEntries] = useState<string[][]>([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        const logSection = extractPamLog(text);
        const parsedEntries = parseLogEntries(logSection);
        setEntries(parsedEntries);
      });
  }, []);

  return (
    <div className="pam-log">
      <h2 className="text-xl font-bold mb-4">Artist Log (June 2025)</h2>
      <ul className="space-y-2" style={{ marginTop: "20px", fontSize: "18px" }}>
        {entries.map(([date, note], i) => (
          <li key={i} style={{ marginTop: "10px" }}>
            <span className="font-bold text-red-600 block">{date} </span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ✅ Pull just the relevant section from README
function extractPamLogMD(md: string): string {
  const match = md.match(
    /## Public Access Memories Log.*?((?:\*\*.*?\*\*.*\n?)+)/s
  );
  return match?.[1] ?? "";
}

// ✅ Split into [[date, note], ...]
function parseLogEntriesMD(section: string): string[][] {
  const entryRegex = /\*\*(.*?)\*\*\s*(.*)/g;
  const matches: string[][] = [];

  let match;
  while ((match = entryRegex.exec(section)) !== null) {
    const date = match[1].trim();
    const note = match[2].trim();
    matches.push([date, note]);
  }

  return matches;
}

function parseLogEntries(section: string): string[][] {
  const lines = section.split(/\r?\n/);
  const entries: string[][] = [];

  let currentDate = "";
  let currentNote = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^\*\d/.test(trimmed)) {
      // Save previous entry
      if (currentDate && currentNote.length > 0) {
        entries.push([currentDate, currentNote.join(" ")]);
      }

      // Start new entry
      currentDate = trimmed.replace(/\*/g, "").trim();
      currentNote = [];
    } else if (trimmed) {
      currentNote.push(trimmed);
    }
  }

  // Push the final entry
  if (currentDate && currentNote.length > 0) {
    entries.push([currentDate, currentNote.join(" ")]);
  }

  return entries;
}
function extractPamLog(text: string): string {
  const start = text.indexOf("Public Access Memories Log");
  if (start === -1) return text;
  return text.slice(start);
}
