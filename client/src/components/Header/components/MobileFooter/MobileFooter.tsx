
import React, { useState, useEffect } from 'react';
import './MobileFooter.css';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faBell, faUser, faMapMarker, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

// store
import { useDispatch, useSelector } from 'react-redux';
import { selectWindow, selectMenu, selectUser, selectMessages } from '../../../../store/store';
import { setOneMenu } from '../../../../store/menu';
import { resetNotifications } from '../../../../store/messages';
import { useLocation } from 'react-router-dom';


const MobileFooter = (props: { avatarClicked: () => void }) => {
    const dispatch = useDispatch();
    const windowUI = useSelector(selectWindow);
    const menu = useSelector(selectMenu);
    const messages = useSelector(selectMessages);
    const user = useSelector(selectUser);
    const [footerClass, setFooterClass] = useState("");
    const { pathname } = useLocation();

    useEffect(() => {
        var fc = "MobileFooter"
        fc += (windowUI.orientation === "landscape" ? " landscape" : "");
        setFooterClass(fc);
    }, [windowUI])



    const getSignInButton = () => {
        const classUser = "icon" + (menu.mobile === "signIn" ? " opened" : " closed");
        return (
            <button className={classUser} onClick={() => dispatch(setOneMenu("signIn"))}>
                <FontAwesomeIcon icon={faUser} />
            </button>
        )
    }

    const getChatButton = () => {
        var classChat = "icon" + (menu.mobile === "chat" ? " opened" : " closed");
        if (messages.notifications) classChat += " notify";
        if (pathname !== "/") {
            classChat += " top";
        }
        return (
            <button className={classChat} onClick={() => chatClicked()}>
                <FontAwesomeIcon icon={faComment} />
                {getChatNotification()}
            </button>
        )
    }

    const getFAQButton = () => {
        let classFaq = "icon";
        classFaq += (menu.mobile === "faq" ? " opened" : " closed");

        return (
            <button className={classFaq} onClick={() => dispatch(setOneMenu("faq"))}>
                <FontAwesomeIcon icon={faQuestionCircle} />
            </button>
        )
    }

    const getMapButton = () => {
        var classMap = "icon";
        if (pathname === "/") {
            classMap += (menu.mobile === "map" ? " opened" : " closed");
            classMap += " top";
        }
        else classMap += " closed disabled";

        return (
            <button className={classMap} onClick={() => dispatch(setOneMenu("map"))}>
                <FontAwesomeIcon icon={faMapMarker} />
            </button>
        )
    }

    const chatClicked = () => {
        dispatch(resetNotifications());
        dispatch(setOneMenu("chat"));
    }

    const getChatNotification = () => {
        let n = messages.notifications;
        if (n) {
            if (n > 10)
                return (<div className="notification">
                    <span className="badge">
                        <FontAwesomeIcon icon={faBell} />
                    </span>
                </div>);
            return (<div className="notification">
                <span className="badge">{n}</span>
            </div>);
        }
        return null;
    }

    if (windowUI.hasFooter) {
        return (
            <div className={footerClass}>
                {pathname === "/" ? getMapButton() : null}
                {getChatButton()}
                {getFAQButton()}
                {getSignInButton()}
            </div>
        )
    }

    return (
        <React.Fragment></React.Fragment>
    )

}

export default MobileFooter;
