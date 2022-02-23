import { faInstagram, faInternetExplorer } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getArtistFromID, getRoomFromID } from '../../../helpers/helpers';
import '../Page.css';
import './Artist.css';

export const Artist = () => {
    const { id } = useParams();
    // const room = getRoom(id);
    const artist = getArtistFromID(id);
    const room = getRoomFromID(id);

    const Insta = () => {
        if (artist.instaLink) {
            return(<a href={artist.instaLink}><FontAwesomeIcon icon={faInstagram} /></a>)
        }
        return null;
    }

    const Web = () => {
        if (artist.webLink) {
            return(<a href={artist.webLink}><FontAwesomeIcon icon={faInternetExplorer} /></a>)
        }
        return null;
    }
    
    return (
        <div className="Artist Page">
            <div className="container">
                <h1>{artist.name}</h1>
            
                <div className="door"><a href={room.link}>🚪 {artist.title}</a></div>
                <br />
                <br />
                <br />
                {/* <br /> */}
                <h3>Statement</h3>
                <p>{artist.description}</p>
                <h3>Bio</h3>
                <p>{artist.bio}</p>
                <br />
                <p className="links"><Insta /> <Web /></p>
            </div>
        </div>
    )
};

export default Artist;