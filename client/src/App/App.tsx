import React, { useState, useRef, useEffect } from 'react';
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

// interfaces
import { ShowConfig } from '../data/ShowConfig';
import { IUser, IUsers } from '../interfaces';

// views
import Gallery from '../views/Gallery/Gallery';
import About from '../views/pages/About/About';
import Statement from '../views/pages/Statement/Statement';
import Room from '../views/rooms/Room/Room';
import NotFound from "../views/pages/NotFound/NotFound";

// components
import ReactAudioPlayer from 'react-audio-player';
import Header from '../components/Header/Header';
import Chat from '../components/Chat/Chat';
import Welcome from '../components/Welcome/Welcome';
import SignIn from '../components/SignIn/SignIn';
import MobileFooter from '../components/Header/components/MobileFooter/MobileFooter';
import RoomDecal from '../components/RoomDecal/RoomDecal';

// socket
import { useSockets } from './useSockets';
import socket from "../helpers/Socket";

import Cookies from 'js-cookie';

// store
import { IMessage } from '../interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, selectUser, selectWindow, selectMusic } from '../store/store';
import { setOneMenu, showSignIn, hideMenus } from '../store/menu';
import { setUser, setUserRoomUrl } from '../store/user';
import { startComposition, resizeApp, loadingApp } from '../store/window';
import { addMessage, incremendNotifications } from '../store/messages';
import FAQ from '../components/FAQ/FAQ';
import Artists from '../views/pages/Artists/Artists';
import { PageConfig } from '../data/PageConfig';
import { shouldShowLoggedInComponents } from '../helpers/helpers';



function App() {
    const user = useSelector(selectUser);
    const music = useSelector(selectMusic);
    const windowUI = useSelector(selectWindow);
    const audioPlayer = useRef(null);

    const dispatch = useDispatch();


    const { isClosed, isMenuOn } = ShowConfig;

    const { pathname } = useLocation();

    const [users, setUsers] = useState<IUsers>([])

    const [showWelcome, setShowWelcome] = useState(false);
    const [hasAvatar, setHasAvatar] = useState(false);
    const [hasLoadedCookies, setHasLoadedCookies] = useState(false);
    const [hasLoadedRoom, setHasLoadedRoom] = useState(false);
    const [currentPage, setCurrentPage] = useState(pathname);


    // when route changes
    useEffect(() => {
        pageChange();
    }, [pathname]);

    // Make sure sockets update when user does
    useEffect(() => {
        socket.emit("setUser", user);
    }, [{ ...user }])

    // TODO - reason for class components?
    const setUsersData = (data: IUsers) => {
        setUsers(data);
    }

    const socketSetup = useSockets({ users, setUsersData });

    useEffect(() => {
        socketSetup();
        checkSavedUser();

        window.addEventListener("resize", updateDeviceDimensions);
        window.addEventListener("keydown", handleKeyPress);


        dispatch(loadingApp());

        return () => {
            window.removeEventListener("resize", updateDeviceDimensions);
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);


    useEffect(() => {
        if (hasAvatar && !hasLoadedCookies) {
            setHasLoadedCookies(true);
        }
    }, [user])


    const updateDeviceDimensions = () => {
        dispatch(resizeApp({ width: window.innerWidth, height: window.innerHeight }));
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (!hasLoadedRoom && pathname !== "/") {
                setHasLoadedRoom(true);
                dispatch(startComposition());
            }
        }
    }

    const avatarClicked = () => {
        // console.log("avatar clicked")
        if (!showWelcome) {
            //   setShowSignInDiv(true);
            dispatch(showSignIn());
        }
    }

    const checkSavedUser = () => {
        const hasAv = Cookies.get('hasAvatar');

        if (hasAv) {
            const newUser = { ...user };
            let userName = Cookies.get('userName');
            let avatar = Cookies.get('avatar');
            if (userName && avatar) {
                newUser.userName = userName;
                newUser.avatar = avatar;
                dispatch(setUser(newUser));
                setHasAvatar(true);
                setShowWelcome(false);
            }
            else {
                setHasAvatar(false);
                setShowWelcome(true);
            }
        }
        else {
            setHasAvatar(false);
            setShowWelcome(true);
        }
    }

    const pageChange = () => {

        dispatch(hideMenus());
        const nextRoomUrl = pathname;
        if (nextRoomUrl !== user.roomUrl) {
            dispatch(loadingApp());
            setHasLoadedRoom(false);

            const newUser = { ...user }
            newUser.roomUrl = pathname;
            socket.emit("leaveRoom", user.roomUrl);
            socket.emit("joinRoom", nextRoomUrl);
            // socket.emit("setUser", newUser);
            // TODO - are we handling in app.tsx?
            dispatch(setUserRoomUrl({ roomUrl: nextRoomUrl }));
        }
    }

    const startMedia = () => {
        // TODO
        if (!hasLoadedRoom && pathname !== "/") {
            setHasLoadedRoom(true);
            dispatch(startComposition());
        }
    }

    const closeWelcome = () => {
        setShowWelcome(false);
        setHasAvatar(true);
        setHasLoadedRoom(true);
    }

    const getSignedInComponents = () => {
        if (!shouldShowLoggedInComponents(user))
            return null;
        return (
            <React.Fragment>
                <SignIn
                    isFrame={true}
                    hasAvatar={hasAvatar}
                    hasLoadedCookies={hasLoadedCookies}
                />
                <FAQ isFrame={true} />
                <Chat users={users} />
                <RoomDecal
                    startMedia={startMedia}
                    hasLoadedRoom={hasLoadedRoom}
                    users={users}
                />
                <Welcome
                    isClosed={isClosed}
                    hasAvatar={hasAvatar}
                    hasLoadedCookies={hasLoadedCookies}
                    showWelcome={showWelcome}
                    closeWelcome={closeWelcome}
                />

                <MobileFooter avatarClicked={avatarClicked} />
                {(user.roomUrl === "/" && !showWelcome) ?
                    <ReactAudioPlayer
                        src={music.currentSongTitle}
                        autoPlay={true}
                        volume={music.isMuted ? 0 : music.volume}
                        controls={false}
                        loop={true}
                        ref={audioPlayer}
                    /> : null
                }
            </React.Fragment>
        )
    }

    return (
        <div className="App">
            <div className={"App-Header" + (windowUI.isMobile || windowUI.hasFooter ? " mobile" : "")}>
                <Header
                    isClosed={isClosed}
                    isMenuOn={isMenuOn}
                    avatarClicked={avatarClicked}
                />
            </div>
            <div className="App-Content inner-outline">
                <Routes>
                    <Route path="/" element={<Gallery users={users} isClosed={isClosed} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/exhibition" element={<Statement />} />
                    <Route path="/artists" element={<Artists />} />
                    <Route path="/rooms/:id" element={<Room />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>

            {/* check if user hasn't logged in and on a basic page */}
            {getSignedInComponents()}


        </div>

    )
}

// export default withCookies(App);
export default App;