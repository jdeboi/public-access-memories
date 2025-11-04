type PillVariant = "slate" | "outline";
type PillSize = "sm" | "md" | "lg";

export default function CustomPill({
  text,
  variant = "slate",
  size = "sm",
  className = "",
  bgHex,
  textHex,
  borderHex,
}: {
  text: string;
  variant?: PillVariant;
  size?: PillSize;
  className?: string;
  /** Optional custom background color (e.g. "#f2c6b4") */
  bgHex?: string;
  /** Optional custom text color (e.g. "#111827") */
  textHex?: string;
  /** Optional custom border color (defaults to a sensible value based on bg/text) */
  borderHex?: string;
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

  // If custom colors are provided, compute a style override
  const hasCustom = !!(bgHex || textHex || borderHex);

  // If only bgHex is provided, choose readable text (black/white)
  const computedText = textHex ?? (bgHex ? pickTextColor(bgHex) : undefined);

  // Default border if not provided:
  // - outline: use text color
  // - otherwise: a slightly darker version of bg, or a neutral slate border
  const computedBorder =
    borderHex ??
    (variant === "outline"
      ? computedText ?? "#334155"
      : bgHex
      ? darken(bgHex, 0.2)
      : "#334155");

  const style = hasCustom
    ? ({
        backgroundColor: variant === "outline" ? "transparent" : bgHex,
        color: computedText,
        borderColor: computedBorder,
      } as React.CSSProperties)
    : undefined;

  return (
    <span
      className={[
        "inline-flex items-center uppercase tracking-wide leading-none rounded-full font-[geoFont]",
        "border", // keep border width; color comes from class or style
        sizes[size],
        hasCustom ? "" : variants[variant],
        className,
      ].join(" ")}
      style={style}
    >
      {text}
    </span>
  );
}

/* ---------- helpers ---------- */

// Pick black or white depending on background luminance
function pickTextColor(bgHex: string): string {
  const { r, g, b } = hexToRgb(bgHex);
  // relative luminance
  const [R, G, B] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  return L > 0.53 ? "#111111" : "#FFFFFF"; // tweak threshold to taste
}

function hexToRgb(hex: string) {
  let h = hex.replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function toHex(n: number) {
  return n.toString(16).padStart(2, "0");
}

// Darken a hex color by factor (0..1)
function darken(hex: string, factor = 0.2) {
  const { r, g, b } = hexToRgb(hex);
  const d = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v * (1 - factor))));
  return `#${toHex(d(r))}${toHex(d(g))}${toHex(d(b))}`;
}
