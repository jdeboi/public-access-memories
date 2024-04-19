import React, { useEffect, useRef } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./Gallery.css";
import { useNavigate } from "react-router-dom";

import GallerySketch1 from "./Gallery1/GallerySketch";
import GallerySketch2 from "./Gallery2/GallerySketch";
import GallerySketch3 from "./Gallery3/GallerySketch";
import GallerySketch4 from "./GalleryGreber/GallerySketch";
import GalleryPages from "./GalleryGreber/GalleryPages";

import {
  GlobalConfig,
  getCurrentPageGlobalConfig,
} from "../../data/CurrentShow/GlobalConfig";

import { IUser, IUsers } from "../../interfaces";
import { filterUsers, mapVal } from "../../helpers/helpers";

import LoadingPage from "../../components/LoadingPage/LoadingPage";
import MiniMapAIR from "./components/MiniMap/MiniMapAIR";
import MiniMap from "./components/MiniMap/MiniMap";
import MiniMapFOV from "./components/MiniMap/MiniMapFOV";

// store
import { useSelector, useDispatch } from "react-redux";
import {
  selectMusic,
  selectUser,
  selectUserActive,
  selectWindow,
} from "../../store/store";
import { setUserRoomUrl, moveUser, toggleOutside } from "../../store/user";
import { setUserActiveChat } from "../../store/userActive";
import { setGalleryId, setOneMenu, showChat } from "../../store/menu";
import { setSketchVolume } from "../../store/music";
import { doneLoadingApp } from "../../store/window";

import { getBar } from "../../data/CurrentShow/BotConfig";
import { p5ToUserCoords } from "../../helpers/coordinates";

interface IGallery {
  id: number;
  users: IUsers;
  isClosed: boolean;
  showWelcome: boolean;
}

const Gallery = (props: IGallery) => {
  const user = useSelector(selectUser);
  const windowUI = useSelector(selectWindow);
  const music = useSelector(selectMusic);
  const dispatch = useDispatch();
  const userActive = useSelector(selectUserActive);
  const navigate = useNavigate();
  const audioPlayer = useRef(null);

  useEffect(() => {
    // dispatch to set gallery id
    dispatch(setGalleryId(props.id));
  }, [props.id]);

  const clickedUserChat = (otherUser: IUser) => {
    if (otherUser.id !== user.id) {
      // const { ui, setUserActiveChat, showChat, setOneMenu } = this.props;
      dispatch(setUserActiveChat(otherUser));
      // if we use both, setOneMenu will have a toggle effect on Desktop
      if (windowUI.isMobile || windowUI.hasFooter) dispatch(setOneMenu("chat"));
      else dispatch(showChat());
    }
  };

  const getVolume = () => {
    const dj = getBar("DJ", props.id);
    const djpos = p5ToUserCoords(
      dj.x,
      dj.y,
      getCurrentPageGlobalConfig(props.id)
    );
    let dx = djpos.x - user.x;
    let dy = djpos.y - user.y;
    let dis = Math.sqrt(dx * dx + dy * dy);

    // if (user.outside) {
    // const minVol = .2;
    // let v = mapVal(dis, 0, 3000, 1, 0);
    // if (v > 1)
    //     v = 1;
    // else if (v < minVol)
    //     v = minVol;
    // return v;
    // }
    // return .1;

    const minVol = 0.05;
    if (dis > 1000) return minVol;
    return mapVal(dis, 0, 1000, 1, minVol);
  };

  const moveGalleryUser = (x: number, y: number) => {
    const GlobalConfig = getCurrentPageGlobalConfig(props.id);
    dispatch(setSketchVolume(getVolume()));
    dispatch(moveUser({ x, y, galleryIndex: props.id }));
    const newUser = { ...user };
    newUser.x = x;
    newUser.y = y;
    // socket.emit("setUser", newUser);
    // are we handling this in the app.tsx?
  };

  const userNewRoom = (room: string) => {
    navigate(room);
    dispatch(setUserRoomUrl({ roomUrl: room }));
  };

  const GalleryStyle = {
    backgroundRepeat: "repeat",
    backgroundSize: "600px 350px",
    backgroundImage: "url(/backgroundImgs/wallpaper3.jpg)",
  };

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
        GalleryStyle.backgroundImage = "url(/backgroundImgs/asirecall_bg.png)";
        GalleryStyle.backgroundSize = "500px 500px";
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
        GalleryStyle.backgroundImage = "url(/backgroundImgs/bg.png)";
        GalleryStyle.backgroundRepeat = "repeat";
        GalleryStyle.backgroundSize = "700px 700px";
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
      case 4:
        GalleryStyle.backgroundImage = "none";
        return (
          <>
            <GalleryPages users={props.users} user={user} />
            <div style={{ zIndex: 30 }}>
              <GallerySketch4
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
            </div>
          </>
        );
      default:
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
    }
  };

  const getMap = () => {
    let gal = props.id ? props.id : 1;
    switch (gal) {
      case 1:
        return <MiniMap users={filterUsers(user, props.users)} x={20} y={20} />;
      case 2:
        return (
          <MiniMapAIR users={filterUsers(user, props.users)} x={20} y={20} />
        );
      case 3:
        return (
          <MiniMapFOV users={filterUsers(user, props.users)} x={20} y={20} />
        );
      case 4:
        return <></>;
      default:
        return <MiniMap users={filterUsers(user, props.users)} x={20} y={20} />;
    }
  };
  return (
    <div className="Gallery Sketch" style={GalleryStyle}>
      <div id="p5_loading" className="loadingclass"></div>
      {getGallery()}
      {windowUI.loading ? <LoadingPage /> : getMap()}

      {!props.showWelcome ? (
        <ReactAudioPlayer
          src={music.currentSongTitle}
          autoPlay={true}
          volume={music.isMuted ? 0 : getVolume()}
          controls={false}
          loop={true}
          ref={audioPlayer}
        />
      ) : null}
    </div>
  );
};

export default Gallery;
