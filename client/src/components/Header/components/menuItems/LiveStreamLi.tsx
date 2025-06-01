import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector } from "react-redux";
import { selectMenu, selectUser } from "../../../../store/store";
import { ShowConfig } from "../../../../data/CurrentShow/ShowConfig";

const LiveStreamURL = "https://meet.google.com/eob-ijfy-cxa";
const LiveStreamStartTime = new Date("2025-06-01T10:30:00-05:00"); // 10:30am PM CDT (no daylight savings)
const LiveStreamEndTime = new Date("2025-06-01T21:13:00-05:00"); // 9:00 PM CDT

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
