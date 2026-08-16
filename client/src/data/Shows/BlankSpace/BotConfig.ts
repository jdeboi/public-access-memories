import { getNewUser } from "../../../helpers/helpers";
import { IUser, IBar } from "../../../interfaces";
import { p5ToDomCoords } from "../../../helpers/coordinates";
import { GlobalConfig } from "./GlobalConfig";

const DJBotCoords = { x: 15, y: 15 };

const barUsers: IUser[] = [
  getNewUser("DJBot", "🤖", "/", "1", DJBotCoords.x, DJBotCoords.y),
];

export const barTenders: IUser[] = barUsers.map((user) => {
  const usr = { ...user };
  const pt = p5ToDomCoords(usr.x, usr.y, GlobalConfig);
  usr.x = pt.x;
  usr.y = pt.y;
  return usr;
});

export const bars: IBar[] = [
  {
    type: "DJ",
    x: DJBotCoords.x,
    y: DJBotCoords.y,
    w: 0,
    h: 0,
    tender: barTenders[0],
    isFlipped: false,
  },
];
