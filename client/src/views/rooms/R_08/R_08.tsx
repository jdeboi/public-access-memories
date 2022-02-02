import React from 'react';
import LoadingPage from '../../../components/LoadingPage/LoadingPage';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../store/store';
import { doneLoadingApp } from '../../../store/window';


const R_01 = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();


    return (
        <div className="Room Room_01 Sketch">
            {/* <div id="p5_loading" className="loadingclass"></div> */}
            <h1>room1</h1>
            {
                windowUI.loading ?
                    <LoadingPage /> :
                    null
            }
        </div>
    )
};

export default R_01;