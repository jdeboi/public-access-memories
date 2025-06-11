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
      <ul className="space-y-2">
        {entries.map(([date, note], i) => (
          <li key={i}>
            <span className="font-bold text-red-600 block">{date} </span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ✅ Pull just the relevant section from README
function extractPamLog(md: string): string {
  const match = md.match(
    /## Public Access Memories Log.*?((?:\*\*.*?\*\*.*\n?)+)/s
  );
  return match?.[1] ?? "";
}

// ✅ Split into [[date, note], ...]
function parseLogEntries(section: string): string[][] {
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
