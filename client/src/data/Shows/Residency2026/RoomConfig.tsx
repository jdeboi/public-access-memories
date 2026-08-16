import { IRoom, IArtist } from "../../../interfaces";
import { alwaysReservedArtists } from "../../CurrentShow/ArtistConfig";
import { ShowConfig } from "../../CurrentShow/ShowConfig";

export const reservedArtists = {
  ...alwaysReservedArtists,
  hostBot: "🤖",
};

export const roomConfig = {
  w: 4,
  h: 4,
  start: 0,
  end: 1,
};

const YEAR = 2026;

function getDefaultArtist(id: number): IArtist {
  return {
    id,
    roomID: id,
    title: "Studio",
    name: "Artist TBA",
    thumb: "",
    nameLink: "",
    instaLink: "",
    webLink: "",
    medium: "",
    description: null,
    bio: "",
    year: YEAR,
  };
}

export const artists: IArtist[] = [
  ...[0, 1, 2, 3, 4, 5].map(getDefaultArtist),
  {
    id: 6,
    roomID: 6,
    title: "Lounge",
    userName: "hostBot",
    name: "Lounge",
    customLink: "/lounge",
    thumb: "",
    nameLink: "",
    instaLink: "",
    webLink: "",
    medium: "",
    description: null,
    bio: "",
    year: YEAR,
  },
];

function getRoomPosition(index: number): { x: number; y: number } {
  if (index < 6) {
    // 2 rows of 3: row 0 at y=0, row 1 at y=8
    return { x: (index % 3) * 7 - 2, y: Math.floor(index / 3) * 14 };
  }
  // lounge: centered below at y=16
  return { x: 22, y: 6 };
}

const roomDetails = artists.map((artist, index) => ({
  id: index,
  ...getRoomPosition(index),
  dir: "centerBottom",
  userName: artist.userName,
  customLink: artist.customLink ? artist.customLink : null,
}));

const roomsArray: IRoom[] = [];

function getArtistID(roomID: number) {
  const artist = artists.find((a) => a.roomID === roomID);
  return artist ? artist.id : 0;
}

for (let i = 0; i < artists.length; i++) {
  const roomDeets: IRoom = {
    ...roomDetails[i],
    artistID: getArtistID(i),
    link:
      roomDetails[i].customLink ??
      `/${ShowConfig.show.slug}/rooms/${getArtistID(i)}`,
  };
  roomsArray.push(roomDeets);
}

export const rooms = roomsArray;
