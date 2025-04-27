import React, { useState, useEffect, useRef } from "react";
import ReactAudioPlayer from "react-audio-player";
// import "./Gallery.css";
import { useNavigate } from "react-router-dom";

import { getCurrentPageGlobalConfig } from "../../../../data/CurrentShow/GlobalConfig";

import { IUser, IUsers } from "../../../../interfaces";
import { filterUsers, mapVal } from "../../../../helpers/helpers";

import LoadingPage from "../../../../components/LoadingPage/LoadingPage";

// store
import { useSelector, useDispatch } from "react-redux";
import {
  selectMusic,
  selectUser,
  selectUserActive,
  selectWindow,
} from "../../../../store/store";
import {
  setUserRoomUrl,
  moveUser,
  toggleOutside,
  setOutside,
  moveUserNormal,
  moveUserRoom,
} from "../../../../store/user";
import { setUserActiveChat } from "../../../../store/userActive";
import { setOneMenu, showChat } from "../../../../store/menu";
import { setSketchVolume } from "../../../../store/music";
import { doneLoadingApp, startComposition } from "../../../../store/window";

import { getBar } from "../../../../data/CurrentShow/BotConfig";
import { p5ToUserCoords } from "../../../../helpers/coordinates";
import HostBotRoomSketch from "./HostBotRoomSketch";

interface IGallery {
  id: number;
  users: IUsers;
  isClosed: boolean;
  showWelcome: boolean;
}

const HostBotRoom = (props: IGallery) => {
  const user = useSelector(selectUser);
  const windowUI = useSelector(selectWindow);
  const music = useSelector(selectMusic);
  const dispatch = useDispatch();
  const userActive = useSelector(selectUserActive);
  const navigate = useNavigate();
  const audioPlayer = useRef<ReactAudioPlayer>(null);
  const [showStart, setShowStart] = useState(true);

  useEffect(() => {
    if (user.roomUrl !== "/lounge") {
      dispatch(setUserRoomUrl({ roomUrl: "/lounge" }));
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
    // dispatch(setSketchVolume(getVolume()));
    dispatch(moveUserRoom({ x, y }));
    const newUser = { ...user };
    newUser.roomX = x;
    newUser.roomY = y;
  };

  const GalleryStyle = {
    backgroundRepeat: "repeat",
    backgroundSize: "600px 350px",
    backgroundColor: "blue",
    // backgroundImage: "url(/backgroundImgs/wallpaper3.jpg)",
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

      <div
        className="windows"
        style={{
          position: "absolute",
          top: 150,
          left: 50,
          //   display: "flex",
          //   justifyContent: "center",
          //   marginTop: "20px",
          width: "500px",
          height: "300px",
          zIndex: 0,
          backgroundColor: "#000",
        }}
      >
        {/* iframe container */}
        <iframe
          src="https://docs.google.com/document/d/e/2PACX-1vSmgRHDz3oT4mPxZpnmYtkCH_XgzIYvsNlChFRTwgGHxjAlqYqyW94Wf-Srf9_wDoqSFZLIxK99sP08/pub?embedded=true"
          width="100%"
          height="100%"
          allowFullScreen
          title="Collaborative Doc"
        ></iframe>

        {/* Edit button */}
      </div>
      <a
        href="https://docs.google.com/document/d/14PKbUZ-v3uWBDff6tNxQGrG9aCq6MpaiNmktWlOf4lE/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "absolute",
          top: 125,
          left: 35,
          backgroundColor: "#ffffffcc",
          border: "1px solid #ccc",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          fontSize: "20px",
          color: "#333",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          zIndex: 5,
        }}
        title="Edit Document"
      >
        ✏️
      </a>

      <div style={{ zIndex: 1 }}>
        <HostBotRoomSketch
          users={props.users}
          isClosed={props.isClosed}
          userMove={moveGalleryUserRoom}
          loadingDone={() => dispatch(doneLoadingApp())}
          windowUI={windowUI}
          clickedUserChat={clickedUserChat}
          setUserActive={clickedUserChat}
        />
      </div>
      {windowUI.loading && <LoadingPage />}
    </div>
  );
};

export default HostBotRoom;
