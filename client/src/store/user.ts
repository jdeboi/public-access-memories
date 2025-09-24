import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser, IBar } from "../interfaces";
import { getBar } from "../data/CurrentShow/BotConfig";
import { getCurrentPageGlobalConfig } from "../data/CurrentShow/GlobalConfig";
import Cookies from "js-cookie";

import { p5ToDomCoords } from "../helpers/coordinates";

const defaultGlobalConfig = getCurrentPageGlobalConfig(0);

const initialState: IUser = {
  id: "0",
  avatar: "😀",
  userName: "",
  roomUrl: "/",
  roomLayout: 0,
  comp: null,
  roomX: 0,
  roomY: 0,
  x: defaultGlobalConfig.scaler / 2,
  y: defaultGlobalConfig.scaler / 2,
  isFollowingHost: false,
  wineTime: null,
  needsWine: false,
  cheeseTime: null,
  needsCheese: false,
  cocktailTime: null,
  needsCocktail: false,
  outside: false,
  isMuted: true,
  isGlobalMuted: false,
  isSpeaking: false,
  speakingId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  reducers: {
    setUserRoomUrl: (state, action: PayloadAction<{ roomUrl: string }>) => {
      // redux toolkit allows us to "mutate" state (not exactly what's happening)
      const prevRoom = state.roomUrl;
      const nextRoom = action.payload.roomUrl;
      state.roomX = 50;
      state.roomY = 50;
      state.roomUrl = nextRoom;
      // socket.emit("leaveRoom", prevRoom);
      // socket.emit("joinRoom", nextRoom);
      // socket.emit("setUser", state);
    },
    setUserRoomPage: (
      state,
      action: PayloadAction<{ roomLayoutNum: number }>
    ) => {
      state.roomLayout = action.payload.roomLayoutNum;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.avatar = action.payload.avatar;
      state.userName = action.payload.userName;
      state.id = action.payload.id;
      state.x = action.payload.x;
      state.y = action.payload.y;
      state.roomUrl = action.payload.roomUrl;
      // TODO
      // const comp = Cookies.get('comp');
      // if (comp)
      //   state.comp = comp;
      Cookies.set("hasAvatar", "true");
      Cookies.set("avatar", state.avatar);
      Cookies.set("userName", state.userName);
      // socket.emit("setUser", state);
    },
    setUserLogin: (
      state,
      action: PayloadAction<{ userName: string; avatar: string }>
    ) => {
      state.avatar = action.payload.avatar;
      state.userName = action.payload.userName;
      Cookies.set("hasAvatar", "true");
      Cookies.set("avatar", state.avatar);
      Cookies.set("userName", state.userName);
    },
    setUserID: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setFollowingHost: (state, action: PayloadAction<boolean>) => {
      state.isFollowingHost = action.payload;
      // console.log("following", state.isFollowingHost);
    },
    removeUserComp: (state) => {
      state.comp = null;
      // TODO
      //   Cookies.remove("comp");
    },
    setUserComp: (state, action: PayloadAction<number>) => {
      state.comp = action.payload;
      // Cookies.set("comp", user.comp);
    },
    moveUser: (
      state,
      action: PayloadAction<{
        x: number;
        y: number;
        galleryIndex: number;
      }>
    ) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
      const GlobalConfig = getCurrentPageGlobalConfig(
        action.payload.galleryIndex
      );
      if (
        userNearBar(
          state,
          getBar("wine", action.payload.galleryIndex),
          GlobalConfig
        ) &&
        state.needsWine
      ) {
        state.needsWine = false;
        state.wineTime = JSON.stringify(new Date());
      } else if (
        userNearBar(
          state,
          getBar("cheese", action.payload.galleryIndex),
          GlobalConfig
        ) &&
        state.needsCheese
      ) {
        state.needsCheese = false;
        state.cheeseTime = JSON.stringify(new Date());
      } else if (
        userNearBar(
          state,
          getBar("cocktail", action.payload.galleryIndex),
          GlobalConfig
        ) &&
        state.needsCocktail
      ) {
        state.needsCocktail = false;
        state.cocktailTime = JSON.stringify(new Date());
      }
    },
    moveUserNormal: (
      state,
      action: PayloadAction<{
        x: number;
        y: number;
        galleryIndex: number;
      }>
    ) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
      if (
        userNearBarNormal(state, getBar("wine", action.payload.galleryIndex)) &&
        state.needsWine
      ) {
        state.needsWine = false;
        state.wineTime = JSON.stringify(new Date());
      } else if (
        userNearBarNormal(
          state,
          getBar("cheese", action.payload.galleryIndex)
        ) &&
        state.needsCheese
      ) {
        state.needsCheese = false;
        state.cheeseTime = JSON.stringify(new Date());
      } else if (
        userNearBarNormal(
          state,
          getBar("cocktail", action.payload.galleryIndex)
        ) &&
        state.needsCocktail
      ) {
        state.needsCocktail = false;
        state.cocktailTime = JSON.stringify(new Date());
      }
    },
    moveUserRoom: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.roomX = action.payload.x;
      state.roomY = action.payload.y;
    },
    addWine: (
      state,
      action: PayloadAction<{
        location: IBar;
        galleryIndex: number;
      }>
    ) => {
      state.needsWine = true;
      const GlobalConfig = getCurrentPageGlobalConfig(
        action.payload.galleryIndex
      );

      if (userNearBar(state, action.payload.location, GlobalConfig)) {
        state.needsWine = false;
        state.wineTime = JSON.stringify(new Date());
      }
    },
    setWine: (
      state,
      action: PayloadAction<{ needsWine: boolean; wineTime: string }>
    ) => {
      state.needsWine = action.payload.needsWine;
      state.wineTime = action.payload.wineTime;
    },
    resetWine: (state) => {
      state.wineTime = null;
      state.needsWine = false;
    },
    addCheese: (
      state,
      action: PayloadAction<{
        location: IBar;
        galleryIndex: number;
      }>
    ) => {
      state.needsCheese = true;
      let loc = action.payload.location;
      const GlobalConfig = getCurrentPageGlobalConfig(
        action.payload.galleryIndex
      );
      if (userNearBar(state, loc, GlobalConfig)) {
        state.needsCheese = false;
        state.cheeseTime = JSON.stringify(new Date());
      }
    },
    setCheese: (
      state,
      action: PayloadAction<{ needsCheese: boolean; cheeseTime: string }>
    ) => {
      state.needsCheese = action.payload.needsCheese;
      state.cheeseTime = action.payload.cheeseTime;
    },
    resetCheese: (state) => {
      state.cheeseTime = null;
      state.needsCheese = false;
    },

    addCocktail: (
      state,
      action: PayloadAction<{
        location: IBar;
        galleryIndex: number;
      }>
    ) => {
      state.needsCocktail = true;
      const GlobalConfig = getCurrentPageGlobalConfig(
        action.payload.galleryIndex
      );

      if (userNearBar(state, action.payload.location, GlobalConfig)) {
        state.needsCocktail = false;
        state.cocktailTime = JSON.stringify(new Date());
      }
    },
    setCocktail: (
      state,
      action: PayloadAction<{ needsCocktail: boolean; cocktailTime: string }>
    ) => {
      state.needsCocktail = action.payload.needsCocktail;
      state.cocktailTime = action.payload.cocktailTime;
    },
    resetCocktail: (state) => {
      state.needsCocktail = false;
      state.cocktailTime = null;
    },

    setOutside: (state, action: PayloadAction<{ isOutside: boolean }>) => {
      state.outside = action.payload.isOutside;
    },
    toggleOutside: (state) => {
      state.outside = !state.outside;
    },
    setIsMuted: (state, action: PayloadAction<{ isMuted: boolean }>) => {
      state.isMuted = action.payload.isMuted;
    },
    setIsGlobalMuted: (
      state,
      action: PayloadAction<{ isGlobalMuted: boolean }>
    ) => {
      state.isGlobalMuted = action.payload.isGlobalMuted;
    },
    toggleIsGlobalMuted: (state) => {
      state.isGlobalMuted = !state.isGlobalMuted;
    },
    setIsSpeaking: (state, action: PayloadAction<{ isSpeaking: boolean }>) => {
      state.isSpeaking = action.payload.isSpeaking;
    },
    setSpeakingId: (state, action: PayloadAction<{ speakingId: string }>) => {
      state.speakingId = action.payload.speakingId;
    },
  },
});

