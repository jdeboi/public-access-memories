import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./Popups.css";
import { useSelector } from "react-redux";
import { selectWindow } from "../../../../../store/store";
import Frame from "../../../../../components/Frame/Frame";

export default function Popups() {
  const NUM_ADS = 14;
  const POPUP_LASTS = 8000;
  const POPUP_MIN_INTERVAL = 20000;
  const POPUP_MAX_INTERVAL = 30000;

  const windowUI = useSelector(selectWindow);
  const [currentImg, setCurrentImg] = useState(0);
  const [isShowingPopup, setIsShowingPopup] = useState(false);
  const [currentStyle, setCurrentStyle] = useState({
    x: 100,
    y: 100,
    w: 300,
    h: 300,
  });

  useEffect(() => {
    if (!windowUI.compositionStarted) {
      return;
    }

    const showPopup = () => {
      setCurrentImg((prevImg) => (prevImg + 1) % NUM_ADS);
      setIsShowingPopup(true);

      setTimeout(() => {
        setIsShowingPopup(false);

        const nextPopupTime = getRandomTime();
        const w = 200 + Math.random() * 300;
        const h = w;
        const newStyle = {
          x: Math.random() * 600,
          y: Math.random() * 600,
          w,
          h,
        };
        setCurrentStyle(newStyle);
        setTimeout(showPopup, nextPopupTime);
      }, POPUP_LASTS);
    };

    const initialPopupTime = getRandomTime();
    const initialTimeout = setTimeout(showPopup, initialPopupTime);

    return () => clearTimeout(initialTimeout);
  }, [windowUI.compositionStarted]);

  const handleHide = () => {
    setIsShowingPopup(false);
  };

  const getRandomTime = (
    min = POPUP_MIN_INTERVAL,
    max = POPUP_MAX_INTERVAL
  ) => {
    return Math.random() * (max - min) + min;
  };

  if (!isShowingPopup) return null;

  return (
    <Frame
      title=""
      isHidden={!isShowingPopup}
      unbounded={false}
      onHide={handleHide}
      windowStyle={{ background: "black" }}
      content={
        <div className="Popups">
          <div className="adVideoContainer">
            <ReactPlayer
              url={`https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/ads/${currentImg}.webm`}
              playing={isShowingPopup}
              loop={true}
              volume={0.3}
              width="100%"
              height="100%"
            />
          </div>
        </div>
      }
      width={currentStyle.w}
      height={currentStyle.h}
      x={currentStyle.x}
      y={currentStyle.y}
      z={100}
    />
  );
}
