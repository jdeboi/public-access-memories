import React, { useRef, useEffect } from 'react';
// import LoadingPage from '../../../components/LoadingPage/LoadingPage';

// store
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';
// import { doneLoadingApp } from '../../../store/window';

import './R_02.css';

const R_02 = () => {
    const iFrameRef = useRef<HTMLIFrameElement>(null);
    const windowUI = useSelector(selectWindow);
    // const dispatch = useDispatch();

    useEffect(() => {
        let ifref = iFrameRef.current;
        if (ifref) {
            console.log(iFrameRef.current);
            ifref.focus()
        }
            
    }, [windowUI.compositionStarted])

    

    return (
        <div className="Room R_02 Sketch">
            {/* <div id="p5_loading" className="loadingclass"></div> */}
            <iframe ref={iFrameRef} id="ltiframe" src="/leetusman" style={{ zIndex: 2 }} height={window.innerHeight} width={window.innerWidth}></iframe>
        </div>
    )
};

export default R_02;