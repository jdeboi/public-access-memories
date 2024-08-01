import React, { useState, useRef } from "react";
import p5Types from "p5";
import { IUser, IUsers } from "../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectWindow } from "../../../store/store";
import "./css/GalleryPages.css";
import Pagination from "./components/Pagination/Pagination";

//////////////
// CONFIG
import GallerySketch from "./GallerySketch";
import GalleryPages from "./GalleryPages";
import { setUserRoomPage as setUserRoomLayoutNum } from "../../../store/user";
import LoadingPageHomeOffices from "./components/LoadingPageHomeOffices/LoadingPageHomeOffices";
import CenterModal from "../../../components/CenterModal/CenterModal";
import Popups from "./components/Popups/Popups";
import GoogleDocEmbed from "./components/GoogleDocEmbed/GoogleDocEmbed";
import { GUESTBOOK_PAGE } from "../../../data/Shows/HomeOffices/PageConstants";
// import Calendar from "./components/Calendar/Calendar";

var font: p5Types.Font;

interface ComponentProps {
  users: IUsers;
  isClosed: boolean;
  userMove: (x: number, y: number) => void;
  userNewRoom: (room: string) => void;
  loadingDone: () => void;
  setUserActive: (user: IUser) => void;
  clickedUserChat: (user: IUser) => void;
  setOutside: (state: { isOutside: boolean }) => void;
  showStart: boolean;
  hideStart: () => void;
}

const GalleryGreber = (props: ComponentProps) => {
  const user = useSelector(selectUser);
  const windowUI = useSelector(selectWindow);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const NUM_LAYOUTS = 18;
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  let layoutNum = Math.floor(currentPage / 2);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  const onSetPageChange = (dir: number) => {
    dir > 0 ? nextPage() : backPage();
  };

  const backPage = () => {
    if (currentPage === 0) return;
    const newPage = Math.max(currentPage - 2, 0);
    setCurrentPage(newPage);
    userNewRoomPage(newPage);
  };

  const userNewRoomPage = (roomPage: number) => {
    let layoutNum = Math.floor(roomPage / 2);
    dispatch(setUserRoomLayoutNum({ roomLayoutNum: layoutNum }));
  };

  const nextPage = () => {
    const endPage = NUM_LAYOUTS * 2;
    if (currentPage === endPage - 2) return;

    const newPage = Math.min(currentPage + 2, endPage - 2);
    setCurrentPage(newPage);
    userNewRoomPage(newPage);
  };

  const handleHide = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0; // Reset the video to the start
    }
    props.hideStart();
  };

  return (
    <>
      <GalleryPages
        users={props.users}
        user={user}
        currentPage={currentPage}
        changePage={onSetPageChange}
        numLayouts={NUM_LAYOUTS}
      />
      <div
        className="GallerySketches"
        style={{
          width: windowUI.contentW,
          height: windowUI.contentH,
          zIndex: 30,
        }}
      >
        <GallerySketch
          users={props.users}
          isClosed={props.isClosed}
          userMove={props.userMove}
          userNewRoomPage={userNewRoomPage}
          loadingDone={props.loadingDone}
          setOutside={props.setOutside}
          windowUI={windowUI}
          clickedUserChat={props.clickedUserChat}
          setUserActive={props.clickedUserChat}
          changePage={onSetPageChange}
          currentPage={currentPage}
          numLayouts={NUM_LAYOUTS}
        />
      </div>
      {user.outside && <LoadingPageHomeOffices showTitle={true} />}

      <CenterModal
        title={"Welcome"}
        isHidden={!props.showStart}
        onHide={handleHide}
        z={2000}
        isRelative={false}
        classN="Welcome"
        content={
          <div className="welcome-video-container">
            {props.showStart && (
              <video
                ref={videoRef}
                src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/HomePage/hello.webm"
                poster="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/HomePage/welcome.jpg" // Add the poster attribute here
                className={`video ${isPlaying ? "playing" : ""}`}
              />
            )}
            {!isPlaying && (
              <button className="play-button" onClick={handlePlayClick}>
                Play
              </button>
            )}
          </div>
        }
        buttons={
          <div className="center-buttons">
            <button
              className="standardButton primary"
              onClick={props.hideStart}
            >
              Ok
            </button>
          </div>
        }
      />
      {/* <Popups /> */}
      {layoutNum == GUESTBOOK_PAGE && <GoogleDocEmbed />}
      <Pagination currentLayoutNum={layoutNum + 1} numLayouts={NUM_LAYOUTS} />
    </>
  );
};
export default GalleryGreber;
