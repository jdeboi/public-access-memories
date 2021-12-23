import React, { useState } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectUserActive } from '../../../store/store';
import { addCheese } from '../../../store/user';
import { addMessage } from '../../../store/messages';

import { IMessage } from '../../../interfaces';

import { getBar } from '../../../data/Bars';
const cheeseLocation = getBar("cheese");

export const useCheeseBot = () => {
    const [cheeseBotJustAsked, setCheeseBotJustAsked] = useState(false);

    const user = useSelector(selectUser);
    const userActive = useSelector(selectUserActive);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (props.message !== "") {
    //         sendToCheeseBot(props.message);
    //         props.onSent();
    //     }
    // }, [props.message]);

    const sendToCheeseBot = (txt: string) => {
        const message: IMessage = {
            to: "cheeseBot",
            from: "me",
            message: txt,
            time: JSON.stringify(new Date()),
            roomUrl: user.roomUrl,
            avatar: user.avatar
        };
        dispatch(addMessage(message));
        setTimeout(() => cheeseBotRespond(txt), 1000);
    }

    const cheeseBotRespond = (txt: string) => {

        if (!cheeseBotJustAsked) {
            const phrase = "hi, would you like some cheese? Y/N.";
            dispatch(addMessage({
                to: "me",
                from: "cheeseBot",
                message: phrase,
                time: JSON.stringify(new Date()),
                roomUrl: user.roomUrl,
                avatar: userActive.active.avatar
            }));
            setCheeseBotJustAsked(true);
        }
        else {
            const lc = txt.toLowerCase();
            let phrase = "";
            if (lc === "y" || lc.indexOf("yes") > -1) {
                phrase = "Stop by to pick up tasty bytes.";
                dispatch(addCheese({ location: cheeseLocation }));
            }
            else {
                phrase = "Ok.";
            }
            dispatch(addMessage({
                to: "me",
                from: "cheeseBot",
                message: phrase,
                time: JSON.stringify(new Date()),
                roomUrl: user.roomUrl,
                avatar: userActive.active.avatar
            }));
            setCheeseBotJustAsked(false);
        }
    }

    return sendToCheeseBot;
};

