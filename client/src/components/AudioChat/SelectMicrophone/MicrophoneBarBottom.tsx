import React from 'react';

// import { useMobile } from "@/util/useMobile";
// import { GithubLink } from "./GithubLink";
import { MicrophoneToggleButton } from "./MicrophoneToggleButton";
import { MicrophoneSelector } from "./MicrophoneSelector";
// import { PoweredByLiveKit } from "./PoweredByLiveKit";

import './MicrophoneBar.css';

interface MicrophoneBarProps {
  isMuted: boolean
}

const MicrophoneBarBottom: React.FC<MicrophoneBarProps> = ({ isMuted }: MicrophoneBarProps) => {
  // const mobile = useMobile();
  return (
    <div className="MicrophoneBar">
      {/* <div className="barItem">
        <div className={`recordingButton ${isMuted ? "isNotRecording" : "isRecording"}`}></div>
      </div> */}
      <div className="barItem"><MicrophoneToggleButton isMuted={isMuted} /></div>
      <div className="barItem"><MicrophoneSelector /></div>
    </div>
  );
}

export default MicrophoneBarBottom;