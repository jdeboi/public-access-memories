import React, { useState, useEffect, useRef } from "react";
import "./Popups.css";
import { useSelector } from "react-redux";
import { selectWindow } from "../../../../../store/store";
import Frame from "../../../../../components/Frame/Frame";

export default function Popups() {
  const NUM_ADS = 7; // Updated to 5 videos
  const POPUP_LASTS = 8000;
  const POPUP_MIN_INTERVAL = 14000;
  const POPUP_MAX_INTERVAL = 22000;

  const windowUI = useSelector(selectWindow);
  const [currentImg, setCurrentImg] = useState(0);
  const [isShowingPopup, setIsShowingPopup] = useState(false);
  const [currentStyle, setCurrentStyle] = useState({
    x: 100,
    y: 100,
    w: 300,
    h: 300,
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const showPopup = () => {
      setCurrentImg((prevImg) => (prevImg + 1) % NUM_ADS);
      setIsShowingPopup(true);

      // Hide popup after POPUP_LASTS milliseconds
      setTimeout(() => {
        setIsShowingPopup(false);

        // Schedule next popup between POPUP_MIN_INTERVAL to POPUP_MAX_INTERVAL milliseconds
        const nextPopupTime = getRandomTime();
        const w = 200 + Math.random() * 300;
        const h = w;
        const newSty = {
          x: Math.random() * 600,
          y: Math.random() * 600,
          w,
          h,
        };
        setCurrentStyle(newSty);
        setTimeout(showPopup, nextPopupTime);
      }, POPUP_LASTS);
    };

    // Initial popup after a random time between POPUP_MIN_INTERVAL to POPUP_MAX_INTERVAL milliseconds
    const initialPopupTime = getRandomTime();
    const initialTimeout = setTimeout(showPopup, initialPopupTime);

    return () => clearTimeout(initialTimeout); // Cleanup timeout on component unmount
  }, [windowUI.contentW, windowUI.contentH]);

  const getRandomTime = (min = POPUP_MIN_INTERVAL, max = POPUP_MAX_INTERVAL) =>
    Math.random() * (max - min) + min;

  return (
    <Frame
      title=""
      isHidden={!isShowingPopup}
      unbounded={false}
      onHide={() => setIsShowingPopup(false)}
      windowStyle={{ background: "black" }}
      content={
        <div className="Popups">
          <div className="adVideoContainer">
            <video
              ref={videoRef}
              className="adVideo"
              src={`https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/ads/${currentImg}.mp4`}
              autoPlay
              loop
              muted
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
