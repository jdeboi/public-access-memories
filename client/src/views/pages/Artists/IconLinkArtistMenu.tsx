import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type IconTileProps = {
  icon: IconDefinition; // pass faIcon directly
  label: string;
  href?: string; // if provided -> <a>, else <button>
  onClick?: () => void;
  className?: string; // optional extra classes
  iconPx?: number; // optional override (defaults to 18)
};

const TILE =
  "inline-flex flex-col items-center justify-center gap-1.5 " +
  "min-w-[50px] min-h-[50px] px-3 py-2 rounded-lg " +
  " shadow-[0_2px_0_rgba(0,0,0,0.18)] " +
  "bg-white/30 text-black select-none " +
  "transition-transform duration-150 hover:bg-white/80 active:translate-y-px " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2";

const IconTile: React.FC<IconTileProps> = ({
  icon,
  label,
  href,
  onClick,
  className = "",
  iconPx = 24, // ← one default size; tweak if needed
}) => {
  if (!href && !onClick) return null;

  const content = (
    <>
      <FontAwesomeIcon icon={icon} style={{ fontSize: iconPx }} />
    </>
  );

  const cls = `${TILE} ${className}`;

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      aria-label={label}
      style={{ color: "black" }}
      title={label}
    >
      {content}
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={cls}
      aria-label={label}
      title={label}
    >
      {content}
    </button>
  );
};

export default React.memo(IconTile);
