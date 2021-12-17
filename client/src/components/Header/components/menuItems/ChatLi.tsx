import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faBell } from "@fortawesome/free-solid-svg-icons";
// import { faComment, faBell, faMapMarker, faQuestionCircle, faVolumeUp, faVolumeDown, faVolumeOff, faUser  } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectMenu, selectMessages } from '../../../../store/store';
import { toggleChat } from '../../../../store/menu';
import { resetNotifications } from '../../../../store/messages';


const ChatLi = () => {
    const dispatch = useDispatch();
    const menu = useSelector(selectMenu);
    const messages = useSelector(selectMessages);
    const [classN, setClassN] = useState("expandable icon");

    useEffect(() => {
        let classChat = "expandable icon";
        if (menu.chat.isHidden)
            classChat += " closed";
        else
            classChat += " opened";

        if (messages.notifications)
            classChat += " notify";

        setClassN(classChat);

    }, [menu.chat.isHidden, messages.notifications])

    const chatClicked = () => {
        dispatch(resetNotifications());
        dispatch(toggleChat());
    }

    const getChatNotification = () => {
        let n = messages.notifications;
        if (n === 0)
            return <React.Fragment></React.Fragment>
        if (n > 10)
            return (
                <div className="notification">
                    <span className="badge"><FontAwesomeIcon icon={faBell} /></span>
                </div>);
        return (<div className="notification"><span className="badge">{n}</span></div>);
    }

    return (
        <li className={classN} onClick={chatClicked}>
            <FontAwesomeIcon icon={faComment} />
            {getChatNotification()}
        </li>
    )
};

export default ChatLi;