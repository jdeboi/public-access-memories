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
          <video
            className="loadingVideo"
            src="/online_assets/dave/Haiper.mov"
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </div>
  );
}
