import { IRoom, IArtist } from "../../../interfaces";
import { ShowConfig } from "../../CurrentShow/ShowConfig";

export const reservedArtists: IArtist[] = [];

export const roomConfig = {
  w: 2,
  h: 2,
  start: 0,
  end: 1,
};

const TBA = "TBA";
const YEAR = 2025;

function getDefaultArtist(id: number): IArtist {
  return {
    id: id,
    roomID: id,
    title: TBA,
    name: "artist " + TBA,
    thumb: "temp-thumb",
    nameLink: TBA,
    instaLink: "",
    webLink: "",
    medium: TBA,
    description: TBA,
    bio: TBA,
    year: YEAR,
  };
}

export const artists: IArtist[] = Array.from({ length: 10 }, (_, i) =>
  getDefaultArtist(i)
);

// const roomIds = artists.map((artist) => artist.roomID);

const roomDetails = [
  {
    id: 0,
    x: 5,
    y: 22,
    dir: "right",
  },
  {
    id: 1,
    x: 0,
    y: 17,
    // rot: -90,
    dir: "right",
  },
  {
    id: 2,
    x: -5,
    y: 12,
    // rot: 90,
    dir: "right",
  },
  {
    id: 3,
    x: 12,
    y: 13,
    // rot: 0,
    dir: "bottom",
  },
  {
    id: 4,
    title: "room 2",
    x: 12,
    y: 8,
    // rot: -90,
    dir: "right",
  },
  {
    id: 5,
    x: 7,
    y: 8,
    // rot: 90,
    dir: "left",
  },
  {
    id: 6,
    x: 0,
    y: 0,
    // rot: 0,
    dir: "bottom",
  },
  {
    id: 7,
    x: 5,
    y: 0,
    // rot: 0,
    dir: "bottom",
  },
  {
    id: 8,
    x: 10,
    y: 0,
    // rot: 90,
    dir: "bottom",
  },
  {
    id: 9,
    x: 15,
    y: 0,
    // rot: 0,
    dir: "bottom",
  },
  {
    id: 10,
    x: 27,
    y: 5,
    // rot: 90,
    dir: "left",
  },
  {
    id: 11,
    x: 27,
    y: 10,
    // rot: 90,
    dir: "left",
  },
  {
    id: 12,
    x: 20,
    y: 17,
    // rot: 0,
    dir: "left",
  },
  {
    id: 13,
    x: 20,
    y: 22,
    // rot: 90,
    dir: "left",
  },
];

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
    artistID: getArtistID(i),
    link: `/${ShowConfig.link}/rooms/${getArtistID(i)}`,
  };
  roomsArray.push(roomDeets);
}

export const rooms = roomsArray;
