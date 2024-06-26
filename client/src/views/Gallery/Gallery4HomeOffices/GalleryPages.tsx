import { useState, CSSProperties } from "react";
import Page from "./Page";
import "./css/GalleryPages.css";
import { IUser, IUsers } from "../../../interfaces";
// store
import { useSelector } from "react-redux";
import { selectWindow } from "../../../store/store";

interface GProps {
  users: IUsers;
  user: IUser;
  currentPage: number;
  changePage: (dir: number) => void;
  numPages: number;
}
const GalleryPages = (props: GProps) => {
  // fill array with numbers from 0 to NUM_PAGES
  const pages = Array.from({ length: props.numPages + 1 }, (_, i) => i);
  const windowUI = useSelector(selectWindow);

  const back = () => {
    props.changePage(-1);
  };

  const next = () => {
    props.changePage(1);
  };

  const usrStyle: CSSProperties = {
    position: "absolute",
    fontSize: 32,
    top: props.user.y,
    left: props.user.x,
  };

  const pageNum = Math.floor(props.currentPage / 2);

  return (
    <div className="PageGallery">
      <div
        className="pagesBg"
        style={{
          backgroundImage: `url(https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/pages/Office_${pageNum}/0.jpg)`,
        }}
      ></div>
      <div className="pagesContainer">
        {pages.map((page) => (
          <Page
            key={page}
            index={page}
            startPage={props.currentPage}
            numPages={props.numPages}
            windowUI={windowUI}
          >
            <></>
          </Page>
        ))}
      </div>
      <div className="pageButtons">
        <button id="backButton" onClick={back}></button>
        <button id="nextButton" onClick={next}></button>
      </div>
    </div>
  );
};

export default GalleryPages;
