import React from 'react';
import { rooms } from '../../../data/RoomConfig';
import { useParams } from "react-router-dom";
import './Room.css';

const Room = () => {

    // const getRoom = (id: string | undefined) => {
    //     let roomID = 0;
    //     if (id) {
    //         let rid = id.substring(4, id.length);
    //         roomID = parseInt(rid);
    //     }

    //     if (isNaN(roomID))
    //         roomID = 0;
    //     if (roomID >= rooms.length || roomID < 0) roomID = 0;
    //     console.log(id, roomID)
    //     const room = rooms[roomID];
    //     return room;
    // }

    // const { id } = useParams();
    // const room = getRoom(id);

    return (
        <div className="Room Sketch">
            <div className='container'>
                <h1>Room under construction</h1>
                <h3>Please check back later.</h3>
            </div>
        </div>
    )
};

export default Room;