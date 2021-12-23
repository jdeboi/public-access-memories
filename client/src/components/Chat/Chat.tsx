import React, { useState } from 'react';
import { IUser, IUsers } from '../../interfaces';
import './Chat.css';

import ChatMobile from './ChatMobile';
import ChatDesktop from './ChatDesktop';

import socket from "../../helpers/Socket";

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectUserActive, selectWindow } from '../../store/store';
import { setUserActiveChat } from '../../store/userActive';
import { addMessage } from '../../store/messages';

// bot hooks
import { useWineBot } from './hooks/useWineBot';
import { useCocktailBot } from './hooks/useCocktailBot';

import { IMessage } from '../../interfaces';
import { useCheeseBot } from './hooks/useCheeseBot';

interface ChatProps {
    users: IUsers;
}

const Chat = (props: ChatProps) => {
    const user = useSelector(selectUser);
    const userActive = useSelector(selectUserActive);
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();

    const sendToWineBot = useWineBot();
    const sendToCocktailBot = useCocktailBot();
    const sendToCheeseBot = useCheeseBot();

    const [textBox, setTextBox] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);



    const setRecipient = (user: IUser | null | undefined) => {
        if (user) {
            if (textBox !== "") {
                setButtonDisabled(false);
                dispatch(setUserActiveChat(user));
            }
            else {
                setButtonDisabled(true);
                dispatch(setUserActiveChat(user));
            }
        }
    }

    const handleTextBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const textBox = event.target.value;
        if (userActive.active && textBox !== "") {
            setTextBox(textBox);
            setButtonDisabled(false);
        }
        else {
            setTextBox(textBox);
            setButtonDisabled(true);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSubmit(textBox);
        }
    }

    const onSubmit = (textBox: string) => {
        if (textBox === "") return;
        if (userActive.active) {
            sendMessage(textBox);
            setTextBox("");
            setButtonDisabled(true);
        }
        else {
            alert("please select recipient");
        }
    }

    const sendToAll = (txt: string) => {
        const message: IMessage = {
            to: "all",
            from: "me",
            message: txt,
            roomUrl: user.roomUrl,
            time: JSON.stringify(new Date()),
            avatar: user.avatar
        };
        if (socket.connected)
            socket.emit('messageAll', message);
        dispatch(addMessage(message));
    }

    const sendToRoom = (txt: string) => {
        let t = JSON.stringify(new Date());
        const message: IMessage = {
            to: "room",
            from: "me",
            message: txt,
            roomUrl: user.roomUrl,
            time: t,
            avatar: user.avatar
        };
        if (socket.connected)
            socket.emit('messageRoom', message);
        dispatch(addMessage(message));
    }

    const sendToOne = (txt: string, socketId: string) => {
        const message: IMessage = {
            from: "me",
            to: userActive.active.userName,
            socketId: socketId,
            roomUrl: user.roomUrl,
            message: txt,
            time: JSON.stringify(new Date()),
            avatar: user.avatar
        };
        if (socket.connected)
            socket.emit('messageUser', message); //sending to individual socketid
        dispatch(addMessage(message));
    };


    const sendMessage = (txt: string) => {
        if (txt && userActive.active) {
            if (userActive.active.userName === "Everyone") {
                sendToAll(txt);
            }
            else if (userActive.active.userName === "Room") {
                sendToRoom(txt);
            }
            else if (userActive.active.userName === "wineBot") {
                sendToWineBot(txt);
            }
            else if (userActive.active.userName === "cocktailBot") {
                sendToCocktailBot(txt);
            }
            else if (userActive.active.userName === "cheeseBot") {
                sendToCheeseBot(txt);
            }
            else if (userActive.active.userName === "DJ") {
                // sendToDJ(message);
            }
            else if (userActive.active.userName === "hostBot") {
                // sendToHostBot(message);
            }
            else {
                sendToOne(txt, userActive.active.id);
            }
        }
    }


    const cprops = {
        sendMessage,
        textBox,
        handleKeyDown,
        handleTextBoxChange,
        users: props.users,
        onSubmit,
        setRecipient
    }

    return (
        <div className="Chat">
            {
                windowUI.isMobile ?
                    <ChatMobile {...cprops} /> :
                    <ChatDesktop {...cprops} />
            }

        </div>
    )
};

export default Chat;