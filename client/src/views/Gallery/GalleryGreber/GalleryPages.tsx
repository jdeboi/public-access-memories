import { useState, CSSProperties } from "react";
import Page from "./Page";
import "./GalleryPages.css";
import { IUser, IUsers } from "../../../interfaces";

interface GProps {
  users: IUsers;
  user: IUser;
}
const GalleryPages = (props: GProps) => {
  const [startPage, setStartPage] = useState(0);

  const NUM_PAGES = 20;
  // fill array with numbers from 0 to NUM_PAGES
  const pages = Array.from({ length: NUM_PAGES + 1 }, (_, i) => i);

  const back = () => {
    setStartPage((startPage) => Math.max(startPage - 2, 0));
  };

  const next = () => {
    const endPage = Math.floor(NUM_PAGES / 2) * 2;
    setStartPage((startPage) => Math.min(startPage + 2, endPage - 2));
  };

  const usrStyle: CSSProperties = {
    position: "absolute",
    fontSize: 32,
    top: props.user.y,
    left: props.user.x,
  };

  return (
    <div className="PageGallery">
      <div className="pagesContainer">
        {pages.map((page) => (
          <Page
            key={page}
            index={page}
            startPage={startPage}
            numPages={NUM_PAGES}
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
