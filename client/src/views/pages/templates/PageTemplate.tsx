// PAMPageTemplate.tsx
import React from "react";
import PageFooter from "./PageFooter";

type PageTemplateProps = {
  title?: string;
  intro?: React.ReactNode;

  /** Solid color, e.g. '#0b0b0b' or 'rgb(0 0 0 / 0.9)' */
  background?: string;

  /** Full CSS background-image string (e.g., 'linear-gradient(...)' or 'url(...)') */
  backgroundImage?: string;

  /**
   * Tailwind background classes. If provided, we won't set inline background styles.
   * Example: "bg-gradient-to-b from-[#5b43cd] to-[#0da6ff]"
   */
  bgClassName?: string;

  /** Container width class */
  maxWidthClass?: string;

  /** Extra classes for the outer wrapper */
  className?: string;

  children: React.ReactNode;
};

const DEFAULT_GRADIENT = "linear-gradient(to bottom, #5b43cd, #0da6ff)";

const PageTemplate: React.FC<PageTemplateProps> = ({
  title = "",
  intro = "",
  background,
  backgroundImage,
  bgClassName,
  maxWidthClass = "max-w-4xl",
  className = "",
  children,
}) => {
  // Decide how to paint the background:
  // - If bgClassName is provided, rely on Tailwind classes (no inline styles)
  // - Else prefer `background` (solid color)
  // - Else prefer `backgroundImage`
  // - Else fall back to default gradient
  const style: React.CSSProperties | undefined = bgClassName
    ? undefined
    : background
    ? { background }
    : { backgroundImage: backgroundImage ?? DEFAULT_GRADIENT };

  return (
    <div
      className={`min-h-screen overflow-y-auto flex flex-col items-center px-4 py-12 text-white ${
        bgClassName ?? ""
      } ${className ?? ""}`}
      style={style}
    >
      <div className={`${maxWidthClass} w-full mb-10 flex flex-1 flex-col`}>
        {title && (
          <h1 className="text-4xl font-bold mb-10 [font-family:'manoloFont']">
            {title}
          </h1>
        )}
        {intro && (
          <div className="mb-8 leading-relaxed text-white/90">{intro}</div>
        )}
        <main className="flex flex-col gap-6">{children}</main>
      </div>
      <PageFooter />
    </div>
  );
};

export default PageTemplate;
