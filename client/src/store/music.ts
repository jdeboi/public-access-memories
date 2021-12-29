import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const songs = [
    "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/lounge.mp3",
    "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/sexy.mp3",
    "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/jazzriff.mp3",
    "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/samba.mp3",
    "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/jazzpiano.mp3",
    "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/trap.mp3",
]



const initialState = {
    currentSong: 0,
    currentSketch: "default",
    currentSongTitle: songs[0],

    hasAudio: false,
    isMuted: false,
    mainVolume: .5,
    sketchVolume: 0,
    volume: 0
}

export const musicSlice = createSlice({
    name: "music",
    initialState,
    extraReducers: {
        reset: (state) => {
            Object.assign(state, initialState)
        },
    },
    reducers: {
        muteVolume: (state) => {
            state.isMuted = true;
        },
        unMuteVolume: (state) => {
            state.isMuted = false;
        },
        toggleVolume: (state) => {
            state.isMuted = !state.isMuted;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.mainVolume = action.payload;
            state.volume = state.sketchVolume * state.mainVolume;
        },
        setSketchVolume: (state, action: PayloadAction<number>) => {
            state.sketchVolume = action.payload;
            state.volume = state.sketchVolume * state.mainVolume;
        },
        setSketchMusic: (state, action: PayloadAction<{id: number, sketch: string, volume: number}>) => {
            let sketch = action.payload.sketch;
            let id = action.payload.id;
            let song = "song"; //songs[sketch][id];
            state.hasAudio = true;
            state.currentSong = id;
            state.currentSketch = sketch;
            state.currentSongTitle = song;
            state.sketchVolume = action.payload.volume;
            state.volume = state.sketchVolume * state.mainVolume;
        },
        setNoSketchMusic: (state) => {
            state = initialState;
        },
        setSong: (state, action: PayloadAction<number>) => {
            let song = action.payload;
            if (song >= 0 && song < songs.length) {
                state.currentSong = song;
                state.currentSongTitle = songs[song];
            }
        },
        incrementSong: (state) => {
            state.currentSong += 1;
            if (state.currentSong >= songs.length) {
                state.currentSong = 0;
            }
            const song = state.currentSong;
            state.currentSongTitle = songs[song];
        },
        decrementSong: (state) => {
            state.currentSong -= 1;
            if (state.currentSong < 0) {
                state.currentSong = songs.length;
            }
            const song = state.currentSong;
            state.currentSongTitle = songs[song];
        },
        setRandomSong: (state) => {
            let numSongs = songs.length; 
            let current = state.currentSong;
            let r = Math.floor(Math.random() * (numSongs - 2) + 1);
            state.currentSong = (current + r) % numSongs;
            state.currentSongTitle = songs[state.currentSong];
        }
    }
})



export const {
    muteVolume, unMuteVolume, toggleVolume, setVolume, setSketchVolume,
    setSketchMusic, setNoSketchMusic, setSong,
    incrementSong, decrementSong, setRandomSong
} = musicSlice.actions;