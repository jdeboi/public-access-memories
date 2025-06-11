import React, { useEffect, useState } from "react";
import RoomNote from "../../../components/Residency/RoomNote/RoomNote";

const Room = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/cthompto/a-walk-in-the-dark/main/README.md"
    )
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  const handleDoubleClick = () => {
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div
      className="Room Sketch"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <iframe
        src="https://cthompto.github.io/a-walk-in-the-dark/"
        width="100%"
        height="100%"
        title="Chelsea Thompto's Studio"
      ></iframe>
      <RoomNote handleDoubleClick={handleDoubleClick} />
      {showOverlay && (
        <div
          style={{
            position: "absolute",
            background: "rgba(0, 0, 0, .8)",

            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
        >
          <div className="" style={{ padding: "40px" }}>
            <div
              style={{
                position: "absolute",
                top: "30px",
                right: "30px",
              }}
            >
              <button
                className="standardButton secondary"
                style={{}}
                onClick={closeOverlay}
              >
                close
              </button>
              <div>{markdown}</div>
            </div>
            <br />
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
