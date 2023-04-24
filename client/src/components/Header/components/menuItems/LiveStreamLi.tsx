import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStream } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectMenu, selectUser } from '../../../../store/store';
import { ShowConfig } from '../../../../data/CurrentShow/ShowConfig';
import { toggleLiveStream } from '../../../../store/menu';


const LiveStreamLi = () => {
    const menu = useSelector(selectMenu);
    const user = useSelector(selectUser);
    const isClosed = ShowConfig.isClosed;
    const dispatch = useDispatch();
    const [liveStreamOn, setLiveStreamOn] = useState(false);

    // TODO - toggle liveStreamOn overy second

    let streamClass = (menu.liveStream.isHidden ? " closed" : " opened");
    streamClass += ((liveStreamOn && !menu.liveStream.hasClicked) ? " liveStreamOn" : "");

    const liveStreamClick = () => {
        dispatch(toggleLiveStream())
    }

    if (isClosed)
      return null;
    return (
      <li className={streamClass} onClick={liveStreamClick}>
        <FontAwesomeIcon icon={faStream} />
      </li>
    )
};

export default LiveStreamLi;