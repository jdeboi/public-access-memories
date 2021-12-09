import { SETUSERROOM, REMOVEUSERCOMP, SETUSERCOMP, SETUSER, MOVEUSER, MOVEUSERROOM, TOGGLEOUTSIDE, SETWINE, RESETWINE, ADDWINE, SETCHEESE, RESETCHEESE, ADDCHEESE, SETCOCKTAIL, RESETCOCKTAIL, ADDCOCKTAIL } from '../actions/user';
import { SETUSERACTIVECHAT, SETUSERHOVERCHAT, USERHOVERCHATLEAVE } from '../actions/userActiveChat';

import Cookies from 'js-cookie';
import socket from "../socket";
import { globalConfig } from '../constants';

// reducer (check what to do with action)
const initState = { 
  avatar: "😀", 
  userName: "", 
  room: "gallery", 
  comp: null, 
  roomX: 0, 
  roomY: 0, 
  x: globalConfig.stepS / 2, 
  y: globalConfig.stepS / 2, 
  hasWine: null, 
  needsWine: false, 
  hasCheese: null, 
  needsCheese: false, 
  hasCocktail: null, 
  needsCocktail: false 
};

export const userReducer = (state = initState, action) => {
  const user = { ...state };

  switch (action.type) {

    case SETUSERROOM:
      const prevRoom = user.room;
      const nextRoom = action.payload.room;
      user.roomX = 50;
      user.roomY = 50;
      user.room = nextRoom;
      socket.emit("leaveRoom", prevRoom);
      socket.emit("joinRoom", nextRoom);
      socket.emit("setUser", user);
      return user;

    case SETUSER:
      user.avatar = action.payload.avatar;
      user.userName = action.payload.userName;

      const comp = Cookies.get('comp');
      if (comp)
        user.comp = comp;

      Cookies.set("hasAvatar", true);
      Cookies.set("avatar", user.avatar);
      Cookies.set("userName", user.userName);
      socket.emit("setUser", user);

      return user;

    case REMOVEUSERCOMP:
      user.comp = null;
      Cookies.remove("comp");
      return user;
    case SETUSERCOMP:
      user.comp = action.payload.comp;
      Cookies.set("comp", user.comp);
      return user;
    case MOVEUSER:
      user.x = action.payload.x;
      user.y = action.payload.y;
      var wineLocation = action.payload.wineLocation;
      if (userNearBar(user, wineLocation[1]) && user.needsWine) {
        user.needsWine = false;
        user.hasWine = new Date();
      }
      else if (userNearBar(user, wineLocation[0]) && user.needsCheese) {
        user.needsCheese = false;
        user.hasCheese = new Date();
      }
      else if (userNearBar(user, wineLocation[2]) && user.needsCocktail) {
        user.needsCocktail = false;
        user.hasCocktail = new Date();
      }
      socket.emit("setUser", user);
      return user;

    case MOVEUSERROOM:
      user.roomX = action.payload.x;
      user.roomY = action.payload.y;
      // action.payload.exitLocation
      return user;

    case ADDWINE:
      user.needsWine = true;
      // console.log("WINE", location);
      if (userNearBar(user, action.payload.location)) {
        user.needsWine = false;
        user.hasWine = new Date();
      }
      socket.emit("setUser", user);
      return user;

    case SETWINE:
      user.needsWine = action.payload.needsWine;
      user.hasWine = action.payload.hasWine;
      socket.emit("setUser", user);
      return user;

    case RESETWINE:
      user.hasWine = false;
      user.needsWine = null;
      socket.emit("setUser", user);
      return user;

    ////////////////////////
    case ADDCHEESE:
      user.needsCheese = true;
      let loc = action.payload.location;
      if (userNearBar(user, loc)) {
        user.needsCheese = false;
        user.hasCheese = new Date();
      }
      socket.emit("setUser", user);
      return user;

    case SETCHEESE:
      user.needsCheese = action.payload.needsCheese;
      user.hasCheese = action.payload.hasCheese;
      socket.emit("setUser", user);
      return user;

    case RESETCHEESE:
      user.needsCheese = false;
      user.hasCheese = null;
      socket.emit("setUser", user);
      return user;


    ////////////////////////
    case ADDCOCKTAIL:
      user.needsCocktail = true;
      if (userNearBar(user, action.payload.location)) {
        user.needsCocktail = false;
        user.hasCocktail = new Date();
      }
      socket.emit("setUser", user);
      return user;

    case SETCOCKTAIL:
      user.needsCocktail = action.payload.needsCocktail;
      user.hasCocktail = action.payload.hasCocktail;
      socket.emit("setUser", user);
      return user;

    case RESETCOCKTAIL:
      user.needsCocktail = false;
      user.hasCocktail = null;
      socket.emit("setUser", user);
      return user;

    default:
      return state;
  }
}


function userNearBar(user, location) {
  var dx = user.x - (location.x + location.w / 2);
  var dy = user.y - (location.y + location.h / 2);
  var dis = Math.sqrt(dx * dx + dy * dy);
  // console.log("DIS", dis < 200);
  return dis < 200;
}


export const userActiveChatReducer = (state = { userName: "Everyone", avatar: "👥" }, action) => {
  switch (action.type) {
    case SETUSERACTIVECHAT:
      const user = { ...action.payload.user };
      return user;
    default:
      return state;
  }
}

export const userHoverChatReducer = (state = null, action) => {
  switch (action.type) {
    case SETUSERHOVERCHAT:
      const user = { ...action.payload.user };
      return user;

    case USERHOVERCHATLEAVE:
      return null;

    default:
      return state;
  }
}

export const userOutsideReducer = (state = true, action) => {
  switch (action.type) {
    case TOGGLEOUTSIDE:
      return !state;
    default:
      return state;
  }
}