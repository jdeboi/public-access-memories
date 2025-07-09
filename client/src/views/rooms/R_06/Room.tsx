import React from "react";

const Room = () => {
  return (
    <div
      className="Room Sketch"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <iframe
        // src="https://editor.p5js.org/lohmeyer5077/full/SLcLMXxUy"
        src="/iframes/eddie/index.html"
        width="100%"
        // height="calc(100% + 50px)"
        height="100%"
        // style={{ marginTop: "-50px", border: "none" }}
        title="Eddie's Studio"
      ></iframe>
    </div>
  );
};

export default Room;
