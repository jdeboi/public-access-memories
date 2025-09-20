import React from "react";
import { GlobalConfig } from "../../../../data/Shows/HomeBody/GlobalConfig";
import { userToWorldCoords } from "../../../../helpers/coordinates";

// store
import { IUser } from "../../../../interfaces";
import {
  DEBOX_ID,
  HOMEBODY_ID,
} from "../../../../data/CurrentShow/GalleryConfig";

// const mapUserCoordsToMiniMap = (
//   userX: number,
//   userY: number,
//   miniDim: number
// ) => {
//   const bigWorldW = GlobalConfig.worldW * GlobalConfig.scaler;

//   // smmaler number, more spread out
//   const miniMapW = miniDim;
//   const ratio = miniMapW / bigWorldW;
//   const { x, y } = userToWorldCoords(userX, userY, GlobalConfig);

//   return { x: x * ratio, y: y * ratio };
// };

const AvatarMiniMap = (props: {
  isUser: boolean;
  dim: number;
  user: IUser;
  gConfig?: typeof GlobalConfig;
  galleryId?: number;
}) => {
  const { user, dim } = props;
  const gConfig = props.gConfig || GlobalConfig;
  // const {x,y} = mapUserCoordsToMiniMap(user.x, user.y, dim);

  const getHomeBodyXY = () => {
    // not sure why logic above doesn't work...
    let scaler = dim / 200;
    let miniScaler = 4 * scaler;
    let miniX = 45 * scaler;
    let miniY = 40 * scaler;
    let bigScaler = gConfig.scaler;
    let bigX = gConfig.x;
    let bigY = gConfig.y;

    let x = (user.x / bigScaler - bigX) * miniScaler + miniX;
    let y = (user.y / bigScaler - bigY) * miniScaler + miniY;
    return { left: x, top: y };
  };

  const getDeboxXY = () => {
    // dimxdim goes to gConfig.worldW x gConfig.worldH
    let scalerX = dim / gConfig.worldW;
    let scalerY = dim / gConfig.worldH;

    let userXp5World = user.x / gConfig.scaler - gConfig.x;
    let userYp5World = user.y / gConfig.scaler - gConfig.y;

    return { left: userXp5World * scalerX, top: userYp5World * scalerY };
  };

  const sty = props.galleryId === DEBOX_ID ? getDeboxXY() : getHomeBodyXY();

  let avatar = user.avatar;
  if (user.userName === "wineBot") avatar = "🍷";
  else if (user.userName === "DJ") avatar = "🎧";
  else if (user.userName === "cheeseBot") avatar = "🧀";
  else if (user.userName === "cocktailBot") avatar = "🍸";
  else if (user.userName === "coffeeBot") avatar = "☕";
  else if (user.userName === "beerBot") avatar = "🍺";
  else if (user.userName === "snackBot") avatar = "🍪";
  else if (!props.isUser) avatar = user.avatar;

  // const hidden = (user.roomUrl !== "/");
  return (
    <div
      // className={"emojiMiniMap" + (hidden ? " hidden" : "")}
      className={"emojiMiniMap"}
      style={sty}
      unselectable="on"
    >
      {avatar}
    </div>
  );
};

export default AvatarMiniMap;
