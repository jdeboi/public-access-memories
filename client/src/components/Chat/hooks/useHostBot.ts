import React, { useState } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectUserActive } from '../../../store/store';
import { setFollowingHost } from '../../../store/user';
import { addMessage } from '../../../store/messages';

import { IMessage } from '../../../interfaces';

import { getBar } from '../../../data/BotConfig';
const hostLocation = getBar("host");

export const useHostBot = () => {
    const [hostBotJustAsked, setHostBotJustAsked] = useState(false);

    const user = useSelector(selectUser);
    const userActive = useSelector(selectUserActive);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (props.message !== "") {
    //         sendToCheeseBot(props.message);
    //         props.onSent();
    //     }
    // }, [props.message]);

    const sendToHostBot = (txt: string) => {
        const message: IMessage = {
            to: "hostBot",
            from: "me",
            message: txt,
            time: JSON.stringify(new Date()),
            roomUrl: user.roomUrl,
            avatar: user.avatar
        };
        dispatch(addMessage(message));
        setTimeout(() => hostBotRespond(txt), 1000);
    }

    const hostBotRespond = (txt: string) => {

        if (!hostBotJustAsked) {
            const phrase = "hi, do you need help? Y/N.";
            dispatch(addMessage({
                to: "me",
                from: "hostBot",
                message: phrase,
                time: JSON.stringify(new Date()),
                roomUrl: user.roomUrl,
                avatar: userActive.active.avatar
            }));
            setHostBotJustAsked(true);
        }
        else {
            const lc = txt.toLowerCase();
            let phrase = "";
            if (lc === "y" || lc.indexOf("yes") > -1) {
                phrase = "Follow me into the gallery.";
                // dispatch(setFollowingHost(true));
            }
            else {
                phrase = "Ok. Enjoy the show!";
            }
            dispatch(addMessage({
                to: "me",
                from: "hostBot",
                message: phrase,
                time: JSON.stringify(new Date()),
                roomUrl: user.roomUrl,
                avatar: userActive.active.avatar
            }));
            setHostBotJustAsked(false);
        }
    }

    return sendToHostBot;
};

