import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faBluesky,
  faInternetExplorer,
} from "@fortawesome/free-brands-svg-icons";

import "../Page.css";
import "./Artist.css";

import {
  getArtistFromNameLink,
  getRoomFromArtistRoomID,
} from "../../../helpers/helpers";
import { artists, rooms } from "../../../data/CurrentShow/RoomConfig";

// --- helpers (pure, non-mutating) ---
const normalizeInsta = (val: string | null | undefined) => {
  if (!val) return null;
  let s = val.trim();
  if (!s.startsWith("http")) {
    s = s.replace(/^@|^\//, "");
    s = `https://www.instagram.com/${s}`;
  }
  return s;
};

const normalizeBlueSky = (val: string | null | undefined) => {
  if (!val) return null;
  let s = val.trim();
  if (!s.startsWith("http")) {
    s = s.replace(/^@|^\//, "");
    s = `https://bsky.app/profile/${s}`;
  }
  return s;
};

// generic icon link
type IconLinkProps = {
  href?: string | null;
  icon: any;
  label: string;
};

const IconLink = React.memo(function IconLink({
  href,
  icon,
  label,
}: IconLinkProps) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <FontAwesomeIcon icon={icon} />
    </a>
  );
});

export const Artist = React.memo(function Artist() {
  const { name } = useParams();

  const artist = useMemo(() => getArtistFromNameLink(name, artists), [name]);
  const room = useMemo(
    () => (artist ? getRoomFromArtistRoomID(artist.roomID, rooms) : null),
    [artist]
  );

  const { instaLink, blueSkyLink, webLink } = useMemo(() => {
    if (!artist) return { instaLink: null, blueSkyLink: null, webLink: null };
    return {
      instaLink: normalizeInsta(artist.instaLink),
      blueSkyLink: normalizeBlueSky(artist.blueSkyLink),
      webLink: artist.webLink || null,
    };
  }, [artist]);

  // basic guards
  if (!artist) {
    return (
      <div className="Artist Page">
        <div className="containerOG">
          <h1>Artist not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="Artist Page">
      <div className="containerOG">
        <h1>{artist.name}</h1>
        <br />
        {room?.link && (
          <div className="door">
            <a className="windows" href={room.link}>
              🚪 {artist.title}
            </a>
          </div>
        )}
        <hr />
        <div className="info">
          {artist.description && (
            <>
              <h3>Statement</h3>
              <p>{artist.description}</p>
            </>
          )}
          {artist.bio && (
            <>
              <h3>Bio</h3>
              <p>{artist.bio}</p>
            </>
          )}
        </div>
        <br />
        <hr />
        <p className="links">
          <IconLink href={instaLink} icon={faInstagram} label="Instagram" />
          <IconLink href={blueSkyLink} icon={faBluesky} label="Bluesky" />
          <IconLink href={webLink} icon={faInternetExplorer} label="Website" />
        </p>
      </div>
    </div>
  );
});

export default Artist;
