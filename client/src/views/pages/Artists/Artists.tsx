import React from 'react';
import '../Page.css';
import './Artists.css';

import { artists } from '../../../data/RoomConfig';
import { IArtist } from '../../../interfaces';
// import { getArtistRoomLink } from '../../../helpers/helpers';


export const Artists = () => {

    function getArtistListing(artist: IArtist, index: number) {
        return (
            <div key={index} className="artist-box windows">
                <a href={`/artist/${artist.nameLink}`}><img className="thumb" src={`https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/thumbs/${artist.thumb}.png`} /></a>
                <div className="artist-name">
                {/* <a href={getArtistRoomLink(index + '')}>🚪</a>  */}
                    <div><a href={`/artist/${artist.nameLink}`}>{artist.name}</a></div>
                    {/* <div className="door"><a href={`/homebody/rooms/${artist.id}`}>🚪</a></div>
                    <div>🌎</div> */}
                </div>
            </div>
        )
    }

    return (
        <div className="Artists Page">
            <div className="container">
                <h1 className="">Artists</h1>
                {/* <hr /> */}
                <br />
                <br />
                <br />
                <br />
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