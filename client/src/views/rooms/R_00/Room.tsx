import React from 'react';
import LoadingPage from '../../../components/LoadingPage/LoadingPage';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../store/store';
import { doneLoadingApp } from '../../../store/window';

import RoomSketch from './RoomSketch';

import './RoomCraft.css';

const Room = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();


    return (
        <div className="Room RoomCraft Sketch">
            <div id="p5_loading" className="loadingclass"></div>
            <RoomSketch
                loadingDone={() => dispatch(doneLoadingApp())}
                isMobile={windowUI.isMobile}
            />

            <h1>room1</h1>
            {
                windowUI.loading ?
                    <LoadingPage /> :
                    null
            }
        </div>
    )
};

export default Room;