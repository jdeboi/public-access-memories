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
  toggleOutside: () => void;
}

const GalleryGreber = (props: ComponentProps) => {
  const user = useSelector(selectUser);
  const windowUI = useSelector(selectWindow);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const NUM_PAGES = 8;

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
    const endPage = Math.floor(NUM_PAGES / 2) * 2;
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
        numPages={NUM_PAGES}
      />
      <div className="GallerySketches" style={{ zIndex: 30 }}>
        <GallerySketch
          users={props.users}
          isClosed={props.isClosed}
          userMove={props.moveGalleryUser}
          userNewRoom={props.userNewRoom}
          loadingDone={props.loadingDone}
          toggleOutside={props.toggleOutside}
          windowUI={windowUI}
          clickedUserChat={props.clickedUserChat}
          setUserActive={props.clickedUserChat}
          changePage={onSetPageChange}
          currentPage={currentPage}
          numPages={NUM_PAGES}
        />
      </div>
    </>
  );
};
export default GalleryGreber;
