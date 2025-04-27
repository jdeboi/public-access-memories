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
import { selectMusic, selectUser, selectWindow } from "../../../store/store";
import { setUserRoomUrl, moveUserRoom } from "../../../store/user";
import { setUserActiveChat } from "../../../store/userActive";
import { setOneMenu, showChat } from "../../../store/menu";
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
  const [adultConfirmed, setAdultConfirmed] = useState(false);

  const user = useSelector(selectUser);
  const windowUI = useSelector(selectWindow);
  const music = useSelector(selectMusic);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const audioPlayer = useRef<ReactAudioPlayer>(null);
  const [showStart, setShowStart] = useState(true);

  useEffect(() => {
    if (user.roomUrl !== "/emrys") {
      dispatch(setUserRoomUrl({ roomUrl: "/emrys" }));
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
    <div className="Gallery Sketch" style={adultConfirmed ? GalleryStyle : {}}>
      {!adultConfirmed ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1500,
          }}
        >
          <h1>Adult Content Warning</h1>
          <p>
            This studio room contains material intended for adults. Please
            confirm you are 18 or older to proceed.
          </p>
          <button
            className="standardButton secondary"
            onClick={() => setAdultConfirmed(true)}
          >
            I am 18 or older
          </button>
        </div>
      ) : (
        <>
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
          {getGalleryAudio()}
        </>
      )}
    </div>
  );
};

export default EmrysGalleryRoom;
