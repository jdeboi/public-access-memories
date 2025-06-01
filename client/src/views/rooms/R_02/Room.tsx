import React from "react";

// This component isn't being used in place of the Gallery Sketch
const Room = () => {
  return (
    <div
      className="Room Sketch"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <iframe
        src="https://memory.metzger.love"
        width="100%"
        height="100%"
        // height="calc(100% + 50px)"
        // style={{ marginTop: "-50px", border: "none" }}
        title="Amanda's Studio"
      ></iframe>
    </div>
  );
};

export default Room;
