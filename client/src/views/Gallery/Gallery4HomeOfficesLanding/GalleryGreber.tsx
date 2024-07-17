import React, { useState, useRef } from "react";
import p5Types from "p5";
import { IUser, IUsers } from "../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectWindow } from "../../../store/store";
import "../Gallery4HomeOffices/css/GalleryPages.css";

//////////////
// CONFIG
import GallerySketch from "./GallerySketch";
import { setUserRoomUrl } from "../../../store/user";
import LoadingPageHomeOffices from "../Gallery4HomeOffices/components/LoadingPageHomeOffices/LoadingPageHomeOffices";
import CenterModal from "../../../components/CenterModal/CenterModal";
import GalleryPages from "./GalleryPages";

var font: p5Types.Font;

interface ComponentProps {
  users: IUsers;
  isClosed: boolean;
  userMove: (x: number, y: number) => void;
  userNewRoom: (room: string) => void;
  loadingDone: () => void;
  setUserActive: (user: IUser) => void;
  clickedUserChat: (user: IUser) => void;
  moveGalleryUser: (x: number, y: number) => void;
  setOutside: (state: { isOutside: boolean }) => void;
  showStart: boolean;
  hideStart: () => void;
}

const GalleryGreber = (props: ComponentProps) => {
  const user = useSelector(selectUser);
  const windowUI = useSelector(selectWindow);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const NUM_LAYOUTS = 1;
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const onSetPageChange = (dir: number) => {
    return;
    //dir > 0 ? nextPage() : backPage();
  };

  const backPage = () => {
    // if (currentPage === 0) return;
    // const newPage = Math.max(currentPage - 2, 0);
    // setCurrentPage(newPage);
    // userNewRoom(newPage.toString());
  };

  const userNewRoom = (room: string) => {
    dispatch(setUserRoomUrl({ roomUrl: room }));
  };

  const nextPage = () => {
    // const endPage = NUM_LAYOUTS * 2;
    // if (currentPage === endPage - 2) return;
    // const newPage = Math.min(currentPage + 2, endPage - 2);
    // setCurrentPage(newPage);
    // userNewRoom(newPage.toString());
  };

  return (
    <>
      <GalleryPages
        users={props.users}
        user={user}
        currentPage={0}
        changePage={onSetPageChange}
        numLayouts={1}
      />
      <div className="GallerySketches" style={{ zIndex: 30 }}>
        <GallerySketch
          users={props.users}
          isClosed={props.isClosed}
          userMove={props.moveGalleryUser}
          userNewRoom={props.userNewRoom}
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
        onHide={props.hideStart}
        z={2000}
        isRelative={false}
        classN="Welcome"
        content={
          <div className="welcome-video-container">
            <video
              ref={videoRef}
              src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/HomePage/hello.mp4"
              poster="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/HomePage/welcome.png" // Add the poster attribute here
              className={`video ${isPlaying ? "playing" : ""}`}
            />
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
    </>
  );
};
export default GalleryGreber;
