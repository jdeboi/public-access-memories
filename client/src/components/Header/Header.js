import React from "react";
import "./Header.css";
import Clock from './components/Clock';

function Header() {

    const getDesktopHeader = () => {
        return (
            <header className="Header menuTheme">
                <ul className="left">
                    {/* {this.getArrowIconLi()}
                    {this.getHamburgerSub()}
                    {this.getMainMenuSub()} */}
                </ul>
                <ul className="right">
                    {/* {this.getChatLi()}
                    {this.getMapLi()}
                    {this.getFaqLi()}
                    <li></li> */}
                    <li><Clock /></li>
                    {/* {this.props.user.comp === null ? this.getVolumeLi() : null}
                    {this.getAvatarLi()} */}
                </ul>
            </header>
        )
    }


    return (
        getDesktopHeader()
    );
}

export default Header;