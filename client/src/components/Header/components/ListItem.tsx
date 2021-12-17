import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectWindow } from '../../../store/store';

import { IListItem } from '../../../interfaces';

const ListItem = (props: IListItem) => {
    const windowUI = useSelector(selectWindow);
    const [classN, setClassN] = useState("");
    const [shortCut, setShortCut] = useState("");

    useEffect(() => {
        const sc = getShortcut(props.shortcut, windowUI.width, windowUI.isMobile);
        setShortCut(sc);
        let classn = props.classN ? props.classN : "";
        classn += (sc === '') ? ' noShortcut' : ' shortcut';
        setClassN(classn);
    }, [windowUI])

    const getMenuItem = (title: string, shortcut: string) => {
        return (
            <div className="flexRow">
                <div className="title flex1">{title}</div>
                <div className="shortcut">{shortcut}</div>
            </div>
        )
    }

    return (
        <li className={classN}>
            <Link to={props.link}>
                {getMenuItem(props.title, shortCut)}
            </Link>
        </li>
    );

}

function getShortcut(shortcut: string | undefined, width: number, isMobile: boolean) {
    if (isMobile || !shortcut || shortcut === "")
        return "";
    const parser = new DOMParser();
    const parsedString = parser.parseFromString(shortcut, 'text/html');
    return parsedString.body.innerHTML;
}

export default ListItem;
