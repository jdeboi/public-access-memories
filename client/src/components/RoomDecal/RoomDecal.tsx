import React from "react";
import "./RoomDecal.css";

import { useLocation } from "react-router";

// pages & rooms
import { getRoomByPath } from "../../helpers/helpers";

// components
// import ReactTooltip from 'react-tooltip';
import CenterModal from "../CenterModal/CenterModal";

// interface
// import { artists } from '../../data/RoomConfig';
import { IRoom, IArtist } from "../../interfaces";
import CustomPill from "../../views/pages/templates/CustomPill";

interface IRoomDecal {
  hasLoadedRoom: boolean;
  rooms: IRoom[];
  artists: IArtist[];
  // users: IUsers,
  startMedia: () => void;
}

const RoomDecal = (props: IRoomDecal) => {
  const { pathname } = useLocation();
  const room = getRoomByPath(pathname, props.rooms);
  const artist = room ? props.artists[room.artistID] : props.artists[0];

  const getButtons = () => {
    return (
      <div className="center-buttons">
        <button className="standardButton primary" onClick={props.startMedia}>
          ok
        </button>
      </div>
    );
  };

  if (room) {
    const buttons = getButtons();
    const { title, medium, year, name, nameLink } = artist;
    return (
      <CenterModal
        title={""}
        isHidden={props.hasLoadedRoom}
        onHide={props.startMedia}
        z={2500}
        // height={300}
        // width={400}
        isRelative={false}
        classN="RoomDecal"
        content={
          <div className="decal-content">
            <div className="identify">
              <div className="text-4xl  font-[manoloFont] mb-8">
                <a
                  className="underline transition-opacity hover:opacity-80 "
                  href={`/artist/${nameLink}`}
                  style={{ color: "blue" }}
                >
                  {name}
                </a>
              </div>
              <div className="text-3xl italic mb-2 ">{title}</div>
              <div className="mb-2 text-lg">
                <CustomPill
                  text={year.toString()}
                  variant="outline"
                  size="lg"
                />
              </div>
              <div className="font-mono">{medium}</div>
            </div>
          </div>
        }
        buttons={buttons}
      />
    );
  }

  return null;
};

export default RoomDecal;
