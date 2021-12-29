import React, { useState } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectUserActive } from '../../../store/store';
import { addMessage } from '../../../store/messages';

import { IMessage } from '../../../interfaces';

import { getBar } from '../../../data/BotConfig';
import { setRandomSong, setSong } from '../../../store/music';
const djLocation = getBar("DJ");

export const useDJBot = () => {
    const [DJBotJustAsked, setDJBotJustAsked] = useState(0);

    const user = useSelector(selectUser);
    const userActive = useSelector(selectUserActive);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (props.message !== "") {
    //         sendToCheeseBot(props.message);
    //         props.onSent();
    //     }
    // }, [props.message]);

    const sendToDJBot = (txt: string) => {
        const message: IMessage = {
            to: "DJBot",
            from: "me",
            message: txt,
            time: JSON.stringify(new Date()),
            roomUrl: user.roomUrl,
            avatar: user.avatar
        };
        dispatch(addMessage(message));
        setTimeout(() => DJBotRespond(txt), 1000);
    }

    const DJBotRespond = (txt: string) => {

        let phrase = "";
        if (DJBotJustAsked === 0) {
            const phrase = "hi! would you like pick a song? Y/N.";
            dispatch(addMessage({
                to: "me",
                from: "DJBot",
                message: phrase,
                time: JSON.stringify(new Date()),
                roomUrl: user.roomUrl,
                avatar: userActive.active.avatar
            }));
            setDJBotJustAsked(1);
        }
        else if (DJBotJustAsked === 1) {
            const lc = txt.toLowerCase();
            phrase = "";
    
           if (lc === "y" || lc.indexOf("yes") > -1) {
                phrase = "Type 1 to get funky, 2 for something jazzy, or 3 for a surprise";
                setDJBotJustAsked(2);
            }
            else {
                phrase = "Ok, I'll keep spinning.";
                setDJBotJustAsked(0);
            }
            dispatch(addMessage({
                to: "me",
                from: "DJBot",
                message: phrase,
                time: JSON.stringify(new Date()),
                roomUrl: user.roomUrl,
                avatar: userActive.active.avatar
            }));
        }
        else {
            const songN = parseInt(txt);
            if (songN == 1 || songN == 2) {
                phrase = "good pick.";
               dispatch(setSong(songN));
    
            }
            else if (songN == 3) {
                phrase = "good pick.";
                dispatch(setRandomSong());
            }
            else {
                phrase = "sorry, I'm a man of simple integers.";
            }
            dispatch(addMessage({
                to: "me",
                from: "DJBot",
                message: phrase,
                time: JSON.stringify(new Date()),
                roomUrl: user.roomUrl,
                avatar: userActive.active.avatar
            }));
            setDJBotJustAsked(0);
        }
    }

    return sendToDJBot;
};
