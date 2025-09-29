import React from "react";

// This component isn't being used in place of the Gallery Sketch
const Room = () => {
  return (
    <div
      className="Room Sketch"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "white",
      }}
    >
      <iframe
        src="https://driftinglab.github.io/unnatural-language/"
        width="100%"
        height="100%"
        title="(Un)natural Language"
      ></iframe>
    </div>
  );
};

export default Room;
