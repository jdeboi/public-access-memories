import React from 'react';
import './RoomDecal.css';

import { useLocation } from 'react-router';

// pages & rooms
import { getRoomByPath, getRoomCount } from '../../helpers/helpers';

// components
import ReactTooltip from 'react-tooltip';
import CenterModal from '../CenterModal/CenterModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectWindow } from '../../store/store';
import { startComposition } from '../../store/window';

// interface
import { IUsers } from '../../interfaces/index';

interface IRoomDecal {
    hasLoadedRoom: boolean,
    users: IUsers,
    startMedia: () => void,
}

const RoomDecal = (props: IRoomDecal) => {
    const dispatch = useDispatch();
    const windowUI = useSelector(selectWindow);
    const user = useSelector(selectUser);
    const { pathname } = useLocation();
    const room = getRoomByPath(pathname)


    const getParticipantsBox = () => {
        if (windowUI.hasFooter && windowUI.orientation === "landscape")
            return null;
        return (
            <div className="participants-box">
                <br />
                <br />
                <div className="usersEye">
                    <FontAwesomeIcon icon={faEye} />
                    {getRoomCount(user.room, props.users)}
                </div>
                <br />
                <br />
                <div className="participants">
                    <span
                        data-tip={"me"}
                    >
                        {user.avatar}

                    </span>
                    {/* {this.getFakeUsers()} */}
                    {getUsers()}

                </div>
                <ReactTooltip />
            </div>
        )

    }

    const getFakeUsers = () => {
        const users = [
            { avatar: "🤣", userName: "bob" },
            { avatar: "🎃", userName: "george" },
            { avatar: "🤢", userName: "hannah" },
            { avatar: "🤪", userName: "jdeboisblanc" },
            { avatar: "🥵", userName: "ok" },
            { avatar: "😎", userName: "ashley123" },
            { avatar: "🤣", userName: "bob" },
        ]
        return users.map((usr, i) => {
            return (
                <span
                    key={i}
                    data-tip={usr.userName}
                >
                    {usr.avatar}

                </span>
            )
        });

    }

    const getUsers = () => {
        return props.users.map((usr, i) => {
            if (usr.room !== user.room)
                return null;
            return (
                <span
                    key={i}
                    data-tip={usr.userName}
                >
                    {usr.avatar}

                </span>
            )
        })

        return <div></div>;

    }


    const getButtons = () => {
        return (
            <div className="center-buttons">
                <button className="standardButton primary" onClick={props.startMedia}>ok</button>
            </div>
        );

    }

    if (room) {
        const buttons = getButtons();
        const { title, description, medium, year } = room;

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
                            <p style={{ fontSize: 20, paddingBottom: 0, fontWeight: 900 }}>
                                <span className="">{title}</span>
                            </p>
                            <p style={{ fontSize: 12 }}>{year}</p>
                            <p style={{ fontSize: 12 }}>{medium}</p>
                            <p style={{ fontSize: 12 }}>{description}</p>
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
