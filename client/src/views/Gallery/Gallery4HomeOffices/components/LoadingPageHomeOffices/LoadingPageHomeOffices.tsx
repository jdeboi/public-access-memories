import React from "react";
import "./LoadingPageHomeOffices.css";

// import { useSelector } from "react-redux";
// import { selectWindow } from "../../../../../store/store";
import { ShowConfig } from "../../../../../data/CurrentShow/ShowConfig";

export default function LoadingPageHomeOffices(props: { showTitle: boolean }) {
  // const windowUI = useSelector(selectWindow);
  const sty = { fontSize: window.innerWidth < 400 ? 10 : 30 };

  return (
    <div className="LoadingPageHomeOffices">
      <div className="loadingContainer">
        {props.showTitle ? (
          <div className="title" style={sty}>
            {ShowConfig.galleryTitle}
          </div>
        ) : null}

        <div className="loadingText">Loading...</div>
        <div className="videoContainer">
          <img
            alt="loading"
            className="loadingVideo"
            src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/gifs/loading_sm.webp"
          />
        </div>
      </div>
    </div>
  );
}
