import { IUser, IUsers, IRoom } from '../interfaces';
import { RoomConfig } from '../data/RoomConfig';
import { PageConfig } from '../data/PageConfig';

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

export const getNewUser = (userName: string, avatar: string, room: string, id="0", x=0, y=0): IUser => {
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


export const getPageName = (link: string): string => {
  if (link === "/") {
    return "gallery";
  }
  const roomPages = RoomConfig.filter((room) => link === room.link);
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
  let r = RoomConfig.filter((room) => room.link === path);
  if (r.length > 0)
    return r[0];
  return null;
}

export const getRoomCount = (room : string, users: IUsers) : number => {
  let r = users.filter((usr) => usr.roomUrl === room);
  return r.length;
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
    if (array[i] > prevVal) newArr[i] = array[i]-1;
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
  let diff = end-start;
  return Math.random()*diff+start;
}