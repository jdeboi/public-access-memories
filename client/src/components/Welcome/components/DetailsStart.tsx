import React from 'react';
// store
import { useSelector } from 'react-redux';
import { ShowConfig } from '../../../data/ShowConfig';
import { selectWindow } from '../../../store/store';



export default function DetailsStart() {
  const windowUI = useSelector(selectWindow);

  // const fontsBig = [40, 20, 14, 12];
  // const fontsSmall = [30, 18, 14, 12];
  // const fontsXSmall = [28, 16, 12, 12];
  // let fonts = fontsBig;
  // if (windowUI.width < 350) {
  //   fonts = fontsXSmall;
  // }
  // else if (windowUI.width < 500) {
  //   fonts = fontsSmall;
  // }


  return (
    <div className="Welcome-Details">
      <div className="Details" >
        <div className="Details-txt">
          {/* <div style={{ fontSize: fonts[0], paddingBottom: "0px" }}>public</div>
          <div style={{ fontSize: fonts[0], paddingBottom: "0px" }}>access</div>
          <div style={{ fontSize: fonts[0], paddingBottom: "80px" }}>memories</div>

          <div style={{ fontSize: fonts[3], paddingBottom: "10px" }}>a <a href="https://thewrong.org/">wrong biennale</a> pavillion</div>
          <div style={{ fontSize: fonts[3], paddingBottom: "10px" }}>2022</div> */}

          <h2 style={{ paddingBottom: "20px" }}>{ShowConfig.showTitle}</h2>
          {/* <h4 style={{ paddingBottom: "10px" }}><a href="https://thewrong.org/">a wrong biennale pavillion</a></h4> */}
          <h4 style={{ paddingBottom: "40px" }}>
            hosted by
            <br />
            public access memories gallery
          </h4>
          {/* <a href="https://thewrong.org/"><img width="130px" src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/tw5_logo.png" /></a> */}
          <h4><a href="/opencall">open call</a></h4>
        </div>
      </div>

    </div>
  )
}
