import React from 'react';
import '../Page.css';
import './Artists.css';

import { ShowConfig } from '../../../data/CurrentShow/ShowConfig';
import { artists } from '../../../data/CurrentShow/RoomConfig';
import { IArtist } from '../../../interfaces';

import DetailsClosed from '../../../components/Welcome/components/DetailsClosed';
// import { getArtistRoomLink } from '../../../helpers/helpers';


export const Artists = () => {

    function getArtistListing(artist: IArtist, index: number) {
        return (
            <div key={index} className="artist-box windows">
                <a href={`/artist/${artist.nameLink}`}><img className="thumb" src={`https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/thumbs/${artist.thumb}.png`} /></a>
                <div className="artist-name">
                    {/* <a href={getArtistRoomLink(index + '')}>🚪</a>  */}
                    <div><a href={`/artist/${artist.nameLink}`}>{artist.name}</a></div>
                    {/* <div className="door"><a href={`/homebody/rooms/${artist.id}`}>🚪</a></div>
                    <div>🌎</div> */}
                </div>
            </div>
        )
    }

    function underConstruction() {
        return (
            <div className="artist-box windows">
                <h2>Gallery Closed</h2>
                <p>Please join us for the opening!</p>
                <h3>{ShowConfig.showOpens.date}</h3>
                {ShowConfig.showOpens.time !== "" ? <h5>{ShowConfig.showOpens.time}</h5> : null}
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

                {ShowConfig.underConstruction ? underConstruction() :
                    <div className="artists-list">
                        {artists.map((artist, i) => {
                            return getArtistListing(artist, i);
                        })}
                    </div>
                }
            </div>
        </div>
    )
};

export default Artists;