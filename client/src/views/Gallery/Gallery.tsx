import React, { useState, useEffect, useRef } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./Gallery.css";
import { useNavigate } from "react-router-dom";

import GalleryResidency from "./Gallery0Residency/GallerySketch";
import GallerySketch1 from "./Gallery1/GallerySketch";
import GallerySketch2 from "./Gallery2/GallerySketch";
import GallerySketch3 from "./Gallery3/GallerySketch";
import GalleryGreber from "./Gallery4HomeOffices/GalleryGreber";

import { getCurrentPageGlobalConfig } from "../../data/CurrentShow/GlobalConfig";

import { IUser, IUsers } from "../../interfaces";
import { filterUsers, mapVal } from "../../helpers/helpers";

import LoadingPage from "../../components/LoadingPage/LoadingPage";
import LoadingPageHomeOffices from "../../views/Gallery/Gallery4HomeOffices/components/LoadingPageHomeOffices/LoadingPageHomeOffices";
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
import {
  setUserRoomUrl,
  moveUser,
  toggleOutside,
  setOutside,
  moveUserNormal,
} from "../../store/user";
import { setUserActiveChat } from "../../store/userActive";
import { setGalleryId, setOneMenu, showChat } from "../../store/menu";
import { setSketchVolume } from "../../store/music";
import { doneLoadingApp, startComposition } from "../../store/window";

import { getBar } from "../../data/CurrentShow/BotConfig";
import { p5ToUserCoords } from "../../helpers/coordinates";
import { getLayoutSlug } from "../../data/Shows/HomeOffices/PageConstants";
import {
  ASIRECALL_ID,
  FIELDSOFVIEW_ID,
  HOMEBODY_ID,
  HOMEOFFICES_ID,
  RESIDENCY_ID,
} from "../../data/CurrentShow/GalleryConfig";

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
  const audioPlayer = useRef<ReactAudioPlayer>(null);
  const [showStart, setShowStart] = useState(true);

  useEffect(() => {
    // dispatch to set gallery id
    dispatch(setGalleryId(props.id));

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
    switch (props.id) {
      case RESIDENCY_ID:
        GalleryStyle.backgroundImage = "none";
        return (
          <GalleryResidency
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

      case HOMEBODY_ID:
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
      case ASIRECALL_ID:
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
      case FIELDSOFVIEW_ID:
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
      case HOMEOFFICES_ID:
        GalleryStyle.backgroundImage = "none";
        return (
          <GalleryGreber
            users={props.users}
            showStart={showStart}
            hideStart={() => setShowStart(false)}
            isClosed={props.isClosed}
            userMove={moveGalleryUserNormal}
            userNewRoom={userNewRoom}
            loadingDone={() => dispatch(doneLoadingApp())}
            setOutside={(state: { isOutside: boolean }) =>
              dispatch(setOutside(state))
            }
            clickedUserChat={clickedUserChat}
            setUserActive={clickedUserChat}
          />
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

  const getLoading = () => {
    if (props.id == 4 || props.id == 5) {
      return <LoadingPageHomeOffices showTitle={true} />;
    }
    return <LoadingPage />;
  };

  const getHomeOfficesAudio = () => {
    const pamURL =
      "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/sounds/";

    let layout = user.roomLayout;
    let slug = getLayoutSlug(layout);
    return pamURL + slug + ".mp3";
  };

  const getGalleryAudio = () => {
    if (props.showWelcome || showStart) {
      return null;
    }
    if (props.id == 4 || props.id == 5) {
      return (
        <ReactAudioPlayer
          src={getHomeOfficesAudio()}
          autoPlay
          volume={music.isMuted ? 0 : getVolume()}
          controls={false}
          loop
          ref={audioPlayer}
          onError={(e) => console.error("Audio playback error:", e)}
        />
      );
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

  const getMap = () => {
    switch (props.id) {
      case RESIDENCY_ID:
        return null;
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
      case 5:
        return <></>;
      default:
        return <MiniMap users={filterUsers(user, props.users)} x={20} y={20} />;
    }
  };
  return (
    <div className="Gallery Sketch" style={GalleryStyle}>
      <div id="p5_loading" className="loadingclass"></div>

      {getGallery()}

      {windowUI.loading ? getLoading() : getMap()}

      {getGalleryAudio()}
    </div>
  );
};

export default Gallery;
