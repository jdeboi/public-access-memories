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
// import GallerySketchEmrys from "./GallerySketchEmrys";
import RoomNote from "../../../components/Residency/RoomNote/RoomNote";
import { GallerySketchTemplate2 } from "../../Gallery/Gallery1/GallerySketchTemplate2";

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

  const isMobile = windowUI.isMobile || windowUI.hasFooter;

  const [showOverlay, setShowOverlay] = useState(false);

  const handleDoubleClick = () => {
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

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
    background:
      "radial-gradient(circle, rgba(167, 255, 89, 0.41) 0%, rgba(83, 163, 115, 1) 50%, rgba(24, 61, 10, 1) 100%)",
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
            background:
              "radial-gradient(circle, rgba(167, 255, 89, 0.41) 0%, rgba(83, 163, 115, 1) 50%, rgba(24, 61, 10, 1) 100%)",
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
            className="standardButton primary"
            onClick={() => setAdultConfirmed(true)}
          >
            I am 18 or older
          </button>
        </div>
      ) : (
        <>
          <div id="p5_loading" className="loadingclass"></div>

          <GallerySketchTemplate2
            users={props.users}
            isClosed={props.isClosed}
            userNewRoom={() => console.log("going to a new room...")}
            isMobile={isMobile}
            user={user}
            toggleOutside={() => console.log("toggle outside")}
            userMove={moveGalleryUserRoom}
            loadingDone={() => dispatch(doneLoadingApp())}
            windowUI={windowUI}
            clickedUserChat={clickedUserChat}
            setUserActive={clickedUserChat}
          />

          {windowUI.loading && <LoadingPage />}
          {isMobile && (
            <div
              id="mobile-warning"
              style={{
                position: "fixed",
                top: "120px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#000000",
                color: "#FF5722",
                border: "solid red",
                padding: "1em 2em",
                borderRadius: "8px",
                fontFamily: "monospace",
                zIndex: 9999,
              }}
            >
              Best viewed non-mobile
            </div>
          )}
          <RoomNote handleDoubleClick={handleDoubleClick} />
          {showOverlay && (
            <div
              style={{
                position: "absolute",
                background: "rgba(0, 0, 0, .8)",
                height: "100%",
                overflow: "hidden",
                top: 0,
                left: 0,
                zIndex: 1000,
                padding: "40px",
                color: "white",
              }}
              onClick={closeOverlay}
            >
              <div className="">
                <div
                  style={{ position: "absolute", top: "30px", right: "30px" }}
                >
                  <button
                    className="standardButton secondary"
                    style={{}}
                    onClick={closeOverlay}
                  >
                    close
                  </button>
                </div>
                <br />
                <h2>Statement</h2>

                <p>
                  The AIDS epidemic existed parallel to the Internet boom. A
                  frenzy of moral panic allowed for heightened scrutiny and
                  policing of public zones, which historically held centers for
                  cruising folk. Often trees were knocked down, stalls cleared.
                  Open park plans no longer offered crevices to hold these
                  clandestine acts. As physical cruising locations were shut
                  down and disrupted, the digital world became a location for
                  connection.
                </p>
                <p>
                  This forest is a specific forest. It is patchworked together,
                  where sexy wishes lay in the knot of a tree, between two
                  sprouting leaves, or in a pocket of mud. Hidden in the binary
                  foliage are anonymized “personals” left on a Chicago-based
                  Bulletin Board System (BBS) from 1990. BBS’ were hugely
                  popular throughout the 1980s and 1990s as a proto-Internet
                  social communication platform. The BBS, which is intended for
                  gay men, is a remnant of online gay culture during the AIDS
                  epidemic.
                </p>
                <h4>- Emrys Brandt</h4>
              </div>
            </div>
          )}
          {getGalleryAudio()}
        </>
      )}
    </div>
  );
};

export default EmrysGalleryRoom;
