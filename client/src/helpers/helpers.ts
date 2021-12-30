import { IUser, IUsers, IRoom } from '../interfaces';
import { rooms } from '../data/RoomConfig';
import { PageConfig } from '../data/PageConfig';
import { hostBotPoints } from '../data/BotConfig';
import { domCoordsToP5 } from './coordinates';

export const getUserByUserName = (users: IUsers, userName: string) => {
  if (users)
    return users.find(o => o.userName === userName);
  return null;
}

export const getUserById = (users: IUsers, id: string) => {
  if (users)
    return users.find(o => o.id === id);
  return null;
}

export const getUserNameById = (users: IUsers, id: string) => {
  if (users) {
    let obj = users.find(o => o.id === id);
    if (obj)
      return obj.userName;
  }
  return "";
}

export const getNewUser = (userName: string, avatar: string, room: string, id = "0", x = 0, y = 0): IUser => {
  let newUser = {
    id: id,
    avatar: avatar,
    userName: userName,
    roomUrl: room,
    comp: null,
    roomX: 0,
    roomY: 0,
    x: x,
    y: y,
    isFollowingHost: false,
    wineTime: null,
    needsWine: false,
    cheeseTime: null,
    needsCheese: false,
    cocktailTime: null,
    needsCocktail: false,
    outside: false
  }
  return newUser;
}

export const filterUsers = (currentUser: IUser, data: IUsers) => {
  var filteredArray = data.filter((usr: IUser) => {
    return usr.id !== currentUser.id;
  });
  return filteredArray;
}

export const filterGalleryUsers = (currentUser: IUser, data: IUsers) => {
  var filteredArray = data.filter((usr: IUser) => {
    return usr.id !== currentUser.id && (usr.userName !== "");
  });
  return filteredArray;
}


export const getUserChatList = (currentUser: IUser, users: IUsers) => {
  var filteredArray = users.filter((usr: IUser) => {
    return (
      usr.id !== currentUser.id
      && usr.roomUrl === currentUser.roomUrl
      && usr.userName !== "")
      || usr.roomUrl === "everywhere";
  });
  return filteredArray;
}

export const userNearEntrance = (user: IUser) => {
  let entrance = { ...hostBotPoints[0] };
  let userCoords = domCoordsToP5(user.x, user.y);

  return (userCoords.x >= entrance.x - 8 && userCoords.x <= entrance.x + 8
    && userCoords.y >= 28 && userCoords.y <= 35);
}

export const getPageName = (link: string): string => {
  if (link === "/") {
    return "gallery";
  }
  const roomPages = rooms.filter((room) => link === room.link);
  if (roomPages.length > 0) {
    return roomPages[0].title;
  }
  const pages = PageConfig.filter((page) => link === page.link);
  if (pages.length > 0) {
    return pages[0].title;
  }
  return "404";
}

export const getRoomByPath = (path: string): IRoom | null => {
  let r = rooms.filter((room) => room.link === path);
  if (r.length > 0)
    return r[0];
  return null;
}

export const getRoomCount = (room: string, users: IUsers): number => {
  let r = users.filter((usr) => usr.roomUrl === room);
  return r.length;
}

export const getTotalRoomCount = (users: IUsers) => {
  let roomLinks = rooms.map(room => room.link);
  const roomCount: any = {};
  for (const roomLink of roomLinks) {
    roomCount[roomLink] = 0;
  }
  for (const user of users) {
    if (user.roomUrl in roomCount) {
      roomCount[user.roomUrl]++;
    }
  }
  return roomCount;
}

export function getRandomNum(val: number) {
  var x = Math.sin(val) * 10000;
  return x - Math.floor(x);
}

// index 2 goes to top
// 3 , 2, 1, 0
//-> 2, 1, 3, 0
export function getNewZIndices(indexToTop: number, array: number[]) {
  let prevVal = array[indexToTop];
  let maxVal = 0;
  let newArr = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > maxVal) maxVal = array[i];
    if (array[i] > prevVal) newArr[i] = array[i] - 1;
    else newArr[i] = array[i];
  }
  newArr[indexToTop] = maxVal;
  return newArr;
}

export function mapVal(val: number, in_min: number, in_max: number, out_min: number, out_max: number) {
  return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export function constrain(val: number, min: number, max: number) {
  if (val < min)
    return min;
  else if (val > max)
    return max;
  return val;
}

export function randomInRange(start: number, end: number) {
  let diff = end - start;
  return Math.random() * diff + start;
}

export const roundToMult = (num: number, mult: number) => {
  let newNum = num + mult / 2; // to round up if necessary
  let diff = newNum % mult;
  return newNum - diff;
}

export const roundToMult2 = (num: number, mult: number) => {
  let newNum = num; // to round up if necessary
  let diff = newNum % mult;
  return newNum - diff;
}


export const getParsedJSONDate = (d: string) => {
  if (!d)
    return null;
  let newD = new Date(JSON.parse(d));
  if (newD && !isNaN(newD.getTime()))
    return newD;
  return null;
}
