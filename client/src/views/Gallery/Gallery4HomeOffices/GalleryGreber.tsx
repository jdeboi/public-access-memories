import React, { useState } from "react";
import p5Types from "p5";
import { IUser, IUsers } from "../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectWindow } from "../../../store/store";
import "./css/GalleryPages.css";

//////////////
// CONFIG
import GallerySketch from "./GallerySketch";
import GalleryPages from "./GalleryPages";
import { setUserRoomUrl } from "../../../store/user";
import LoadingPageHomeOffices from "./components/LoadingPageHomeOffices/LoadingPageHomeOffices";
import CenterModal from "../../../components/CenterModal/CenterModal";
import Popups from "./components/Popups/Popups";

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
  const NUM_LAYOUTS = 15;

  const onSetPageChange = (dir: number) => {
    dir > 0 ? nextPage() : backPage();
  };

  const backPage = () => {
    if (currentPage === 0) return;
    const newPage = Math.max(currentPage - 2, 0);
    setCurrentPage(newPage);
    userNewRoom(newPage.toString());
  };

  const userNewRoom = (room: string) => {
    dispatch(setUserRoomUrl({ roomUrl: room }));
  };

  const nextPage = () => {
    const endPage = NUM_LAYOUTS * 2;
    if (currentPage === endPage - 2) return;

    const newPage = Math.min(currentPage + 2, endPage - 2);
    setCurrentPage(newPage);
    userNewRoom(newPage.toString());
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
        z={2500}
        isRelative={false}
        classN="Welcome"
        content={
          <div>
            <h1>HomeOffices</h1>
            <div>a public access memories show</div>
            <img
              src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/PAM_logos/logo_black_lg.png"
              width={70}
              style={{ paddingBottom: "10px" }}
            />
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
      <Popups />
    </>
  );
};
export default GalleryGreber;
