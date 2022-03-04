
import React from 'react';
import MainMenu from '../menuItems/MainMenu';
import Hamburger from '../menuItems/Hamburger';
import { IMainMenu } from '../../../../interfaces';

import Clock from '../Clock';
import ArrowLi from '../menuItems/ArrowLi';
import ChatLi from '../menuItems/ChatLi';
import MapLi from '../menuItems/MapLi';
import FaqLi from '../menuItems/FaqLi';
import VolumeLi from '../menuItems/VolumeLi';
import AvatarLi from '../menuItems/AvatarLi';
import LiveStreamLi from '../menuItems/LiveStreamLi';

interface IDH extends IMainMenu {
    avatarClicked: () => void
}

const DesktopHeader = (props: IDH) => {

    return (
        <header className="Header menuTheme">
            <ul className="left">
                <ArrowLi />
                <Hamburger />
                <MainMenu
                    isClosed={props.isClosed}
                    isMenuOn={props.isMenuOn}
                />
            </ul>
            <ul className="right">
                {/* <LiveStreamLi /> */}
                <ChatLi />
                <MapLi />
                <FaqLi />
                <li></li>
                <li><Clock /></li>
                <VolumeLi />
                <AvatarLi avatarClicked={props.avatarClicked} />
            </ul>
        </header>
    )
}

export default DesktopHeader;