function userNearBarNormal(user: IUser, location: IBar) {
  if (user.roomLayout != location.roomPage) {
    return false;
  }

  var dx = user.x - location.x;
  var dy = user.y - location.y;
  var dis = Math.sqrt(dx * dx + dy * dy);
  return dis < 200;
}

function userNearBar(
  user: IUser,
  location: IBar,
  GlobalConfig: typeof defaultGlobalConfig
) {
  var p5coords = p5ToDomCoords(location.x, location.y, GlobalConfig);

  // TODO - b/c width is in pixels, unlike x & y ...
  p5coords.x += location.w / 2;
  p5coords.y += location.h / 2;

  var dx = user.x - p5coords.x;
  var dy = user.y - p5coords.y;
  var dis = Math.sqrt(dx * dx + dy * dy);
  return dis < 200;
}

export const {
  setUserRoomUrl,
  setUser,
  setUserID,
  setUserLogin,
  moveUser,
  moveUserNormal,
  moveUserRoom,
  setFollowingHost,
  addCheese,
  setCheese,
  resetCheese,
  addWine,
  setWine,
  resetWine,
  addCocktail,
  setCocktail,
  resetCocktail,
  setIsGlobalMuted,
  toggleIsGlobalMuted,
  setIsMuted,
  setIsSpeaking,
  setSpeakingId,
  toggleOutside,
  setOutside,
  setUserRoomPage,
} = userSlice.actions;
