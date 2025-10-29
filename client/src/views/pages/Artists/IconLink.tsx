import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

type IconLinkProps = { href?: string | null; icon: any; label: string };
const IconLink = React.memo(({ href, icon, label }: IconLinkProps) => {
  if (!href) return null;

  return (
    <div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className="transition-opacity hover:opacity-80 mr-2 text-[cyan]"
      >
        <FontAwesomeIcon icon={icon} />{" "}
        <span className="font-['consoleFont']" style={{ color: "black" }}>
          {label}
        </span>
      </a>
    </div>
  );
});

export default IconLink;
