import React from "react";
// store
import { useSelector } from "react-redux";
import { selectWindow } from "../../../store/store";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import { Link } from "react-router-dom";

export default function DetailsClosed() {
  const windowUI = useSelector(selectWindow);

  let fontsBig = [40, 20, 14, 12, 10];
  let fontsSmall = [30, 18, 14, 12, 10];
  let fontsXSmall = [28, 16, 12, 12, 10];
  let fonts = fontsBig;
  if (windowUI.width < 350) {
    fonts = fontsXSmall;
  } else if (windowUI.width < 500) {
    fonts = fontsSmall;
  }

  return (
    <div className="Welcome-Details">
      <div className="Details closed">
        <div className="Details-txt">
          <div className="mb-3">
            While you're free to roam the grounds, we're sorry to inform you
            that the gallery is currently
          </div>
          <div className="text-4xl mb-3">CLOSED</div>
          {!ShowConfig.isResidency && (
            <div className="mb-6">Please join us for the opening on:</div>
          )}
          {ShowConfig.isResidency && (
            <div className="mb-6">
              Please join us for residency open studios on:
            </div>
          )}
          <div className="windows p-2 font-mono max-w-100 m-auto">
            <div className="font-sm mb-2">{ShowConfig.showOpens.date}</div>
            {ShowConfig.calendarLink && (
              <div className="text-sm">
                <Link
                  to={ShowConfig.calendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  🗓️ Add to your calendar!
                </Link>
              </div>
            )}
          </div>
          {/* <div><a href="/opencall">open call</a></div> */}
          {/* {ShowConfig.showOpens.time !== "" ? <div style={{fontSize: fonts[1], paddingBottom: "10px"}}>{ShowConfig.showOpens.time}</div> : null} */}
        </div>
      </div>
    </div>
  );
}
