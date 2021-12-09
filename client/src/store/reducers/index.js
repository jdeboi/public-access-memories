/*
Reducers modify state, and set default state
store is created from reducers; it's what holds state
*/

import { combineReducers } from 'redux';
import { messagesReducer, messageNotificationReducer } from './messages';
// import { mapReducer, faqReducer, chatReducer, loginReducer, userIconsReducer, menuReducer, volumeReducer } from './menuItems';
import { menuReducer } from './menuItems';

import { userReducer, userActiveChatReducer, userHoverChatReducer, userOutsideReducer } from './user';
import { musicReducer } from './music';
import { windowReducer} from './window';

import Cookies from 'js-cookie';


const allReducers = combineReducers({
  user: userReducer,
  messages: messagesReducer,
  menu: menuReducer,
  userActiveChat: userActiveChatReducer,
  userHoverChat: userHoverChatReducer,
  chatNotifications: messageNotificationReducer,
  music: musicReducer,
  outside: userOutsideReducer,
  ui: windowReducer
})

// export default allReducers;

// in order to reset app, set state of allReducers to undefined
// https://www.digitalocean.com/community/tutorials/redux-reset-state-redux
const rootReducer = (state, action) => {

  if (action.type === 'RESETAPP') {
    Cookies.remove("hasAvatar");
    Cookies.remove("avatar");
    Cookies.remove("userName");
    // Cookies.remove("clickedLiveStream");
    state = undefined;
  }

  return allReducers(state, action);
}

export default rootReducer;