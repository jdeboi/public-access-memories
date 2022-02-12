import React, { useEffect, useState } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../store/store';

import { getCenterModalDim } from '../../../components/CenterModal/helpers';

import './RoomNathan.css';

const Room = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();
    const [w, setW] = useState(getCenterModalDim(windowUI, false, 789, 789).w)

    useEffect(() => {
        setW(getCenterModalDim(windowUI, false, 789, 789).w)

    }, [windowUI.contentW, windowUI.contentH]);

    return (
        <div className="Room RoomNathan Sketch">
            <div className="NathanImages">
                <div className="responsive" >
                    <div id="spawnPoint1"  />
                </div>
                <div className="responsive" >
                    <div id="spawnPoint2" />
                </div>
                <div className="responsive" >
                    <div id="spawnPoint3"  />
                </div>
                {/* <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/Nathan/SpawnPoint2.png" />
            <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/Nathan/SpawnPoint3.png" /> */}
            </div>

        </div>
    )
};

export default Room;