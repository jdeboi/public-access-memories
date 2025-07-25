import React from "react";
import { rooms } from "../../../data/CurrentShow/RoomConfig";
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
const { isClosed } = ShowConfig;

const Room = () => {
  const getRoom = (id: string | undefined) => {
    let roomID = 0;
    if (id) {
      let rid = id.substring(4, id.length);
      roomID = parseInt(rid);
    }

    if (isNaN(roomID)) roomID = 0;
    if (roomID >= rooms.length || roomID < 0) roomID = 0;
    const room = rooms[roomID];
    return room;
  };

  const { id } = useParams();
  const room = getRoom(id);

  const roomUnderConstruction = () => {
    return (
      <div className="Room Sketch">
        <div className="containerOG">
          <h1>Room under construction</h1>
          <h3>Please check back later.</h3>
        </div>
      </div>
    );
  };

  const roomClosed = () => {
    return (
      <div className="Room Sketch">
        <div className="containerOG" style={{ flex: "unset" }}>
          <h1>Gallery Closed</h1>
          {!ShowConfig.isResidency && <h2>Please join us for the opening!</h2>}
          {ShowConfig.isResidency && (
            <h2>Please join us for residency open studios!</h2>
          )}

          <h3>{ShowConfig.showOpens.date}</h3>
          {ShowConfig.showOpens.time !== "" ? (
            <h4>{ShowConfig.showOpens.time}</h4>
          ) : null}
        </div>
      </div>
    );
  };

  if (isClosed) {
    return roomClosed();
  }

  switch (id) {
    case "0":
      return <R_00 />;
    case "1":
      return <R_01 />;
    case "2":
      return <R_02 />;
    case "3":
      return <R_03 />;
    case "4":
      return <R_04 />;
    case "5":
      return <R_05 />;
    case "6":
      return <R_06 />;
    case "7":
      return <R_07 />;
    case "8":
      return <R_08 />;
    case "9":
      return <R_09 />;
    case "10":
      return <R_10 />;
    case "11":
      return <R_11 />;
    case "12":
      return <R_12 />;
    case "13":
      return <R_13 />;
    default:
      return <R_00 />;
  }

  // return roomClosed()
};

export default Room;
