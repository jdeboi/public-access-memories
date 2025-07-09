import React from "react";

const Room = () => {
  return (
    <div
      className="Room Sketch"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {/* <iframe
        // src="https://editor.p5js.org/lohmeyer5077/full/SLcLMXxUy"
        src="/iframes/eddie/index.html"
        width="100%"
        // height="calc(100% + 50px)"
        height="100%"
        // style={{ marginTop: "-50px", border: "none" }}
        title="Eddie's Studio"
      ></iframe> */}
      {/* <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"> */}
      {/* <iframe
        src="https://www.youtube.com/embed/aPwxdgwGwbI?si=tPirpo3y3esqI5CJ"
        // style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        // frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; vr"
        allowFullScreen
        height="100%"
        width="100%"
        title="360° YouTube Video"
      ></iframe> */}
      <iframe
        src="https://player.vimeo.com/video/1100093366?badge=0&autopause=0&player_id=0&app_id=58479"
        // style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        // frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; gyroscope; accelerometer; vr"
        allowFullScreen
        height="100%"
        width="100%"
        title="360° Vimeo Video"
      ></iframe>
      {/* </div> */}
    </div>
  );
};

export default Room;
