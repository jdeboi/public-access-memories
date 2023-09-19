import './Ziyi.css'
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';

const Room = () => {
    const windowUI = useSelector(selectWindow);
    //(windowUI.isMobile || windowUI.hasFooter)
    return (
        <div className="Room Ziyi Sketch">
            { (windowUI.isMobile || windowUI.hasFooter) ?
                <div className="backgroundCover">
                    <div className="LoadingPage">
                        <div className="title" style={{color: "white"}}>
                            please visit this room on desktop 
                        </div>
                    </div>
                </div>
                :
                <iframe
                    src={"https://www.ziyistudio.art/"}
                    width={"100%"}
                    height={"100%"}
                />
            }
        </div>
    )
};

export default Room;
