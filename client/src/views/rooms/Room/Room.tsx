import { useParams } from "react-router-dom";
import "./Room.css";

import R_00 from "../R_00/Room";
import R_01 from "../R_01/Room";
import R_02 from "../R_02/Room";
import R_03 from "../R_03/Room";
import R_04 from "../R_04/Room";
import R_05 from "../R_05/Room";
import R_06 from "../R_06/Room";
import R_07 from "../R_07/Room";
import R_08 from "../R_08/Room";
import R_09 from "../R_09/Room";
import R_10 from "../R_10/Room";
import R_11 from "../R_11/Room";
import R_12 from "../R_12/Room";
import R_13 from "../R_13/Room";
import UnderConstructionRoom from "../Templates/UnderConstructionRoom";
import IframeRoom from "../Templates/IframeRoom";

import { DevMatchProd, ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import ClosedPage from "../../pages/ClosedPage/ClosedPage";

import { rooms, artists } from "../../../data/CurrentShow/RoomConfig";
import {
  rooms as deboxRooms,
  artists as deboxArtists,
} from "../../../data/Shows/Debox/RoomConfig";
import ArtistMenu from "../../../components/ArtistMenu/ArtistMenu";
import { useState } from "react";

const { isClosed } = ShowConfig;

const DEBOX_ROOMS: Record<string, React.ComponentType> = {
  "0": R_00,
  "1": R_01,
  "2": R_02,
  "3": R_03,
  "4": R_04,
  "5": R_05,
  "6": R_06,
  "7": R_07,
  "8": R_08,
  "9": R_09,
  "10": R_10,
  "11": R_11,
  "12": R_12,
  "13": R_13,
};

// Residency 2026 studios: swap in each resident's room as work goes up
const RESIDENCY2026_ROOMS: Record<string, React.ComponentType> = {
  "0": () => (
    <IframeRoom
      src="https://mollyebendell.com/psychoemesis-blog"
      title="Mollye Bendell — Psychoemesis"
    />
  ),
  "1": () => (
    <IframeRoom
      src="https://jlsgangwisch.github.io/2026_PublicAccessMemory_Studio_JLS/"
      title="JLS Gangwisch — Studio"
    />
  ),
  "2": () => (
    <IframeRoom
      src="https://docs.google.com/document/d/1E5lXNYKBRnMwBFJk2A8RCeAxEJJCOhkuttNUXRTrqR8/preview?tab=t.8mem5nl3ka9w"
      title="Echo Time: Railing Against the Image"
    />
  ),
  "3": UnderConstructionRoom,
  "4": () => (
    <IframeRoom
      src="https://portal8.vercel.app"
      title="Uzoma Orji — Portal"
    />
  ),
  "5": () => (
    <IframeRoom
      src="https://dougrosman.com/runoff/"
      title="Doug Rosman — Runoff"
    />
  ),
};

const ROOMS = ShowConfig.isResidency ? RESIDENCY2026_ROOMS : DEBOX_ROOMS;

const Room = ({
  isTest = false,
  isDeboxArchive = false,
}: {
  isTest?: boolean;
  isDeboxArchive?: boolean;
}) => {
  const { id = "0" } = useParams();
  const showRooms = isDeboxArchive ? deboxRooms : rooms;
  const showArtists = isDeboxArchive ? deboxArtists : artists;
  const roomComps = isDeboxArchive ? DEBOX_ROOMS : ROOMS;
  const artistID = showRooms[parseInt(id)]?.artistID ?? null;
  const artist = artistID !== null ? showArtists[artistID] : null;
  const isProduction = process.env.NODE_ENV === "production";

  if (
    !isTest &&
    !isDeboxArchive &&
    (isProduction || DevMatchProd) &&
    isClosed
  ) {
    return <ClosedPage />;
  }

  const RoomComp = roomComps[id] ?? UnderConstructionRoom;

  const variant =
    roomComps === DEBOX_ROOMS && ["2", "3"].includes(id) ? "light" : "dark";

  return (
    <>
      <RoomComp />
      <ArtistMenu artist={artist} variant={variant} />
    </>
  );
};

export default Room;
