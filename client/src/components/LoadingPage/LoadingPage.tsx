import React from "react";
import "./LoadingPage.css";

import { useSelector } from "react-redux";
import { selectWindow } from "../../store/store";
import { ShowConfig } from "../../data/CurrentShow/ShowConfig";

export default function LoadingPage(props: { progress?: number }) {
  // const windowUI = useSelector(selectWindow);
  const sty = { fontSize: window.innerWidth < 400 ? 30 : 50 };

  const wrongShow = () => {
    return (
      <>
        <div>{ShowConfig.showTitle}</div>
        <p>
          a <a href="https://thewrong.org/">wrong biennale</a> pavilion
        </p>
        {/* <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/tw5_logo_w.png" width={130} /> */}
        {/* <p><a href="/opencall">open call</a></p> */}
        <p>{ShowConfig.galleryTitle}</p>
        {props.progress ? <p>{props.progress}%</p> : null}
      </>
    );
  };

  return (
    <div className="backgroundCover">
      <div className="LoadingPage">
        <div className="title" style={sty}>
          <div>{ShowConfig.galleryTitle}</div>
          <p>a wrong biennale pavilion</p>
          {/* <p><a href="/opencall">open call</a></p> */}

          {props.progress ? <p>{props.progress}%</p> : null}
        </div>
      </div>
    </div>
  );
}
