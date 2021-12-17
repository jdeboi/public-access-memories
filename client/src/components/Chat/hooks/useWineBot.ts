import React, { useState } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectUserActive } from '../../../store/store';
import { addWine } from '../../../store/user';
import { addMessage} from '../../../store/messages';


export const useWineBot = () => {
    const wineLocation = {type: "wine", x: 0, y: 0, w: 100, h: 50}
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
        const message = { to: "wineBot", from: "me", message: txt, time: new Date(), avatar: user.avatar };
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
                message: phrase, 
                time: new Date(), 
                avatar: userActive.active.avatar 
            }));
            setWineBotJustAsked(true);
        }
        else {
            const lc = txt.toLowerCase();
            let phrase = "";
            if (lc === "y" || lc.indexOf("yes") > -1) {
                phrase = "Stop by the bar to pick up your glass.";
                dispatch(addWine({location: wineLocation}));
            }
            else {
                phrase = "Cool, I don't drink either.";
            }
            dispatch(addMessage({
                to: "me",
                from: "wineBot",
                message: phrase,
                time: new Date(),
                avatar: userActive.active.avatar
            }));
            setWineBotJustAsked(false);
        }
    }

    return sendToWineBot;
};

