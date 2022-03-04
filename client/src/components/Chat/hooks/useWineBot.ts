import React, { useState } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectUserActive } from '../../../store/store';
import { addWine } from '../../../store/user';
import { addMessage } from '../../../store/messages';

import { IMessage } from '../../../interfaces';

import { getBar } from '../../../data/BotConfig';
import socket from '../../../helpers/Socket';
const wineLocation = getBar("wine");

export const useWineBot = () => {
    const [wineBotJustAsked, setWineBotJustAsked] = useState(false);

    const user = useSelector(selectUser);
    const userActive = useSelector(selectUserActive);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (props.message !== "") {
    //         sendToWineBot(props.message);
    //         props.onSent();
    //     }
    // }, [props.message]);

    const sendToWineBot = (txt: string) => {
        const message: IMessage = {
            to: "wineBot",
            from: "me",
            fromUser: "me",
            message: txt,
            time: JSON.stringify(new Date()),
            roomUrl: user.roomUrl,
            avatar: user.avatar
        };
        // console.log("MESSAGE", message);
        dispatch(addMessage(message));
        setTimeout(() => wineBotRespond(txt), 1000);
    }

    const wineBotRespond = (txt: string) => {

        if (!wineBotJustAsked) {
            const phrase = "hi, would you like some wine? Y/N.";
            dispatch(addMessage({
                to: "me",
                from: "wineBot",
                fromUser: "wineBot",
                message: phrase,
                time: JSON.stringify(new Date()),
                roomUrl: user.roomUrl,
                avatar: userActive.active.avatar
            }));
            setWineBotJustAsked(true);
        }
        else {
            const lc = txt.toLowerCase();
            let phrase = "";
            if (lc === "y" || lc.indexOf("yes") > -1) {
                phrase = "Stop by the bar to pick up your glass.";
                dispatch(addWine({ location: wineLocation }));
            }
            else {
                phrase = "Cool, I don't drink either.";
            }
            dispatch(addMessage({
                to: "me",
                from: "wineBot",
                fromUser: "wineBot",
                message: phrase,
                time: JSON.stringify(new Date()),
                roomUrl: user.roomUrl,
                avatar: userActive.active.avatar
            }));
            setWineBotJustAsked(false);
        }
    }

    return sendToWineBot;
};

