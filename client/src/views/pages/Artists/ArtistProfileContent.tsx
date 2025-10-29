import SectionHeader from "../templates/SectionHeader";
import WindowsHeaderBox from "../templates/WindowsHeaderBox";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import CustomPill from "../templates/CustomPill";
import { IArtist, IRoom } from "../../../interfaces";
import {
  getArtistFromNameLink,
  getRoomFromArtistRoomID,
  getThumbSrc,
} from "../../../helpers/helpers";
import { useMemo } from "react";
import ArtistSocials from "./ArtistSocials";

export default function ArtistProfileContent({
  artist,
  rooms,
}: {
  artist: IArtist;
  rooms: IRoom[];
}) {
  const room = useMemo(
    () => (artist ? getRoomFromArtistRoomID(artist.roomID, rooms) : null),
    [artist]
  );

  return (
    <>
      <WindowsHeaderBox
        title={artist.name}
        thumbnail={getThumbSrc(artist.thumb, ShowConfig.awsLink)}
        link={room?.link || undefined}
      >
        {room?.link && (
          <a
            className="text-4xl underline transition-opacity hover:opacity-80 text-[cyan]"
            href={room.link}
          >
            {artist.title ?? "Enter"}
          </a>
        )}

        <div className="mt-4">
          <CustomPill text={artist.year.toString() || "N/A"} size="md" />
        </div>
        <div className="mt-4 text-black">medium:</div>
        <div className="font-mono">{artist.medium}</div>

        <ArtistSocials artist={artist} />
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
    </>
  );
}
