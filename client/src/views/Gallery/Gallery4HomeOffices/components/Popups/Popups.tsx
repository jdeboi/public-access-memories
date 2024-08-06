import React, { useState, useEffect, useRef } from "react";
import "./Popups.css";
import { useSelector } from "react-redux";
import { selectWindow } from "../../../../../store/store";
import Frame from "../../../../../components/Frame/Frame";

export default function Popups() {
  const NUM_ADS = 14;
  const POPUP_LASTS = 18000;
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
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleLoadedData = () => {
        console.log("Video loaded:", videoElement.src);

        if (isShowingPopup) {
          videoElement.play().catch((error) => {
            console.error("Error playing video:", error);
          });
          videoElement.volume = 0.3;
        }
      };

      const handlePlay = () => {
        console.log("Video play triggered");

        if (!isShowingPopup) {
          videoElement.pause();
        }
      };

      const handleError = (e: any) => {
        console.error("Video error:", e);
      };

      videoElement.addEventListener("loadeddata", handleLoadedData);
      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("error", handleError);

      return () => {
        videoElement.removeEventListener("loadeddata", handleLoadedData);
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("error", handleError);
      };
    }
  }, [isShowingPopup]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      console.log(
        "Loading video:",
        `https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/ads/${currentImg}.webm`
      );
      videoElement.load();
    }
  }, [currentImg]);

  const handleHide = () => {
    setIsShowingPopup(false);
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
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
            <video
              ref={videoRef}
              className="adVideo"
              src={`https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/ads/${currentImg}.webm`}
              loop
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
