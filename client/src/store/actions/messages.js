export const ADDMESSAGE = 'ADDMESSAGE';
export const INCREMENTMESSAGENOTIFICATION = 'INCREMENTMESSAGENOTIFICATION';
export const RESETMESSAGENOTIFICATION = 'RESETMESSAGENOTIFICATION';


export const addMessage = (message) => {
  return {
    type: ADDMESSAGE,
    payload: {message}
  }
}


export const addMessageNotification = () => {
  return { type : INCREMENTMESSAGENOTIFICATION };
}

export const resetMessgeNotification = () => {
  return { type : RESETMESSAGENOTIFICATION };
}