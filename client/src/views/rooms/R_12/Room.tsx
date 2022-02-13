import React, { useState, useEffect } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../store/store';
import ReactPlayer from 'react-player';
import './RoomFreya.css';

const Room = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();
    const [isPlaying, setIsPlaying] = useState(false);

    const getDimensions = () => {
        // let w = Math.max(windowUI.contentW, 
        
        let w = Math.min(windowUI.contentW, 1920);
        let h = w / 1920 * 1080;
        let y = (windowUI.contentH - h)/2;
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
        <div className="Room RoomFreya Sketch">
            <div className="player" style={{ top: dim.y, left: dim.x, width: dim.w, height: dim.h }}>
                <ReactPlayer
                    url='https://vimeo.com/619125453/db594d3249'
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