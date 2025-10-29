import { BrizQuadType } from "./briz";

export default function BrizContent({
  content,
}: {
  content: BrizQuadType | null;
}) {
  if (!content) return null;
  return (
    <>
      <div className="text-2xl font-bold font-[manoloFont] uppercase mb-2">
        {content.vector}
      </div>
      <div className="text-4xl font-bold mb-4">{content.label}</div>

      <div className="font-mono">{content.content}</div>

      {content.footnotes && content.footnotes.length > 0 && <div>---</div>}
      {content.footnotes && content.footnotes.length > 0 && (
        <div className="mt-4 space-y-4">
          {content.footnotes.map((fn, idx) => (
            <div key={idx}>{fn}</div>
          ))}
        </div>
      )}
    </>
  );
}
