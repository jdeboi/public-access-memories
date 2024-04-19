import { IRoom, IArtist } from "../../../interfaces";
import { ShowConfig } from "../../CurrentShow/ShowConfig";

export const roomConfig = {
  w: 4,
  h: 4,
  start: 0,
  end: 1,
};

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
    description:
      "The collectiblr project, equipped with augmented reality and 3d capabilities, combines the nostalgia of collectible objects, observations, and memories in a speculative, virtual space. The work transports these physical forms into the digital, confronting viewers with thoughts on physicality, materialism, and memories. collectiblr is an ongoing 3D/AR project that reflects on what makes something collectible, valuable, and worth remembering in the internet age.",
    bio: "Vidya Giri is an artist from Houston, TX. Her art is reflective of her background, balanced between cultures, environments, and disciplines. Her work has spanned between virtual spaces, video projection, and painting on real and digital canvases. Additionally, her work often contains digital elements and thematic ties to her home of Texas, her adolescence in Southeast Asia, and her Indian heritage. Her current explorations revolve around collecting as a form of reflection and the parallels between natural and human-made identities and the environments they encompass.",
    year: 2022,
  },
  {
    id: 1,
    roomID: 2,
    title: "flatbed___",
    name: "Christina Humphreys",
    nameLink: "humphreys",
    thumb: "christina-thumb",
    webLink: "https://www.christinahumphreys.com/",
    instaLink: "https://www.instagram.com/cellphonenovel/",
    medium: "digital collage",
    description:
      "This webpage presents a series of digital images derived from the same source image - an undated family photograph, taken likely before I was born. I began creating new versions of this particular image in 2013 by dragging only the sky portion of the photograph across a flatbed scanner. The distorted scans are random, painterly, and suggest a deep space, though smudges and fingerprints are apparent on the surface of the scanner glass. Over time, I returned to my original scans, reinterpreting them as variable elements of miniature installations - printed on fabric, encased in acrylic, and reflected across mirrors and compact discs. \nFor flatbed___, images of these small arrangements overlay newly made scans, incorporating physical elements and visual qualities of one another – becoming transparent, opaque, blurry, shifting, rotating, and disappearing. This layering and collaging of materials and images resembles the impermanence and randomness of memory, floating in and out at any given moment, and infinitely open to revision. Technology may promise a sense of permanence, but even devices remember things imperfectly, or forget, over time.",
    year: 2022,
    bio: "Christina Humphreys is an interdisciplinary artist working in textile, painting, installation and digital media. She has lived in Miami and Tampa, Florida, where she earned a BFA from the University of South Florida. She is a former collective member of Quaid Gallery and Cunsthaus and has exhibited her work throughout Florida, as well as in Portland, OR and Havana, Cuba. She currently lives and works in San Francisco, CA.",
  },
  {
    id: 2,
    roomID: 1,
    title: "Cursor Echo",
    name: "Matthis Grunsky",
    nameLink: "grunsky",
    thumb: "matthis-thumb",
    webLink: "http://www.matthisgrunsky.ca/",
    instaLink: "https://www.instagram.com/grunskm/",
    medium: "interactive livestream",
    description:
      "Cursor Echo is a website featuring an interactive live streamed video in which visitors' mouse movements are temporarily recorded through a feedback loop. The distortion and compression of the live stream causes the recorded gestures to degrade over time, eventually fading into a cloud of pixelated noise artifacts. This work reflects ideas of digital memory-making in the way it deals with information storage. The data of visitors' cursor positions are never explicitly recorded in any concrete way. Instead the information circles within a digital eddie, repeatedly being sucked back into the loop until it disintegrates completely. For me this closely parallels the idea that memories are not discrete items to be accessed like files on a computer, but exist more like a system which rewrites itself on each activation.",
    year: 2020,
    bio: "Grunsky uses computational systems to produce drawings and paintings that explore the aesthetics of computer code, the natural world, and our propensity for finding beauty in chaotic information. He is currently making computational drawings using a pen plotter and experimenting with browser-based stereoscopic animation.",
  },
  {
    id: 3,
    roomID: 7,
    title: "Spaghetti",
    name: "Angeline Meitzler",
    nameLink: "meitzler",
    thumb: "angeline-thumb",
    webLink: "https://angeline-meitzler.com/#/",
    instaLink: "https://www.instagram.com/angelinefromspace/",
    medium: "custom software",
    description:
      "This piece considers the violence and impact of the Philippines colonized history through situating cultural media and personal memories of spaghetti from an American and Philippine perspective. The web program randomly positions youtube videos featuring either American or Philippine spaghetti onto multidimensional surfaces inside the browser. The audio overlayed connects memories of eating the dish from both my childhood home in Michigan to my family's home in the Philippines. After the web program is initiated, the site endlessly spawns new windows until the amount of processing power causes the computer to overwhelm and the browser to eventually collapse, freeze and deprecate; mimicking my inability to understand or to make sense of the unanswered questions of the origins of this dish.",
    year: 2020,
    bio: "Angeline Marie Michael Meitzler is a Filipino American artist, writer and software worker based in Brooklyn, NY. Her work and research have revolved around an interdisciplinary reflection on how legacies of empire inform social and economic value systems. She has been a Masters Candidate at Georgia Institute of Technology and received her MFA from the School of the Arts Institute of Chicago. Her work has been included in new media festivals, and galleries including Digital Research in the Humanities and Arts Conference, Berlin (2021), The Human Terminal, Anonymous Gallery, NYC (2021); Initial Public Offering, Reddit, online (2019); Beyond The Hashtag: Failures and Becomings, HTMlles Festival, Montreal (2018), Feminist Media Studio, Montreal (2018). She was recently awarded the New Artist and Society Scholarship and Harvests Works Educational Scholarship. She has given lectures and presentations at academic institutions and cultural organizations such as The New School, TU München, Pioneer Works and Asia Society. Her work as a collaborator, software worker and environment artist has been at MUDAM Musee d’Art Moderne Grand-Duc Jean, Ogden Contemporary Arts, Carnegie Mellon University, the New Museum, Rhizome, de Young Museum, Istanbul Biennial 2019, Koenig & Clinton, Ringling Museum of Art, Kunsthalle Basel, Rubin Museum, Sadie Coles HQ, the 2019 Whitney Biennial.",
  },
  {
    id: 4,
    roomID: 4,
    title: "Reminisce About Now",
    name: "Allison Tanenhaus",
    nameLink: "tanenhaus",
    thumb: "allison-thumb",
    webLink: "https://allisontanenhaus.com",
    instaLink: "https://www.instagram.com/atanenhaus",
    medium: "1920x1080 video collage",
    description:
      "At a time when platforms pervasively cull personal data—and digital flawlessness is the norm—she views creatively reclaiming devices and embracing error as radical acts of autonomy, mindfulness, and personal ownership. Also looks way cool. Source material consists of Allison’s original images, collected artifacts, and crowdsourced clips that she alters via smartphone (and occasionally AI). Made with equal parts deliberation and experimentation, the results are rainbow-hued compositions that take on a psychedelic life of their own.",
    year: 2022,
    bio: "Allison Tanenhaus (she/her) is a New York–born, Boston–based digital glitch artist. She specializes in bold geometrics, kaleidoscopic color fields, trippy op art, thought-provoking truisms, anachronistic tech mashups, and unexpected dimensional qualities. Her primary formats include retrofuturistic GIFs, loops, and music videos; abstract public art; street art cat stickers; and large-scale video projections. Allison graduated from Harvard University and has studied at Emerson College, MassArt, and the School of Machines, Making, and Make Believe. She is a grantee of the 2019 Somerville Visual Art Fellowship and the 2021 City of Boston Transformative Public Art Program, and is a member of electronic music group The Square Root of Negative Two and optical installation duo bent/haus. Allison’s work has been showcased in 16 countries via galleries, public art, media festivals, and guerrilla street art postings. Notable commissions and exhibitions include the ICA Store at the Institute of Contemporary Art/Boston, Harvard Graduate School of Design, Boston Cyberarts, Boston Convention & Exhibition Center, SaveArtSpace, “GlitchKraft: Allison Tanenhaus + Friends,” “Empowered Women Empower Women” curated by Paris Hilton, and she was honored on 2021’s Alternative Power 100 Music List by shesaid.so and Patreon.",
  },
  {
    id: 5,
    roomID: 5,
    title: "Vacation to the Virtual",
    name: "Ciara O'Kelly",
    nameLink: "okelly",
    thumb: "ciara-thumb",
    webLink: "https://www.ciaraokelly.com/",
    instaLink: "https://www.instagram.com/ciara_okelly/",
    medium: "1920x1080 video",
    description:
      "A life-sized digitally modified personal photo album recreating some of the most memorable, crucial and intimate moments lived through. The use of accessible computer applications including Photo Booth and Google Earth Street View allow the artist to attempt to relive a perfect moment, capturing the seconds of anticipation before the desired moment of happiness is replicated.",
    year: 2016,
    bio: "Ciara O’Kelly is an Irish visual artist currently living in Amsterdam. Her work takes the form of large scale video installations incorporating both digital and physical entities. Throughout her process, she meticulously examines the systematic generation of cyberspace whilst constructing each piece, aiming to critique our relationship to corporate bodies within a largely capitalist and digitised world. O’Kelly is particularly interested in the individual’s dual role as both a consumer and a product within the system of data capitalism and its free labour nature. She primarily uses 3D modelling programs to create virtual environments to stage videos within, whilst using these grounds to challenge the capabilities of digital forms through carefully curated physical encounters.",
  },
  {
    id: 6,
    roomID: 6,
    title: "Polaroids",
    name: "Thanos Tsiousis",
    nameLink: "tsiousis",
    thumb: "thanos-thumb",
    webLink: "https://thanostsiousis.tumblr.com/",
    instaLink: "https://www.instagram.com/t____tsiou/",
    medium: "1920x1080 video",
    description:
      "About Thanos Tsiousis is an interdisciplinary visual artist and graphic designer, currently lives in Athens, Greece. In his practice, he builds on physical and digital works through different mediums of expres- sion to explore subjects about the environment, science, technology, and ultimately our- selves, embedded in the tools we create. At the same time, he is concerned with past cultural heritage practices and how they affect human psychology. He is interested in the value of ritual and design as an event and contri- bution to human interpretation. Storytelling plays a vital role in his work, based on the study of inheritance, critical thinking, and practice towards imagination and visions of possible scenarios. Statement My work revolves around questions about the environment, science, technology, and ultimate- ly ourselves, integrated into the tools we create. Technology is no longer seen as something far removed from human nature or in contrast to the natural environment, but as an emerging result of our thinking and action. Human action is constantly producing objects, but artificial ontology differs significantly between experimental science, art, and design. Recognizing that these complex relationships are our narrative constructions, they are examined from different perspectives and using a wider range of media. The action is based on research, creating scenarios that aim to develop design proposals and shift common perceptions. They look for the contradictory and the paradoxical and tell stories that direct our imagination to future fulfillment contracts - extraordinary at the moment. My goal is to make the viewer aware of the human species’ social mechanisms and understand the rules that govern our behavior. By studying the projection of human needs, conjectures, narratives, dreams, or hopes, I am not just trying to predict. I am aiming to form a more substantial reality. Polaroids_Brief Polaroids is a short film that blends CGI and poetic narration into a speculative scenario about media and digital culture that tied plants as narratives of history. Still life with flowers in a vase is presented as a collection of digital work to question how to think about the continuum between nature and technology. What is the relationship between the artificial and the natural and what is the meaning of the concept of time and physical wear and tear in a digital environment? In the first place, the imagery asks questions about technology as an active agent on both an ontological and epistemological basis. How does media structure the way things are in the world and how things are known in the world? Secondly, narration focuses on questions about networks of technologies as nonhuman agencies. In this video, Thanos Tsiousis explores the aesthetic of an object and the value of still life in contemporary art through a different sort of temporal and spatial materialism.",
    year: 2022,
    bio: "Thanos Tsiousis is an interdisciplinary visual artist and graphic designer, currently lives in Athens, Greece. In his practice, he builds on physical and digital works through different mediums of expression to explore subjects about the environment, science, technology, and ultimately ourselves, embedded in the tools we create. At the same time, he is concerned with past cultural heritage practices and how they affect human psychology. He is interested in the value of ritual and design as an event and contribution to human interpretation. Storytelling plays a vital role in his work, based on the study of inheritance, critical thinking, and practice towards imagination and visions of possible scenarios.",
  },
  {
    id: 7,
    roomID: 3,
    title: "Cognitive Environment",
    name: "Lizz Stringfield",
    nameLink: "stringfield",
    thumb: "lizz-thumb",
    webLink: "https://www.lizzstringfield.com/",
    instaLink: "https://www.instagram.com/lizz_stringfield/",
    medium: "digital collage",
    description:
      "My work focuses on human and environmental interactions as collaborations. Blending the vernacular of landscape, snapshot, and scientific photography, I use perceptual trickery to subvert expectations. I allow time between making the raw photographs and transforming them through digital collage. This is necessary to my process because I photograph in personal spaces, yet the content of the work is not situated in the material world. Dissolving parts of my relationship to a place or an image of a place, allows new questions and perspectives. By manipulating the readable information through digital collage, elements of drawing, and unique lighting conditions, the images remain open- familiar yet enigmatic.",
    year: 2022,
    bio: "Lizz Stringfield earned an MFA in Photography from the University of Arizona, Tucson. Stringfield has shown art in China, Bulgaria, and across the United States; including University of Michigan School of Art and Design and Newspace Center for Photography, Portland, OR. Collages from her Post Nuclear series are part of the Center for Creative Photography: Voices of Photography Collection and she created a Site-Specific Installation for Visitor Engagement in Residence at MoMA PS1. She makes digital collages and paintings that focus on human and environmental interactions as collaborations. Her next solo exhibition will be at Thelma Sadoff Center for the Arts in September 2022. Stringfield currently lives in Cincinnati, Ohio with her partner, Francis, and their cat, Lillian.",
  },
  {
    id: 8,
    roomID: 8,
    title: "SPACE (Of speech, nothing. Silence)",
    name: "Apostolos Zerdevas",
    nameLink: "zerdevas",
    thumb: "apos-thumb",
    webLink: "https://apostolos-zerdevas.format.com/",
    instaLink: "https://www.instagram.com/apostoloszd/",
    medium: "3D model",
    description:
      "This 3d rendering of a photo of a graffiti-filled wall was taken in a concentration camp Memorial in Mauthausen, Austria, and is in a series of rooms that work as informal monuments within a monument where the visitors of the memorial can inscribe their names and thoughts in the concertation camp walls, creating a space that essentially works as memorial within a memorial and becomes a living link between a traumatic historical past and a fleeting present that hangs between the temporal experience of a visitor and the same time the permanent inscribing of the graffiti on the walls of the monument. This particularity of the presence of inscribed present in a memorial space, especially one that was part and is weighted by the traumatic effects of the Shoah genocide, its history, and legacies, raises new questions about how a place that has been designated as a place of suffering and death interacts with the present. The reprocess that takes place through AI makes all the writing on the walls regenerate randomly and produces writing that simulates language but doesn’t convey coherent meaning. Echoing the idea of the impossibility of writing poetry after the holocaust stated by Adorno, by emphasizing the impossible task of art practice, in general, to inscribe and explain what is perceived as unimaginable but at the same time exists as part of the historical past. The presentation of the work as a 3d video rendering makes possible the dissociation from an event that has been formulated in the past within a specific contextual and spatial space and presents it in the present in a virtual immaterial form that mimics the original. Reminding us that the unimaginable will always exist as a possibility in the present.",
    year: 2022,
    bio: "Apostolos Zerdevas born in Athens. He studied photography in Focus school of photography and obtained a Masters in fine art form Chelsea College of art and design. He has participated in numerous exhibitions, in art spaces and museums such as. The DESTE Foundation, the Hellenic American Union, the ICA, London the Macedonian Museum of Contemporary Art. From 2003 he is working at Focus School of Photography. He is a Ph.D. candidate at the University of Reading Fine Art Department And an associate curator of Athens Photo festival. Contact - apostoloszerdevas@focus.edu.gr",
  },
  // {
  //     id: 9,
  //     roomID: 9,
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
  // {
  //     id: 10,
  //     roomID: 10,
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
  // {
  //     id: 11,
  //     roomID: 11,
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
  // {
  //     id: 12,
  //     roomID: 12,
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
  // {
  //     id: 13,
  //     roomID: 13,
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
];

