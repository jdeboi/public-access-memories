import React from 'react';
import { RoomConfig } from '../../../../views/rooms/RoomConfig';
import FinderSubmenu from '../FinderSubmenu';

// store
import { useSelector } from 'react-redux';
import { selectWindow, selectUser } from '../../../../store/store';

import { IMainMenu, IListItem } from '../../../../interfaces';


const MainMenu = (props: IMainMenu) => {
    const title = "white cube";
    const windowUI = useSelector(selectWindow);
    const user = useSelector(selectUser);

    const roomsList = RoomConfig.map(rm => {
        let val: IListItem = {
            title: rm.title,
            link: rm.link
        };
        if (rm.shortcut)
            val.shortcut = rm.shortcut;
        if (rm.classN)
            val.classN = rm.classN;
        return val;
    })

    const justTitle = () => {
        return <li><span id="pageTitle">{title}</span></li>
    }

    const isXXSmall = () => {
        return (user.room !== "gallery" && windowUI.width < 445);
    }


    if (props.isMenuOn)
        return <FinderSubmenu
            title={title}
            specialClass=""
            listItems={roomsList}
        />
    else if (isXXSmall() && user.room !== "gallery")
        return <React.Fragment></React.Fragment>;
    else
        return justTitle();

};

export default MainMenu;