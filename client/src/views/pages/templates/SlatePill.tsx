export default function SlatePill({ text }: { text: string }) {
  return (
    <span className="text-sm uppercase tracking-wide leading-none rounded-full border border-slate-800 bg-slate-900/60 text-slate-100 px-2 py-0.5 font-mono">
      {text}
    </span>
  );
}
