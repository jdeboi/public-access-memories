import React from "react";
import { GlobalConfig } from "../../../../data/Shows/FieldsOfView/GlobalConfig";
import { userToWorldCoords } from "../../../../helpers/coordinates";

// store
import { IUser } from "../../../../interfaces";

const mapUserCoordsToMiniMap = (
  userX: number,
  userY: number,
  miniDim: number
) => {
  const bigWorldW = GlobalConfig.worldW * GlobalConfig.scaler;

  // smmaler number, more spread out
  const miniMapW = miniDim;
  const ratio = miniMapW / bigWorldW;
  const { x, y } = userToWorldCoords(userX, userY, GlobalConfig);

  return { x: x * ratio, y: y * ratio };
};

const AvatarMiniMap = (props: {
  isUser: boolean;
  dim: number;
  user: IUser;
}) => {
  const { user, dim } = props;
  const { x, y } = mapUserCoordsToMiniMap(user.x, user.y, dim);

  const sty = { top: y, left: x };

  let avatar = user.avatar;
  if (user.userName === "wineBot") avatar = "🍷";
  else if (user.userName === "DJ") avatar = "🎧";
  else if (user.userName === "cheeseBot") avatar = "🧀";
  else if (user.userName === "cocktailBot") avatar = "🍸";
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
