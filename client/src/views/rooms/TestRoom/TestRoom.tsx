import React from 'react';
import { rooms } from '../../../data/RoomConfig';
import { useParams } from "react-router-dom";
import '../Room/Room.css';

import R_00 from '../R_00/Room';
import R_01 from '../R_01/R_01';
import R_02 from '../R_02/R_02';
import R_03 from '../R_03/R_03';
import R_04 from '../R_04/R_04';
import R_05 from '../R_05/Room';
import R_06 from '../R_06/R_06';
import R_07 from '../R_07/R_07';
import R_08 from '../R_08/R_08';
import R_09 from '../R_09/R_09';

import { ShowConfig } from '../../../data/ShowConfig';
const { isClosed } = ShowConfig;


const TestRoom = () => {

    const getRoom = (id: string | undefined) => {
        let roomID = 0;
        if (id) {
            let rid = id.substring(4, id.length);
            roomID = parseInt(rid);
        }

        if (isNaN(roomID))
            roomID = 0;
        if (roomID >= rooms.length || roomID < 0) roomID = 0;
        const room = rooms[roomID];
        return room;
    }

    const { id } = useParams();
    const room = getRoom(id);

    

     switch (id) {
        case '0':
            return <R_00 />
        case '1':
            return <R_01 />
        case '2':
            return <R_02 />
        case '3':
            return <R_03 />
        case '4':
            return <R_04 />
        case '5':
            return <R_05 />
        case '6':
            return <R_06 />
        case '7':
            return <R_07 />
        case '8':
            return <R_08 />
        case '9':
            return <R_09 />
        default:
            return <R_00 />
    }



};

export default TestRoom;