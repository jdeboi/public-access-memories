import React, { useState } from "react";

// store
import { useSelector, useDispatch } from "react-redux";
import { selectMenu, selectUser, selectUserActive } from "../../../store/store";
import { addWine } from "../../../store/user";
import { addMessage } from "../../../store/messages";

import { IGlobalConfig, IMessage } from "../../../interfaces";

import { getBar } from "../../../data/CurrentShow/BotConfig";

export const useWineBot = () => {
  const [wineBotJustAsked, setWineBotJustAsked] = useState(false);

  const user = useSelector(selectUser);
  const userActive = useSelector(selectUserActive);
  const menu = useSelector(selectMenu);
  const dispatch = useDispatch();

  const wineLocation = getBar("wine", menu.currentGalleryId);
  // useEffect(() => {
  //     if (props.message !== "") {
  //         sendToWineBot(props.message);
  //         props.onSent();
  //     }
  // }, [props.message]);

  const sendToWineBot = (txt: string) => {
    const message: IMessage = {
      to: "wineBot",
      from: "me",
      fromUser: "me",
      message: txt,
      time: JSON.stringify(new Date()),
      roomUrl: user.roomUrl,
      avatar: user.avatar,
    };
    // console.log("MESSAGE", message);
    dispatch(addMessage(message));
    setTimeout(() => wineBotRespond(txt), 1000);
  };

  const wineBotRespond = (txt: string) => {
    if (!wineBotJustAsked) {
      const phrase = "hi, would you like some wine? Y/N.";
      dispatch(
        addMessage({
          to: "me",
          from: "wineBot",
          fromUser: "wineBot",
          message: phrase,
          time: JSON.stringify(new Date()),
          roomUrl: user.roomUrl,
          avatar: userActive.active.avatar,
        })
      );
      setWineBotJustAsked(true);
    } else {
      const lc = txt.toLowerCase();
      let phrase = "";
      if (lc === "y" || lc.indexOf("yes") > -1) {
        phrase = "Stop by the bar to pick up your glass.";
        dispatch(
          addWine({
            location: wineLocation,
            galleryIndex: menu.currentGalleryId,
          })
        );
      } else {
        phrase = "Cool, I don't drink either.";
      }
      dispatch(
        addMessage({
          to: "me",
          from: "wineBot",
          fromUser: "wineBot",
          message: phrase,
          time: JSON.stringify(new Date()),
          roomUrl: user.roomUrl,
          avatar: userActive.active.avatar,
        })
      );
      setWineBotJustAsked(false);
    }
  };

  return sendToWineBot;
};
