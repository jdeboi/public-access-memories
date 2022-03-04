import React from 'react';
import './RoomDecal.css';

import { useLocation } from 'react-router';

// pages & rooms
import { getRoomByPath } from '../../helpers/helpers';

// components
import ReactTooltip from 'react-tooltip';
import CenterModal from '../CenterModal/CenterModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector } from 'react-redux';
import { selectUser, selectWindow } from '../../store/store';

// interface
import { artists } from '../../data/RoomConfig';

interface IRoomDecal {
    hasLoadedRoom: boolean,
    // users: IUsers,
    startMedia: () => void,
}

const RoomDecal = (props: IRoomDecal) => {
    // const dispatch = useDispatch();
    const windowUI = useSelector(selectWindow);
    const user = useSelector(selectUser);
    const { pathname } = useLocation();
    const room = getRoomByPath(pathname);
    const artist =  room ? artists[room.artistID] : artists[0];


    const getButtons = () => {
        return (
            <div className="center-buttons">
                <button className="standardButton primary" onClick={props.startMedia}>ok</button>
            </div>
        );

    }


    const getArtistLink = (artistLink: string | undefined, artist: string) => {
        if (artistLink && artistLink !== "#" && artistLink !== "")
            return <div><a href={artistLink}>{artist}</a></div>;
        return <div>{artist}</div>;
    }

    if (room) {
        const buttons = getButtons();
        const { title, description, medium, year, name, nameLink } = artist;
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
                            <h2><a href={`/artist/${nameLink}`}>{name}</a></h2>
                            <br />
                            <div><span className="workTitle">{title}</span></div>
                            <div>{year}</div>
                            <div>{medium}</div>
                        </div>

                    </div>
                }
                buttons={buttons}
            />
        );
    }



    return null;



}


export default RoomDecal;
