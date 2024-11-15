import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector } from "react-redux";
import { selectMenu, selectUser } from "../../../../store/store";
import { ShowConfig } from "../../../../data/CurrentShow/ShowConfig";

const LiveStreamURL = "https://meet.google.com/dox-teps-wsq";
const LiveStreamStartTime = new Date("2024-11-15T18:30:00-06:00"); // 6:30 PM CST (no daylight savings)
const LiveStreamEndTime = new Date("2024-11-15T21:00:00-06:00"); // 9:00 PM CST

const LiveStreamLi = () => {
  const menu = useSelector(selectMenu);
  const user = useSelector(selectUser);
  const isClosed = ShowConfig.isClosed;
  const [isShowTime, setIsShowTime] = useState(false);
  const [isBlinking, setBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const isBetween =
        currentDate >= LiveStreamStartTime && currentDate <= LiveStreamEndTime;
      setIsShowTime(isBetween);
      if (isBetween) {
        setBlinking((prevBlinking) => !prevBlinking);
      } else {
        setBlinking(false);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  let streamClass = menu.liveStream.isHidden ? " closed" : " opened";
  streamClass +=
    isBlinking && !menu.liveStream.hasClicked ? " liveStreamOn" : "";

  const liveStreamClick = () => {
    openNewWindow();
  };

  const openNewWindow = () => {
    window.open(LiveStreamURL, "_blank");
  };

  if (!isShowTime) return null;

  return (
    <li className={streamClass} onClick={liveStreamClick}>
      <FontAwesomeIcon icon={faVideo} />
    </li>
  );
};

export default LiveStreamLi;
