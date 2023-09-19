import './Andy.css';
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';

const Room = () => {
    const windowUI = useSelector(selectWindow);
    const classN = (windowUI.orientation == "portrait" && (windowUI.isMobile || windowUI.hasFooter)) ? "mobileBerries" : "";

    return (
        <div className="Room Andy Sketch">
            {/* <iframe
                src={"https://andyzuliani.com/transparens2"}
                width={"100%"}
                height={"100%"}
            /> */}
            <div className={classN}>
                <div id="berries1" className="berries"></div>
                <div id="berries2" className="berries"></div>
                <div id="berries3" className="berries"></div>
                <div id="berries4" className="berries"></div>
                <div id="berries5" className="berries"></div>
            </div>
        </div>
    )
};

export default Room;
