import React from "react";
import "../Page.css";
import "./Artists.css";

import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import { artists } from "../../../data/CurrentShow/RoomConfig";
import { IArtist } from "../../../interfaces";

export const Artists = () => {
  const getFileName = (thumb: string): string =>
    thumb.match(/\.[^/.]+$/) ? thumb : `${thumb}.png`;

  const getArtistListing = (artist: IArtist, index: number) => (
    <div key={index} className="artist-box windows">
      <a href={`/artist/${artist.nameLink}`}>
        <img
          className="thumb"
          src={`https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/${
            ShowConfig.awsLink
          }/thumbs/${getFileName(artist.thumb)}`}
        />
      </a>
      <div className="artist-name">
        <div>
          <a href={`/artist/${artist.nameLink}`}>{artist.name}</a>
        </div>
      </div>
    </div>
  );

  const underConstruction = () => (
    <div className="artist-box windows">
      <h2>Gallery Closed</h2>
      <p>Please join us for the opening!</p>
      <h3>{ShowConfig.showOpens.date}</h3>
      {ShowConfig.showOpens.time && <h5>{ShowConfig.showOpens.time}</h5>}
    </div>
  );

  return (
    <div className="Artists Page">
      <div className="container">
        <h1>{ShowConfig.isResidency ? "Artists in Residenc" : "Artists"}</h1>
        <br />
        <br />
        <br />
        <br />

        {ShowConfig.underConstruction ? (
          underConstruction()
        ) : (
          <div className="artists-list">
            {(ShowConfig.isResidency
              ? artists.filter((artist) => artist.userName !== "hostBot")
              : artists
            ).map(getArtistListing)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Artists;
