import { IRoom, IArtist } from '../interfaces';
import { ShowConfig } from './ShowConfig';

export const roomConfig = {
    w: 5,
    h: 5,
    start: 0,
    end: 1
}

// {
//     id: 0,
//     roomID: 0,
//     title: "",
//     name: "",
//     nameLink: "",
//     thumb: "-thumb",
//     webLink: "",
//     instaLink: "",
//     medium: "",
//     description: "",     
//     year: 2022,
//     bio: ""
// },

export const artists: IArtist[] = [
    {
        id: 0,
        roomID: 0,
        title: "collectiblr",
        name: "Vidya Giri",
        thumb: "vidya-thumb",
        nameLink: "giri",
        instaLink: "https://www.instagram.com/vidgiri/",
        webLink: "https://vidyagiri.com/",
        medium: "custom software, 3D models",
        description: "The collectiblr project, equipped with augmented reality and 3d capabilities, combines the nostalgia of collectible objects, observations, and memories in a speculative, virtual space. The work transports these physical forms into the digital, confronting viewers with thoughts on physicality, materialism, and memories. collectiblr is an ongoing 3D/AR project that reflects on what makes something collectible, valuable, and worth remembering in the internet age.",
        bio: "Vidya Giri is an artist from Houston, TX. Her art is reflective of her background, balanced between cultures, environments, and disciplines. Her work has spanned between virtual spaces, video projection, and painting on real and digital canvases. Additionally, her work often contains digital elements and thematic ties to her home of Texas, her adolescence in Southeast Asia, and her Indian heritage. Her current explorations revolve around collecting as a form of reflection and the parallels between natural and human-made identities and the environments they encompass.",
        year: 2022,
    },
    {
        id: 1,
        roomID: 1,
        title: "flatbed___",
        name: "Christina Humphreys",
        nameLink: "humphreys",
        thumb: "christina-thumb",
        webLink: "https://www.christinahumphreys.com/",
        instaLink: "https://www.instagram.com/cellphonenovel/",
        medium: "digital collage",
        description: 'This webpage presents a series of digital images derived from the same source image - an undated family photograph, taken likely before I was born. I began creating new versions of this particular image in 2013 by dragging only the sky portion of the photograph across a flatbed scanner. The distorted scans are random, painterly, and suggest a deep space, though smudges and fingerprints are apparent on the surface of the scanner glass. Over time, I returned to my original scans, reinterpreting them as variable elements of miniature installations - printed on fabric, encased in acrylic, and reflected across mirrors and compact discs. \nFor flatbed___, images of these small arrangements overlay newly made scans, incorporating physical elements and visual qualities of one another – becoming transparent, opaque, blurry, shifting, rotating, and disappearing. This layering and collaging of materials and images resembles the impermanence and randomness of memory, floating in and out at any given moment, and infinitely open to revision. Technology may promise a sense of permanence, but even devices remember things imperfectly, or forget, over time.',
        year: 2022,
        bio: "Christina Humphreys is an interdisciplinary artist working in textile, painting, installation and digital media. She has lived in Miami and Tampa, Florida, where she earned a BFA from the University of South Florida. She is a former collective member of Quaid Gallery and Cunsthaus and has exhibited her work throughout Florida, as well as in Portland, OR and Havana, Cuba. She currently lives and works in San Francisco, CA."
    },
    {
        id: 2,
        roomID: 2,
        title: "Cursor Echo",
        name: "Matthis Grunsky",
        nameLink: "grunsky",
        thumb: "-thumb",
        webLink: "http://www.matthisgrunsky.ca/",
        instaLink: "https://www.instagram.com/grunskm/",
        medium: "interactive livestream",
        description: "Cursor Echo is a website featuring an interactive live streamed video in which visitors' mouse movements are temporarily recorded through a feedback loop. The distortion and compression of the live stream causes the recorded gestures to degrade over time, eventually fading into a cloud of pixelated noise artifacts. This work reflects ideas of digital memory-making in the way it deals with information storage. The data of visitors' cursor positions are never explicitly recorded in any concrete way. Instead the information circles within a digital eddie, repeatedly being sucked back into the loop until it disintegrates completely. For me this closely parallels the idea that memories are not discrete items to be accessed like files on a computer, but exist more like a system which rewrites itself on each activation.",
        year: 2020,
        bio: "Grunsky uses computational systems to produce drawings and paintings that explore the aesthetics of computer code, the natural world, and our propensity for finding beauty in chaotic information. He is currently making computational drawings using a pen plotter and experimenting with browser-based stereoscopic animation."
    },
    {
        id: 3,
        roomID: 3,
        title: "Spaghetti",
        name: "Angeline Marie Michael Meitzler",
        nameLink: "meitzler",
        thumb: "-thumb",
        webLink: "https://angeline-meitzler.com/#/",
        instaLink: "https://www.instagram.com/angelinefromspace/",
        medium: "custom software",
        description: "This piece considers the violence and impact of the Philippines colonized history through situating cultural media and personal memories of spaghetti from an American and Philippine perspective. The web program randomly positions youtube videos featuring either American or Philippine spaghetti onto multidimensional surfaces inside the browser. The audio overlayed connects memories of eating the dish from both my childhood home in Michigan to my family's home in the Philippines. After the web program is initiated, the site endlessly spawns new windows until the amount of processing power causes the computer to overwhelm and the browser to eventually collapse, freeze and deprecate; mimicking my inability to understand or to make sense of the unanswered questions of the origins of this dish.",
        year: 2020,
        bio: "Angeline Marie Michael Meitzler is a Filipino American artist, writer and software worker based in Brooklyn, NY. Her work and research have revolved around an interdisciplinary reflection on how legacies of empire inform social and economic value systems. She has been a Masters Candidate at Georgia Institute of Technology and received her MFA from the School of the Arts Institute of Chicago. Her work has been included in new media festivals, and galleries including Digital Research in the Humanities and Arts Conference, Berlin (2021), The Human Terminal, Anonymous Gallery, NYC (2021); Initial Public Offering, Reddit, online (2019); Beyond The Hashtag: Failures and Becomings, HTMlles Festival, Montreal (2018), Feminist Media Studio, Montreal (2018). She was recently awarded the New Artist and Society Scholarship and Harvests Works Educational Scholarship. She has given lectures and presentations at academic institutions and cultural organizations such as The New School, TU München, Pioneer Works and Asia Society. Her work as a collaborator, software worker and environment artist has been at MUDAM Musee d’Art Moderne Grand-Duc Jean, Ogden Contemporary Arts, Carnegie Mellon University, the New Museum, Rhizome, de Young Museum, Istanbul Biennial 2019, Koenig & Clinton, Ringling Museum of Art, Kunsthalle Basel, Rubin Museum, Sadie Coles HQ, the 2019 Whitney Biennial."
    },
    {
        id: 4,
        roomID: 4,
        title: "",
        name: "allison",
        nameLink: "tanenhaus",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "",
        year: 2022,
        bio: ""
    },
    {
        id: 5,
        roomID: 5,
        title: "Vacation to the Virtual",
        name: "Ciara O'Kelly",
        nameLink: "okelly",
        thumb: "-thumb",
        webLink: "https://www.ciaraokelly.com/",
        instaLink: "https://www.instagram.com/ciara_okelly/",
        medium: "1920x1080 video",
        description: "A life-sized digitally modified personal photo album recreating some of the most memorable, crucial and intimate moments lived through. The use of accessible computer applications including Photo Booth and Google Earth Street View allow the artist to attempt to relive a perfect moment, capturing the seconds of anticipation before the desired moment of happiness is replicated.",
        year: 2016,
        bio: "Ciara O’Kelly is an Irish visual artist currently living in Amsterdam. Her work takes the form of large scale video installations incorporating both digital and physical entities. Throughout her process, she meticulously examines the systematic generation of cyberspace whilst constructing each piece, aiming to critique our relationship to corporate bodies within a largely capitalist and digitised world. O’Kelly is particularly interested in the individual’s dual role as both a consumer and a product within the system of data capitalism and its free labour nature. She primarily uses 3D modelling programs to create virtual environments to stage videos within, whilst using these grounds to challenge the capabilities of digital forms through carefully curated physical encounters."
    },
    {
        id: 6,
        roomID: 6,
        title: "",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "",
        year: 2022,
        bio: ""
    },
    {
        id: 7,
        roomID: 7,
        title: "",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "",
        year: 2022,
        bio: ""
    },
    {
        id: 8,
        roomID: 8,
        title: "",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "",
        year: 2022,
        bio: ""
    },
    {
        id: 9,
        roomID: 9,
        title: "",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "",
        year: 2022,
        bio: ""
    },
    {
        id: 10,
        roomID: 10,
        title: "",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "",
        year: 2022,
        bio: ""
    },
    {
        id: 11,
        roomID: 11,
        title: "",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "",
        year: 2022,
        bio: ""
    },
    {
        id: 12,
        roomID: 12,
        title: "",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "",
        year: 2022,
        bio: ""
    },
    {
        id: 13,
        roomID: 13,
        title: "",
        name: "",
        nameLink: "",
        thumb: "-thumb",
        webLink: "",
        instaLink: "",
        medium: "",
        description: "",
        year: 2022,
        bio: ""
    },
];

// const roomIds = artists.map((artist) => artist.roomID);

const roomDetails = [
    {
        id: 0,
        x: 5,
        y: 22,
        dir: "right"
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
        dir: "bottom"
    },
    {
        id: 4,
        title: "room 2",
        x: 12,
        y: 8,
        // rot: -90, 
        dir: "right"
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
    }, {
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
        artistID: getArtistID(i),
        link: `/${ShowConfig.link}/rooms/${getArtistID(i)}`
    };
    roomsArray.push(roomDeets)
}

export const rooms = roomsArray;

