import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

type IconLinkProps = { href?: string | null; icon: any; label: string };
const IconLink = React.memo(({ href, icon, label }: IconLinkProps) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="transition-opacity hover:opacity-80 text-[200%]"
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
});

export default IconLink;
