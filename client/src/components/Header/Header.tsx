import React from "react";
import "./Header.css";

import { useSelector } from 'react-redux';
import { selectWindow } from '../../store/store';

import DesktopHeader from './components/DesktopHeader/DesktopHeader';
import MobileHeaderLandscape from "./components/MobileHeader/MobileHeaderLandscape";
import MobileHeaderPortrait from "./components/MobileHeader/MobileHeaderPortrait";

import { IHeaderProps } from '../../interfaces/index';


function Header(props: IHeaderProps) {
    const windowUI = useSelector(selectWindow);

    if (windowUI.isMobile || windowUI.hasFooter) {
        if (windowUI.orientation === "landscape")
            return <MobileHeaderLandscape isClosed={props.isClosed} isMenuOn={props.isMenuOn} />
        return <MobileHeaderPortrait {...props} />
    }

    return <DesktopHeader {...props} />
}

export default Header;