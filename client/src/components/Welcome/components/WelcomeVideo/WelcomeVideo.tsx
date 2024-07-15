import React, { useEffect, useState, useRef } from "react";
import "./WelcomeVideo.css";

// components
import CenterModal from "../../../CenterModal/CenterModal";

// store
import { useSelector, useDispatch } from "react-redux";
import { selectWindow, selectMenu } from "../../../../store/store";

interface WelcomeVideoProps {
  nextStep?: () => void;
}

const WelcomeVideo = (props: WelcomeVideoProps) => {
  const menu = useSelector(selectMenu);
  const windowUI = useSelector(selectWindow);
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="welcome-video-container">
      <video
        ref={videoRef}
        src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/HomePage/hello.mp4"
        poster="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/HomePage/welcome.png" // Add the poster attribute here
        className={`video ${isPlaying ? "playing" : ""}`}
      />
      {!isPlaying && (
        <button className="play-button" onClick={handlePlayClick}>
          Play
        </button>
      )}
    </div>
  );
};

export default WelcomeVideo;
