import React, { useState } from "react";
import RoomNote from "../../../components/Residency/RoomNote/RoomNote";

// This component isn't being used in place of the Gallery Sketch
const Room = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleDoubleClick = () => {
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <div className="Room Sketch" style={{ width: "100%", height: "100%" }}>
      <iframe
        src="https://heartfelt-tanuki-2798f5.netlify.app/"
        width="100%"
        height="100%"
        style={{ background: "white" }}
        title="Yeli's Studio"
      ></iframe>
      <RoomNote handleDoubleClick={handleDoubleClick} />
      {showOverlay && (
        <div
          style={{
            position: "absolute",
            background: "rgba(0, 0, 0, .8)",
            height: "100%",
            overflow: "hidden",
            top: 0,
            left: 0,
            zIndex: 1000,
            padding: "40px",
          }}
          onClick={closeOverlay}
        >
          <div className="">
            <div style={{ position: "absolute", top: "30px", right: "30px" }}>
              <button
                className="standardButton secondary"
                style={{}}
                onClick={closeOverlay}
              >
                close
              </button>
            </div>
            <br />
            <h2>Statement</h2>

            <h4>Plants always know which way to go/grow/blow</h4>
            <div>---</div>
            <br />
            <p>
              On a late summer night I went on a bike ride in an unfamiliar
              city. About an hour into it, my phone was dying and the sun that
              was setting and I still wasn’t near the end, where the best views
              were supposed to be. I got off my bike and stewed for a while,
              trying to make a decision that would save me from some discomfort
              (being stuck on an island at night with a dead phone and tired
              legs), and give me a chance to see a beautiful view, something I’d
              already biked so far for. My life is full of those moments:
              agitation over a direction, fear of unwittingly making a move that
              I would regret for years to come.
            </p>
            <p>
              Throughout the year I had been taking pictures of plants bending
              towards the sun during my walks/hikes. Something about them
              fascinated me. The assuredness with which they moved. They knew
              exactly what to do–which way to lean to catch the sunlight, what
              angle to lean to maximize sunlight while still maintaining
              connection with their roots. They knew which way to go and how far
              they would have to move to get there: the essentials of
              navigation. They knew what I didn’t during that bike ride.
            </p>
            <p>
              I wanted to bring that innate but external sense of direction to
              the web, a place where most often we are in charge of where our
              cursor goes, where almost all actions are a consequence of how we
              choose to move. I wanted to explore surrendering to some internal
              mechanism, letting it dictate where we move.
            </p>
            <h4>- Omayeli Arenyeka</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
