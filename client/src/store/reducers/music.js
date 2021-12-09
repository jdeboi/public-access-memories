import { 
    UNMUTEVOLUME, MUTEVOLUME, 
    TOGGLEVOLUME, SETVOLUME, SETSKETCHVOLUME,
    SETSKETCHMUSIC, SETNOSKETCHMUSIC,
    INCREMENTSONG, DECREMENTSONG, 
    SETSONG, SETRANDOMSONG 
} from '../actions/music';

const songs = {
    gallery: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/lounge.mp3",
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/sexy.mp3",
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/jazzriff.mp3",
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/samba.mp3",
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/jazzpiano.mp3",
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/trap.mp3",
    ],
    yosemite: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/yosemite/crackle.mp3",
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/yosemite/fire.mp3"
    ],
    cloud: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/wind.mp3",
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/choir.mp3"
    ],
    hardDrives: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/hardDrives/seagulls.mp3", 
    ],
    xfinity: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/loop/underwater.mp3",
    ],
    mars: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/mars/pool.mp3",
    ],
    wetStreams: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/wetStreams/shower.mp3", 
    ],
    macBookAir: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/macbookAir/air.mp3", 
    ],
    jungleGyms: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/jungleGyms/gym_audio.mp3", 
    ],
    flush: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/vorTech/whirl_audio.mp3",
    ],
    clickMe: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/clickMe/electric.mp3",
    ],
    default: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/music/lounge.mp3"
    ],
    wasted: [
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/loop/tic2.mp3" 
    ]
}

const initState = {
    currentSong: 0,
    currentSketch: "default",
    currentSongTitle: songs.default[0],

    hasAudio: false,
    isMuted: false,
    masterVolume: .5,
    sketchVolume: 0,
    volume: 0
}


export const musicReducer = (state = initState, action) => {
    const music = { ...state };
    switch (action.type) {
        case MUTEVOLUME:
            music.isMuted = true;
            return music;
        case UNMUTEVOLUME:
            music.isMuted = false;
            return music;
        case TOGGLEVOLUME:
            music.isMuted = !music.isMuted;
            return music;
        case SETVOLUME:
            music.masterVolume = action.payload.volume;
            music.volume = music.sketchVolume * music.masterVolume;
            return music;
        case SETSKETCHVOLUME:
            music.sketchVolume = action.payload.volume;
            music.volume = music.sketchVolume * music.masterVolume;
         return music;

        case SETSKETCHMUSIC:
            let sketch = action.payload.sketch;
            let id = action.payload.id;
            let song = songs[sketch][id];
            music.hasAudio = true;
            music.currentSong = id;
            music.currentSketch = sketch;
            music.currentSongTitle = song;
            music.sketchVolume = action.payload.volume;
            music.volume = music.sketchVolume * music.masterVolume;
            // music.isMuted = false;
            return music;
        case SETNOSKETCHMUSIC:
            return initState;

        case SETSONG:
            let song2 = action.payload.song;
            if (song2 >= 0 && song2 < songs[music.currentSketch].length) {
                music.currentSong = song2;
                music.currentSongTitle = songs[music.currentSketch][song2];
                return music;
            }
            return state;
        case INCREMENTSONG:
            music.currentSong += 1;
            music.currentSong %= songs[music.currentSketch].length;
            return music;
        case DECREMENTSONG:
            music.currentSong -= 1;
            if (music.currentSong < 0)
                music.currentSong = songs[music.currentSketch].length - 1;
            music.currentSongTitle = songs[music.currentSketch][music.currentSong];
            return music;
        case SETRANDOMSONG:
            let numSongs = songs[music.currentSketch].length;
            let current = music.currentSong;
            let r = Math.floor(Math.random() * (numSongs - 2) + 1);
            music.currentSong = (current + r) % numSongs;
            music.currentSongTitle = songs[music.currentSketch][music.currentSong];
            return music;
        default:
            return state;
    }
}

