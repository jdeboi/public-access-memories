import React from 'react';
import { rooms } from '../../../../data/RoomConfig';
import { ShowConfig } from '../../../../data/ShowConfig';
import FinderSubmenu from '../FinderSubmenu';

// store
import { useSelector } from 'react-redux';
import { selectWindow, selectUser } from '../../../../store/store';

import { IMainMenu, IListItem } from '../../../../interfaces';
import { useNavigate } from 'react-router-dom';


const MainMenu = (props: IMainMenu) => {
    const windowUI = useSelector(selectWindow);
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const roomsList = rooms.map(rm => {
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
        return (
            <li className="expandable" onClick={() => navigate("/")}>
                <span id="pageTitle">{ShowConfig.galleryTitle}</span>
            </li>
        )
        // return <li><span id="pageTitle">{ShowConfig.galleryTitle}</span></li>
    }

    const isXXSmall = () => {
        return (user.roomUrl !== "/" && windowUI.width < 445);
    }


    if (props.isMenuOn)
        return <FinderSubmenu
            title={ShowConfig.galleryTitle}
            specialClass=""
            listItems={roomsList}
        />
    else if (isXXSmall())
        return <React.Fragment></React.Fragment>;
    else
        return justTitle();

};

export default MainMenu;