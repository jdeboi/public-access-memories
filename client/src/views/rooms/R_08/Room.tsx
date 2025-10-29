// components/RoomVideo.tsx
"use client";
import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { selectMusic, selectWindow } from "../../../store/store";

function RoomVideo({
  src,
  poster,
  isPlaying = true,
  startMuted = true,
}: {
  src: string;
  poster?: string;
  isPlaying?: boolean;
  startMuted?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const windowUI = useSelector(selectWindow);
  const music = useSelector(selectMusic);

  return (
    <div
      ref={wrapRef}
      className="relative w-screen h-screen bg-black overflow-hidden"
    >
      <ReactPlayer
        url={src}
        playing={isPlaying}
        muted={!windowUI.compositionStarted || music.isMuted} // autoplay on most browsers requires muted=true
        loop
        playsinline // iOS inline playback
        controls={false} // show browser controls (optional)
        width="100%"
        height="100%"
        // Make sure the video fits like object-contain
        style={{ position: "absolute", inset: 0, background: "black" }}
        config={{
          file: {
            forceVideo: true,
            attributes: {
              poster, // optional poster image
              controlsList: "nodownload",
              crossOrigin: "anonymous", // helpful if you ever draw frames to a canvas
            },
          },
        }}
      />
    </div>
  );
}

// This component isn't being used in place of the Gallery Sketch
const Room = () => {
  return (
    <RoomVideo
      src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/debox/warner/Artificial_Archive_+SCRYING_INTIMACIES_Rodell_Warner.mp4"
      // poster="https://.../thumb.jpg"
      isPlaying={true}
      startMuted={true}
    />
  );
};

export default Room;
