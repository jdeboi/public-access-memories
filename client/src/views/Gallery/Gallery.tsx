import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import ReactAudioPlayer from "react-audio-player";
import "./Gallery.css";
import { useNavigate } from "react-router-dom";

import GalleryResidency from "./Gallery0Residency/GallerySketch";
import GallerySketch1 from "./Gallery1/GallerySketch";
import GallerySketch2 from "./Gallery2/GallerySketch";
import GallerySketch3 from "./Gallery3/GallerySketch";
import GalleryGreber from "./Gallery4HomeOffices/GalleryGreber";
import Gallery5DeboxSketch from "./Gallery5Debox/Gallery5DeboxSketch";

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
  DEBOX_ID,
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
  const { id, users, isClosed, showWelcome } = props;

  const user = useSelector(selectUser);
  const windowUI = useSelector(selectWindow);
  const music = useSelector(selectMusic);
  const userActive = useSelector(selectUserActive); // (kept if used elsewhere)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const audioPlayer = useRef<ReactAudioPlayer>(null);
  const [showStart, setShowStart] = useState(true);

  // set gallery id + attempt autoplay once mounted / id changes
  useEffect(() => {
    dispatch(setGalleryId(id));
    audioPlayer.current?.audioEl?.current
      ?.play()
      .catch((err) => console.error("Audio playback failed:", err));
  }, [id, dispatch]);

  // external welcome hides start screen
  useEffect(() => {
    if (showWelcome) setShowStart(false);
  }, [showWelcome]);

  // kick off composition when ready
  useEffect(() => {
    if (!showStart && !showWelcome) dispatch(startComposition());
  }, [showWelcome, showStart, dispatch]);

  const clickedUserChat = useCallback(
    (otherUser: IUser) => {
      if (otherUser.id !== user.id) {
        dispatch(setUserActiveChat(otherUser));
        if (windowUI.isMobile || windowUI.hasFooter)
          dispatch(setOneMenu("chat"));
        else dispatch(showChat());
      }
    },
    [dispatch, user.id, windowUI.isMobile, windowUI.hasFooter]
  );

  const getVolume = useCallback(() => {
    const dj = getBar("DJ", id);
    const djpos = p5ToUserCoords(dj.x, dj.y, getCurrentPageGlobalConfig(id));
    const dx = djpos.x - user.x;
    const dy = djpos.y - user.y;
    const dis = Math.sqrt(dx * dx + dy * dy);
    const minVol = 0.05;
    if (dis > 1000) return minVol;
    return mapVal(dis, 0, 1000, 1, minVol);
  }, [id, user.x, user.y]);

  const moveGalleryUser = useCallback(
    (x: number, y: number) => {
      dispatch(setSketchVolume(getVolume()));
      dispatch(moveUser({ x, y, galleryIndex: id }));
    },
    [dispatch, getVolume, id]
  );

  const moveGalleryUserNormal = useCallback(
    (x: number, y: number) => {
      dispatch(setSketchVolume(getVolume()));
      dispatch(moveUserNormal({ x, y, galleryIndex: id }));
    },
    [dispatch, getVolume, id]
  );

  const userNewRoom = useCallback(
    (room: string) => {
      navigate(room);
      dispatch(setUserRoomUrl({ roomUrl: room }));
    },
    [dispatch, navigate]
  );

  // style: compute once per gallery id (no mutation in switch)
  const galleryStyle = useMemo<React.CSSProperties>(() => {
    const base = {
      backgroundRepeat: "repeat",
      backgroundSize: "600px 350px",
      backgroundImage: "url(/backgroundImgs/wallpaper3.jpg)",
    } as React.CSSProperties;

    switch (id) {
      case RESIDENCY_ID:
        return { ...base, backgroundImage: "none" };
      case ASIRECALL_ID:
        return {
          ...base,
          backgroundImage: "url(/backgroundImgs/asirecall_bg.png)",
          backgroundSize: "500px 500px",
        };
      case FIELDSOFVIEW_ID:
        return {
          ...base,
          backgroundImage: "url(/backgroundImgs/bg.png)",
          backgroundSize: "700px 700px",
        };
      case HOMEOFFICES_ID:
        return { ...base, backgroundImage: "none" };
      case DEBOX_ID:
        return {
          ...base,
          backgroundImage: "url(/backgroundImgs/debox_tex.webp)",
          backgroundSize: "400px 400px",
        };
      default:
        return base;
    }
  }, [id]);

  const getGallery = () => {
    switch (id) {
      case RESIDENCY_ID:
        return (
          <GalleryResidency
            users={users}
            isClosed={isClosed}
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
            users={users}
            isClosed={isClosed}
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
        return (
          <GallerySketch2
            users={users}
            isClosed={isClosed}
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
        return (
          <GallerySketch3
            users={users}
            isClosed={isClosed}
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
        return (
          <GalleryGreber
            users={users}
            showStart={showStart}
            hideStart={() => setShowStart(false)}
            isClosed={isClosed}
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
      case DEBOX_ID:
        return (
          <Gallery5DeboxSketch
            useRoomCoords={false}
            user={user}
            users={users}
            isClosed={isClosed}
            userMove={moveGalleryUser}
            userNewRoom={userNewRoom}
            loadingDone={() => dispatch(doneLoadingApp())}
            toggleOutside={() => dispatch(toggleOutside())}
            isMobile={windowUI.isMobile}
            clickedUserChat={clickedUserChat}
            setUserActive={clickedUserChat}
            roomPath={"/"}
          />
        );
      default:
        return (
          <GallerySketch1
            users={users}
            isClosed={isClosed}
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

  const getLoading = () =>
    id === HOMEOFFICES_ID ? (
      <LoadingPageHomeOffices showTitle />
    ) : (
      <LoadingPage />
    );

  const getHomeOfficesAudio = () => {
    const pamURL =
      "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/sounds/";
    const slug = getLayoutSlug(user.roomLayout);
    return `${pamURL}${slug}.mp3`;
  };

  const getGalleryAudio = () => {
    if (showWelcome || showStart) return null;

    const volume = music.isMuted ? 0 : getVolume();

    if (id === HOMEOFFICES_ID) {
      return (
        <ReactAudioPlayer
          src={getHomeOfficesAudio()}
          autoPlay
          volume={volume}
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
        volume={volume}
        controls={false}
        loop
        ref={audioPlayer}
      />
    );
  };

  const getMap = () => {
    switch (id) {
      case RESIDENCY_ID:
        return null;
      case HOMEBODY_ID:
        return <MiniMap users={filterUsers(user, users)} x={20} y={20} />;
      case ASIRECALL_ID:
        return <MiniMapAIR users={filterUsers(user, users)} x={20} y={20} />;
      case FIELDSOFVIEW_ID:
        return <MiniMapFOV users={filterUsers(user, users)} x={20} y={20} />;
      case HOMEOFFICES_ID:
        return <></>;
      case DEBOX_ID:
        return (
          <MiniMap
            users={filterUsers(user, users).filter(
              (u) => u.roomUrl === "/" || u.roomUrl === "/debox"
            )}
            x={20}
            y={20}
            img="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/gallery/map_debox.png"
            backgroundStr="rgba(22, 30, 45, .9)"
            gConfig={getCurrentPageGlobalConfig(DEBOX_ID)}
            galleryId={DEBOX_ID}
          />
        );
      default:
        return <MiniMap users={filterUsers(user, users)} x={20} y={20} />;
    }
  };

  return (
    <div className="Gallery Sketch" style={galleryStyle}>
      <div id="p5_loading" className="loadingclass" />
      {getGallery()}
      {windowUI.loading ? getLoading() : getMap()}
      {getGalleryAudio()}
    </div>
  );
};

export default Gallery;
