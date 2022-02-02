import React from 'react';
// import LoadingPage from '../../../components/LoadingPage/LoadingPage';

// store
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';
// import { doneLoadingApp } from '../../../store/window';

import './R_02.css';

const R_02 = () => {
    const windowUI = useSelector(selectWindow);
    // const dispatch = useDispatch();


    return (
        <div className="Room R_02 Sketch">
            {/* <div id="p5_loading" className="loadingclass"></div> */}
            <iframe src="https://leetusman.com/everyday/224/" style={{zIndex: 2}} height={window.innerHeight} width={window.innerWidth}></iframe>
            {/* {
                windowUI.loading ?
                    <LoadingPage /> :
                    null
            } */}
        </div>
    )
};

export default R_02;