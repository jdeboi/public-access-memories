import React from 'react';
import { GlobalConfig } from '../../../../data/GlobalConfig';

// store
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/store';


const AvatarMiniMap = (props: { isUser: boolean, dim: number }) => {
  const user = useSelector(selectUser);
  const scaler = props.dim / 200;
  const miniScaler = 4 * scaler;
  const miniX = 45 * scaler;
  const miniY = 40 * scaler;
  const bigScaler = GlobalConfig.scaler;
  const bigX = GlobalConfig.x;
  const bigY = GlobalConfig.y;
  const loc = {};

  const x = (user.x / bigScaler - bigX) * miniScaler + miniX;
  const y = (user.y / bigScaler - bigY) * miniScaler + miniY;
  const sty = { top: y, left: x };


  var avatar = user.avatar;
  if (user.userName === "wineBot")
    avatar = "🍷";
  else if (user.userName === "DJ")
    avatar = "🎧";
  else if (user.userName === "cheeseBot")
    avatar = "🧀";
  else if (user.userName === "cocktailBot")
    avatar = "🍸";
  else if (!props.isUser)
    avatar = user.avatar;
  const hidden = (user.roomUrl !== "/");

  return (

    <div
      className={"emojiMiniMap" + (hidden ? " hidden" : "")}
      style={sty}
    >
      {avatar}
    </div>

  );

}

export default AvatarMiniMap;
