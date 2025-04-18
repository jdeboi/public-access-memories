import React, { useState } from "react";

// store
import { useSelector, useDispatch } from "react-redux";
import { selectMenu, selectUser, selectUserActive } from "../../../store/store";
import { addCocktail } from "../../../store/user";
import { addMessage } from "../../../store/messages";

import { IGlobalConfig, IMessage } from "../../../interfaces";

import { getBar } from "../../../data/CurrentShow/BotConfig";

export const useCocktailBot = ({ isBeer = false }) => {
  const [cocktailBotJustAsked, setCocktailBotJustAsked] = useState(false);

  const user = useSelector(selectUser);
  const userActive = useSelector(selectUserActive);
  const menu = useSelector(selectMenu);
  const dispatch = useDispatch();

  const cocktailLocation = getBar("cocktail", menu.currentGalleryId);
  const sendToCocktailBot = (txt: string) => {
    const message: IMessage = {
      to: isBeer ? "beerBot" : "cocktailBot",
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
      const phrase = `hi, would you like a ${
        isBeer ? "beer" : "martini"
      }? Y/N.`;
      dispatch(
        addMessage({
          to: "me",
          from: isBeer ? "beerBot" : "cocktailBot",
          fromUser: isBeer ? "beerBot" : "cocktailBot",
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
        phrase = `Stop by the bar to pick up your drink.`;
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
          from: isBeer ? "beerBot" : "cocktailBot",
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
