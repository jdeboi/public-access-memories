import React, { useState, useEffect, useRef } from "react";
import ReactAudioPlayer from "react-audio-player";
// import "./Gallery.css";
import { useNavigate } from "react-router-dom";

import { getCurrentPageGlobalConfig } from "../../../data/CurrentShow/GlobalConfig";

import { IUser, IUsers } from "../../../interfaces";
import { filterUsers, mapVal } from "../../../helpers/helpers";

import LoadingPage from "../../../components/LoadingPage/LoadingPage";

// store
import { useSelector, useDispatch } from "react-redux";
import {
  selectMusic,
  selectUser,
  selectUserActive,
  selectWindow,
} from "../../../store/store";
import {
  setUserRoomUrl,
  moveUser,
  toggleOutside,
  setOutside,
  moveUserNormal,
  moveUserRoom,
} from "../../../store/user";
import { setUserActiveChat } from "../../../store/userActive";
import { setOneMenu, showChat } from "../../../store/menu";
import { setSketchVolume } from "../../../store/music";
import { doneLoadingApp, startComposition } from "../../../store/window";

import { getBar } from "../../../data/CurrentShow/BotConfig";
import { p5ToUserCoords } from "../../../helpers/coordinates";
import GallerySketchEmrys from "./GallerySketchEmrys";

interface IGallery {
  id: number;
  users: IUsers;
  isClosed: boolean;
  showWelcome: boolean;
}

const EmrysGalleryRoom = (props: IGallery) => {
  const user = useSelector(selectUser);
  const windowUI = useSelector(selectWindow);
  const music = useSelector(selectMusic);
  const dispatch = useDispatch();
  const userActive = useSelector(selectUserActive);
  const navigate = useNavigate();
  const audioPlayer = useRef<ReactAudioPlayer>(null);
  const [showStart, setShowStart] = useState(true);

  useEffect(() => {
    // dispatch to set gallery id
    // dispatch(setGalleryId(props.id));

    // Try to play audio after component mounts
    if (audioPlayer.current) {
      const audioElement = audioPlayer.current.audioEl.current;
      if (audioElement) {
        audioElement.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }
    }
  }, [props.id, dispatch]);

  useEffect(() => {
    if (props.showWelcome) {
      setShowStart(false);
    }
  }, [props.showWelcome]);

  useEffect(() => {
    if (!showStart && !props.showWelcome) {
      dispatch(startComposition());
    }
  }, [props.showWelcome, showStart]);

  const clickedUserChat = (otherUser: IUser) => {
    if (otherUser.id !== user.id) {
      dispatch(setUserActiveChat(otherUser));
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
  };

  const moveGalleryUserNormal = (x: number, y: number) => {
    dispatch(setSketchVolume(getVolume()));
    dispatch(moveUserNormal({ x, y, galleryIndex: props.id }));
    const newUser = { ...user };
    newUser.x = x;
    newUser.y = y;
  };

  const moveGalleryUserRoom = (x: number, y: number) => {
    // dispatch(setSketchVolume(getVolume()));
    dispatch(moveUserRoom({ x, y }));
    const newUser = { ...user };
    newUser.roomX = x;
    newUser.roomY = y;
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

  const getGalleryAudio = () => {
    if (props.showWelcome || showStart) {
      return null;
    }

    return (
      <ReactAudioPlayer
        src={music.currentSongTitle}
        autoPlay
        volume={music.isMuted ? 0 : getVolume()}
        controls={false}
        loop
        ref={audioPlayer}
      />
    );
  };

  return (
    <div className="Gallery Sketch" style={GalleryStyle}>
      <div id="p5_loading" className="loadingclass"></div>

      <GallerySketchEmrys
        users={props.users}
        isClosed={props.isClosed}
        userMove={moveGalleryUserRoom}
        loadingDone={() => dispatch(doneLoadingApp())}
        windowUI={windowUI}
        clickedUserChat={clickedUserChat}
        setUserActive={clickedUserChat}
      />

      {windowUI.loading && <LoadingPage />}
    </div>
  );
};

export default EmrysGalleryRoom;
