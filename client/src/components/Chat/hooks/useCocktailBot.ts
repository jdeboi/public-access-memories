import React, { useState } from "react";

// store
import { useSelector, useDispatch } from "react-redux";
import { selectMenu, selectUser, selectUserActive } from "../../../store/store";
import { addCocktail } from "../../../store/user";
import { addMessage } from "../../../store/messages";

import { IGlobalConfig, IMessage } from "../../../interfaces";

import { getBar } from "../../../data/CurrentShow/BotConfig";

export const useCocktailBot = () => {
  const [cocktailBotJustAsked, setCocktailBotJustAsked] = useState(false);

  const user = useSelector(selectUser);
  const userActive = useSelector(selectUserActive);
  const menu = useSelector(selectMenu);
  const dispatch = useDispatch();

  const cocktailLocation = getBar("cocktail", menu.currentGalleryId);
  const sendToCocktailBot = (txt: string) => {
    const message: IMessage = {
      to: "cocktailBot",
      from: "me",
      fromUser: "me",
      roomUrl: user.roomUrl,
      message: txt,
      time: JSON.stringify(new Date()),
      avatar: user.avatar,
    };
    // console.log("MESSAGE", message);
    dispatch(addMessage(message));
    setTimeout(() => cocktailBotRespond(txt), 1000);
  };

  const cocktailBotRespond = (txt: string) => {
    if (!cocktailBotJustAsked) {
      const phrase = "hi, would you like a martini? Y/N.";
      dispatch(
        addMessage({
          to: "me",
          from: "cocktailBot",
          fromUser: "cocktailBot",
          message: phrase,
          time: JSON.stringify(new Date()),
          roomUrl: user.roomUrl,
          avatar: userActive.active.avatar,
        })
      );
      setCocktailBotJustAsked(true);
    } else {
      const lc = txt.toLowerCase();
      let phrase = "";
      if (lc === "y" || lc.indexOf("yes") > -1) {
        phrase = "Stop by the bar to pick up your glass.";
        dispatch(
          addCocktail({
            location: cocktailLocation,
            galleryIndex: menu.currentGalleryId,
          })
        );
      } else {
        phrase = "Cool, I don't drink either.";
      }
      dispatch(
        addMessage({
          to: "me",
          from: "cocktailBot",
          message: phrase,
          time: JSON.stringify(new Date()),
          roomUrl: user.roomUrl,
          avatar: userActive.active.avatar,
        })
      );
      setCocktailBotJustAsked(false);
    }
  };

  return sendToCocktailBot;
};
