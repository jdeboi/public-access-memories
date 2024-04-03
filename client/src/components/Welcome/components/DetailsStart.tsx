import React from "react";
// store
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import { selectWindow } from "../../../store/store";

export default function DetailsStart() {
  const windowUI = useSelector(selectWindow);

  const wrongIntro = () => {
    return (
      <div className="Welcome-Details">
        <div className="Details">
          <div className="Details-txt">
            <h2 style={{ paddingBottom: "20px" }}>{ShowConfig.showTitle}</h2>
            <h4 style={{ paddingBottom: "40px" }}>
              <a href="https://thewrong.org/">a wrong biennale pavilion</a>
            </h4>
            <h4 style={{ paddingBottom: "10px" }}>
              hosted by
              <br />
              Public Access Memories
            </h4>
          </div>
        </div>
      </div>
    );
  };

  const fontsBig = [40, 20, 14, 12];
  const fontsSmall = [30, 18, 14, 12];
  const fontsXSmall = [28, 16, 12, 12];
  let fonts = fontsBig;
  if (windowUI.width < 350) {
    fonts = fontsXSmall;
  } else if (windowUI.width < 500) {
    fonts = fontsSmall;
  }

  return (
    <div className="Welcome-Details">
      <div className="Details">
        <div className="Details-txt">
          <div style={{ fontSize: fonts[0], paddingBottom: "0px" }}>public</div>
          <div style={{ fontSize: fonts[0], paddingBottom: "0px" }}>access</div>
          <div style={{ fontSize: fonts[0], paddingBottom: "30px" }}>
            memories
          </div>

          {/* <h4><a href="/opencall">open call</a></h4> */}
          <h4>
            <a href="/newsletter">join newsletter</a>
          </h4>
        </div>
      </div>
    </div>
  );
}
