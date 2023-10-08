import { TrackToggle, useTrackToggle } from "@livekit/components-react";
import { Track } from "livekit-client";

interface MicrophoneProps {
  isMuted: boolean;
}

export function MicrophoneToggleButton({ isMuted }: MicrophoneProps) {

  return (
    <TrackToggle
      source={Track.Source.Microphone}
      className={isMuted ? "muted" : "live"}
    />
  );
}
