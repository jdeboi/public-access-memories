import React from 'react';
// store
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';

export default function DetailsStart() {
  const windowUI = useSelector(selectWindow);

  const fontsBig = [40, 20, 14, 12];
  const fontsSmall = [30, 18, 14, 12];
  const fontsXSmall = [28, 16, 12, 12];
  let fonts = fontsBig;
  if (windowUI.width < 350) {
    fonts = fontsXSmall;
  }
  else if (windowUI.width < 500) {
    fonts = fontsSmall;
  }


  return (
    <div className="Welcome-Details">
      <div className="Details" >
        <div className="Details-txt">
          <div style={{ fontSize: fonts[0], paddingBottom: "0px" }}>Hyper</div>
          <div style={{ fontSize: fonts[0], paddingBottom: "0px" }}>Textual</div>
          <div style={{ fontSize: fonts[0], paddingBottom: "80px" }}>Gallery</div>

          <div style={{ fontSize: fonts[3], paddingBottom: "10px" }}><a href="https://www.instagram.com/jdeboi/">a pavillion</a></div>
          <div style={{ fontSize: fonts[3], paddingBottom: "10px" }}>2022</div>
        </div>
      </div>

    </div>
  )
}
