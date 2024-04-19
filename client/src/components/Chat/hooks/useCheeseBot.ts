import React, { useState } from "react";

// store
import { useSelector, useDispatch } from "react-redux";
import { selectMenu, selectUser, selectUserActive } from "../../../store/store";
import { addCheese } from "../../../store/user";
import { addMessage } from "../../../store/messages";

import { IGlobalConfig, IMessage } from "../../../interfaces";

import { getBar } from "../../../data/CurrentShow/BotConfig";

export const useCheeseBot = () => {
  const [cheeseBotJustAsked, setCheeseBotJustAsked] = useState(false);

  const user = useSelector(selectUser);
  const userActive = useSelector(selectUserActive);
  const menu = useSelector(selectMenu);
  const cheeseLocation = getBar("cheese", menu.currentGalleryId);
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
      fromUser: "me",
      message: txt,
      time: JSON.stringify(new Date()),
      roomUrl: user.roomUrl,
      avatar: user.avatar,
    };
    dispatch(addMessage(message));
    setTimeout(() => cheeseBotRespond(txt), 1000);
  };

  const cheeseBotRespond = (txt: string) => {
    if (!cheeseBotJustAsked) {
      const phrase = "hi, would you like some cheese? Y/N.";
      dispatch(
        addMessage({
          to: "me",
          from: "cheeseBot",
          fromUser: "cheeseBot",
          message: phrase,
          time: JSON.stringify(new Date()),
          roomUrl: user.roomUrl,
          avatar: userActive.active.avatar,
        })
      );
      setCheeseBotJustAsked(true);
    } else {
      const lc = txt.toLowerCase();
      let phrase = "";
      if (lc === "y" || lc.indexOf("yes") > -1) {
        phrase = "Stop by to pick up tasty bytes.";
        dispatch(
          addCheese({
            location: cheeseLocation,
            galleryIndex: menu.currentGalleryId,
          })
        );
      } else {
        phrase = "Ok.";
      }
      dispatch(
        addMessage({
          to: "me",
          from: "cheeseBot",
          message: phrase,
          time: JSON.stringify(new Date()),
          roomUrl: user.roomUrl,
          avatar: userActive.active.avatar,
        })
      );
      setCheeseBotJustAsked(false);
    }
  };

  return sendToCheeseBot;
};
