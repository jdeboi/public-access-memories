import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectMenu } from '../../../../store/store';
import { toggleMap } from '../../../../store/menu';


const MapLi = () => {
    const dispatch = useDispatch();
    const menu = useSelector(selectMenu);
    const [classN, setClassN] = useState("expandable icon");

    useEffect(() => {
        let classMap = "expandable icon";
        if (menu.map.isHidden)
            classMap += " closed";
        else
            classMap += " opened";

        setClassN(classMap);

    }, [menu.map.isHidden])

    const mapClicked = () => {
        dispatch(toggleMap());
    }

    return (
        <li className={classN} onClick={mapClicked}>
            <FontAwesomeIcon icon={faMapMarker} />
        </li>
    )
};

export default MapLi;