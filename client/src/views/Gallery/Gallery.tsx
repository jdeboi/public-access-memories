import React, { useEffect, useRef } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './Gallery.css';
import { useNavigate } from 'react-router-dom';

import GallerySketch1 from './Gallery1/GallerySketch';
import GallerySketch2 from './Gallery2/GallerySketch';
import GallerySketch3 from './Gallery3/GallerySketch';

import { GlobalConfig as GC_HB } from '../../data/HomeBody/GlobalConfig';
import { GlobalConfig as GC_AIR } from '../../data/AsIRecall/GlobalConfig';
import { GlobalConfig as GC_FV } from '../../data/FieldsOfView/GlobalConfig';
import { GlobalConfig } from '../../data/CurrentShow/GlobalConfig';


import { IUser, IUsers } from '../../interfaces';
import { filterUsers, mapVal } from '../../helpers/helpers';

import LoadingPage from '../../components/LoadingPage/LoadingPage';
import MiniMapAIR from './components/MiniMap/MiniMapAIR';
import MiniMap from './components/MiniMap/MiniMap';
import MiniMapFOV from './components/MiniMap/MiniMapFOV';


// store
import { useSelector, useDispatch } from 'react-redux';
import { selectMusic, selectUser, selectUserActive, selectWindow } from '../../store/store';
import { setUserRoomUrl, moveUser, toggleOutside } from '../../store/user';
import { setUserActiveChat } from '../../store/userActive';
import { setOneMenu, showChat } from '../../store/menu';
import { setSketchVolume } from '../../store/music';
import { doneLoadingApp } from '../../store/window';

import { getBar } from '../../data/CurrentShow/BotConfig';


interface IGallery {
    id: number,
    users: IUsers,
    isClosed: boolean,
    showWelcome: boolean
}

const Gallery = (props: IGallery) => {

    const user = useSelector(selectUser);
    const windowUI = useSelector(selectWindow);
    const music = useSelector(selectMusic);
    const dispatch = useDispatch();
    const userActive = useSelector(selectUserActive);
    const navigate = useNavigate();
    const audioPlayer = useRef(null);


    const clickedUserChat = (otherUser: IUser) => {
        if (otherUser.id !== user.id) {
            // const { ui, setUserActiveChat, showChat, setOneMenu } = this.props;
            dispatch(setUserActiveChat(otherUser));
            // if we use both, setOneMenu will have a toggle effect on Desktop
            if (windowUI.isMobile || windowUI.hasFooter)
                dispatch(setOneMenu("chat"));
            else
                dispatch(showChat());
        }
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

    const getGlobalConfig = () => {
        if (props.id == 0) {
            return GC_HB;
        }
        else if (props.id == 1) {
            return GC_AIR;
        }
        else if (props.id == 2) {
            return GC_FV;
        }
        return GlobalConfig;
    }

    const moveGalleryUser = (x: number, y: number) => {
        const GlobalConfig = getGlobalConfig()
        dispatch(setSketchVolume(getVolume()));
        dispatch(moveUser({ x, y }));
        const newUser = { ...user };
        newUser.x = x;
        newUser.y = y;
        // socket.emit("setUser", newUser);
        // are we handling this in the app.tsx?
    }

    const userNewRoom = (room: string) => {
        navigate(room);
        dispatch(setUserRoomUrl({ roomUrl: room }));
    }

    const getGallery = () => {
        let gal = props.id ? props.id : 1;
        switch (gal) {
            case 1:
                return (
                    <GallerySketch1
                        users={props.users}
                        isClosed={props.isClosed}
                        userMove={moveGalleryUser}
                        userNewRoom={userNewRoom}
                        loadingDone={() => dispatch(doneLoadingApp())}
                        toggleOutside={() => dispatch(toggleOutside())}
                        isMobile={windowUI.isMobile}
                        clickedUserChat={clickedUserChat}
                        setUserActive={clickedUserChat}
                    />
                );
            case 2:
                return (
                    <GallerySketch2
                        users={props.users}
                        isClosed={props.isClosed}
                        userMove={moveGalleryUser}
                        userNewRoom={userNewRoom}
                        loadingDone={() => dispatch(doneLoadingApp())}
                        toggleOutside={() => dispatch(toggleOutside())}
                        isMobile={windowUI.isMobile}
                        clickedUserChat={clickedUserChat}
                        setUserActive={clickedUserChat}
                    />
                );
            case 3:
                return (
                    <GallerySketch3
                        users={props.users}
                        isClosed={props.isClosed}
                        userMove={moveGalleryUser}
                        userNewRoom={userNewRoom}
                        loadingDone={() => dispatch(doneLoadingApp())}
                        toggleOutside={() => dispatch(toggleOutside())}
                        isMobile={windowUI.isMobile}
                        clickedUserChat={clickedUserChat}
                        setUserActive={clickedUserChat}
                    />
                );
            default:
                return (<GallerySketch1
                    users={props.users}
                    isClosed={props.isClosed}
                    userMove={moveGalleryUser}
                    userNewRoom={userNewRoom}
                    loadingDone={() => dispatch(doneLoadingApp())}
                    toggleOutside={() => dispatch(toggleOutside())}
                    isMobile={windowUI.isMobile}
                    clickedUserChat={clickedUserChat}
                    setUserActive={clickedUserChat}
                />)
        }
    }

    const getMap = () => {
        let gal = props.id ? props.id : 1;
        switch (gal) {
            case 1:
                return (<MiniMap users={filterUsers(user, props.users)} x={20} y={20} />);
            case 2:
                return (<MiniMapAIR users={filterUsers(user, props.users)} x={20} y={20} />);
            case 3:
                return (<MiniMapFOV users={filterUsers(user, props.users)} x={20} y={20} />)
            default:
                return (<MiniMap users={filterUsers(user, props.users)} x={20} y={20} />);
        }
    }
    return (
        <div className="Gallery Sketch">
            <div id="p5_loading" className="loadingclass"></div>
            {getGallery()}
            {
                windowUI.loading ?
                    <LoadingPage /> :
                    getMap()
            }

            {/* {!props.showWelcome ?
                <ReactAudioPlayer
                    src={music.currentSongTitle}
                    autoPlay={true}
                    volume={music.isMuted ? 0 : music.volume}
                    controls={false}
                    loop={true}
                    ref={audioPlayer}
                /> : null
            } */}
        </div>
    )
};

export default Gallery;