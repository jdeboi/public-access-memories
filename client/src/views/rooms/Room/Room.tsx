import React from 'react';
import { RoomConfig } from '../RoomConfig';
import { useParams } from "react-router-dom";

const Room = () => {

    const getRoom = (id: string | undefined) => {
        let roomID = 0;
        if (id) roomID = parseInt(id);
        if (isNaN(roomID)) roomID = 0;
        if (roomID >= RoomConfig.length || roomID < 0) roomID = 0;
        console.log(id, roomID)
        const room = RoomConfig[roomID];
        return room;
    }

    const { id } = useParams();
    const room = getRoom(id);

    return (
        <div className="Room">
            <h1>{room.roomName}</h1>
        </div>
    )
};

export default Room;