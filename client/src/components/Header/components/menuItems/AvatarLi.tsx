import React, { useEffect, useState } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectMenu, selectUser } from '../../../../store/store';

interface IAvatarLi  {
    avatarClicked : () => void
}

const AvatarLi = (props: IAvatarLi) => {

    const dispatch = useDispatch();
    const menu = useSelector(selectMenu);
    const user = useSelector(selectUser);

    // useEffect(() => {
    //     let classChat = "expandable icon";
    //     if (menu.chat.isHidden)
    //         classChat += " closed";
    //     else
    //         classChat += " opened";

    //     setClassN(classChat);

    // }, [menu.chat.isHidden])

    // const chatClicked = () => {
    //     dispatch(resetNotifications());
    //     dispatch(toggleChat());
    // }

    const getAvatar = (): string => {
        if (user) {
            return (user.avatar);
        }
        return "";
    }

    return (
        <li className="header-avatar expandable" onClick={props.avatarClicked}>
            {getAvatar()}
        </li>
    )
};

export default AvatarLi;