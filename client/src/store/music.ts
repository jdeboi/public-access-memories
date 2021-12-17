import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const songs = [
    "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/lounge.mp3",
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
        setVolume: (state, action) => {
            state.mainVolume = action.payload.volume;
            state.volume = state.sketchVolume * state.mainVolume;
        },
        setSketchVolume: (state, action) => {
            state.sketchVolume = action.payload.volume;
            state.volume = state.sketchVolume * state.mainVolume;
        },
        setSketchMusic: (state, action) => {
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
        setSong: (state, action) => {
            let song2 = action.payload.song;
            // if (song2 >= 0 && song2 < songs[state.currentSketch].length) {
            //     state.currentSong = song2;
            //     state.currentSongTitle = songs[state.currentSketch][song2];
            // }
        },
        incrementSong: (state, action) => {
            state.currentSong += 1;
            // state.currentSong %= songs[state.currentSketch].length;
        },
        decrementSong: (state, action) => {
            state.currentSong -= 1;
            if (state.currentSong < 0) {
                // state.currentSong = songs[state.currentSketch].length - 1;
            }
            // state.currentSongTitle = songs[state.currentSketch][state.currentSong];
        },
        setRandomSong: (state) => {
            let numSongs = 0; // songs[state.currentSketch].length;
            let current = state.currentSong;
            let r = Math.floor(Math.random() * (numSongs - 2) + 1);
            state.currentSong = (current + r) % numSongs;
            // state.currentSongTitle = songs[state.currentSketch][state.currentSong];
        }
    }
})



export const {
    muteVolume, unMuteVolume, toggleVolume, setVolume, setSketchVolume,
    setSketchMusic, setNoSketchMusic, setSong,
    incrementSong, decrementSong, setRandomSong
} = musicSlice.actions;