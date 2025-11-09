// pages/Artists/Artists.tsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import PageTemplate from "../templates/PageTemplate";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import { artists, rooms } from "../../../data/CurrentShow/RoomConfig";
import ClosedPage from "../ClosedPage/ClosedPage";
import { getRoomFromArtistRoomID, getThumbSrc } from "../../../helpers/helpers";

export const Artists: React.FC = () => {
  const title = ShowConfig.isResidency ? "Artists in Residence" : "Artists";
  const list = ShowConfig.isResidency
    ? artists.filter((a) => a.userName !== "hostBot")
    : artists;

  const isProduction = process.env.NODE_ENV === "production";

  return (
    <>
      {isProduction && (ShowConfig.isClosed || ShowConfig.underConstruction) ? (
        <ClosedPage />
      ) : (
        <PageTemplate title={title}>
          <div
            // replaces .artists-list (flex row, wrap, 20px gaps)
            className="flex flex-row flex-wrap gap-[20px]"
          >
            {list.map((artist) => (
              <div
                key={artist.nameLink}
                className="windows max-w-[200px] p-0.5 text-center"
              >
                <Link
                  // to={`/artist/${artist.nameLink}`}
                  to={
                    getRoomFromArtistRoomID(artist.roomID, rooms)?.link || "#"
                  }
                  aria-label={artist.name}
                  className="group block  text-[cyan] hover:underline"
                >
                  <img
                    src={getThumbSrc(artist.thumb, ShowConfig.awsLink)}
                    // src={`https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/thumbs/lizz-thumb.png`}
                    alt={`${artist.name} thumbnail`}
                    loading="lazy"
                    className="w-[200px] h-[200px] object-cover"
                  />
                  <div className="mt-2 text-base font-medium group-hover:underline">
                    {artist.name}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </PageTemplate>
      )}
    </>
  );
};

export default Artists;
