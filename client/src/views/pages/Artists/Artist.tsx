import { faInstagram, faInternetExplorer } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getArtistFromNameLink, getRoomFromArtistRoomID } from '../../../helpers/helpers';
import '../Page.css';
import './Artist.css';

export const Artist = () => {
    const { name } = useParams();
    const artist = getArtistFromNameLink(name);
    const room = getRoomFromArtistRoomID(artist.roomID);


    const Insta = () => {
        if (artist.instaLink) {
            return (<a href={artist.instaLink}><FontAwesomeIcon icon={faInstagram} /></a>)
        }
        return null;
    }

    const Web = () => {
        if (artist.webLink) {
            return (<a href={artist.webLink}><FontAwesomeIcon icon={faInternetExplorer} /></a>)
        }
        return null;
    }

    return (
        <div className="Artist Page">
            <div className="container">
                <h1 className="">{artist.name}</h1>
               <br />
                {/* <img width={200} height={200} className="thumb" src={`https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/thumbs/${artist.thumb}.png`} /> */}
                <div className="door"><a className="windows" href={room.link}>🚪 {artist.title}</a></div>
                <hr/>
                <div className="info">
                    <h3>Statement</h3>
                    <p>{artist.description}</p>
                    <h3>Bio</h3>
                    <p>{artist.bio}</p>
                </div>
                <br />
                <hr/>
                
                <p className="links"><Insta /> <Web /></p>
            </div>
        </div>
    )
};

export default Artist;