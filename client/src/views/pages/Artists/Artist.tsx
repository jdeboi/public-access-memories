import {
  faInstagram,
  faInternetExplorer,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams } from "react-router-dom";
import {
  getArtistFromNameLink,
  getRoomFromArtistRoomID,
} from "../../../helpers/helpers";
import "../Page.css";
import "./Artist.css";
import { artists, rooms } from "../../../data/CurrentShow/RoomConfig";

export const Artist = () => {
  const { name } = useParams();
  const artist = getArtistFromNameLink(name, artists);
  const room = getRoomFromArtistRoomID(artist.roomID, rooms);

  const Insta = () => {
    if (artist.instaLink) {
      return (
        <a href={artist.instaLink} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      );
    }
    return null;
  };

  const Web = () => {
    if (artist.webLink) {
      return (
        <a href={artist.webLink} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInternetExplorer} />
        </a>
      );
    }
    return null;
  };

  return (
    <div className="Artist Page">
      <div className="container">
        <h1 className="">{artist.name}</h1>
        <br />
        <div className="door">
          <a className="windows" href={room.link}>
            🚪 {artist.title}
          </a>
        </div>
        <hr />
        <div className="info">
          {artist.description && (
            <>
              <h3>Statement</h3>
              <p>{artist.description}</p>
            </>
          )}
          {artist.bio && (
            <>
              <h3>Bio</h3>
              <p>{artist.bio}</p>
            </>
          )}
        </div>
        <br />
        <hr />

        <p className="links">
          <Insta /> <Web />
        </p>
      </div>
    </div>
  );
};

export default Artist;
