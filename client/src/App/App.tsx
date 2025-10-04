import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

// interfaces
import { ShowConfig } from "../data/CurrentShow/ShowConfig";
import { IUsers } from "../interfaces";

///////////////////////////////
// VIEWS
import Gallery from "../views/Gallery/Gallery";
import About from "../views/pages/About/About";
import Statement from "../views/pages/Statement/Statement";
import Room from "../views/rooms/Room/Room";
import TestRoom from "../views/rooms/TestRoom/TestRoom";
import NotFound from "../views/pages/NotFound/NotFound";
import Artists from "../views/pages/Artists/Artists";
import ArtistProfilePage from "../views/pages/Artists/ArtistProfilePage";
import EditUsers from "../views/Admin/EditUsers";

// past exhibitions
import PastExhibitions from "../views/pages/PastExhibitions/PastExhibitions";
import ExhibitionPageTemplate from "../views/pages/templates/ExhibitionPageTemplate";
import { HomeBodyData } from "../views/pages/PastExhibitions/Data/HomeBodyData";
import { AsIRecallData } from "../views/pages/PastExhibitions/Data/AsIRecallData";
import { HomeOfficesData } from "../views/pages/PastExhibitions/Data/HomeOfficesData";
import { residency2025Data } from "../views/pages/PastExhibitions/Data/Residency2025Data";
import { fieldsOfViewData } from "../views/pages/PastExhibitions/Data/FieldsOfViewData";

///////////////////////////////
// COMPONENTS
// import ReactAudioPlayer from 'react-audio-player';
import Header from "../components/Header/Header";
import Chat from "../components/Chat/Chat";
import Welcome from "../components/Welcome/Welcome";
import SignIn from "../components/SignIn/SignIn";
import MobileFooter from "../components/Header/components/MobileFooter/MobileFooter";
import RoomDecal from "../components/RoomDecal/RoomDecal";
import { pageview } from "./Analytics";

// socket
import { useSockets } from "./useSockets";
import socket from "../helpers/Socket";

import Cookies from "js-cookie";

///////////////////////////////
// STORE
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectWindow } from "../store/store";
import { showSignIn, hideMenus } from "../store/menu";
import { setUser, setUserRoomUrl } from "../store/user";
import { startComposition, resizeApp, loadingApp } from "../store/window";

import { shouldShowLoggedInComponents } from "../helpers/helpers";

import { artists, rooms } from "../data/CurrentShow/RoomConfig";
// import OpenCall from "../views/pages/OpenCall/OpenCall";
import FAQFrame from "../components/FAQ/FAQFrame";
import {
  ASIRECALL_ID,
  DEBOX_ID,
  FIELDSOFVIEW_ID,
  HOMEBODY_ID,
  HOMEOFFICES_ID,
} from "../data/CurrentShow/GalleryConfig";
import Residency from "../views/pages/Residency/Residency";
import HostBotRoom from "../views/Gallery/Gallery0Residency/rooms/HostBotRoom";
import OpenCall from "../views/pages/OpenCall/OpenCall";
import GalleryRoom from "../views/rooms/GalleryRoom";
import ApproveSindersSubmissions from "../views/rooms/R_06/ApproveSindersSubmissions";

