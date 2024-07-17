import { IRoom, IArtist } from "../../../interfaces";
import { ShowConfig } from "../../CurrentShow/ShowConfig";

export const roomConfig = {
  w: 5,
  h: 5,
  start: 0,
  end: 1,
};

export const artist: IArtist = {
  id: 0,
  roomID: 0,
  title: "",
  name: "",
  nameLink: "",
  thumb: "",
  webLink: "",
  instaLink: "",
  medium: "",
  description: "",
  year: 2024,
  bio: "",
};

export const artists: IArtist[] = [
  {
    id: 0,
    roomID: 0,
    title: "HomeOffices",
    name: "Dave Greber",
    nameLink: "greber",
    thumb: "greber-thumb",
    webLink: "https://www.thesculpted.com/",
    instaLink: "https://www.instagram.com/davaygrebere/",
    medium: "New media, Generative AI, HTML, Javascript",
    description:
      "'HomeOffices' delves into the idealized corporate environments of the 1980s, now transposed into the domestic spaces we work in today. Through generative AI, retro office furniture images alter, transforming as you navigate them with your cursor. This exhibit reflects on the absurdity of merging professional and personal spaces, offering a satirical yet sublime commentary on our current work-from-home culture.",
    year: 2024,
    bio: "Dave Greber is a contemporary artist and educator based in Baltimore, MD, known for his innovative installations and multimedia projects that explore the intersection of technology, art, and everyday life. His work, exhibited extensively nationally and internationally, blends traditional and digital media to create immersive experiences that subvert everyday expectations. Recents projects include a large-scale public art commission with the MTA Arts and Design and a solo show at the Ogden Museum of Art. Greber's latest project, 'HomeOffices,' uses generative AI to satirically reimagine the corporate dream within the context of modern home offices, offering insightful commentary on today's work culture.",
  },
];

const roomDetails = [
  {
    id: 0,
    x: 2,
    y: 5,
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
    dir: "",
    artistID: getArtistID(i),
    link: `/`,
  };
  roomsArray.push(roomDeets);
}

export const rooms = roomsArray;
