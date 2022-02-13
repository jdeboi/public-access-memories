import React, {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import LoadingPage from '../../../components/LoadingPage/LoadingPage';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow } from '../../../store/store';
import { doneLoadingApp } from '../../../store/window';


const R_07 = () => {
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();
    const [vidPos, setVidPos] = useState({x: 50, y: 50});
    const [bgColor, setBgColor] = useState("black");

    useEffect(() => {
        const flicker = () => {
            setVidPos({x: Math.random()*500, y: Math.random()*300});
        }

        setTimeout(() => {
            flicker();
        }, 3000+Math.random()*2000)
    })

    return (
        <div className="Room R_07 Sketch" style={{background: bgColor}}>
            <div style={{position: "absolute", top: vidPos.y, left:vidPos.x }}>
                <ReactPlayer url='https://netscapes.s3.us-east-2.amazonaws.com/mojave/elon.mp4' />
            </div>
            {
                windowUI.loading ?
                    <LoadingPage /> :
                    null
            }
        </div>
    )
};

export default R_07;