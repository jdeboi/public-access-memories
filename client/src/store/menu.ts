import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMenu } from "../interfaces";

const initialState: IMenu = {
  mobile: "",
  map: { isHidden: true },
  faq: { isHidden: true },
  signIn: { isHidden: true },
  volume: { isHidden: true },
  chat: { isHidden: true },
  userIcons: { isHidden: true },
  liveStream: {
    isHidden: true,
    hasClicked: false,
  },
  isGalleryActive: false,
  currentGalleryId: 1,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  extraReducers: {
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
  reducers: {
    hideMenus: (state) => {
      // redux toolkit allows us to "mutate" state (not exactly what's happening)
      state.map.isHidden = true;
      state.faq.isHidden = true;
      state.signIn.isHidden = true;
      state.volume.isHidden = true;
      state.chat.isHidden = true;
      state.userIcons.isHidden = true;
      state.liveStream.isHidden = true;
    },
    setOneMenu: (state, action: PayloadAction<string>) => {
      state.signIn.isHidden = true;
      state.faq.isHidden = true;
      state.volume.isHidden = true;
      state.liveStream.isHidden = true;
      state.map.isHidden = true;
      state.chat.isHidden = true;
      state.userIcons.isHidden = true;

      // if the same menu is tapped, toggle it off (return init state)
      if (action.payload === "" || state.mobile === action.payload) {
        state.isGalleryActive = true;
        state.mobile = "";
      } else {
        switch (action.payload) {
          case "signIn":
            state.signIn.isHidden = false;
            state.isGalleryActive = false;
            break;
          case "faq":
            state.faq.isHidden = false;
            state.isGalleryActive = false;
            break;
          case "volume":
            state.volume.isHidden = false;
            break;
          case "liveStream":
            state.liveStream.isHidden = false;
            state.liveStream.hasClicked = true;
            // Cookies.set("clickedLiveStream", true);
            break;
          case "map":
            state.map.isHidden = false;
            state.isGalleryActive = true;
            break;
          case "chat":
            state.chat.isHidden = false;
            state.isGalleryActive = false;
            break;
          case "usersIcon":
            state.userIcons.isHidden = false;
            state.isGalleryActive = false;
            break;
          default:
            break;
        }
        state.mobile = action.payload;
      }
    },
    setGalleryActive: (state) => {
      state.isGalleryActive = true;
    },
    showMap: (state) => {
      state.map.isHidden = false;
    },
    hideMap: (state) => {
      console.log("go");
      state.map.isHidden = true;
      state.mobile = "";
    },
    toggleMap: (state) => {
      state.map.isHidden = !state.map.isHidden;
    },

    showFaq: (state) => {
      state.mobile = "faq";
      state.faq.isHidden = false;
    },
    hideFaq: (state) => {
      state.mobile = "";
      state.faq.isHidden = true;
    },
    toggleFaq: (state) => {
      state.faq.isHidden = !state.faq.isHidden;
      if (state.faq.isHidden) state.mobile = "";
      else state.mobile = "faq";
    },
    showSignIn: (state) => {
      state.mobile = "signIn";
      state.signIn.isHidden = false;
    },
    hideSignIn: (state) => {
      state.mobile = "";
      state.signIn.isHidden = true;
    },
    toggleSignIn: (state) => {
      state.signIn.isHidden = !state.signIn.isHidden;
      if (state.signIn.isHidden) state.mobile = "";
      else state.mobile = "signIn";
    },
    showChat: (state) => {
      state.mobile = "chat";
      state.chat.isHidden = false;
    },
    hideChat: (state) => {
      state.mobile = "";
      state.chat.isHidden = true;
    },
    toggleChat: (state) => {
      state.chat.isHidden = !state.chat.isHidden;
      if (state.chat.isHidden) state.mobile = "";
      else state.mobile = "chat";
    },
    showLiveStream: (state) => {
      state.liveStream.isHidden = false;
      state.liveStream.hasClicked = true;
    },
    hideLiveStream: (state) => {
      state.liveStream.isHidden = true;
    },
    toggleLiveStream: (state) => {
      state.liveStream.isHidden = !state.liveStream.isHidden;
      if (state.liveStream.isHidden) state.mobile = "";
    },
    setGalleryId: (state, action: PayloadAction<number>) => {
      state.currentGalleryId = action.payload;
    },
  },
});

// TODO -  volume, userIcons
// map, faq, signin,  volume, chat, usericons, livestream
export const {
  showMap,
  hideMap,
  toggleMap,
  showFaq,
  hideFaq,
  toggleFaq,
  showChat,
  hideChat,
  toggleChat,
  showSignIn,
  hideSignIn,
  toggleSignIn,
  showLiveStream,
  hideLiveStream,
  toggleLiveStream,
  setOneMenu,
  hideMenus,
  setGalleryActive,
  setGalleryId,
} = menuSlice.actions;
