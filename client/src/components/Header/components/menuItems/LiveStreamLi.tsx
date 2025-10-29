import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector } from "react-redux";
import { selectMenu, selectUser } from "../../../../store/store";
import { ShowConfig } from "../../../../data/CurrentShow/ShowConfig";

const LiveStreamLi = () => {
  const menu = useSelector(selectMenu);
  const user = useSelector(selectUser);
  const isClosed = ShowConfig.isClosed;
  const [isShowTime, setIsShowTime] = useState(false);
  const [isBlinking, setBlinking] = useState(false);

  const LiveStreamIsLive = ShowConfig.googleMeet.isLive && !isClosed;
  const LiveStreamURL = ShowConfig.googleMeet.link;
  const LiveStreamStartTime = ShowConfig.googleMeet.goLiveTime;
  const LiveStreamDurationHours = ShowConfig.googleMeet.durationHours;
  const LiveStreamEndTime = new Date(
    LiveStreamStartTime.getTime() + LiveStreamDurationHours * 60 * 60 * 1000
  );

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

  if (!LiveStreamIsLive || !isShowTime) return null;

  return (
    <li className={streamClass} onClick={liveStreamClick}>
      <FontAwesomeIcon icon={faVideo} />
    </li>
  );
};

export default LiveStreamLi;
