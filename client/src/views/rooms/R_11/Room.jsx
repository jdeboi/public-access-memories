import React, { useEffect, useState } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../store/store';

import { getCenterModalDim } from '../../../components/CenterModal/helpers';

import './RoomLoraine.css';

const Room = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();
    const [w, setW] = useState(getCenterModalDim(windowUI, false, 789, 789).w)
    const [mouseText, setMouseText] = useState(0);

    useEffect(() => {
        setW(getCenterModalDim(windowUI, false, 789, 789).w)

    }, [windowUI.contentW, windowUI.contentH]);

    return (
        <div className="Room RoomNathan Sketch">
        </div>
    )
};

export default Room;