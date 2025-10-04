import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactAudioPlayer from "react-audio-player";
// import "./Gallery.css";
import { useNavigate } from "react-router-dom";

import { getCurrentPageGlobalConfig } from "../../data/CurrentShow/GlobalConfig";

import { IUser, IUsers } from "../../interfaces";
import { filterGalleryUsersPage, mapVal } from "../../helpers/helpers";

import LoadingPage from "../../components/LoadingPage/LoadingPage";

// store
import { useSelector, useDispatch } from "react-redux";
import { selectMusic, selectUser, selectWindow } from "../../store/store";
import { setUserRoomUrl, moveUserRoom } from "../../store/user";
import { setUserActiveChat } from "../../store/userActive";
import { setOneMenu, showChat } from "../../store/menu";
import { doneLoadingApp, startComposition } from "../../store/window";

import { getBar } from "../../data/CurrentShow/BotConfig";
import { p5ToUserCoords } from "../../helpers/coordinates";
import GalleryYangSketch from "./R_09/GalleryYangSketch";
import GallerySinders from "./R_06/GallerySinders";

interface IGallery {
  id: number;
  path: string;
  users: IUsers;
  isClosed: boolean;
  showWelcome: boolean;
}

const GalleryRoom = (props: IGallery) => {
  const user = useSelector(selectUser);
  const windowUI = useSelector(selectWindow);
  const music = useSelector(selectMusic);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const audioPlayer = useRef<ReactAudioPlayer>(null);
  const [showStart, setShowStart] = useState(true);

  const [submissionHidden, setSubmissionHidden] = useState(true);

  const isMobile = windowUI.isMobile || windowUI.hasFooter;

  useEffect(() => {
    if (user.roomUrl !== props.path) {
      dispatch(setUserRoomUrl({ roomUrl: props.path }));
    }
  }, [user.roomUrl, dispatch]);

  useEffect(() => {
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

  const moveGalleryUserRoom = (x: number, y: number) => {
    dispatch(moveUserRoom({ x, y }));
  };

  // const userNewRoom = (room: string) => {
  //   navigate(room);
  //   dispatch(setUserRoomUrl({ roomUrl: room }));
  // };

  const galleryStyle = useMemo<React.CSSProperties>(() => {
    const base = {
      background: "white",
    } as React.CSSProperties;

    switch (props.id) {
      case 0:
        return {
          background: `linear-gradient(135deg,
            rgba(255,150,170,0.95) 0%,
            rgba(255,225,235,0.80) 45%,
            rgba(140,195,255,0.95) 100%
          )`,
        };

      default:
        return base;
    }
  }, [props.id]);

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

  const getGallery = () => {
    switch (props.id) {
      case 0:
        return (
          <GallerySinders
            useRoomCoords={true}
            users={props.users}
            isClosed={props.isClosed}
            userNewRoom={() => console.log("going to a new room...")}
            isMobile={isMobile}
            user={user}
            toggleOutside={() => console.log("toggle outside")}
            userMove={moveGalleryUserRoom}
            loadingDone={() => dispatch(doneLoadingApp())}
            // windowUI={windowUI}
            clickedUserChat={clickedUserChat}
            setUserActive={clickedUserChat}
            roomPath={props.path}
          />
        );
      case 1:
        return (
          <GalleryYangSketch
            useRoomCoords={true}
            users={props.users}
            isClosed={props.isClosed}
            userNewRoom={() => console.log("going to a new room...")}
            isMobile={isMobile}
            user={user}
            toggleOutside={() => console.log("toggle outside")}
            userMove={moveGalleryUserRoom}
            loadingDone={() => dispatch(doneLoadingApp())}
            // windowUI={windowUI}
            clickedUserChat={clickedUserChat}
            setUserActive={clickedUserChat}
            roomPath={props.path}
          />
        );
    }
    return null;
  };

  return (
    <div className="Gallery Sketch" style={galleryStyle}>
      <div id="p5_loading" className="loadingclass"></div>

      {getGallery()}

      {windowUI.loading && <LoadingPage />}

      {getGalleryAudio()}
    </div>
  );
};

export default GalleryRoom;
