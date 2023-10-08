import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectMenu, selectMusic } from '../../../../store/store';
import { toggleVolume } from '../../../../store/music';


const VolumeLi = () => {
    const dispatch = useDispatch();
    const menu = useSelector(selectMenu);
    const music = useSelector(selectMusic);
    const [classN, setClassN] = useState("expandable icon");

    useEffect(() => {
        let classV = "expandable icon";
        if (menu.volume.isHidden)
            classV += " closed";
        else
            classV += " opened";

        setClassN(classV);

    }, [menu.volume.isHidden])

    const volumeClicked = () => {
        dispatch(toggleVolume());
    }

    const getVolumeIcon = () => {
        if (music.isMuted || music.volume == 0)
            return <FontAwesomeIcon icon={faVolumeMute} />
        return <FontAwesomeIcon icon={faVolumeUp} />
    }

    return (
        <li className={classN} onClick={volumeClicked}>
            {getVolumeIcon()}
        </li>
    )
};

export default VolumeLi;