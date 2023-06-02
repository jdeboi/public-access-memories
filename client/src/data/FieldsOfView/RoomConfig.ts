import { IRoom, IArtist } from '../../interfaces';
import { ShowConfig } from '../CurrentShow/ShowConfig';

export const roomConfig = {
    w: 5,
    h: 5,
    start: 0,
    end: 1
}

export const artists: IArtist[] = [
   
    {
        id: 0,
        roomID: 0,
        title: "TBD",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "TBD",
        year: 2023,
        bio: ""
    },
    {
        id: 1,
        roomID: 1,
        title: "TBD",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "TBD",
        year: 2023,
        bio: ""
    },
    {
        id: 2,
        roomID: 2,
        title: "TBD",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "TBD",
        year: 2023,
        bio: ""
    },
    {
        id: 3,
        roomID: 3,
        title: "TBD",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "TBD",
        year: 2023,
        bio: ""
    },
    {
        id: 4,
        roomID: 4,
        title: "TBD",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "TBD",
        year: 2023,
        bio: ""
    },
    {
        id: 5,
        roomID: 5,
        title: "TBD",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "TBD",
        year: 2023,
        bio: ""
    },
    {
        id: 6,
        roomID: 6,
        title: "TBD",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "TBD",
        year: 2023,
        bio: ""
    },
    {
        id: 7,
        roomID: 7,
        title: "TBD",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "TBD",
        year: 2023,
        bio: ""
    },
    {
        id: 8,
        roomID: 8,
        title: "TBD",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "TBD",
        year: 2023,
        bio: ""
    },
    {
        id: 9,
        roomID: 9,
        title: "TBD",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "TBD",
        year: 2023,
        bio: ""
    },
    {
        id: 10,
        roomID: 10,
        title: "TBD",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "TBD",
        year: 2023,
        bio: ""
    },
    {
        id: 11,
        roomID: 11,
        title: "TBD",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "TBD",
        year: 2023,
        bio: ""
    },
];

const roomDetails = [
    {
        id: 0,
        x: 2,
        y: 5,
    },
    {
        id: 1,
        x: 8,
        y: 2,
    },
    {
        id: 2,
        x: 20,
        y: 4,
    },
    {
        id: 3,
        x: 26,
        y: 4,
    },
    {
        id: 4,
        x: 32,
        y: 4,
    },
    {
        id: 5,
        x: 38,
        y: 4,
    },
    {
        id: 6,
        x: 2,
        y: 28,
    },
    {
        id: 7,
        x: 8,
        y: 25,
    },
    {
        id: 8,
        x: 8,
        y: 38,
    },
    {
        id: 9,
        x: 2,
        y: 38,
    },
    {
        id: 10,
        x: 33,
        y: 27,
    },
    {
        id: 11,
        x: 39,
        y: 27,
    },
]

const roomsArray: IRoom[] = [];
function getArtistID(roomID: number) {
    let artist = artists.find((artist) => artist.roomID === roomID);
    if (artist) {
        return artist.id;
    }
    return 0;
}

for (let i = 0; i < artists.length; i++) {
    const roomDeets: IRoom = {
        ...roomDetails[i],
        dir: "",
        artistID: getArtistID(i),
        link: `/${ShowConfig.link}/rooms/${getArtistID(i)}`
    };
    roomsArray.push(roomDeets)
}

export const rooms = roomsArray;

