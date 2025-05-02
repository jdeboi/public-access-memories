import React from "react";
import Draggable from "react-draggable";

interface RoomNoteProps {
  googleDocUrl: string;
}

const RoomNote: React.FC<RoomNoteProps> = ({ googleDocUrl }) => {
  const handleDoubleClick = () => {
    window.open(googleDocUrl, "_blank");
  };

  return (
    <Draggable>
      <img
        src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/txt.png"
        alt="Document Icon"
        onDoubleClick={handleDoubleClick}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          cursor: "pointer",
          width: "40px",
          height: "40px",
        }}
      />
    </Draggable>
  );
};

export default RoomNote;
