import React from 'react';
import Frame from '../../components/Frame/Frame';
import './Gallery.css';
import { useNavigate } from 'react-router-dom';

import GallerySketch from './GallerySketch';
import { IUser, IUsers } from '../../interfaces';
import { getRoomCount, mapVal } from '../../helpers/helpers';

import LoadingPage from '../../components/LoadingPage/LoadingPage';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectUserActive, selectWindow } from '../../store/store';
import { setUserRoomUrl, moveUser, toggleOutside } from '../../store/user';
import { setUserActiveChat } from '../../store/userActive';
import { setOneMenu, showChat } from '../../store/menu';
import { setSketchVolume } from '../../store/music';
import { doneLoadingApp } from '../../store/window';

import { bars, getBar } from '../../data/BotConfig';

interface IGallery {
    users: IUsers,
    isClosed: boolean
}
const Gallery = (props: IGallery) => {
    const user = useSelector(selectUser);
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();
    const userActive = useSelector(selectUserActive);
    const navigate = useNavigate();

    const clickedUserChat = (otherUser: IUser) => {
        // const { ui, setUserActiveChat, showChat, setOneMenu } = this.props;
        dispatch(setUserActiveChat(otherUser));
        // if we use both, setOneMenu will have a toggle effect on Desktop
        if (windowUI.isMobile || windowUI.hasFooter)
            dispatch(setOneMenu("chat"));
        else
            dispatch(showChat());
    }

    const getVolume = () => {
        const dj = getBar("DJ");
        let dx = dj.x - user.x;
        let dy = dj.y - user.y;
        let dis = Math.sqrt(dx * dx + dy * dy);
        if (user.outside) {
            let minVol = .3;
            let v = mapVal(dis, 0, 3000, 1, 0);
            if (v > 1)
                v = 1;
            else if (v < minVol)
                v = minVol;
            return v;
        }
        return .1;
    }

    const moveGalleryUser = (x: number, y: number) => {
        dispatch(setSketchVolume(getVolume()));
        dispatch(moveUser({ x, y }));
    }

    const userNewRoom = (room: string) => {
        navigate(room);
        dispatch(setUserRoomUrl({ roomUrl: room }));
    }

    return (
        <div className="Gallery Sketch">
            <div id="p5_loading" className="loadingclass"></div>
            <GallerySketch
                users={props.users}
                // user={user}
                roomCount={getRoomCount("gallery", props.users)}
                isClosed={props.isClosed}
                userMove={moveGalleryUser}
                userNewRoom={userNewRoom}
                loadingDone={() => dispatch(doneLoadingApp())}
                toggleOutside={() => dispatch(toggleOutside())}
                isMobile={windowUI.isMobile}
                clickedUserChat={clickedUserChat}
                setUserActive={clickedUserChat}
            />
            {/* {
                windowUI.loading ?
                    <LoadingPage /> :
                <MiniMap users={props.users} />
            } */}
        </div>
    )
};

export default Gallery;