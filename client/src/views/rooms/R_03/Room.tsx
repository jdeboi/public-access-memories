import React, { useRef, useState, useEffect } from 'react';
import "./Angeline.css";
// import { useDispatch } from 'react-redux';
import ReactAudioPlayer from 'react-audio-player';

// store
import { useSelector } from 'react-redux';
import { selectMusic, selectWindow } from '../../../store/store';

import useSound from 'use-sound';

const Room = () => {

    const [play, { stop }] = useSound("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/spag2.mp4");
    // const [isPlaying, setIsPlaying] = useState(false);
    const windowUI = useSelector(selectWindow);

    useEffect(() => {
        play()
        return () => stop()
    }, [windowUI.compositionStarted])

    useEffect(() => {
        const interval = setInterval(() => {
            let url = process.env.PUBLIC_URL + "/as-i-recall/spaghetti";
            openInNewTab(url);
        }, 20000);
        return () => clearInterval(interval);
    }, [windowUI.compositionStarted]);

    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="Room Angeline Sketch">
            {/* {windowUI.compositionStarted ? getIFrame() : null} */}
            <iframe src="https://spaghetti-0000.netlify.app/" />
        </div>
    )


};


export default Room;



// function getRandomInt_w(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function run() {
// 	var strWindowFeatures = "location=yes,height=335,width=370,scrollbars=yes,status=yes";
// 	var URL = "https://spaghetti-0000.netlify.app/";
// 	var win = window.open(URL, "_blank", strWindowFeatures);
// 	setInterval(function() {
// 		wleft = getRandomInt_w(0,1300);
// 		wtop = getRandomInt_w(0,300);
// 		console.log(wleft)
// 		console.log(wtop)
// 		var strWindowFeatures = "location=yes,height=335,width=370,scrollbars=yes,status=yes";
// 		var URL = "https://spaghetti-0000.netlify.app/";
// 		var win = window.open(URL, "_blank", 'height=335, width=370, left='+wleft+', top='+wtop);
// 	}, 10 * 2000);
// 	load() 
// }
