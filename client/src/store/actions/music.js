export const UNMUTEVOLUME = 'UNMUTEVOLUME';
export const MUTEVOLUME = 'MUTEVOLUME';
export const TOGGLEVOLUME = 'TOGGLEVOLUME';
export const SETVOLUME = 'SETVOLUME';
export const SETSKETCHVOLUME = 'SETSKETCHVOLUME';

export const INCREMENTSONG = 'INCREMENTSONG';
export const DECREMENTSONG = 'DECREMENTSONG';
export const SETSONG = 'SETSONG';
export const SETRANDOMSONG = 'SETRANDOMSONG';

export const SETSKETCHMUSIC = 'SETSKETCHMUSIC'; 
export const SETNOSKETCHMUSIC = 'SETNOSKETCHMUSIC';


//////////////// sketch music
export const setSketchMusic = (sketch, id, volume=.5) => {
    return { 
        type: SETSKETCHMUSIC, 
        payload: { sketch, id, volume } 
    };
}

export const setNoSketchMusic = () => {
    return { type: SETNOSKETCHMUSIC };
}

//////////////// volume
export const unmuteVolume = () => {
    return { type: UNMUTEVOLUME };
}

export const toggleVolume = () => {
    return { type: TOGGLEVOLUME };
}

export const muteVolume = () => {
    return { type: MUTEVOLUME };
}

export const setVolume = (vol) => {
    return { type: SETVOLUME, payload: { volume: vol } };
}

export const setSketchVolume = (vol) => {
    return { type: SETSKETCHVOLUME, payload: { volume: vol } };
}

//////////////// current song
export const setRandomSong = () => {
    return { type: SETRANDOMSONG };
}

export const incrementSong = () => {
    return { type: INCREMENTSONG };
}


export const decrementSong = () => {
    return { type: DECREMENTSONG };
}

export const setSong = (num) => {
    return { type: SETSONG, payload: { song: num } }
}