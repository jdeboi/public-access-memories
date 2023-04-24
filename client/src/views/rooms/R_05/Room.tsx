
import React, { useEffect } from 'react';
// import P5Sketch from './CiaraSketch';
import './Ciara.css';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../store/store';
import { doneLoadingApp } from '../../../store/window';


const Room = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();

    return (
        <div className="Room Ciara Sketch">
            {/* <div id="p5_loading" className="loadingclass"></div>
            <P5Sketch
                hasStarted={windowUI.compositionStarted}
                isMobile={windowUI.isMobile}
                loadingDone={() => dispatch(doneLoadingApp())}
            /> */}
        </div>
    )
};

export default Room;