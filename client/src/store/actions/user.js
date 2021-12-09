export const SETUSERROOM = 'SETUSERROOM';
export const SETUSER = 'SETUSER';
export const MOVEUSER = 'MOVEUSER';
export const MOVEUSERROOM = 'MOVEUSERROOM';
export const REGISTERUSER = 'REGISTERUSER';

export const SETUSERCOMP = 'SETUSERCOMP';
export const REMOVEUSERCOMP = 'REMOVEUSERCOMP';

export const ADDWINE = 'ADDWINE';
export const SETWINE = 'SETWINE';
export const RESETWINE = 'RESETWINE';
export const ADDCHEESE = 'ADDCHEESE';
export const SETCHEESE = 'SETCHEESE';
export const RESETCHEESE = 'RESETCHEESE';
export const ADDCOCKTAIL = 'ADDCOCKTAIL';
export const SETCOCKTAIL = 'SETCOCKTAIL';
export const RESETCOCKTAIL = 'RESETCOCKTAIL';

export const TOGGLEOUTSIDE = 'TOGGLEOUTSIDE';



export const setUser = (userName, avatar) => {
  return {
    type: SETUSER,
    payload: {avatar, userName}
  }
}

export const setUserRoom = (room) => {
  return {
    type: SETUSERROOM,
    payload: {room}
  }
}

export const setUserComp = (comp) => {
  return {
    type: SETUSERCOMP,
    payload: {comp}
  }
}

export const removeUserComp = () => {
  return {
    type: REMOVEUSERCOMP
  }
}

export const moveUser = (x, y, wineLocation) => {
  return {
    type: MOVEUSER,
    payload: {x, y, wineLocation}
  }
}

export const moveUserRoom = (x, y) => {
  return {
    type: MOVEUSERROOM,
    payload: {x, y}
  }
}

export const registerUser = (userName, avatar) => {
  return {
    type: REGISTERUSER,
    payload: {userName, avatar}
  }
}


export const addWine = (location) => {
  return {
    type: ADDWINE,
    payload: {location}
  }
}

export const setWine = (needsWine, hasWine) => {
  return {
    type: SETWINE,
    payload: {needsWine, hasWine}
  }
}

export const resetWine = () => {
  return {
    type: RESETWINE
  }
}

export const addCheese = (location) => {
  return {
    type: ADDCHEESE,
    payload: {location}
  }
}

export const setCheese = (needsCheese, hasCheese) => {
  return {
    type: SETCHEESE,
    payload: {needsCheese, hasCheese}
  }
}

export const resetCheese = () => {
  return {
    type: RESETCHEESE
  }
}

export const addCocktail = (location) => {
  return {
    type: ADDCOCKTAIL,
    payload: {location}
  }
}

export const setCocktail = (needsCocktail, hasCocktail) => {
  return {
    type: SETCOCKTAIL,
    payload: {needsCocktail, hasCocktail}
  }
}

export const resetCocktail = () => {
  return {
    type: RESETCOCKTAIL
  }
}

export const toggleOutside = () => {
  return {
    type: TOGGLEOUTSIDE
  }
}