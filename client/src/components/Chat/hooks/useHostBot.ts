import React, { useState } from 'react';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectUserActive } from '../../../store/store';
import { setFollowingHost } from '../../../store/user';
import { addMessage } from '../../../store/messages';

import { IMessage } from '../../../interfaces';

import { getBar, hostBotFirstRoom } from '../../../data/BotConfig';
import { rooms } from '../../../data/RoomConfig';
import { userNearEntrance } from '../../../helpers/helpers';
import { ShowConfig } from '../../../data/ShowConfig';
const hostLocation = getBar("host");

export const useHostBot = () => {
    const [hostBotJustAsked, setHostBotJustAsked] = useState(0);

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
            fromUser: "me",
            message: txt,
            time: JSON.stringify(new Date()),
            roomUrl: user.roomUrl,
            avatar: user.avatar
        };
        dispatch(addMessage(message));
        setTimeout(() => hostBotRespond(txt), 1000);
    }

    // const hostBotRespond = (txt: string) => {

    //     if (hostBotJustAsked === 0) {
    //         sendMessage("hi, do you need help? Y/N.");
    //         setHostBotJustAsked(1);
    //     }
    //     else if (hostBotJustAsked === 1) {
    //         const lc = txt.toLowerCase();
    //         if (lc === "y" || lc.indexOf("yes") > -1) {
    //             if (userNearEntrance(user)) {
    //                 sendMessage("Follow me into the gallery!");
    //                 setHostBotJustAsked(2);
    //                 dispatch(setFollowingHost(true));
    //             }
    //             else {
    //                 sendMessage("Sorry, I can't help you from a distance. Come find me outside the main entrance to begin the tour.");
    //                 setHostBotJustAsked(0);
    //             }
    //         }
    //         else {
    //             sendMessage("Ok. Enjoy the show!");
    //             setHostBotJustAsked(0);
    //         }
    //     }
    //     else if (hostBotJustAsked === 2) {
    //         if (!user.isFollowingHost) {
    //             const artist = rooms[hostBotFirstRoom].artist;
    //             const title = rooms[hostBotFirstRoom].title;
    //             const phrase = `This is the first room by the artist ${artist}. It's titled, ${title}.
    //         To check out this work, walk into the door and down the stairs. Got it? Y/N`;
    //             sendMessage(phrase);
    //             setHostBotJustAsked(3);
    //         }
    //     }
    //     else if (hostBotJustAsked === 3) {
    //         sendMessage("You can also click the menu in the title bar to access rooms and / or get additional information about artists. Enjoy the show!");
    //         setHostBotJustAsked(4);
    //     }
    //     else if (hostBotJustAsked === 4) {
    //         const phrases = [
    //             "screenshots, photos, are encouraged!",
    //             "Check out the top menu for information about the show.",
    //             "Want to contribute to this gallery? Curate a show? Get in touch!",
    //             "Wikipedia says net art refers to a group of artists who have worked in the medium of Internet art since 1994.",
    //             "Artsy says Post-Internet refers to a current trend in art and criticism concerned with the impact of the Internet on art and culture.",
    //             "10000110100101111101",
    //             "public access memories was created in 2022",
    //             "I hope you enjoy the show!"
    //         ];
    //         let r = Math.floor(Math.random()*phrases.length);
    //         sendMessage(phrases[r]);
    //     }

    // }

    const hostBotRespond = (txt: string) => {

        if (hostBotJustAsked === 0) {
            sendMessage("hi, do you need help? Y/N.");
            setHostBotJustAsked(1);
        }
        else if (hostBotJustAsked === 1) {
            const lc = txt.toLowerCase();
            if (lc === "y" || lc.indexOf("yes") > -1) {
                if (ShowConfig.link == "homebody")
                    sendMessage("Enter the glass doors to get into the gallery.");
                else if (ShowConfig.link == "as-i-recall")
                    sendMessage("Click / tap on the floppies to see artists' work!");
                else
                    sendMessage("There's an FAQ button on the top menu. Look for the question mark.");
                setHostBotJustAsked(2);
            }
            else {
                sendMessage("Ok. Enjoy the show!");
                setHostBotJustAsked(0);
            }
        }
        else if (hostBotJustAsked === 2) {
            if (ShowConfig.link == "homebody")
                sendMessage("See artwork in rooms by walking in the doorway and down the stairs.");
            else if (ShowConfig.link == "as-i-recall")
                sendMessage("Try dragging the floppies!");
            setHostBotJustAsked(3);
        }
        else if (hostBotJustAsked === 3) {
            sendMessage("You can also click the menu in the title bar to get additional information about artists. Enjoy the show!");
            setHostBotJustAsked(4);
        }
        else if (hostBotJustAsked === 4) {
            const phrases = [
                "screenshots, photos, are encouraged!",
                "Check out the top menu for information about the show.",
                "Want to contribute to this gallery? Curate a show? Get in touch!",
                "Wikipedia says net art refers to a group of artists who have worked in the medium of Internet art since 1994.",
                "Artsy says Post-Internet refers to a current trend in art and criticism concerned with the impact of the Internet on art and culture.",
                "10000110100101111101",
                "public access memories was created in 2022",
                "I hope you enjoy the show!"
            ];
            let r = Math.floor(Math.random() * phrases.length);
            sendMessage(phrases[r]);
        }

    }

    const sendMessage = (phrase: string) => {
        dispatch(addMessage({
            to: "me",
            from: "hostBot",
            fromUser: "hostBot",
            message: phrase,
            time: JSON.stringify(new Date()),
            roomUrl: user.roomUrl,
            avatar: userActive.active.avatar
        }));
    }

    return sendToHostBot;
};