import React from "react";
import { GlobalConfig } from "../../../../data/Shows/Residency2026/GlobalConfig";
import { userToWorldCoords } from "../../../../helpers/coordinates";
import { IUser } from "../../../../interfaces";

// World pixel origin offsets (xMin=-5, yMin=-3 in p5 units)
const X_MIN_PX = -5 * GlobalConfig.scaler;
const Y_MIN_PX = -3 * GlobalConfig.scaler;
const WORLD_W_PX = GlobalConfig.worldW * GlobalConfig.scaler;
const WORLD_H_PX = GlobalConfig.worldH * GlobalConfig.scaler;

const mapToMiniMap = (
  userX: number,
  userY: number,
  miniW: number,
  miniH: number,
) => {
  const { x, y } = userToWorldCoords(userX, userY, GlobalConfig);
  return {
    x: (x - X_MIN_PX) * (miniW / WORLD_W_PX),
    y: (y - Y_MIN_PX) * (miniH / WORLD_H_PX),
  };
};

const AvatarMiniMapResidency2026 = (props: {
  isUser: boolean;
  miniW: number;
  miniH: number;
  user: IUser;
}) => {
  const { user, miniW, miniH } = props;
  const { x, y } = mapToMiniMap(user.x, user.y, miniW, miniH);

  return (
    <div
      className="emojiMiniMap"
      style={{ top: y, left: x }}
      unselectable="on"
    >
      {user.avatar}
    </div>
  );
};

export default AvatarMiniMapResidency2026;
