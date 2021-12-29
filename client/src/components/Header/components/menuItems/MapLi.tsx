import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectMenu, selectUser } from '../../../../store/store';
import { toggleMap } from '../../../../store/menu';


const MapLi = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const menu = useSelector(selectMenu);
    const [classN, setClassN] = useState("expandable icon");

    useEffect(() => {
        let classMap = "expandable icon";
        if (menu.map.isHidden)
            classMap += " closed";
        else
            classMap += " opened";

        setClassN(classMap);

    }, [menu.map.isHidden, user.roomUrl])

    const mapClicked = () => {
        dispatch(toggleMap());
    }

    if (user.roomUrl === "/") {
        return (
            <li className={classN} onClick={mapClicked}>
                <FontAwesomeIcon icon={faMapMarker} />
            </li>
        )
    }
    return null;
    
};

export default MapLi;