type PillVariant = "slate" | "outline";
type PillSize = "sm" | "md" | "lg";

export default function CustomPill({
  text,
  variant = "slate",
  size = "sm",
  className = "",
}: {
  text: string;
  variant?: PillVariant;
  size?: PillSize;
  className?: string;
}) {
  const sizes: Record<PillSize, string> = {
    sm: "text-sm px-1.5 py-0.5 h-5",
    md: "text-lg px-2 py-0.5 h-6",
    lg: "text-xl px-3 py-1 h-7",
  };

  const variants: Record<PillVariant, string> = {
    slate: "border border-slate-800 bg-slate-900/70 text-slate-100",
    outline: "border border-slate-800 bg-transparent text-slate-800",
  };

  return (
    <span
      className={[
        "inline-flex items-center uppercase tracking-wide leading-none rounded-full font-[geoFont]",
        sizes[size],
        variants[variant],
        className,
      ].join(" ")}
    >
      {text}
    </span>
  );
}
