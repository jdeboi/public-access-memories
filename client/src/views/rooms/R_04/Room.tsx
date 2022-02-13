import React, { useState, useEffect } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../store/store';
import ReactPlayer from 'react-player';
import './RoomDan.css';

const Room = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();
    const [isPlaying, setIsPlaying] = useState(false);

    const getDimensions = () => {
        // let w = Math.max(windowUI.contentW, 
        let h = Math.min(windowUI.contentH, 800);
        let w = h / 360 * 640;
        let y = windowUI.contentH - h;
        let x = (windowUI.contentW - w) / 2;
        return { w, h, x, y };
    }

    const [dim, setDim] = useState(getDimensions())

    useEffect(() => {
        setIsPlaying(true);
    }, [windowUI.compositionStarted])

    useEffect(() => {
        setDim(getDimensions())
    }, [windowUI.contentW, windowUI.contentH])


    return (
        <div className="Room RoomDan Sketch">
            {/* https://www.youtube.com/watch?v=87aCp7grSQA */}
            <div className="player" style={{ top: dim.y, left: dim.x, width: dim.w, height: dim.h }}>
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=87aCp7grSQA'
                    muted={true}
                    loop={true}
                    playsinline={true}
                    playing={isPlaying}
                    width='100%'
                    height='100%'
                />
            </div>


        </div>
    )
};

export default Room;