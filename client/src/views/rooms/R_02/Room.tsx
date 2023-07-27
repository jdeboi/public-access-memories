import React, {useState, useEffect} from 'react';
import './Rosa.css';

const Room = () => {
    // const [isHidden, setIsHidden] = useState(false);

    // useEffect(() => {
    //     const timer = setTimeout(() => setIsHidden(true), 7000);
    //     return () => clearTimeout(timer);
    //   }, []);

    return (
        <div className="Room Rosa Sketch">
            <iframe src="https://player.vimeo.com/video/204594808?title=0&amp;byline=0&amp;portrait=0" style={{position: "absolute", top:0, left:0, width:"100%", height:"100%"}} allow="autoplay; fullscreen" allowFullScreen></iframe>
        </div>
    )
};

export default Room;
