export const SETUSERACTIVECHAT = 'SETUSERACTIVECHAT';
export const SETUSERHOVERCHAT = 'SETUSERHOVERCHAT';
export const USERHOVERCHATLEAVE = 'USERHOVERCHATLEAVE';

export const userHoverChatLeave = () => {
  return {
    type: USERHOVERCHATLEAVE
  }
}

export const setUserActiveChat = (user) => {
  return {
    type: SETUSERACTIVECHAT,
    payload: {user}
  }
}

export const setUserHoverChat = (user) => {
  return {
    type: SETUSERACTIVECHAT,
    payload: {user}
  }
}