// const roomIds = artists.map((artist) => artist.roomID);

const roomDetails = [
  {
    id: 0,
    x: 3,
    y: 4,
    dir: "bottom",
  },
  {
    id: 1,
    x: 17,
    y: 4,
    // rot: -90,
    dir: "right",
  },
  {
    id: 2,
    x: 10,
    y: 14,
    // rot: 90,
    dir: "right",
  },
  {
    id: 3,
    x: 24,
    y: 17,
    // rot: 0,
    dir: "bottom",
  },
  {
    id: 4,
    title: "room 2",
    x: 35,
    y: 17,
    // rot: -90,
    dir: "right",
  },
  {
    id: 5,
    x: 1,
    y: 24,
    // rot: 90,
    dir: "left",
  },
  {
    id: 6,
    x: 9,
    y: 32,
    // rot: 0,
    dir: "bottom",
  },
  {
    id: 7,
    x: 25,
    y: 32,
    // rot: 0,
    dir: "bottom",
  },
  {
    id: 8,
    x: 35,
    y: 32,
    // rot: 90,
    dir: "bottom",
  },
  // {
  //     id: 9,
  //     x: 15,
  //     y: 0,
  //     // rot: 0,
  //     dir: "bottom",
  // },
  // {
  //     id: 10,
  //     x: 27,
  //     y: 5,
  //     // rot: 90,
  //     dir: "left",
  // },
  // {
  //     id: 11,
  //     x: 27,
  //     y: 10,
  //     // rot: 90,
  //     dir: "left",
  // }, {
  //     id: 12,
  //     x: 20,
  //     y: 17,
  //     // rot: 0,
  //     dir: "left",
  // },
  // {
  //     id: 13,
  //     x: 20,
  //     y: 22,
  //     // rot: 90,
  //     dir: "left",
  // },
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
