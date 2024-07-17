import { getNewUser } from "../../../helpers/helpers";
import { IUser, IBar } from "../../../interfaces";
import { p5ToDomCoords, p5ToUserCoords } from "../../../helpers/coordinates";
import { GlobalConfig } from "./GlobalConfig";

export const danceFloor = {
  x: 1300,
  y: 1800,
  w: 600,
  h: 750 / 2,
};

const DJBotCoords = {
  x: 50,
  y: 100,
  room: 15 * 2,
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

const cheeseBotCoords = {
  x: 170,
  y: 170,
  room: 6 * 2,
}; // cheese
const wineBotCoords = {
  x: 170,
  y: 170,
  room: 2,
};
const cocktailBotCoords = {
  x: 170,
  y: 170,
  room: 12 * 2,
};
const hostBotCoords = {
  x: 200,
  y: 400,
  room: 0,
};

export const numBarItems = 4;
const barW = 87;
const barH = 175; // + 80;
const botDX = 60;
const botDY = 90;

const wineBot = getNewUser(
  "wineBot",
  "🤖",
  "/",
  "1",
  wineBotCoords.x - botDX,
  wineBotCoords.y + botDY
);
wineBot.roomPage = wineBotCoords.room;
const cocktailBot = getNewUser(
  "cocktailBot",
  "🤖",
  "/",
  "2",
  cocktailBotCoords.x - botDX,
  cocktailBotCoords.y + botDY
);
cocktailBot.roomPage = cocktailBotCoords.room;

const cheeseBot = getNewUser(
  "cheeseBot",
  "🤖",
  "/",
  "3",
  cheeseBotCoords.x - botDX,
  cheeseBotCoords.y + botDY
);
cheeseBot.roomPage = cheeseBotCoords.room;

const djBot = getNewUser(
  "DJBot",
  "🤖",
  "/",
  "4",
  DJBotCoords.x + 50,
  DJBotCoords.y - 50
);
djBot.roomPage = DJBotCoords.room;

const hostBot = getNewUser(
  "hostBot",
  "🤖",
  "/",
  "5",
  hostBotCoords.x,
  hostBotCoords.y
);
hostBot.roomPage = 0;

const barUsers: IUser[] = [wineBot, cocktailBot, cheeseBot, hostBot];

export const barTenders: IUser[] = barUsers.map((user) => {
  const usr = { ...user };
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
    roomPage: wineBot.roomPage,
    tender: barTenders[0],
    isFlipped: false,
  },
  {
    type: "cocktail",
    x: cocktailBotCoords.x,
    y: cocktailBotCoords.y,
    w: barW,
    h: barH,
    roomPage: cocktailBot.roomPage,
    tender: barTenders[1],
    isFlipped: false,
  },
  {
    type: "cheese",
    x: cheeseBotCoords.x,
    y: cheeseBotCoords.y,
    w: barW,
    h: barH, // + 80
    roomPage: cheeseBot.roomPage,
    tender: barTenders[2],
    isFlipped: false,
  },
  {
    type: "DJ",
    x: DJBotCoords.x,
    y: DJBotCoords.y,
    w: 210,
    h: 45,
    roomPage: djBot.roomPage,
    tender: barTenders[3],
    isFlipped: false,
  },
  {
    type: "host",
    x: hostBotCoords.x,
    y: hostBotCoords.y,
    w: barW,
    h: barH,
    roomPage: hostBot.roomPage,
    tender: barTenders[4],
    isFlipped: false,
  },
];
