import React from "react";
import Draggable from "react-draggable";

interface RoomNoteProps {
  handleDoubleClick: () => void;
}

const RoomNote: React.FC<RoomNoteProps> = ({ handleDoubleClick }) => {
  return (
    <div
      style={{ position: "absolute", bottom: "20px", right: "20px" }}
      onDoubleClick={handleDoubleClick}
    >
      <img
        src="https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/txt.png"
        alt="Document Icon"
        onDoubleClick={handleDoubleClick}
        style={{
          cursor: "pointer",
          width: "80px",
          height: "80px",
        }}
      />
      {/* <div onDoubleClick={handleDoubleClick} style={{ color: "black" }}>
        Statement
      </div> */}
    </div>
  );
};

export default RoomNote;
