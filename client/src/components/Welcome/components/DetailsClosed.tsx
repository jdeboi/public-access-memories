import React from "react";
// store
import { useSelector } from "react-redux";
import { selectWindow } from "../../../store/store";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";

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
          <div style={{ fontSize: fonts[2], paddingBottom: "30px" }}>
            While you're free to roam the grounds, we're sorry to inform you
            that the gallery is currently
          </div>
          <div style={{ fontSize: fonts[0], paddingBottom: "30px" }}>
            CLOSED
          </div>
          {!ShowConfig.isResidency && (
            <div style={{ fontSize: fonts[2], paddingBottom: "10px" }}>
              Please join us for the opening on:
            </div>
          )}
          {ShowConfig.isResidency && (
            <div style={{ fontSize: fonts[2], paddingBottom: "10px" }}>
              Please join us for residency open studios on:
            </div>
          )}
          <div style={{ fontSize: fonts[1], paddingBottom: "5px" }}>
            {ShowConfig.showOpens.date}
          </div>
          {/* <div><a href="/opencall">open call</a></div> */}
          {/* {ShowConfig.showOpens.time !== "" ? <div style={{fontSize: fonts[1], paddingBottom: "10px"}}>{ShowConfig.showOpens.time}</div> : null} */}
        </div>
      </div>
    </div>
  );
}
