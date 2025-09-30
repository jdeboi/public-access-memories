// pages/Artist/Artist.tsx
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../templates/PageTemplate"; // <- your existing template

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faBluesky,
  faInternetExplorer,
} from "@fortawesome/free-brands-svg-icons";

import {
  getArtistFromNameLink,
  getRoomFromArtistRoomID,
  normalizeBlueSky,
  normalizeInsta,
} from "../../../helpers/helpers";
import { artists, rooms } from "../../../data/CurrentShow/RoomConfig";

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

export const ArtistProfilePage: React.FC = React.memo(function Artist() {
  const { name } = useParams();
  const artist = useMemo(() => getArtistFromNameLink(name, artists), [name]);
  const room = useMemo(
    () => (artist ? getRoomFromArtistRoomID(artist.roomID, rooms) : null),
    [artist]
  );

  if (!artist) {
    return (
      <PageTemplate title="Artist not found">
        <p className="text-white/90">We couldn’t locate that profile.</p>
      </PageTemplate>
    );
  }

  const socials = {
    instagram: normalizeInsta(artist.instaLink),
    bluesky: normalizeBlueSky(artist.blueSkyLink),
    website: artist.webLink || null,
  };

  return (
    <PageTemplate
      title={artist.name}
      intro={
        <>
          {room?.link && (
            <div className="windows text-[150%] p-5 door">
              <a className="" href={room.link}>
                🚪 {artist.title ?? "Enter"}
              </a>
            </div>
          )}
        </>
      }
    >
      {/* Main content (was .info) */}
      <section className="prose prose-invert max-w-none prose-p:leading-relaxed">
        {artist.description && (
          <>
            <h3>About the Work</h3>
            <p>{artist.description}</p>
          </>
        )}
        {artist.statement && (
          <>
            <h3>Statement</h3>
            <p>{artist.statement}</p>
          </>
        )}
        {artist.bio && (
          <>
            <h3>Bio</h3>
            <p>{artist.bio}</p>
          </>
        )}
      </section>

      {/* Divider + Socials */}
      <p className="mt-2 flex items-center gap-2">
        <IconLink
          href={socials.instagram ?? undefined}
          icon={faInstagram}
          label="Instagram"
        />
        <IconLink
          href={socials.bluesky ?? undefined}
          icon={faBluesky}
          label="Bluesky"
        />
        <IconLink
          href={socials.website ?? undefined}
          icon={faInternetExplorer}
          label="Website"
        />
      </p>
    </PageTemplate>
  );
});

export default ArtistProfilePage;
