import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectWindow } from "../../../store/store";


const Room = () => {
    const windowUI = useSelector(selectWindow);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout | null = null;

        const delayedFunction = () => {
            setShowMessage(false);
        };

        if (timerId == null && (windowUI.isMobile || windowUI.hasFooter) && windowUI.compositionStarted) {
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
            <div className="Room Sketch" style={{ backgroundColor: "red" }}>

                {windowUI.contentW && windowUI.contentH &&

                    <iframe
                        src="https://www.matthisgrunsky.ca/small_world/"
                        width={windowUI.contentW}
                        height={windowUI.contentH}
                    />
                }

            </div>
            {showMessage ?
                <div className="backgroundCover" style={{ position: "absolute", backgroundColor: "black", top:0, left: 0 }}>
                    <div className="LoadingPage">
                        <div className="title" style={{ color: "white" }}>
                            FYI - this room works better on Desktop
                        </div>
                    </div>
                </div>
                : null
            }

        </>
    )
};

export default Room;