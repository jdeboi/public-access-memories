import { IUser, IUsers, IRoom } from '../interfaces';
import { RoomConfig } from '../views/rooms/RoomConfig';
import { PageConfig } from '../views/pages/PageConfig';

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

export const getNewUser = (userName: string, avatar: string, room: string): IUser => {
  let newUser = {
    id: "0",
    avatar: avatar,
    userName: userName,
    room: room,
    comp: null,
    roomX: 0,
    roomY: 0,
    x: 0,
    y: 0,
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
  let r = users.filter((usr) => usr.room === room);
  return r.length;
}