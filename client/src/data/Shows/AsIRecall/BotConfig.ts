import { getNewUser } from "../../../helpers/helpers";
import { IUser, IBar } from "../../../interfaces";
import { p5ToDomCoords } from "../../../helpers/coordinates";
import { GlobalConfig } from "./GlobalConfig";
import { roomConfig } from "./RoomConfig";

//// dance dance dance
//// dance dance dance
const danceFloorP5 = {
  x: 26,
  y: 2.5,
  w: 12,
  h: 6,
};

export const danceFloor = {
  x: GlobalConfig.scaler * danceFloorP5.x,
  y: GlobalConfig.scaler * danceFloorP5.y,
  w: GlobalConfig.scaler * danceFloorP5.w,
  h: GlobalConfig.scaler * danceFloorP5.h,
};

const DJBotCoords = {
  x: danceFloorP5.x + 3.5,
  y: danceFloorP5.y - 0.5,
};

export const DJBotDomCoords = p5ToDomCoords(
  DJBotCoords.x,
  DJBotCoords.y,
  GlobalConfig
);

//// wine
const cheeseBotCoords = {
  x: 2.5,
  y: 14,
}; // cheese
const wineBotCoords = {
  x: 36,
  y: 26,
};
const cocktailBotCoords = {
  x: 36,
  y: 3,
};
const hostBotCoords = {
  x: 17,
  y: 23.5,
};

//// bar tenders
// const cheeseBotCoords = {
//     x: 1 * roomConfig.w,
//     y: 8 * roomConfig.w
// };
// const wineBotCoords = {
//     x: 4 * roomConfig.w,
//     y: 0 * roomConfig.w
// };
// const cocktailBotCoords = {
//     x: 7.5 * roomConfig.w,
//     y: 7.25 * roomConfig.w
// };
// const hostBotCoords = { x: 1 * roomConfig.w, y: 8 * roomConfig.w };

export const numBarItems = 4;
const barW = 87;
const barH = 175; // + 80;
const botDX = 2.5;
const botDY = 2;
const barUsers: IUser[] = [
  getNewUser(
    "wineBot",
    "🤖",
    "/",
    "1",
    wineBotCoords.x + botDX,
    wineBotCoords.y + botDY
  ),
  getNewUser(
    "cocktailBot",
    "🤖",
    "/",
    "2",
    cocktailBotCoords.x + botDX,
    cocktailBotCoords.y + botDY
  ),
  getNewUser(
    "cheeseBot",
    "🤖",
    "/",
    "3",
    cheeseBotCoords.x - botDX * 0.6,
    cheeseBotCoords.y + botDY
  ),
  getNewUser(
    "DJBot",
    "🤖",
    "/",
    "4",
    DJBotCoords.x + botDX,
    DJBotCoords.y - botDX * 0.2
  ),
  getNewUser(
    "hostBot",
    "🤖",
    "/",
    "5",
    hostBotCoords.x + botDX,
    hostBotCoords.y
  ),
];

export const barTenders: IUser[] = barUsers.map((user) => {
  const usr = { ...user };
  let pt = p5ToDomCoords(usr.x, usr.y, GlobalConfig);
  usr.x = pt.x;
  usr.y = pt.y;
  return usr;
});

// TODO - my system of units is bonkers
// I mix and match pixels, world coords, dom coords ...
export const bars: IBar[] = [
  {
    type: "wine",
    x: wineBotCoords.x,
    y: wineBotCoords.y,
    w: barW, // stupid to use pixels here but "whatever" units for x & y
    h: barH,
    tender: barTenders[0],
    isFlipped: false,
  },
  {
    type: "cocktail",
    x: cocktailBotCoords.x,
    y: cocktailBotCoords.y,
    w: barW,
    h: barH,
    tender: barTenders[1],
    isFlipped: false,
  },
  {
    type: "cheese",
    x: cheeseBotCoords.x,
    y: cheeseBotCoords.y,
    w: barW,
    h: barH, // + 80
    tender: barTenders[2],
    isFlipped: false,
  },
  {
    type: "DJ",
    x: DJBotCoords.x,
    y: DJBotCoords.y,
    w: 210,
    h: 45,
    tender: barTenders[3],
    isFlipped: false,
  },
  {
    type: "host",
    x: hostBotCoords.x,
    y: hostBotCoords.y,
    w: barW,
    h: barH,
    tender: barTenders[4],
    isFlipped: false,
  },
];
