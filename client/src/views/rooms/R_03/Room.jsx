import React from "react";

const Room = () => {
  return (
    <div
      className="Room Sketch"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      }}
    >
      <iframe
        src="https://selixiayxy.github.io/Praying/"
        width="100%"
        height="100%"
        // height="calc(100% + 50px)"
        // style={{ marginTop: "-50px", border: "none" }}
        title="Selicia's Studio"
      ></iframe>
    </div>
  );
};

export default Room;
