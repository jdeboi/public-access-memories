import React, { useState, useEffect } from 'react';
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
import Header from '../components/Header/Header';
import Chat from '../components/Chat/Chat';
import Welcome from '../components/Welcome/Welcome';
import SignIn from '../components/SignIn/SignIn';
import MobileFooter from '../components/Header/components/MobileFooter/MobileFooter';
import RoomDecal from '../components/RoomDecal/RoomDecal';

// socket
import { useSockets } from './useSockets';
import { withCookies, Cookies } from 'react-cookie';

// store
import { IMessage } from '../interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, selectUser, selectWindow, selectMessages } from '../store/store';
import { setOneMenu, showSignIn, hideMenus } from '../store/menu';
import { setUser, setUserRoomUrl } from '../store/user';
import { startComposition, resizeApp, loadingApp } from '../store/window';
import { addMessage, incremendNotifications } from '../store/messages';

interface AppInterface {
    cookies: Cookies;
}


function App({ cookies }: AppInterface) {
    const user = useSelector(selectUser);
    const windowUI = useSelector(selectWindow);

    const dispatch = useDispatch();


    const { isClosed, isMenuOn } = ShowConfig;

    const { pathname } = useLocation();

    const [users, setUsers] = useState<IUsers>([])

    const [showWelcome, setShowWelcome] = useState(false);
    const [hasAvatar, setHasAvatar] = useState(false);
    const [hasLoadedCookies, setHasLoadedCookies] = useState(false);
    const [hasLoadedRoom, setHasLoadedRoom] = useState(false);
    const [currentPage, setCurrentPage] = useState(pathname);


    useEffect(() => {
        pageChange();
    }, [pathname])

    const setUsersData = (data: IUsers) => {
        var filteredArray = data.filter((usr: IUser) => {
            return usr.id !== user.id;
        });
        setUsers(filteredArray);
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

    // useEffect(() => {
    //     setRoomCount();
    // }, [[...users.map(usr => usr.room)]])


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
        console.log("avatar clicked")
        if (!showWelcome) {
            //   setShowSignInDiv(true);
            dispatch(showSignIn());
        }
    }

    const checkSavedUser = () => {
        const hasAv = cookies.get('hasAvatar');

        if (hasAv) {
            const newUser = { ...user };
            newUser.userName = cookies.get('userName');
            newUser.avatar = cookies.get('avatar');
            dispatch(setUser(newUser));

            setHasAvatar(true);
            setShowWelcome(false);
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
        }
        dispatch(setUserRoomUrl({ roomUrl: nextRoomUrl }));
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

    return (
        <div className="App">
            <div className={""}>
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
                    <Route path="/statement" element={<Statement />} />
                    <Route path="room/:id" element={<Room />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <h1>{windowUI.compositionStarted}</h1>


            <SignIn
                isFrame={true}
                hasAvatar={hasAvatar}
                hasLoadedCookies={hasLoadedCookies}
            />
            <Chat users={users} />

            {/* <Volume /> */}
            {/* <FAQFrame /> */}

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

        </div>

    )
}

export default withCookies(App);