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

import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import ClosedPage from "../../pages/ClosedPage/ClosedPage";
import { useState } from "react";
import Frame from "../../../components/Frame/Frame";
const { isClosed, underConstruction } = ShowConfig;

const ROOMS: Record<string, React.ComponentType> = {
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

const Room = () => {
  const { id = "0" } = useParams();

  if (isClosed || underConstruction) return <ClosedPage />;

  const RoomComp = ROOMS[id] ?? R_00;

  return (
    <>
      <RoomComp />
    </>
  );
};

export default Room;
