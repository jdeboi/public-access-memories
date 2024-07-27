import { getNewUser } from "../../../helpers/helpers";
import { IUser, IBar } from "../../../interfaces";
import {
  COFFEE_PAGE,
  FRUIT_PAGE,
  HOME_PAGE,
  PURSE_PAGE,
  REDSOFA_PAGE,
  SWEDEN_PAGE,
} from "./PageConstants";

export const danceFloor = {
  x: 1300,
  y: 1800,
  w: 600,
  h: 750 / 2,
};

const DJBotCoords = {
  x: 50,
  y: 100,
  room: PURSE_PAGE,
};

const cheeseBotCoords = {
  x: 170,
  y: 170,
  room: REDSOFA_PAGE,
}; // cheese
const wineBotCoords = {
  x: 170,
  y: 170,
  room: COFFEE_PAGE,
};
const cocktailBotCoords = {
  x: 170,
  y: 170,
  room: SWEDEN_PAGE,
};
const hostBotCoords = {
  x: 200,
  y: 400,
  room: HOME_PAGE,
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
wineBot.roomLayout = wineBotCoords.room;
const cocktailBot = getNewUser(
  "cocktailBot",
  "🤖",
  "/",
  "2",
  cocktailBotCoords.x - botDX,
  cocktailBotCoords.y + botDY
);
cocktailBot.roomLayout = cocktailBotCoords.room;

const cheeseBot = getNewUser(
  "cheeseBot",
  "🤖",
  "/",
  "3",
  cheeseBotCoords.x - botDX,
  cheeseBotCoords.y + botDY
);
cheeseBot.roomLayout = cheeseBotCoords.room;

const djBot = getNewUser(
  "DJBot",
  "🤖",
  "/",
  "4",
  DJBotCoords.x - botDX,
  DJBotCoords.y + botDY
);
djBot.roomLayout = DJBotCoords.room;

const hostBot = getNewUser(
  "hostBot",
  "🤖",
  "/",
  "5",
  hostBotCoords.x,
  hostBotCoords.y
);
hostBot.roomLayout = HOME_PAGE;

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
    roomPage: wineBot.roomLayout,
    tender: barTenders[0],
    isFlipped: false,
  },
  {
    type: "cocktail",
    x: cocktailBotCoords.x,
    y: cocktailBotCoords.y,
    w: barW,
    h: barH,
    roomPage: cocktailBot.roomLayout,
    tender: barTenders[1],
    isFlipped: false,
  },
  {
    type: "cheese",
    x: cheeseBotCoords.x,
    y: cheeseBotCoords.y,
    w: barW,
    h: barH, // + 80
    roomPage: cheeseBot.roomLayout,
    tender: barTenders[2],
    isFlipped: false,
  },
  {
    type: "DJ",
    x: DJBotCoords.x,
    y: DJBotCoords.y,
    w: 210,
    h: 45,
    roomPage: djBot.roomLayout,
    tender: barTenders[3],
    isFlipped: false,
  },
  {
    type: "host",
    x: hostBotCoords.x,
    y: hostBotCoords.y,
    w: barW,
    h: barH,
    roomPage: hostBot.roomLayout,
    tender: barTenders[4],
    isFlipped: false,
  },
];
