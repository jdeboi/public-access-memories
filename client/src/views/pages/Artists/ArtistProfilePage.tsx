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
  getThumbSrc,
  normalizeBlueSky,
  normalizeInsta,
} from "../../../helpers/helpers";
import { artists, rooms } from "../../../data/CurrentShow/RoomConfig";
import SectionHeader from "../templates/SectionHeader";
import WindowsHeaderBox from "../templates/WindowsHeaderBox";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import CustomPill from "../templates/CustomPill";

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
    <PageTemplate title={artist.name}>
      <WindowsHeaderBox
        title={artist.name}
        thumbnail={getThumbSrc(artist.thumb, ShowConfig.awsLink)}
        link={room?.link || undefined}
      >
        {room?.link && (
          <a
            className="text-4xl underline transition-opacity hover:opacity-80"
            href={room.link}
          >
            {artist.title ?? "Enter"}
          </a>
        )}

        <div className="mt-4">
          <CustomPill text={artist.year.toString() || "N/A"} size="md" />
        </div>
        <div className="mt-4">medium:</div>
        <div className="font-mono">{artist.medium}</div>

        <div className="mt-6 flex items-center gap-2">
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
        </div>
      </WindowsHeaderBox>

      {/* Main content (was .info) */}
      <section className="prose prose-invert max-w-none prose-p:leading-relaxed font-mono">
        {artist.description && (
          <>
            <SectionHeader title="About the work" />
            <p>{artist.description}</p>
          </>
        )}
        {artist.statement && (
          <>
            <SectionHeader title="Statement" />
            <p>{artist.statement}</p>
          </>
        )}
        {artist.bio && (
          <>
            <SectionHeader title="Bio" />
            <p>{artist.bio}</p>
          </>
        )}
      </section>
    </PageTemplate>
  );
});

export default ArtistProfilePage;
