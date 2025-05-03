import React from "react";
import "../Page.css";
import "../Artists/Artists.css";

import { artists } from "../../../data/CurrentShow/RoomConfig";
import { IArtist } from "../../../interfaces";

export const ArtistsList = () => {
  function getArtistListing(artist: IArtist, index: number) {
    return (
      <li key={index}>
        <a href={`/test/rooms/${artist.roomID}`}>{artist.name}</a>
      </li>
    );
  }

  return (
    <div className="Artists Page">
      <div className="container">
        <h1 className="">Artists</h1>
        <br />
        <ul>
          {artists.map((artist: IArtist, i: number) => {
            return getArtistListing(artist, i);
          })}
        </ul>
      </div>
    </div>
  );
};

export default ArtistsList;
