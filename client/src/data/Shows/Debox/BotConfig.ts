import { getNewUser } from "../../../helpers/helpers";
import { IUser, IBar } from "../../../interfaces";
import { p5ToDomCoords, p5ToUserCoords } from "../../../helpers/coordinates";
import { GlobalConfig } from "./GlobalConfig";

const danceFloorP5 = {
  x: 30,
  y: 36,
  w: 12,
  h: 2,
};

export const danceFloor = {
  x: GlobalConfig.scaler * danceFloorP5.x,
  y: GlobalConfig.scaler * danceFloorP5.y,
  w: GlobalConfig.scaler * danceFloorP5.w,
  h: GlobalConfig.scaler * danceFloorP5.h,
};

const DJBotCoords = {
  x: danceFloorP5.x + 3.5,
  y: danceFloorP5.y - 1,
};

export const DJBotDomCoords = p5ToDomCoords(
  DJBotCoords.x,
  DJBotCoords.y,
  GlobalConfig
);
export const DJBotUserCoords = p5ToUserCoords(
  DJBotCoords.x,
  DJBotCoords.y,
  GlobalConfig
);

//// wine
const cheeseBotCoords = {
  x: 3,
  y: 2,
}; // cheese
const wineBotCoords = {
  x: 3,
  y: 35,
};
const cocktailBotCoords = {
  x: 36,
  y: 2,
};
const hostBotCoords = {
  x: 20,
  y: 30,
};

export const hostBotFirstRoom = 7;
export const hostBotPoints = [
  { x: 15, y: 28 }, // entrance
  { x: 15, y: 22 }, // inside
  { x: 27, y: 22 },
];

export const numBarItems = 4;
const barW = 87;
const barH = 175; // + 80;
const botDX = 1.5;
const botDY = 2;
const barUsers: IUser[] = [
  getNewUser(
    "wineBot",
    "🤖",
    "/",
    "1",
    wineBotCoords.x - botDX,
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
    cheeseBotCoords.x - 1,
    cheeseBotCoords.y + botDY
  ),
  getNewUser(
    "DJBot",
    "🤖",
    "/",
    "4",
    DJBotCoords.x + botDX,
    DJBotCoords.y - 0.25
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
