import React, { useState, useRef } from 'react';
import './R_06.css';

import RoomSketch from './RoomSketch';

// components
import ReactAudioPlayer from 'react-audio-player';
import LoadingPage from '../../../components/LoadingPage/LoadingPage';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow, selectMusic } from '../../../store/store';
import { doneLoadingApp } from '../../../store/window';
import { setSketchVolume } from '../../../store/music';



const R_06 = () => {
    const windowUI = useSelector(selectWindow);
    const music = useSelector(selectMusic);
    const dispatch = useDispatch();
    const audioPlayer = useRef(null);
    const [vol, setVol] = useState(.5);

    const setSketchVol = (vol: number) => {
        // dispatch(setSketchVolume(vol));
        setVol(vol);
    }

    return (
        <div className="Room R_06 Sketch">
            <div id="p5_loading" className="loadingclass"></div>
            <RoomSketch
                setSketchVol={setSketchVol}
                loadingDone={() => dispatch(doneLoadingApp())}
                isMobile={windowUI.isMobile}
            />

            {
                windowUI.compositionStarted ?
                    <ReactAudioPlayer
                        src={"https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/deBoisblanc/fly.mp3"}
                        autoPlay={true}
                        volume={music.isMuted ? 0 : vol}
                        controls={false}
                        loop={true}
                        ref={audioPlayer}
                    /> :
                    null
            }
            {
                windowUI.loading ?
                    <LoadingPage /> :
                    null
            }

        </div>
    )
};

export default R_06;