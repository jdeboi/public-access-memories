import { IRoom, IArtist } from '../interfaces';
import { ShowConfig } from './ShowConfig';

export const roomConfig = {
    w: 5,
    h: 5,
    start: 0,
    end: 1
}

// port const rooms = [
//   { id: 11, short: "home", link: "home-page", title: "home page", x: 27, y: 10, rot: 90, dir: "left", about: "thinking about digital privacy, digital/analog movement", shortcut: "&#x2318;F2", year: 2020 },
//     { id: 12, short: "yose", link: "yosemite", title: "yosemite", x: -5, y: 12, rot: -90, dir: "right", about: "How do digital representations of ", shortcut: "&#x2318;F3", year: 2021 },
//     { id: 13, short: "click", link: "click-me-baby", title: "click me, baby", x: 10, y: 0, rot: 0, dir: "bottom", about: "buy something!", shortcut: "&#x2318;F4", year: 2021 },
// ];
const titles = ["memory motel", "dotcommmunion", "flash-ephemera",
    "interstitial states", "good host", "cachebox"
]



export const artists: IArtist[] = [
    {
        id: 0,
        roomID: 0,
        title: "Forest 5",
        name: "Mitchell Craft",
        thumb: "mitchell-thumb",
        instaLink: "https://mitchellcraft.net/",
        webLink: "https://mitchellcraft.net/",
        medium: "Blender, procedurally-generated 3D terrain",
        description: "Forest 5 is an experiment in procedural landscape design.",
        bio: "Mitchell Craft is a 3D Artist based in Brooklyn, NY.",
        year: 2022,
    },
    {
        id: 1,
        roomID: 5,
        title: "perfect_day_at_the_beach.jpg",
        name: "Samantha Blumenfeld",
        thumb: "sam-thumb",
        webLink: "https://srb.neocities.org/",
        instaLink: "https://www.instagram.com/roribleu/",
        medium: "3D rendering",
        description: '“perfect_day_at_the_beach.jpg” is a disorganized cross-section of different memories framed as a single perfect moment. The piece explores how our sense of memory degrades regardless of the existence of digital evidence and artifacts of the truth: images can always be changed. On social media, users self-curate idealized forms of themselves and their life which includes having to manufacture and perpetuate certain narratives; a process that mirrors our own biased and faulty self-actualization. There is no perfect day at the beach, and our perfect versions of memories can only exist within a distorted framing of the truth and without dimension.',
        year: 2022,
        bio: "Samantha Blumenfeld is a screenprint, new media, and installation artist living and working in Seoul. She studied printmaking at the Rhode Island School of Design and Visual Art at Columbia University. Through her attempts to reconcile her own past, as a young internet user in the late 90s, with her experience in image-reproduction as a classically trained printmaker, she appropriates both mediums into her work. She has exhibited domestically in South Korea including at Alternative Art Space Loop, Space XX, and Cica Museum, and globally including Tate Modern and in collaboration with Serpentine Gallery. She was a previous curator for The Wrong New Art Biennale. She currently co-runs a printmaking studio that also collaborates on fine art editions, as well as creates her own work alongside other artists.\n\nHer work is concerned with the image, materiality, and how they intersect."
    },
    {
        id: 2,
        roomID: 11,
        title: "Sleeping in the Pandemic",
        name: "Lee Tusman",
        instaLink: "https://www.instagram.com/leetusman/",
        webLink: "https://leetusman.com/everyday/224/",
        medium: "custom software",
        description: 'A self/portrait of my life during the pandemic, Sleeping Through The Pandemic was created in a game engine as a top-down 2dimensional narrative alternating between apartments and narrative text intertitles. The story is rendered in 8bit graphics, with pixelated graphics of bedrooms, desks, refridgerators, stoves, toilets, showers...the "stuff" around me. Spendingso much time in my bedroom during the pandemic, like being trapped, mymind turned to both reflection and the immediate environment. Playing mylife abstracts the experience, rendering it as a game, though of courseit\'s real to me',
        year: 2021,
        bio: "Lee Tusman 👽 is a New York-based new media 🎨💻 artist and educator interested in the application of the radical ethos of collectives 👩🏿‍🏭 👨🏼‍🎤 🧑🏿‍🎨 👩🏻‍🔬 👨‍👨‍👧‍👧 and DIY culture 🧷 to the creation of, aesthetics, and open-source distribution methods 🖨️ of digital culture. He works in code ⌨️, collage ✂️, sound 🎶 and text 📝. His artistic output includes installations 🗑 , interactive media 📑, video art 📹, experimental games 🎮, sound art 🔊, websites 🌐, bots 🤖 and micro-power radio stations📡. His work has been shown at museums 🏛️, galleries 🖼️, artist-run spaces 🏚️ and virtual environments 🛸. He studied at Brandeis University and received his MFA at UCLA in Design Media Arts. He is Assistant Professor 🏫 of New Media and Computer Science at Purchase College. Lee is an organizer with Babycastles, a NYC-based collective fostering and amplifying diverse voices in videogame culture as well as a collaborator with artist-run community Flux Factory. He co-founded Processing Community Day NYC. He is a past organizer at Hidden City Philadelphia, Little Berlin and KCHUNG Radio.",
        thumb: "lee-thumb"
    },
    {
        id: 3,
        roomID: 13,
        title: "Room / Me",
        name: "Kat Zhang",
        webLink: "https://katzhang.itch.io/room-me",
        medium: "custom software (p5.js)",
        description: 'Room /me is a tiny interactive visual essay about self-isolation and self-care during quarantine using p5.js',
        year: 2021,
        bio: "Kat Zhang is a software engineer/artist based out of Brooklynd who makes visual art with code, sometimes combined with hand drawings.",
        thumb: "kat-thumb"
    },
    {
        id: 4,
        roomID: 4,
        title: "Upwards",
        name: "Dan Rule",
        webLink: "https://cargocollective.com/danrule",
        instaLink: "https://www.instagram.com/rule.dan/",
        medium: "Drawing, Animation, 4:23",
        description: 'Upwards shows the constant upward mobility expectations of a middle-class, middle-century American house.',
        year: 2022,
        bio: "Dan Rule was born in Belleville, IL in 1977. He studied printmaking at Southern Illinois University Carbondale (BFA) and Northern Illinois (MFA). He works primarily in painting, video and animation, often focusing on topics that are scientific and philosophical in nature. Dan is currently an Associate Professor of Art at the University of New Orleans, where he runs the Digital Art, Video and Animation area. He lives in New Orleans with his 3 children and is currently building a house.",
        thumb: "dan-thumb"
    },
    {
        id: 5,
        roomID: 1,
        title: "the Northern Ural's sacred places",
        name: "Daria Ivans",
        instaLink: "https://www.instagram.com/_lshfn/",
        medium: "",
        bio: "daria ivans is xenomedia artist ७ Art&Science student from Saint Petersburg, bachelor of Philosophy ७ interested in alternative worlds and ways of being ७ disintegration and dissimulation",
        description: "This work imagines my ancestors' home — the Northern Ural’s sacred places.",
        thumb: "ivans-thumb",
        year: 2021,
    },
    {
        id: 6,
        roomID: 12,
        title: "the still life",
        name: "Jenna deBoisblanc",
        instaLink: "https://www.instagram.com/jdeboi",
        webLink: "https://jdeboi.com",
        medium: "custom software",
        bio: "Jenna deBoisblanc is a net artist and teacher from New Orleans, LA. She received her undergraduate degree in physics from Pomona College (Claremont, CA) and her MFA in digital art from Tulane University (New Orleans, LA). She has shown work at local galleries in New Orleans (The Front, Good Children), as well as at light festivals in the South (Luna Fête, Light Up Albuquerque). Her clients include Toyota, the Aloft Hotel, the Florida Aquarium, and NASA.",
        description: 'This work considers the mundane moments embedded within digital rituals: the ennui of infinite scrolling; the endless cycle through inboxes, tabs, and hyperlinks in search of purpose; the solitude and expanse of the open web. Particularly in a time of quarantine, we find ourselves online abiding the still life.',
        year: 2022,
        thumb: 'debb-thumb'
    },
    {
        id: 7,
        roomID: 8,
        title: "How to Be a Homemaker When You Have No Body",
        name: "Sidney Astl",
        instaLink: "https://www.instagram.com/sidneyastl.art/",
        medium: "",
        bio: "Sidney Astl is a New Orleans based artist and BFA candidate at Tulane University. Sidney is a printmaker and video artist exploring themes of materiality, memory, and gendered labor in the 21st century.",
        description: 'How to Be a Homemaker When You Have No Body uses disorienting video overlays and contradictory statements to create an enduring anxiety that feels like an unavoidable result of the digital age. This video was specifically made as a reflection on notions of home and space during the COVID-19 pandemic. As our physical space has become more confined, the way we experience space is increasingly situated in the intangible and less grounded by connections to the earth. This physical connection to our material surroundings seems to be constantly at odds with the immaterial. How to Be a Homemaker When You Have No Body encourages the audience to confront their relationship to media, memory, and storage while addressing the ways that our reliance on the seemingly immaterial can haunt and ostracize us from our art, our planet, and ourselves.',
        year: 2021,
        thumb: "sidney-thumb"
    },
    {
        id: 8,
        roomID: 10,
        title: "domicile",
        name: "Stefani Byrd",
        webLink: "http://www.stefanibyrd.com/",
        medium: "LIDAR Generated 3D Imaging Scan, Still Image Series, Video Installation",
        bio: "Stefani Byrd’s art practice includes video, new media, and interactive technologies. Byrd’s early work addressed social justice issues in the form of interactive temporary public art installations that created role reversal, or \"empathy training,\” experiences for the audience. Their current work focuses on creating psychologically charged immersive media environments addressing topics such as how technology impacts empathy in digitally mediated spaces. Byrd’s work has been exhibited at places such as the CICA Museum (South Korea), the Museum of Contemporary Art of San Diego (San Diego), the Museum of Contemporary Art of Georgia (Atlanta), A.I.R. Gallery (Brooklyn), and the San Luis Obispo Museum of Art (San Luis Obispo). Their work is held in the permanent collections of the Museum of Contemporary Art of Georgia and the Columbus Museum of American Art. In 2015, they trained in The Abramovic Method of Performance with Marina Abramovic. She is certified in Pauline Oliveros’ method of Deep Listening through Rensselaer Polytechnic Institute. \nShe received her BFA degree in Photography from Georgia State University. They hold a Masters Degree in Visual Art from the University of California San Diego. Byrd is currently an Assistant Professor in Experimental Media Art at the University of North Carolina Wilmington.",
        description: '<p>Home is most often seen as a refuge, a place of respite, a destination, and a goal. Domestic spaces are some of the most familiar places we inhabit, but rarely are they deemed worthy of meticulous consideration. This work utilizes my own domestic life as source material for an intimate visual study of form and space using 3D scanning technology. domicile explores how the pandemic and the need to quarantine has changed our collective relationship to home, shifting it from a refuge to also that of a confine. The boundary of the home is one that protects, but also restricts. This work embraces the creative challenges and limitations of confinement by using an emerging form of technology for the hyper-documentation of what is seen everyday but rarely noticed.</p><p>This project was created using 3D scanning technology called LIDAR, a type of laser scanning that creates point clouds and mesh maps of surfaces or objects. Until recently, this technology was cost prohibitive for general use and reserved for commercial processes like architectural or landscape surveying. These tools have only recently been integrated into the next generation of smartphones and tablets, putting LIDAR into the mainstream. As an artist, I am interested in using these tools for archiving the commonplace while conceptually exploring the experience of stasis during a global crisis. These scans are intentionally abstracted and record the formal qualities of space and volume, as well as absence and presence. There is also an unexpected vulnerability in virtually allowing others inside of my home. This work shifts a space, my personal space, from one that was necessarily private and inaccessible to one that can be publicly viewed and explored.</p>',
        year: 2020,
        thumb: "stefani-thumb"
    },
    {
        id: 9,
        roomID: 7,
        title: "Homebody",
        name: "Lydia Mattson",
        instaLink: "https://www.instagram.com/mudmaid/",
        medium: "HD video",
        bio: "Lydia Mattson (she/her) grew up in Connecticut and will graduate from Tulane University in May 2022. She is pursuing a Bachelor of Fine Arts in Digital Art alongside a BA in Communication.",
        description: 'Mattson\'s work explores digital routines and media consumption through maximalist collage, combining diverse imagery and complicating visual relationships. Mattson’s mixed-media approach utilizes both print and video techniques, often in direct conversation with each other, and raises questions about online identities and the overlap between our physical and digital realities.',
        year: 2022,

        thumb: "lydia-thumb"
    },
    {
        id: 10,
        roomID: 2,
        title: "Spawn Point",
        name: "Nathan Caldecott",
        webLink: "http://www.nathancaldecott.com/pixel",
        instaLink: "https://www.instagram.com/nathancaldecott/",
        bio: "Nathan Caldecott (b. 1995, Manchester) is a sculptor and digital artist based in London. His work focuses on the structure and value of digital and physical spaces, with a particular interest in network theories and digital models. Nathan holds a BFA from the Ruskin School of Art, and has exhibited at institutional galleries such as Modern Art Oxford and MK Gallery, as well as a number of online platforms and residencies.",
        description: "I am showing three adapted maps of the anarchy Minecraft server 2b2t.org, founded in 2010. Formed without rules or any kind of governance, this online server quickly formed a number of utopian and offensive structures that were just as quickly destroyed or 'griefed' by others, communities that were just as quickly disbanded, and crude folk sculptures inhabited and just as quickly abandoned. This anarchy of 2b2t moved creators further and further out from a central spawn point, while griefers turned to making each spawn point unnavigable and inhospitable to new users through a number of abstracting interventions. In this place it's hard to tell if a particular block or construction was made as an additive or subtractive act, whether it helps or hinders, whether it forms a shortcut or a trap, whether it was placed yesterday or 10 years ago.",
        year: 2021,
        medium: "Altered bitmap image rendered from the 2b2t.org anarchy Minecraft server.",
        thumb: "nathan-thumb"
    },
    {
        id: 11,
        roomID: 6,
        title: "Prof Pata",
        name: "Loraine Wible",
        instaLink: "https://www.instagram.com/lorainewibleart/",
        webLink: "http://www.lorainewible.com/",
        medium: "video performance",
        bio: "Loraine Wible is a Cincinnati based pataphysics enthusiast who tries to uncover structural methods of institutions through absurdism and humor. She grew up in France where she studied filmmaking and diverse art movements related to surrealism. Her work combines digital tools such as video, animation, algorithms, sound, 3-D modeling, and other computer arts to create bridges between the architecture and the narrative.",
        description: 'The character of Prof Pata originated in 2015 in a series of absurdist lectures given by an eminent professor of Pataphysics who was explaining to the world "the relativism of relativism" or "the question of the question or when the question is the answer". When the pandemic started and artistic and cultural isolation took over, I created a "nakeid" version of Prof Pata who now engages viewers in intimate, yet absurdist conversations. Each episode has a theme that is a response to a direct event in my life, using a softly joyful, and tenderly abstract kind of humor.',
        year: 2022,
        thumb: "loraine-thumb"
    },
    {
        id: 12,
        roomID: 9,
        title: "Field of View",
        name: "Freya Björg Olafson",
        webLink: "https://www.freyaolafson.com/",
        medium: "4k video, 10mins \n(Sound - Emma Hendrix)",
        bio: "Freya Björg Olafson is an intermedia artist who works with video, audio, animation, motion capture, XR,  painting, and performance. Their praxis engages with identity and the body, as informed by technology and the Internet. Olafson’s work has been exhibited and performed internationally at the Bauhaus Archiv (Berlin), SECCA - SouthEastern Center for Contemporary Art (North Carolina), LUDWIG museum (Budapest), and The National Arts Center (Ottawa). Olafson has benefitted from residencies, most notably through EMPAC - Experimental Media & Performing Arts Center (New York), Oboro (Montreal), and Counterpulse (San Francisco). In spring 2020 Olafson was one of the longlist ‘Sobey Art Award’ recipients through a nomination by Video Pool Media Arts Center and in July 2021 she was selected for the Lumen Prize for Art & Technology longlist. Olafson holds an MFA in New Media from the Transart Institute / Donau Universität. In 2017 Olafson joined the York University as an Assistant Professor in screendance. As of July 2021, Olafson is an Assistant Professor in Digital Media at the University of Manitoba School of Art.",
        description: "A web camera feed is manipulated through the software ‘Unity’ to create an effect that freezes video frames and continuously prints new frames atop the previous; resulting in painting trails of movement. This painting effect is a reference to both Brody Condon’s video game work ‘Adam Killer’ (1999) and a common Windows XP (2001 – 2008) system error that would generate the same trail effect using the computer’s search windows and cursors as a paintbrush. The formal composition of 'Field of View' references the primary-colors that became a signature of the Bauhaus Movement; as well as the work of Bauhaus associated artist Oskar Schlemmer, who augmented and extended the human form through sculptural costumes and formal choreographic explorations of space and time.'MÆ-Motion Aftereffect' concludes with an overlay of the Windows XP 2000s ‘Solitaire’ computer game-ending which visualizes each stack of cards falling to the bottom of the screen - creating the same digital painting trails before sliding off-screen. This work is part of a body of work called MÆ-Motion Aftereffect which was longlisted for the 2021 Lumen Prize for Art & Technology. \nThis work was recorded as single-channel video work in my home/studio using everyday objects such as a table cloth, yellow rubber cleaning gloves, a white broom handle, tennis ball, clothing, and a digital dance partner to keep me company on screen, the work can also be performed live online via webcam. ",
        year: 2022,
        thumb: "freya-thumb"
    },
    {
        id: 13,
        roomID: 3,
        title: "Feral Kettle",
        name: "Linda Loh",
        webLink: "https://lindaloh.com/",
        medium: "HD video, 1:38 loop",
        bio: "Linda Loh is a visual artist working between New York City and Melbourne, Australia. Her multimedia works navigate the elusive form and materiality of digital space with transformed sources of light. In 2012 she received a Bachelor of Fine Art (Expanded Studio Practice) from the Royal Melbourne Institute of Technology (RMIT) University, Australia. She has had solo and group exhibitions around Australia and in the USA, with works curated into projection festivals, public LED billboard projects, online events, screenings, art galleries and more. She has undertaken several artist residencies around the world, including NARS in New York City, in 2018. In 2021 she completed a Master of Fine Art in Computer Arts, at the School of Visual Arts in New York City, and is subsequently participating in several exhibition projects.",
        description: "The kettle could be seen as the hub of a home. Even travelling, a kettle provides the comforts of home. This work was based on videos of the modern, transparent LED-lit kettle that was the hub of the kitchen in my home far away from home in Melbourne Australia, an artist residency in Finland, in 2018. Strangely, it was not the forests, lakes and 24 hour blue skies that captivated me at first. Instead, I was compelled by this lively see-through kettle in action. I made videos of its lights,and the visible bubbling water, in all stages of transition and surface tension. These became source material for my playful studio residency projects, and my exploration with new software that was my focus while in Finland. The amped up, dare I say, electric colours might relate to a memory we had of city life, where now many are staying home.",
        year: 2020,
        thumb: "linda-thumb"
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
        link: `/${ShowConfig.link}/rooms/${i}`
    };
    roomsArray.push(roomDeets)
}

export const rooms = roomsArray;

