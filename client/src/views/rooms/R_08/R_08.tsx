import React from 'react';
import LoadingPage from '../../../components/LoadingPage/LoadingPage';

import './R_08.css';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../store/store';
import { doneLoadingApp } from '../../../store/window';

import YouTube, {Options} from 'react-youtube';
import Frame from '../../../components/Frame/Frame';

const R_08 = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();

    const onReady = (event: any) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const factor = 1.2;
    const h = Math.floor(factor*390);
    const w = Math.floor(factor*640);
    const opts: Options = {
        height: h+'',
        width: w+'',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <div className="Room R_08 Sketch">
            <Frame 
                width={w}
                height={h}
                content={<YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onReady} />}
                x={(windowUI.contentW-w)/2}
                y={((windowUI.contentH-h+26)/2)}
            />
            
        </div>
    )


};

export default R_08;