function App() {
  const user = useSelector(selectUser);
  // const music = useSelector(selectMusic);
  const windowUI = useSelector(selectWindow);

  const dispatch = useDispatch();

  const { isClosed, isMenuOn } = ShowConfig;

  const location = useLocation();

  const [users, setUsers] = useState<IUsers>([]);

  const [showWelcome, setShowWelcome] = useState(false);
  const [hasAvatar, setHasAvatar] = useState(false);
  const [hasLoadedCookies, setHasLoadedCookies] = useState(false);
  const [hasLoadedRoom, setHasLoadedRoom] = useState(false);
  const [currentPage, setCurrentPage] = useState(location.pathname);

  useEffect(() => {
    // initialize roomUrl from the URL on first mount
    if (user.roomUrl !== location.pathname) {
      dispatch(setUserRoomUrl({ roomUrl: location.pathname }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Google Analytics - when route changes
  useEffect(() => {
    if (process.env.NODE_ENV == "production")
      pageview(location.pathname + location.search, location.pathname);
  }, [location]);

  // should this be separate from above?
  useEffect(() => {
    pageChange();
  }, [location.pathname]);

  // Make sure sockets update when user does
  useEffect(() => {
    socket.emit("setUser", user);
  }, [user]);

  // TODO - reason for class components?
  const setUsersData = (data: IUsers) => {
    setUsers(data);
  };

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
  }, [hasAvatar, hasLoadedCookies]);

  const updateDeviceDimensions = () => {
    dispatch(
      resizeApp({ width: window.innerWidth, height: window.innerHeight })
    );
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!hasLoadedRoom && location.pathname !== "/") {
        setHasLoadedRoom(true);
        dispatch(startComposition());
      }
    }
  };

  const avatarClicked = () => {
    if (!showWelcome) {
      dispatch(showSignIn());
    }
  };

  const checkSavedUser = () => {
    const hasAv = Cookies.get("hasAvatar");

    if (hasAv) {
      const userName = Cookies.get("userName");
      const avatar = Cookies.get("avatar");
      if (userName && avatar) {
        const roomUrl = location.pathname;
        dispatch(setUser({ ...user, userName, avatar, roomUrl }));
        setHasAvatar(true);
        setShowWelcome(false);
      } else {
        setHasAvatar(false);
        setShowWelcome(true);
      }
    } else {
      setHasAvatar(false);
      setShowWelcome(true);
    }
  };

  const pageChange = () => {
    dispatch(hideMenus());
    const nextRoomUrl = location.pathname;
    if (nextRoomUrl !== user.roomUrl) {
      dispatch(startComposition());
      dispatch(loadingApp());
      setHasLoadedRoom(false);

      const newUser = { ...user };
      newUser.roomUrl = location.pathname;
      socket.emit("leaveRoom", user.roomUrl);
      socket.emit("joinRoom", nextRoomUrl);
      // socket.emit("setUser", newUser);
      // TODO - are we handling in app.tsx?
      dispatch(setUserRoomUrl({ roomUrl: nextRoomUrl }));
    }
  };

  const startMedia = () => {
    // TODO
    if (!hasLoadedRoom && location.pathname !== "/") {
      setHasLoadedRoom(true);
      dispatch(startComposition());
    }
  };

  const closeWelcome = () => {
    setShowWelcome(false);
    setHasAvatar(true);
    setHasLoadedRoom(true);
  };

  const getRoomDecal = () => {
    if (ShowConfig.isClosed || ShowConfig.underConstruction) {
      if (location.pathname.substring(1, 5) === "test") {
        return (
          <RoomDecal
            startMedia={startMedia}
            artists={artists}
            rooms={rooms}
            hasLoadedRoom={hasLoadedRoom}
          />
        );
      }
      return null;
    } else {
      return (
        <RoomDecal
          startMedia={startMedia}
          rooms={rooms}
          artists={artists}
          hasLoadedRoom={hasLoadedRoom}
        />
      );
    }
  };

  const getSignedInComponents = () => {
    return (
      <React.Fragment>
        {shouldShowLoggedInComponents(user) ? (
          <React.Fragment>
            <SignIn
              isFrame={true}
              hasAvatar={hasAvatar}
              hasLoadedCookies={hasLoadedCookies}
            />
            <FAQFrame />
            <Chat users={users} />
            <Welcome
              isClosed={isClosed}
              hasAvatar={hasAvatar}
              hasLoadedCookies={hasLoadedCookies}
              showWelcome={showWelcome}
              closeWelcome={closeWelcome}
            />

            <MobileFooter avatarClicked={avatarClicked} />
            {/* <MyLiveKit user={user} /> */}
            {/* <TwilioChat user={user} users={users} /> */}
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  };

  return (
    <div className="App">
      <div
        className={
          "App-Header" +
          (windowUI.isMobile || windowUI.hasFooter ? " mobile" : "")
        }
      >
        <Header
          isClosed={isClosed}
          isMenuOn={isMenuOn}
          avatarClicked={avatarClicked}
        />
      </div>
      <div className="App-Content inner-outline">
        <Routes>
          <Route
            path="/"
            element={
              <Gallery
                id={DEBOX_ID}
                users={users}
                isClosed={isClosed}
                showWelcome={showWelcome}
              />
            }
          />
          <Route path="/about" element={<About />} />

          <Route path="/statement" element={<Statement />} />
          <Route path="/opencall" element={<OpenCall />} />
          <Route path="/residency" element={<Residency />} />

          <Route path="/artists" element={<Artists />} />
          <Route path="/artist/:name" element={<ArtistProfilePage />} />

          <Route
            path="/galleries/homebody"
            element={
              <Gallery
                id={HOMEBODY_ID}
                users={users}
                isClosed={isClosed}
                showWelcome={showWelcome}
              />
            }
          />
          <Route
            path="/galleries/asirecall"
            element={
              <Gallery
                id={ASIRECALL_ID}
                users={users}
                isClosed={isClosed}
                showWelcome={showWelcome}
              />
            }
          />
          <Route
            path="/galleries/fieldsofview"
            element={
              <Gallery
                id={FIELDSOFVIEW_ID}
                users={users}
                isClosed={isClosed}
                showWelcome={showWelcome}
              />
            }
          />
          <Route
            path="/galleries/homeoffices"
            element={
              <Gallery
                id={HOMEOFFICES_ID}
                users={users}
                isClosed={isClosed}
                showWelcome={showWelcome}
              />
            }
          />
          <Route path="/test/rooms/:id" element={<TestRoom />} />
          <Route path={`/${ShowConfig.link}/rooms/:id`} element={<Room />} />
          <Route
            path="/sinders"
            element={
              <GalleryRoom
                id={0}
                path={"/sinders"}
                users={users}
                isClosed={isClosed}
                showWelcome={showWelcome}
              />
            }
          />
          <Route
            path="/approvesinders"
            element={<ApproveSindersSubmissions />}
          />
          <Route
            path="/yang"
            element={
              !ShowConfig.isClosed ? (
                <GalleryRoom
                  id={1}
                  path={"/yang"}
                  users={users}
                  isClosed={isClosed}
                  showWelcome={showWelcome}
                />
              ) : (
                <Room />
              )
            }
          />
          {/* <Route
            path="/lounge"
            element={
              !ShowConfig.isClosed ? (
                <HostBotRoom
                  id={0}
                  users={users}
                  isClosed={isClosed}
                  showWelcome={showWelcome}
                />
              ) : (
                <Room />
              )
            }
          /> */}

          <Route path="/pastexhibitions" element={<PastExhibitions />} />
          <Route
            path="/pastexhibitions/homebody"
            element={<ExhibitionPageTemplate {...HomeBodyData} />}
          />
          <Route
            path="/pastexhibitions/asirecall"
            element={<ExhibitionPageTemplate {...AsIRecallData} />}
          />
          <Route
            path="/pastexhibitions/fieldsofview"
            element={<ExhibitionPageTemplate {...fieldsOfViewData} />}
          />
          <Route
            path="/pastexhibitions/homeoffices"
            element={<ExhibitionPageTemplate {...HomeOfficesData} />}
          />
          <Route
            path="/pastexhibitions/residency2025"
            element={<ExhibitionPageTemplate {...residency2025Data} />}
          />
          <Route
            path="/editusers"
            element={<EditUsers user={user} users={users} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* check if user hasn't logged in and on a basic page */}
      {getSignedInComponents()}
      {getRoomDecal()}
      {/* <AudioChat user={user} />
            <MicrophoneBarBottom /> */}
    </div>
  );
}

export default App;
