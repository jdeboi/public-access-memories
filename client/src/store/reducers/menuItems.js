import { truncate } from 'fs';
import {
  SETONEMENU, HIDEMENUS,
  SHOWMAP, HIDEMAP, TOGGLEMAP,
  SHOWCHAT, HIDECHAT, TOGGLECHAT,
  SHOWUSERICONS, HIDEUSERICONS, TOGGLEUSERICONS,
  SHOWFAQ, HIDEFAQ, TOGGLEFAQ,
  SHOWSIGNIN, HIDESIGNIN, TOGGLESIGNIN,
  SHOWVOLUME, HIDEVOLUME, TOGGLEVOLUMEMENU,
  SHOWLIVESTREAM, HIDELIVESTREAM, TOGGLELIVESTREAM,
  SETGALLERYACTIVE
} from '../actions/menuItems';

// import Cookies from 'js-cookie';

const initState = {
  mobile: null,
  isMapHidden: true,
  isFaqHidden: true,
  isSignInHidden: true,
  isVolumeHidden: true,
  isChatHidden: true,
  isUserIconsHidden: true,
  isLiveStreamHidden: true,
  hasClickedLiveStream: false,
  isGalleryActive: false,
}

const getOneMenu = (oldMenu, show) => {
  let newMenu = { ...initState };
  // if the same menu is tapped, toggle it off (return init state)
  if (!show || oldMenu.mobile === show) {
    newMenu.isGalleryActive = true;
    return newMenu;
  }

  // otherwise, set mobile and individual state for desktop

  newMenu.mobile = show;
  switch (show) {
    case "signIn":
      newMenu.isSignInHidden = false;
      newMenu.isGalleryActive = false;
      return newMenu;
    case "faq":
      newMenu.isFaqHidden = false;
      newMenu.isGalleryActive = false;
      return newMenu;
    case "volume":
      newMenu.isVolumeHidden = false;
      return newMenu;
    case "liveStream":
      newMenu.isLiveStreamHidden = false;
      // Cookies.set("clickedLiveStream", true);
      newMenu.hasClickedLiveStream = true;
      return newMenu;
    case "map":
      newMenu.isMapHidden = false;
      newMenu.isGalleryActive = true;
      return newMenu;
    case "chat":
      newMenu.isChatHidden = false;
      newMenu.isGalleryActive = false;
      return newMenu;
    case "users":
      newMenu.isUserIconsHidden = false;
      newMenu.isGalleryActive = false;
      return newMenu;
  }
}

export const menuReducer = (state = initState, action) => {
  const menu = { ...state };
  switch (action.type) {

    // all
    case HIDEMENUS:
      let s = { ...initState };
      s.hasClickedLiveStream = menu.hasClickedLiveStream
      return s;
    case SETONEMENU:
      return getOneMenu(menu, action.payload.show);

    case SETGALLERYACTIVE:
      menu.isGalleryActive = true;
      return menu;

    // map
    case SHOWMAP:
      menu.isMapHidden = false;
      return menu;
    case HIDEMAP:
      menu.isMapHidden = true;
      return menu;
    case TOGGLEMAP:
      menu.isMapHidden = !menu.isMapHidden;
      return menu;

    // faq
    case SHOWFAQ:
      menu.isFaqHidden = false;
      return menu;
    case HIDEFAQ:
      menu.isFaqHidden = true;
      return menu;
    case TOGGLEFAQ:
      menu.isFaqHidden = !menu.isFaqHidden;
      return menu;

    // chat
    case SHOWCHAT:
      menu.isChatHidden = false;
      return menu;
    case HIDECHAT:
      menu.isChatHidden = true;
      return menu;
    case TOGGLECHAT:
      menu.isChatHidden = !menu.isChatHidden;
      return menu;

    // Sign In
    case SHOWSIGNIN:
      menu.mobile = "signIn";
      menu.isSignInHidden = false;
      return menu;
    case HIDESIGNIN:
      menu.mobile = null;
      menu.isSignInHidden = true;
      return menu;
    case TOGGLESIGNIN:
      menu.isSignInHidden = !menu.isSignInHidden;
      if (menu.isSignInHidden)
        menu.mobile = null;
      else
        menu.mobile = "signIn";
      return menu;

    // Volume
    case SHOWVOLUME:
      menu.isVolumeHidden = false;
      return menu;
    case HIDEVOLUME:
      menu.isVolumeHidden = true;
      return menu;
    case TOGGLEVOLUMEMENU:
      menu.isVolumeHidden = !menu.isVolumeHidden;
      return menu;

    // livestream
    case SHOWLIVESTREAM:
      menu.isLiveStreamHidden = false;
      // Cookies.set("clickedLiveStream", true);
      menu.hasClickedLiveStream = true;
      return menu;
    case HIDELIVESTREAM:
      menu.isLiveStreamHidden = true;
      return menu;
    case TOGGLELIVESTREAM:
      menu.hasClickedLiveStream = true;
      menu.isLiveStreamHidden = !menu.isLiveStreamHidden;
      return menu;


    default:
      return menu;
  }
}