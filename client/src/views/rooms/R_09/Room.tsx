import { useEffect } from 'react';
import './Vesper.css';

// store
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';


const Room = () => {

    // const windowUI = useSelector(selectWindow);

    // useEffect(() => {
    //     if (windowUI.compositionStarted) {
    //         window.open("https://nonplace.site/shared-folder", '_blank');
    //     }

    // }, [windowUI.compositionStarted])


    return (
        <div className="Room Vesper Sketch">
                {/* <div className="LoadingPage" style={{ position: "absolute", bottom: 80, right: 10 }}>
                    <p>see open tab</p>
                </div> */}
            <iframe
                src={"https://nonplace.site/shared-folder"}
                width={"100%"}
                height={"100%"}
            />
        </div>
    )
};

export default Room;
