import { getNewUser } from "../../../helpers/helpers";
import { IUser, IBar } from "../../../interfaces";
import { p5ToDomCoords, p5ToUserCoords } from "../../../helpers/coordinates";
import { GlobalConfig } from "./GlobalConfig";

const danceFloorP5 = {
  x: 24 - 3,
  y: -1,
  w: 10,
  h: 5,
};

export const danceFloor = {
  x: GlobalConfig.scaler * danceFloorP5.x,
  y: GlobalConfig.scaler * danceFloorP5.y,
  w: GlobalConfig.scaler * danceFloorP5.w,
  h: GlobalConfig.scaler * danceFloorP5.h,
};

const coffeeBotCoords = {
  x: 23,
  y: 0.5,
};
const beerBotCoords = {
  x: 32,
  y: 0,
};
const hostBotCoords = {
  x: 10,
  y: 30,
};

export const hostBotFirstRoom = 0;

export const numBarItems = 4;
const barW = 87;
const barH = 175; // + 80;
const botDX = 1.5;
const botDY = 2;
const barUsers: IUser[] = [
  getNewUser(
    "coffeeBot",
    "🤖",
    "/",
    "1",
    coffeeBotCoords.x + botDX,
    coffeeBotCoords.y + botDY
  ),
  // getNewUser(
  //   "beerBot",
  //   "🤖",
  //   "/",
  //   "2",
  //   beerBotCoords.x + botDX,
  //   beerBotCoords.y + botDY
  // ),

  getNewUser(
    "hostBot",
    "🤖",
    "/lounge",
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
    x: coffeeBotCoords.x,
    y: coffeeBotCoords.y,
    w: barW, // stupid to use pixels here but "whatever" units for x & y
    h: barH,
    tender: barTenders[0],
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
