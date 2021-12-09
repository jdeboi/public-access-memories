// action types
export const HIDEMENUS = 'HIDEMENUS';
export const SETONEMENU = 'SETONEMENU';

export const SHOWMAP = 'SHOWMAP';
export const HIDEMAP = 'HIDEMAP';
export const TOGGLEMAP = 'TOGGLEMAP';

export const SHOWFAQ = 'SHOWFAQ';
export const HIDEFAQ = 'HIDEFAQ';
export const TOGGLEFAQ = 'TOGGLEFAQ';

export const SHOWCHAT = 'SHOWCHAT';
export const HIDECHAT = 'HIDECHAT';
export const TOGGLECHAT = 'TOGGLECHAT';

export const SHOWUSERICONS = 'SHOWUSERICONS';
export const HIDEUSERICONS = 'HIDEUSERICONS';
export const TOGGLEUSERICONS = 'TOGGLEUSERICONS';

export const SHOWVOLUME = 'SHOWVOLUME';
export const HIDEVOLUME = 'HIDEVOLUME';
export const TOGGLEVOLUMEMENU = 'TOGGLEVOLUMEMENU';

export const SHOWLIVESTREAM = 'SHOWLIVESTREAM';
export const HIDELIVESTREAM = 'HIDELIVESTREAM';
export const TOGGLELIVESTREAM = 'TOGGLELIVESTREAM';

export const SHOWSIGNIN = 'SHOWSIGNIN';
export const HIDESIGNIN = 'HIDESIGNIN';
export const TOGGLESIGNIN = 'TOGGLESIGNIN';

export const SETGALLERYACTIVE = 'SETGALLERYACTIVE';

export const hideMenus = () => {
  return {
    type: HIDEMENUS
  }
}

export const setOneMenu = (show) => {
  return {
    type: SETONEMENU,
    payload: { show }
  }
}

export const setGalleryActive = () => {
  return {
    type: SETGALLERYACTIVE
  }
}

///////////// MAP
export const toggleMap = () => {
  return {
    type: TOGGLEMAP
  }
}

export const showMap = () => {
  return {
    type: SHOWMAP
  }
}

export const hideMap = () => {
  return {
    type: HIDEMAP
  }
}

///////////// FAQ
export const toggleFaq = () => {
  return {
    type: TOGGLEFAQ
  }
}

export const showFaq = () => {
  return {
    type: SHOWFAQ
  }
}

export const hideFaq = () => {
  return {
    type: HIDEFAQ
  }
}

///////////// Chat
export const toggleChat = () => {
  return {
    type: TOGGLECHAT
  }
}

export const showChat = () => {
  return {
    type: SHOWCHAT
  }
}

export const hideChat = () => {
  return {
    type: HIDECHAT
  }
}


///////////// USER ICONS
export const toggleUserIcons = () => {
  return {
    type: TOGGLEUSERICONS
  }
}

export const showUserIcons = () => {
  return {
    type: SHOWUSERICONS
  }
}

export const hideUserIcons = () => {
  return {
    type: HIDEUSERICONS
  }
}

////////////// VOLUME


export const showVolume = () => {
  return {
    type: SHOWVOLUME
  }
}

export const hideVolume = () => {
  return {
    type: HIDEVOLUME
  }
}

export const toggleVolumeMenu = () => {
  return {
    type: TOGGLEVOLUMEMENU
  }
}


////////////// live stream


export const showLiveStream = () => {
  return {
    type: SHOWLIVESTREAM
  }
}

export const hideLiveStream = () => {
  return {
    type: HIDELIVESTREAM
  }
}

export const toggleLiveStream = () => {
  return {
    type: TOGGLELIVESTREAM
  }
}

///////////// SIGN IN
export const toggleSignIn = () => {
  return {
    type: TOGGLESIGNIN
  }
}

export const showSignIn = () => {
  return {
    type: SHOWSIGNIN
  }
}

export const hideSignIn = () => {
  return {
    type: HIDESIGNIN
  }
}
