import { useMemo } from "react";
import { rooms } from "../../data/CurrentShow/RoomConfig";
import { ShowConfig } from "../../data/CurrentShow/ShowConfig";
import { getRoomFromArtistRoomID, getThumbSrc } from "../../helpers/helpers";
import { IArtist } from "../../interfaces";
import ArtistSocials from "../../views/pages/Artists/ArtistSocials";
import CustomPill from "../../views/pages/templates/CustomPill";
import SectionHeader from "../../views/pages/templates/SectionHeader";
import WindowsHeaderBox from "../../views/pages/templates/WindowsHeaderBox";

export default function ArtistProfileMenu({ artist }: { artist: IArtist }) {
  const room = useMemo(
    () => (artist ? getRoomFromArtistRoomID(artist.roomID, rooms) : null),
    [artist]
  );

  return (
    <div>
      <div className="text-5xl font-['manoloFont'] mb-10">{artist.name}</div>
      <WindowsHeaderBox
        title={artist.name}
        thumbnail={getThumbSrc(artist.thumb, ShowConfig.awsLink)}
        className="mb-16"
        isBlack={true}
      >
        <div className="text-3xl">{artist.title}</div>

        <div className="mt-4">
          <CustomPill text={artist.year.toString() || "N/A"} size="md" />
        </div>
        <div className="mt-4 font-['consoleFont']">medium:</div>
        <div className="font-mono">{artist.medium}</div>

        <ArtistSocials artist={artist} />
      </WindowsHeaderBox>
      <section className="prose prose-invert max-w-none prose-p:leading-relaxed font-mono">
        {artist.description && (
          <div className="mb-18">
            <SectionHeader
              title="About the work"
              colorClass="text-black"
              className="mb-0"
            />
            {artist.description}
          </div>
        )}
        {artist.statement && (
          <div className="mb-18">
            <SectionHeader
              title="Statement"
              colorClass="text-black"
              className="mb-0"
            />
            {artist.statement}
          </div>
        )}
        {artist.bio && (
          <div className="mb-18">
            <SectionHeader
              title="Bio"
              colorClass="text-black"
              className="mb-0"
            />
            <div className="">{artist.bio}</div>
          </div>
        )}
      </section>
    </div>
  );
}
