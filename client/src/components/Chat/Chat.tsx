import React, { useState } from "react";
import { IUser, IUsers } from "../../interfaces";
import "./Chat.css";

import ChatMobile from "./ChatMobile";
import ChatDesktop from "./ChatDesktop";

import socket from "../../helpers/Socket";

// store
import { useSelector, useDispatch } from "react-redux";
import {
  selectMenu,
  selectUser,
  selectUserActive,
  selectWindow,
} from "../../store/store";
import { setUserActiveChat } from "../../store/userActive";
import { addMessage } from "../../store/messages";

// bot hooks
import { useWineBot } from "./hooks/useWineBot";
import { useCocktailBot } from "./hooks/useCocktailBot";

import { IMessage } from "../../interfaces";
import { useCheeseBot } from "./hooks/useCheeseBot";
import { useHostBot } from "./hooks/useHostBot";
import { useDJBot } from "./hooks/useDJBot";
import { getCurrentPageGlobalConfig } from "../../data/CurrentShow/GlobalConfig";

interface ChatProps {
  users: IUsers;
}

const Chat = (props: ChatProps) => {
  const user = useSelector(selectUser);
  const userActive = useSelector(selectUserActive);
  const windowUI = useSelector(selectWindow);
  const menu = useSelector(selectMenu);
  const dispatch = useDispatch();

  const GlobalConfig = getCurrentPageGlobalConfig(menu.currentGalleryId);
  const sendToWineBot = useWineBot({ isCoffee: GlobalConfig.isCoffee });
  const sendToCocktailBot = useCocktailBot({ isBeer: GlobalConfig.isBeer });
  const sendToCheeseBot = useCheeseBot({ isSnack: GlobalConfig.isSnack });
  const sendToHostBot = useHostBot();
  const sendToDJBot = useDJBot();

  const [textBox, setTextBox] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const setRecipient = (user: IUser | null | undefined) => {
    if (user) {
      if (textBox !== "") {
        setButtonDisabled(false);
        dispatch(setUserActiveChat(user));
      } else {
        setButtonDisabled(true);
        dispatch(setUserActiveChat(user));
      }
    }
  };

  const handleTextBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textBox = event.target.value;
    if (userActive.active && textBox !== "") {
      setTextBox(textBox);
      setButtonDisabled(false);
    } else {
      setTextBox(textBox);
      setButtonDisabled(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit(textBox);
    }
  };

  const onSubmit = (textBox: string) => {
    if (textBox === "") return;
    if (userActive.active) {
      sendMessage(textBox);
      setTextBox("");
      setButtonDisabled(true);
    } else {
      alert("please select recipient");
    }
  };

  const sendToAll = (txt: string) => {
    const message: IMessage = {
      to: "all",
      from: "me",
      fromUser: user.userName,
      message: txt,
      roomUrl: user.roomUrl,
      time: JSON.stringify(new Date()),
      avatar: user.avatar,
    };
    if (socket.connected) socket.emit("messageAll", message);
    dispatch(addMessage(message));
  };

  const sendToRoom = (txt: string) => {
    let t = JSON.stringify(new Date());
    const message: IMessage = {
      to: "room",
      from: "me",
      fromUser: user.userName,
      message: txt,
      roomUrl: user.roomUrl,
      time: t,
      avatar: user.avatar,
    };
    if (socket.connected) socket.emit("messageRoom", message);
    dispatch(addMessage(message));
  };

  const sendToOne = (txt: string) => {
    const message: IMessage = {
      from: "me",
      fromUser: user.userName,
      to: userActive.active.userName,
      socketId: userActive.active.id,
      roomUrl: user.roomUrl,
      message: txt,
      time: JSON.stringify(new Date()),
      avatar: user.avatar,
    };
    if (socket.connected) {
      // console.log("messagesent", message);
      socket.emit("messageUser", message); //sending to individual socketid
      dispatch(addMessage(message));
    }
  };

  const sendMessage = (txt: string) => {
    if (txt && userActive.active) {
      if (userActive.active.userName === "Everyone") {
        sendToAll(txt);
      } else if (userActive.active.userName === "Room") {
        sendToRoom(txt);
      } else if (
        userActive.active.userName === "wineBot" ||
        userActive.active.userName === "coffeeBot"
      ) {
        sendToWineBot(txt);
      } else if (
        userActive.active.userName === "cocktailBot" ||
        userActive.active.userName === "beerBot"
      ) {
        sendToCocktailBot(txt);
      } else if (
        userActive.active.userName === "cheeseBot" ||
        userActive.active.userName === "snackBot"
      ) {
        sendToCheeseBot(txt);
      } else if (userActive.active.userName === "DJBot") {
        sendToDJBot(txt);
      } else if (userActive.active.userName === "hostBot") {
        sendToHostBot(txt);
      } else {
        sendToOne(txt);
      }
    }
  };

  const cprops = {
    sendMessage,
    textBox,
    handleKeyDown,
    handleTextBoxChange,
    users: props.users,
    onSubmit,
    setRecipient,
  };

  return (
    <div className="Chat">
      {windowUI.isMobile || windowUI.hasFooter ? (
        <ChatMobile {...cprops} />
      ) : (
        <ChatDesktop {...cprops} />
      )}
    </div>
  );
};

export default Chat;
