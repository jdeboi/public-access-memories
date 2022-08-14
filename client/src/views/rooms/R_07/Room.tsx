import React, { useEffect, useState } from 'react';
import P5Sketch from './P5Sketch';
import './Lizz.css';

// store
import { useSelector, useDispatch } from 'react-redux';
import { doneLoadingApp } from '../../../store/window';
import { selectWindow } from '../../../store/store';
import LoadingPage from '../../../components/LoadingPage/LoadingPage';



const Room = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();
    const [sceneNum, setSceneNum] = useState(0);
    const [roomClass, setRoomClass] = useState("Room Lizz Sketch");

    useEffect(() => {
        if (!windowUI.loading) {
            setRoomClass("Room Lizz DoneLoading Sketch")
        }

    }, [windowUI.loading])

    return (
        <div className={roomClass}>
            {/* <div id="p5_loading" className="loadingclass"></div> */}
            <P5Sketch
                isMobile={windowUI.isMobile}
                hasStarted={windowUI.compositionStarted}
                sceneNum={sceneNum}
                loadingDone={() => dispatch(doneLoadingApp())}
            />

            {
                windowUI.loading ?
                    <div className="loadingImages">loading images...</div>
                    :
                    <button
                        onClick={() => setSceneNum(sceneNum + 1)}
                        className="lizzButton">
                        {">"}
                    </button>
            }

        </div>
    )
};

export default Room;