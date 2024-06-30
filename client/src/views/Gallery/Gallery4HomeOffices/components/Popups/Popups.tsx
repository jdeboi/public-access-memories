import React, { useState, useEffect } from "react";
import "./Popups.css";
import { useSelector } from "react-redux";
import { selectWindow } from "../../../../../store/store";
import Frame from "../../../../../components/Frame/Frame";

export default function Popups() {
  const NUM_ADS = 7;
  const POPUP_LASTS = 5000;
  const POPUP_MIN_INTERVAL = 8000;
  const POPUP_MAX_INTERVAL = 20000;

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
    const showPopup = () => {
      setCurrentImg((prevImg) => (prevImg + 1) % NUM_ADS);
      setIsShowingPopup(true);

      // Hide popup after 5 seconds
      setTimeout(() => {
        setIsShowingPopup(false);

        // Schedule next popup between 8 to 20 seconds
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

    // Initial popup after a random time between 8 to 20 seconds
    const initialPopupTime = getRandomTime();
    const initialTimeout = setTimeout(showPopup, initialPopupTime);

    return () => clearTimeout(initialTimeout); // Cleanup timeout on component unmount
  }, [windowUI.contentW, windowUI.contentH]);

  const getRandomTime = (
    min: number = POPUP_MIN_INTERVAL,
    max: number = POPUP_MAX_INTERVAL
  ) => Math.random() * (max - min) + min;

  return (
    <Frame
      title=""
      isHidden={!isShowingPopup}
      unbounded={false}
      onHide={() => setIsShowingPopup(false)}
      windowStyle={{ background: "white" }}
      content={
        <div className="Popups">
          <div className="adVideo">
            <video
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
