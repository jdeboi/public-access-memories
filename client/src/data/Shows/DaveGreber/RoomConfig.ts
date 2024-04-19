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
  title: "soft corruptor",
  name: "Everest Pipkin",
  nameLink: "pipkin",
  thumb: "pipkin-thumb",
  webLink: "https://everest-pipkin.com/",
  instaLink: "https://www.instagram.com/everestpipkin/",
  medium: "HTML",
  description:
    "Soft Corruptor is an unfolding html poem about pokemon blue, out of bounds areas, atomic structures, view source, and ghosts. Constructed out the html <details> tag, it is about surfaces and interiors in both subject and form.",
  year: 2021,
  bio: "Everest Pipkin is a game developer, writer, and artist from central Texas who lives and works on a sheep farm in southern New Mexico. Their work both in the studio and in the garden follows themes of ecology, tool making, and collective care during collapse. When not at the computer in the heat of the day, you can find them in the hills spending time with their neighbors— both human and non-human.",
};

export const artists: IArtist[] = [
  {
    id: 0,
    roomID: 0,
    title: "soft corruptor",
    name: "Everest Pipkin",
    nameLink: "pipkin",
    thumb: "pipkin-thumb",
    webLink: "https://everest-pipkin.com/",
    instaLink: "https://www.instagram.com/everestpipkin/",
    medium: "HTML",
    description:
      "Soft Corruptor is an unfolding html poem about pokemon blue, out of bounds areas, atomic structures, view source, and ghosts. Constructed out the html <details> tag, it is about surfaces and interiors in both subject and form.",
    year: 2021,
    bio: "Everest Pipkin is a game developer, writer, and artist from central Texas who lives and works on a sheep farm in southern New Mexico. Their work both in the studio and in the garden follows themes of ecology, tool making, and collective care during collapse. When not at the computer in the heat of the day, you can find them in the hills spending time with their neighbors— both human and non-human.",
  },
  {
    id: 1,
    roomID: 1,
    title: "Christina's World",
    name: "Christina Humphreys",
    nameLink: "humphreys",
    thumb: "humphreys-thumb",
    webLink: "https://www.christinahumphreys.com/",
    instaLink: "https://www.instagram.com/cellphonenovel",
    medium: "HTML, JavaScript",
    description:
      "This webpage is an interactive self portrait, a recreation of my desk based on a digital drawing I created in 2020. At the time, I wanted to explore more direct representation to document the stillness and slowness of being primarily indoors during the first months of the pandemic, drawing my desk at home, keyboard, and objects representing my mental state. The style is distinctively flat and references early computer and video game design, which utilized pixelated, economical design to make the most of the limited visual resources of early computer monitors. In a sense, the flattening of visual space also serves to suggest a flattening of time, a moment suspended not unlike a wilting bouquet in a still life painting. By turning the original image into an interactive website, users can experience my desk and also participate in my art-making process - creating pixelated patterns for embroidery that turn into patterned desk backgrounds. The pixel pattern builder was originally a collaboration with Chase Starr and has been repurposed for this drawing. Users can interact with the keyboard, loading different patterned designs by clicking each key, or use the grid canvas in the center of the page to design their own patterns.",
    year: 2023,
    bio: "Christina Humphreys is a multidisciplinary artist and curator based in San Francisco. In addition to her individual art practice and curatorial work, she has supported the capacity-building efforts of several art and technology organizations, including Tempus Projects, a pioneering nonprofit gallery and artist residency space in Tampa, Florida, the Museum of Craft and Design, Internet Archive, and Creativity Explored. She is a former member of Tampa artist collectives Quaid Gallery and Cunsthaus, where she organized exhibitions of artworks exploring themes of technology and the body. She has participated in artist and curator residencies in Florida and Cuba, and her work has been featured in exhibitions throughout the United States, internationally, and online.",
  },
  {
    id: 2,
    roomID: 2,
    title: "DCT : Syphoning",
    name: "Rosa Menkman",
    nameLink: "menkman",
    thumb: "menkman-thumb",
    webLink: "https://beyondresolution.info/",
    instaLink: "https://www.instagram.com/_menkman/",
    medium: "custom software, 3-channel video",
    description:
      "An exploration of the Ecology of Compression Complexities. DCT:SYPHONING is a contemporary translation of the 1884 Edwin Abbott Abbott roman “Flatland”. The work describes some of the algorithms at work in digital image compression. Inspired by Syphon, an open source software by Tom Butterworth and Anton Marini, in DCT:SYPHONING, an anthropomorphised DCT (Senior) narrates its first SYPHON (data transfer) together with DCT Junior, and their interactions as they translate data from one image compression to a next (aka the “realms of complexity”). As Senior introduces Junior to the different levels of image plane complexity, they move from blocks (the realm in which they normally resonate), to dither, lines and the more complex realms of wavelets and vectors. Junior does not only react to old compressions technologies, but also the newer, more complex ones which ‘scare' Junior, because of their 'illegibility'.",
    year: 2015,
    bio: "Rosa Menkman is a Dutch artist and researcher. Her work focuses on noise artifacts that result from accidents in both analogue and digital media. As a compendium to this research, she published the Glitch Moment/um (INC, 2011), a little book on the exploitation and popularization of glitch artifacts. Menkman developed and highlighted the politics of resolution setting further in a second book titled Beyond Resolution (i.R.D., 2020). In this book, she describes how the standardization of resolutions is not only a process that promotes efficiency, order and functionality, but also involves compromises and the obfuscation of alternative possibilities. In 2019 Menkman won the Collide, Arts at CERN Barcelona award, which inspired her recent research into what makes things im/possible. With a special focus on im/possible images. Through this research, Menkman aims to find new ways to understand, use and perceive through the use of, and interaction with, our technologies.",
  },
  {
    id: 3,
    roomID: 3,
    title: "Play Thing",
    name: "Alex Gibson + Desi Rekrut (PM)",
    nameLink: "gibson",
    thumb: "gibson-thumb",
    webLink: "https://www.caribbeanboy.com/",
    instaLink: "https://www.instagram.com/alexgibson___/",
    medium: "3D photogrammetry",
    description:
      "This edition of SPAM features a collaboration between visual artist Alex Gibson and drag/ performance artist PM. The resultant project is a catalog of images featuring painted body parts, found objects and costumes, all of which explore body, gender, drag, and camp through the transformative potential of newly generated forms. Considering non-binary forms as they relate both to humans* and non-humans, the artists merge plant and human fragments, drawing connections to gender fluidity as it exists in nature. An armpit sprouting ferns, a cone bra weighed down by pebbles—despite their fractured shapes, Play Thing’s body of images incites a sense of weight, pull and movement. Viewers are encouraged to click, rotate and zoom in on images to explore and play with the anthropomorphic forms. The flattened colors and exaggerated positions in these digital renderings highlight an absurdity integral to camp, while making reference to historical drag performances, interviews and imagery. Drag is always a performance on display, but this project gives us the opportunity to get up close and personal with a moment—rendered a sculpture—and consider the possibilities it implicates, the fluidity it represents and to imagine queer possibilities.",
    year: 2022,
    bio: "Alex Gibson (they/them)(b. 1994) is a queer, non-binary, Barbadian interdisciplinary artist based in Vancouver, BC, working on the unceded territories of the xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh (Squamish) and səl̓ilwətaɁɬ (Tsleil-Waututh) First Nations. They are interested in exploring transgressive queer identities in relation to their Caribbean background. Forthcoming work includes an exhibition with Capture Photography Festival 2022 (Vancouver). Their work has been exhibited at Wil Aballe Art Projects (Vancouver), Number 3 Gallery (Vancouver), Tomato Mouse (New York), Artists Alliance Barbados (Bridgetown, Barbados), Art Toronto (Toronto).",
  },
  {
    id: 4,
    roomID: 4,
    title: "Music in the Shape of a Sphere",
    name: "Matthew D. Gantt",
    nameLink: "gantt",
    thumb: "gantt-thumb",
    webLink: "",
    instaLink: "https://www.instagram.com/gan.tttt/",
    medium: "Panoramic 360 Video, ambisonic audio",
    description:
      "'Music in the Shape of a Sphere' is an excerpt from a suite of compositions for spatial sound and virtual environments using 360 video and ambisonic audio, currently in development. These pieces are intended to explore composition as a series of ‘sonic landscapes’ in which sound and virtual space are structurally integrated. In this way, digital sonic space is approached as a musical medium unto itself, rather than as a vessel to contain extranious representational material.",
    year: 2023,
    bio: "Matthew D. Gantt is an artist, composer, and educator based between NYC and Troy, NY. His practice focuses on sound in virtual spaces, generative systems facilitated by idiosyncratic technology, and digital production presets as sonic readymades. He worked as a studio assistant to electronics pioneer Morton Subotnick from 2016 - 2018, and has been an active participant in the international creative community, presenting or performing at spaces such as Pioneer Works, Issue Project Room, Roulette, Babycastles, SVA Visible Futures Lab, Feral File, IRCAM, Mutek Mexico, ICST Zurich, and countless DIY venues and grassroots organizations. Gantt releases music with Orange Milk and Oxtail Recordings, is a member of New Museum's NEW INC creative incubator, and has taught experimental composition at both institutional and DIY spaces, including NYC non-profit/public media studio Harvestworks, CUNY Brooklyn, Bard College, Sarah Lawrence, and a variety of community workshops aimed at creating equitable access to developing technologies. Gantt’s work has been featured in The Wire magazine, Pop Matters, Exclaim!, Tiny Mix Tapes, Bandcamp New and Notable and similar.",
  },
  {
    id: 5,
    roomID: 5,
    title: "Monomyth: gaiden / Master of two worlds",
    name: "Petra Szemán",
    nameLink: "szeman",
    thumb: "szeman-thumb",
    webLink: "https://www.petraszeman.com/",
    instaLink: "https://www.instagram.com/petra.szeman/",
    medium: "video",
    description:
      "'Master of Two Worlds' (2020) is the 4th and final instalment of the Monomyth: gaiden tetralogy. Through an analysis of the position of the protagonist after having undertaken a grand journey through animated worlds, the video starts undoing the constraints of the narrative structure of the monomyth and calls for a lateral approach to storytelling. The Monomyth: gaiden project on the whole centers the space between the layers that make up our complex image-worlds, the holes in the digital landscape. By pushing these small gaps into focus, you can take up an ongoing ontological position, and rethink what constitutes a self or a mode of experience. Deborah Levitt puts it succinctly in her book The Animatic Apparatus: questioning 'where images end and bodies begin, where truth or the real might reside, or on what side of this vestigial division between spectator and screen we find 'life'.",
    year: 2020,
    bio: "Petra is a BA Fine Art graduate from Newcastle University (2013-2017), and has exhibited since at NEoN Festival in Dundee, Scotland; Big Screen Southend; BALTIC Centre for Contemporary Art in Gateshead, Fotomuseum Winterthur in Switzerland, ICC in Tokyo, as well as various galleries across England, Continental Europe and East-Asia. After spending two years in Japan, developing a body of work as a recipient of a research scholarship from the Japanese Ministry of Education and Culture (2018-2020), Petra is now based between North-East England and Tokyo, Japan. They're the co-author/editor of WEEB THEORY, a book about the overlapping area between artists' moving image, games and anime (published by Banner Repeater, London 2023).",
  },
  {
    id: 6,
    roomID: 6,
    title: "Sphere Dream",
    name: "Jason Isolini",
    nameLink: "isolini",
    thumb: "isolini-thumb",
    webLink: "https://jisolini.com/",
    instaLink: "https://www.instagram.com/jisolini/",
    medium: "HTML, sound, 360 video",
    description:
      "A petrified office chair spins on a rusty vent. A television burns displaying a lost signal. Automated manufacturing takes place on a conveyor belt in the background.",
    year: 2023,
    bio: "His work uses techniques of 360° collage and network interventions test the increased conflation of corporate, public and private environments. He has been featured in publications such as Vice, Artspace, and Pin-up among others. His writing has been published in Outland Magazine, Zora Zine, MIA Journal, and Berlin University’s conference in Digital Research in the Arts and Humanities.",
  },
  {
    id: 7,
    roomID: 7,
    title: "Small World",
    name: "Matthis Grunsky",
    nameLink: "grunsky",
    thumb: "grunsky-thumb",
    webLink: "https://www.matthisgrunsky.ca/",
    instaLink: "https://www.instagram.com/grunskm/",
    medium: "Custom Software",
    description:
      "Small World is an interactive screen based stereoscopic drawing that can be viewed in 3D through cross-eyed free viewing. Visually, the work consists of two adjacent renderings of the same forms: a series of intertwined, worm-like lines, weaving through space around a common centre. Viewers of the work can toggle between two separate modes of interaction; either rotating the lines in space or propelling them along their chaotic paths.",
    year: 2021,
    bio: "Matthis Grunsky is an artist and educator based out of Winnipeg, Manitoba. He is interested in the aesthetic potential of computation both on the screen and in physical media.",
  },
  {
    id: 8,
    roomID: 8,
    title: "Brave Land",
    name: "Freya Olafson",
    nameLink: "olafson",
    thumb: "olafson-thumb",
    webLink: "https://www.freyaolafson.com/",
    instaLink: "https://www.instagram.com/freyaolafson/",
    medium: "Unity, Video",
    description:
      "This video was commissioned by Jazz Winnipeg, for a project which had a number of artists working with moving images responding to local musicians' pre-existing music. Screen recorded from a digital game environment I created to replicate my real-life live / work space from the last 16 years, this video engages with the striking song 'Brave Land' by Raine Hamilton. A 3D model / avatar of myself is animated through both game controllers as well as custom motion capture files in order to move within the 3D LIDAR scans of my studio space and cutout collage imagery. The end result is a single-channel video that brings together machinima footage from the game environment and some IRL (in real life) video footage. This technical workflow allowed me to deepen my conceptual interest in replication, duplication, and iteration of the IRL 'In Real Life' / AFK 'Away From Keyboard' world. As mobile internet became widely used in the early 2010s, theorists discussed the error of 'digital dualism,' arguing against the notion that life online is less authentic than life offline. Curator/writer Legacy Russell embraced this criticism in their 2020 publication Glitch Feminism: A Manifesto in which Russell highlights the 'real' openings and opportunities that digital tools and glitch opens up for people of marginalized identities. This quote from 'Glitch Feminism' has stayed with me as I consider tools technologies of representation; mocap, lidar scanning, photogrammetry, etc. 'Usurp the body. Become your avatar. Be the glitch.' The movement towards web3 and the metaverse continues to grow, as the investment in the related tools/platforms increases; 3D replication/representation, with interactivity and responsive movement enacted through digital doubles experienced through immersive viewers will soon reach a broader public.",
    year: 2022,
    bio: "Freya Björg Olafson is an intermedia artist who works with video, audio, animation, motion capture, XR,  painting, and performance. Their praxis engages with identity and the body, as informed by technology and the Internet. Olafson’s work has been exhibited and performed internationally at the Bauhaus Archiv (Berlin), SECCA - SouthEastern Center for Contemporary Art (North Carolina), LUDWIG museum (Budapest), and The National Arts Center (Ottawa). Olafson has benefitted from residencies, most notably through EMPAC - Experimental Media & Performing Arts Center (New York), Oboro (Montreal), and Counterpulse (San Francisco). In spring 2020 Olafson was one of the longlist ‘Sobey Art Award’ recipients through a nomination by Video Pool Media Arts Center and in July 2021 she was selected for the Lumen Prize for Art & Technology longlist. Olafson holds an MFA in New Media from the Transart Institute / Donau Universität. In 2017 Olafson joined the York University as an Assistant Professor in screendance. As of July 2021, Olafson is an Assistant Professor in Digital Media at the University of Manitoba School of Art.",
  },
  {
    id: 9,
    roomID: 9,
    title: "shared folder",
    name: "Vesper Guo",
    nameLink: "guo",
    thumb: "guo-thumb",
    webLink: "https://www.guoyingzi.com/",
    instaLink: "https://www.instagram.com/blinkingcaret/",
    medium: "custom software",
    description:
      "Vesper's work explores the dichotomy between self and others in this hybrid reality. In the form of moving images, installations, and net art, she investigates this dialogical relation in the intangible pixels. Through different approaches to the first person perspective, her work integrates the viewers as strangers themselves to explore the seduction in the eternal stranger-relation we share.",
    year: 2023,
    bio: "Vesper Guo is a Chinese-born artist currently based in Brooklyn, New York. She received a BFA in film and video from the School of the Art Institute of Chicago in 2020, and an MPS in the Interactive Telecommunication Program from New York University in 2023.",
  },
  {
    id: 10,
    roomID: 10,
    title: "Transparens 2",
    name: "Andy Zuliani",
    nameLink: "zuliani",
    thumb: "zuliani-thumb",
    webLink: "https://andyzuliani.com/",
    instaLink: "https://www.instagram.com/z.uliani/",
    medium: "HTML",
    description:
      "'Transparens' is a part of a larger body of work; each composition deals in some way with the tension between apparent flatness and felt dimension that screens produce. The work plays with the feedbacking of surface and depth, creating faux-dimensional 'stacks' of web elements.",
    year: 2023,
    bio: "Andy Zuliani is a media artist, ambient musician, and writer; he lives in “Vancouver,” a colonial fiction located on the western coast of Canada. His work is deeply invested in modes of collective healing and care, and hopes to bring these about through immersive and communal experiences. He has performed and mounted installations at Vines Art Festival, at Deep Blue, at Active/Passive Festival, and online at outer spaces, a virtual performance space he co-runs with Max Ammo.",
  },
  {
    id: 11,
    roomID: 11,
    title: "Family Photo Album",
    name: "Ziyi Zhang",
    nameLink: "zhang",
    thumb: "zhang-thumb",
    webLink: "https://www.ziyistudio.art/",
    instaLink: "https://www.instagram.com/ziyistudio/",
    medium: "Custom Software",
    description:
      "Ziyi Zhang's Family Photo Album (FPA) (2023) is an interactive, browser-based work of art that explores the artist's 'bestie,' a Chinese international student who studies art in America. Bestie eventually abandons her art and leaves behind a body of work revealing her collective family memories. The result is a stunning exploration notions of truth, of cultural and generational disconnect, and the relationship between social class and art.",
    year: 2022,
    bio: "Ziyi Zhang is an interdisciplinary artist based in Chicago whose practice spans painting, installation, and interactive media. She recently received her MFA degree from SAIC and received her BFA degree from Washington University in St. Louis in 2021. Her work invites audiences to engage with complex social and cultural issues in unconventional ways.",
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
    link: `/${ShowConfig.link}/rooms/${getArtistID(i)}`,
  };
  roomsArray.push(roomDeets);
}

export const rooms = roomsArray;
