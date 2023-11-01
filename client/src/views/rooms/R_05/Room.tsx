
import { useEffect, useState } from 'react';
import './Petra.css';
import { selectWindow } from '../../../store/store';
import { useSelector } from 'react-redux';

const Room = () => {
    const [showMessage, setShowMessage] = useState(false);
    const windowUI = useSelector(selectWindow);

    useEffect(() => {
        let timerId: null | NodeJS.Timeout = null;

        const delayedFunction = () => {
            setShowMessage(false);
        };

        if (timerId == null && windowUI.compositionStarted) {
            setShowMessage(true);
            timerId = setTimeout(delayedFunction, 3000);
        }

        return () => {
            if (timerId)
                clearTimeout(timerId)
        };

    }, [windowUI.compositionStarted])


    return (
        <>
            <div className="Room Petra Sketch">
                <iframe src="https://player.vimeo.com/video/437878761?h=d6ed3c4905"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                >
                </iframe>
            </div>
            {showMessage &&
                <div className="backgroundCover">
                    <div className="LoadingPage" style={{ position: "absolute", backgroundColor: "black", bottom: 80, right: 10}}>
                            <a className="title" href="https://www.petraszeman.com/clouds.html" target="_blank">download full game</a>
                    </div>
                </div>
            }
        </>
    )
};

export default Room;