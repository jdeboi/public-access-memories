import React from 'react';
import P5Sketch from './P5Sketch';

// store
import { useSelector, useDispatch } from 'react-redux';
import { doneLoadingApp } from '../../../../store/window';
import { selectWindow } from '../../../../store/store';



const Room = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();

    return (
        <div className="Room Sketch">
            <div id="p5_loading" className="loadingclass"></div>
            <P5Sketch
                isMobile={windowUI.isMobile}
                loadingDone={() => dispatch(doneLoadingApp())}
            />
        </div>
    )
};

export default Room;