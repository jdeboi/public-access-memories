import React, {useRef, useEffect} from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../../store/store';


const R_03 = () => {
    const iFrameRef = useRef<HTMLIFrameElement>(null);
    const windowUI = useSelector(selectWindow);

    useEffect(() => {
        let ifref = iFrameRef.current;
        if (ifref) {
            ifref.focus()
        }
            
    }, [windowUI.compositionStarted])


    return (
        <div className="Room R_03 Sketch">
            <iframe
                ref={iFrameRef}
                allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr"
                frameBorder="0"
                src="//v6p9d9t4.ssl.hwcdn.net/html/2558256/room-me-master/index.html"
                scrolling="no"
                allowFullScreen={true}
                id="game_drop"
                width={windowUI.contentW}
                height={windowUI.contentH}
            >
            </iframe>
        </div>
    )
};

export default R_03;