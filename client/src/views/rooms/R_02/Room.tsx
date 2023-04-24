import React, {useState, useEffect} from 'react';
import './Cursor.css';

const Room = () => {
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsHidden(true), 7000);
        return () => clearTimeout(timer);
      }, []);

    return (
        <div className="Room Cursor Sketch">
            {/* <iframe src="https://cursor-echo.herokuapp.com/" /> */}
            {/* <div className="roomAlert" style={{display: isHidden?"none":"block"}}>This room works better on desktop.</div> */}
        </div>
    )
};

export default Room;
