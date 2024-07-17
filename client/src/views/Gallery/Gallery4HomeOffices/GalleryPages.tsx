import { useState, useEffect, CSSProperties } from "react";
import Page from "./Page";
import "./css/GalleryPages.css";
import { IUser, IUsers, IWindowUI } from "../../../interfaces";
// store
import { useSelector } from "react-redux";
import { selectWindow } from "../../../store/store";

interface GProps {
  users: IUsers;
  user: IUser;
  currentPage: number;
  changePage: (dir: number) => void;
  numLayouts: number;
}
const GalleryPages = (props: GProps) => {
  // fill array with numbers from 0 to NUM_PAGES
  const pages = Array.from({ length: props.numLayouts * 2 }, (_, i) => i);
  const windowUI = useSelector(selectWindow);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

  const getRightButtonClass = () => {
    const dim = 100;
    let classN = "page-button page-button-corner";

    if (
      props.user.x > windowUI.contentW - dim &&
      props.user.y > windowUI.contentH - dim
    ) {
      classN += " page-button-over";
    } else if (
      mousePos.x > windowUI.contentW - dim &&
      mousePos.y > windowUI.contentH - dim
    ) {
      classN += " page-button-over";
    }
    return classN;
  };

  const getLeftButtonClass = () => {
    const dim = 100;
    let classN = "page-button page-button-corner";

    if (props.user.x < dim && props.user.y > windowUI.contentH - dim) {
      classN += " page-button-over";
    } else if (mousePos.x < dim && mousePos.y > windowUI.contentH - dim) {
      classN += " page-button-over";
    }
    return classN;
  };

  const layoutNum = Math.floor(props.currentPage / 2);

  return (
    <div
      className="PageGallery"
      style={{
        width: windowUI.contentW,
        height: windowUI.contentH,
      }}
    >
      <div
        className="pagesBg"
        style={{
          width: windowUI.contentW,
          height: windowUI.contentH,
          backgroundImage: `url(https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/BackgroundTextures/${
            layoutNum % 5
          }.jpg)`,
          //backgroundImage: `url(https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/pages/Office_${layoutNum}/0.jpg)`,
        }}
      ></div>
      <div className="pagesContainer">
        {pages.map((page) => (
          <Page
            key={page}
            index={page}
            startPage={props.currentPage}
            numLayouts={props.numLayouts}
            windowUI={windowUI}
          >
            <></>
          </Page>
        ))}
      </div>
      <div className="pageButtons">
        {layoutNum !== 0 && (
          <button id="backButton" className={getLeftButtonClass()}>
            &lt;
          </button>
        )}
        {layoutNum !== props.numLayouts - 1 && (
          <button id="nextButton" className={getRightButtonClass()}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default GalleryPages;
