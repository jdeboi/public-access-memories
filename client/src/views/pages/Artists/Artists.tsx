import React from 'react';
import '../Page.css';
import './Artists.css';

import { artists } from '../../../data/RoomConfig';
import { IArtist } from '../../../interfaces';
// import { getArtistRoomLink } from '../../../helpers/helpers';


export const Artists = () => {

    function getArtistListing(artist: IArtist, index: number) {
        return (
            <div key={index} className="artist-box">
                <a href={`/artist/${index}`}><img className="thumb" src={`s3://jdeboi-public/public_access_memories/home_body/thumbs/${artist.thumb}.png`} /></a>
                <div>
                {/* <a href={getArtistRoomLink(index + '')}>🚪</a>  */}
                    <div><a href={`/artist/${index}`}>{artist.name}</a></div>
                    {/* <div className="door"><a href={`/homebody/rooms/${artist.id}`}>🚪</a></div>
                    <div>🌎</div> */}
                </div>
            </div>
        )
    }

    return (
        <div className="Artists Page">
            <div className="container">
                <h1>Artists</h1>
                <div className="artists-list">
                    {artists.map((artist, i) => {
                        return getArtistListing(artist, i);
                    })}
                </div>
            </div>
        </div>
    )
};

export default Artists;