import { ADDMESSAGE, INCREMENTMESSAGENOTIFICATION, RESETMESSAGENOTIFICATION } from '../actions/messages';

export const messagesReducer = (state=[], action) => {
  switch(action.type) {
    case ADDMESSAGE:
      const messages = [...state, action.payload.message];
      return messages;
    default:
      return state;
  }
}


export const messageNotificationReducer = (state=0, action) => {
  switch(action.type) {
    case INCREMENTMESSAGENOTIFICATION:
      return state + 1;
    case RESETMESSAGENOTIFICATION:
      return 0;
    default:
      return state;
  }
}

