import React from 'react';
import { rooms } from '../../../data/RoomConfig';
import { useParams } from "react-router-dom";

const Room = () => {

    const getRoom = (id: string | undefined) => {
        let roomID = 0;
        if (id) roomID = parseInt(id);
        if (isNaN(roomID)) roomID = 0;
        if (roomID >= rooms.length || roomID < 0) roomID = 0;
        console.log(id, roomID)
        const room = rooms[roomID];
        return room;
    }

    const { id } = useParams();
    const room = getRoom(id);

    return (
        <div className="Room">
            <h1>{room.title}</h1>
        </div>
    )
};

export default Room;