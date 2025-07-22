import React from "react";
import { useSelector } from "react-redux";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import { selectWindow } from "../../../store/store";
import { Link } from "react-router-dom";

export default function DetailsStart() {
  const windowUI = useSelector(selectWindow);

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
    <div className="flex flex-1 flex-col items-center justify-center text-center py-10">
      <div className="text-black mb-6 text-3xl">{ShowConfig.galleryTitle}</div>
      <img
        src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/PAM_logos/logo_black_lg.png"
        width={70}
        className="mb-6"
        alt="PAM logo"
      />
      <div className="text-gray-500 mb-1">a Wrong Biennale pavilion</div>

      <div className="text-black text-base mb-1">
        <Link
          to="/opencall"
          style={{ color: "blue" }}
          className="underline transition-colors duration-150"
        >
          Open Call
        </Link>
      </div>

      {/* Optional: Uncomment if you want to bring these back */}
      {/* 
      <h4 className="text-white text-base mb-1">
        <a href="/newsletter" className="underline hover:text-blue-200">
          Join Newsletter
        </a>
      </h4>
      */}
    </div>
  );
}
