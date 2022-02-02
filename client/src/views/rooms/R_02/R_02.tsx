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
        <div className="Room Room_02 Sketch">
            {/* <div id="p5_loading" className="loadingclass"></div> */}
            <iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVORKiXw0=/?moveToViewport=-8352,-2762,6533,5731" frameBorder="0" scrolling="no" allowFullScreen></iframe> 
            {
                windowUI.loading ?
                    <LoadingPage /> :
                    null
            }
        </div>
    )
};

export default R_01;