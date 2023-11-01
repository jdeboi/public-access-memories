import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectMenu, selectUser } from '../../../../store/store';
import { ShowConfig } from '../../../../data/CurrentShow/ShowConfig';
// import { toggleLiveStream } from '../../../../store/menu';


const LiveStreamLi = () => {
  const menu = useSelector(selectMenu);
  const user = useSelector(selectUser);
  const isClosed = ShowConfig.isClosed;
  // const dispatch = useDispatch();
  // const [liveStreamOn, setLiveStreamOn] = useState(false);
  const [isShowTime, setIsShowTime] = useState(false);
  const [isBlinking, setBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const targetDate = new Date('2023-11-01T18:00:00-07:00'); // PST, UTC-8
      // const targetDate = new Date('2023-10-31T05:53:00-07:00'); // PST, UTC-8 + daylight savings

      
      const currentDate = new Date();
      const isBetween6PMAnd7PM =  currentDate.getTime() >= targetDate.getTime() - 5*60*1000 &&
      currentDate.getTime() < targetDate.getTime() + 3600000;
      setIsShowTime(isBetween6PMAnd7PM);

      setBlinking((prevBlinking) => !prevBlinking);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  let streamClass = (menu.liveStream.isHidden ? " closed" : " opened");
  streamClass += ((isBlinking && !menu.liveStream.hasClicked) ? " liveStreamOn" : "");

  const liveStreamClick = () => {
    // dispatch(toggleLiveStream())
    openNewWindow();
  }

  const openNewWindow = () => {
    window.open('https://meet.google.com/zqa-gcjz-txa?authuser=0&hs=122', '_blank'); // Replace 'https://example.com' with the URL you want to open
  }

  if (isClosed || !isShowTime)
    return null;
  return (
    <li className={streamClass} onClick={liveStreamClick}>
      <FontAwesomeIcon icon={faVideo} />
    </li>
  )
};

export default LiveStreamLi;