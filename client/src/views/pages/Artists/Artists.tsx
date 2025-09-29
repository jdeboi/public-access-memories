// pages/Artists/Artists.tsx
import React from "react";
import { Link } from "react-router-dom";

import PageTemplate from "../templates/PageTemplate";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import { artists } from "../../../data/CurrentShow/RoomConfig";
import ClosedPage from "../ClosedPage/ClosedPage";

export const Artists: React.FC = () => {
  const getFileName = (thumb: string): string =>
    /\.[^/.]+$/.test(thumb) ? thumb : `${thumb}.png`;

  const getThumbSrc = (thumb: string): string =>
    `https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/${
      ShowConfig.awsLink
    }/thumbs/${getFileName(thumb)}`;

  const title = ShowConfig.isResidency ? "Artists in Residence" : "Artists";
  const list = ShowConfig.isResidency
    ? artists.filter((a) => a.userName !== "hostBot")
    : artists;

  return (
    <>
      {ShowConfig.isClosed || ShowConfig.underConstruction ? (
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
                className="windows max-w-[200px] p-2 text-center"
              >
                <Link
                  to={`/artist/${artist.nameLink}`}
                  aria-label={artist.name}
                  className="group block"
                >
                  <img
                    // src={getThumbSrc(artist.thumb)}
                    src={`https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/thumbs/lizz-thumb.png`}
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
