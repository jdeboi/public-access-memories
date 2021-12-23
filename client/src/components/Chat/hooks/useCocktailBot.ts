import React, { useState } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectUserActive } from '../../../store/store';
import { addCocktail } from '../../../store/user';
import { addMessage } from '../../../store/messages';

import { IMessage } from '../../../interfaces';

import { getBar } from '../../../data/Bars';
const cocktailLocation = getBar("cocktail");

export const useCocktailBot = () => {
    const [cocktailBotJustAsked, setCocktailBotJustAsked] = useState(false);

    const user = useSelector(selectUser);
    const userActive = useSelector(selectUserActive);
    const dispatch = useDispatch();


    const sendToCocktailBot = (txt: string) => {
        const message: IMessage = {
            to: "cocktailBot",
            from: "me",
            roomUrl: user.roomUrl,
            message: txt,
            time: JSON.stringify(new Date()),
            avatar: user.avatar
        };
        // console.log("MESSAGE", message);
        dispatch(addMessage(message));
        setTimeout(() => cocktailBotRespond(txt), 1000);
    }


    const cocktailBotRespond = (txt: string) => {
        if (!cocktailBotJustAsked) {
            const phrase = "hi, would you like a martini? Y/N.";
            dispatch(addMessage({
                to: "me",
                from: "cocktailBot",
                message: phrase,
                time: JSON.stringify(new Date()),
                roomUrl: user.roomUrl,
                avatar: userActive.active.avatar
            }));
            setCocktailBotJustAsked(true);
        }
        else {
            const lc = txt.toLowerCase();
            let phrase = "";
            if (lc === "y" || lc.indexOf("yes") > -1) {
                phrase = "Stop by the bar to pick up your glass.";
                dispatch(addCocktail({ location: cocktailLocation }))
            }
            else {
                phrase = "Cool, I don't drink either.";
            }
            dispatch(addMessage({
                to: "me",
                from: "cocktailBot",
                message: phrase,
                time: JSON.stringify(new Date()),
                roomUrl: user.roomUrl,
                avatar: userActive.active.avatar
            }));
            setCocktailBotJustAsked(false);
        }
    }


    return sendToCocktailBot;
};

