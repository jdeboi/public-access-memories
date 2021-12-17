import React, { useEffect, useState } from 'react';
import { IUser, IUsers } from '../../interfaces';
import './Chat.css';

import ChatMobile from './ChatMobile';
import ChatDesktop from './ChatDesktop';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUserActive, selectWindow } from '../../store/store';
import { setUserActiveChat } from '../../store/userActive';
import { useWineBot } from './hooks/useWineBot';
import { useCocktailBot } from './hooks/useCocktailBot';



interface ChatProps {
    users: IUsers;
}

const Chat = (props: ChatProps) => {
    const userActive = useSelector(selectUserActive);
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();

    const sendToWineBot = useWineBot();
    const sendToCocktailBot = useCocktailBot();
    // currentRecipient: null,
    // const textInput = React.createRef();

    const [textBox, setTextBox] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {

    }, [])


    const setRecipient = (user: IUser | null | undefined) => {
        if (user) {
            if (textBox !== "") {
                // this.setState({currentRecipient: user, buttonDisabled: false});
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


    const sendMessage = (txt: string) => {
        if (txt && userActive.active) {
            if (userActive.active.userName === "Everyone") {
                // sendToAll(message);
            }
            else if (userActive.active.userName === "Room") {
                // sendToRoom(message);
            }
            else if (userActive.active.userName === "wineBot") {
                sendToWineBot(txt);
            }
            else if (userActive.active.userName === "cocktailBot") {
                sendToCocktailBot(txt);
            }
            else if (userActive.active.userName === "cheeseBot") {
                // sendToCheeseBot(message);
            }
            else if (userActive.active.userName === "DJ") {
                // sendToDJ(message);
            }
            else if (userActive.active.userName === "hostBot") {
                // sendToHostBot(message);
            }
            else {
                // sendToOne(txt, userActive.active.id);
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
        <React.Fragment>
            {
                windowUI.isMobile ?
                    <ChatMobile {...cprops} /> :
                    <ChatDesktop {...cprops} />
            }

        </React.Fragment>
    )
};

export default Chat;