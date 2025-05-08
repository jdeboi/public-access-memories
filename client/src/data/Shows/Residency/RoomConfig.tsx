import { IRoom, IArtist } from "../../../interfaces";
import { alwaysReservedArtists } from "../../CurrentShow/ArtistConfig";
import { ShowConfig } from "../../CurrentShow/ShowConfig";

export const reservedArtists = {
  ...alwaysReservedArtists,
  moneymachine69: "👀",
  aem: "🗄️",
  seliciayxy: "🔮",
  yeli: "🌱",
};

export const roomConfig = {
  w: 4,
  h: 4,
  start: 0,
  end: 1,
};

export const artists: IArtist[] = [
  {
    id: 0,
    roomID: 0,
    title: "Studio",
    userName: "yeli",
    name: "Omayeli Arenyeka",
    thumb: "yeli-thumb.jpg",
    nameLink: "omayeliarenyeka",
    instaLink: "custom code",
    webLink: "https://www.omayeli.com/",
    medium: "",
    description: (
      <div>
        <p>
          The mediums I use mostly are websites and writing. In both those
          mediums, my creative practice is twofold. After an extended period in
          college where I bought into techno-solutionism, I became interested in
          the critical and noncritical applications of work that has little to
          no value whatsoever. A big part of my creative web (and writing)
          practice is creating strictly for creative expression, to answer my
          own questions about the world or to channel my emotions into something
          tangible.
        </p>
        <p>
          The second thread that runs through my practice has to do with
          interrogating the mundane and embedded parts of society.Through
          writing as well as scraping, gathering and displaying data I try to
          highlight elements of Nigerian and American culture that tend to go
          unexamined.
        </p>
      </div>
    ),
    bio: (
      <div>
        <p>
          Omayeli Arenyeka is a Nigerian writer and technologist based in
          Brooklyn. Her work has been featured on The Creative Independent,
          Are.na, The Next Web, AIGA Eye on Design and Revision Path. She has
          spoken at XOXO, Awwwards, Likeminds.nyc and other conferences
          exploring the intersection of art and technology. She is an alum of
          NYU Gallatin, the Recurse Center and the School of Poetic Computation.
        </p>
      </div>
    ),
    year: 2025,
  },
  {
    id: 1,
    roomID: 1,
    customLink: "/emrys",
    title: "Studio",
    userName: "moneymachine69",
    name: "Emrys Brandt",
    thumb: "emrys-thumb.jpg",
    nameLink: "emrysbrandt",
    instaLink: "https://www.instagram.com/attentionrobotman",
    webLink: "https://emrysmerlin.xyz/",
    medium: "custom code",
    description: (
      <div>
        <p>
          The last year or so, I have been doing an archival research project
          with a local archive retrieving and processing files from a 1990s
          Bulletin Board System (BBS). This involves reading hundreds of pages
          of posts and comments, which contain shitposts, arguments, personals,
          and the like. The BBS, which is intended for gay men, is a remnant of
          online gay culture during the AIDS epidemic. As part of this research,
          I have been reflecting on the fragmentation caused by that event. The
          AIDS epidemic existed parallel to the Internet boom. As physical
          cruising locations were shut down and disrupted, the digital world
          became a location for connection.
        </p>
        <p>
          My art always exists alongside writing, and I recently published a
          piece regarding the history of a specific location in Chicago which
          has a history of gay cruising
          (www.sixtyinchesfromcenter.org/among-the-bushes). I am interested in
          expanding on those ideas, creating a “virtual cruising” space, both
          didactic and interactive, full of (digital) trees. Hidden in the
          binary foliage are historic “personals,” either verbatim or based on
          the types of posts on the BBS. I imagine other assets among them –
          such as LiDar scans of people’s bodies, disrupted and obscured.{" "}
        </p>
        <p>
          Rather than a static archive, I see this as a garden that the patrons
          can wander through, simulating the environment of a cruisy park, but
          containing information, image and text, related to the subject of
          cruising, the AIDS epidemic, and online community.{" "}
        </p>
        <p>
          Using PAM’s virtual space, I can explore the possibilities of an
          embodied engagement with digital history. I am excited by PAM’s offer
          to experiment with the virtual gallery, and I would use this
          opportunity to play with navigation, layering, and obfuscation, making
          the environment itself reflective of the act of cruising.
        </p>
      </div>
    ),
    bio: (
      <div>
        <p>
          Emrys Brandt is a trans-disciplinary artist and writer based in
          Chicago, IL, on the unceded land of the Ojibwe, Potawatomi, and Odawa
          peoples. Enamored with the language of a document, he collects and
          records information, histories, and natural phenomena. At times
          collaborator, playmate, and critic, he often re-presents these
          collections to poetically address technologies that deal in
          collection, identification, and modification. Working across digital
          and physical media – including browser art, physical computing, and
          text – he explores memory, queerness, and invisible phenomena, both
          digital and natural.
        </p>
      </div>
    ),
    year: 2025,
  },
  {
    id: 2,
    roomID: 2,
    title: "Studio",
    userName: "aem",
    name: "Amanda E. Metzger",
    thumb: "amanda-thumb.jpg",
    nameLink: "aemtzger",
    instaLink: "https://www.instagram.com/amanda.e.metzger/?hl=en",
    webLink: "https://amandaemetzger.net/portfolio.pdf",
    medium: "custom code",
    description: (
      <div>
        <p>
          I am interested in memories, how we make and share them and how to
          distribute them among multiple actors. For the last few years I have
          been working on creating a decentralised body and network of myself.
          This “network of Amandas”, with nodes spread across different cities
          (so far in Brussels, Berlin and Basel) is used to experiment on
          creating and sharing memories between different nodes and how to
          reconstruct these memories within nodes that did not experience them
          themselves.
        </p>
        <p>
          Many works rely on an involvement of the audience, making them owners,
          participators and collective decision-makers of my works. With this, I
          am able to reflect on authorship, vulnerabilities and the limits and
          possibilities of privacy and publicity as well as creating speculative
          ways of rethinking an individual.
        </p>
        <p>
          These experiments are interwoven with my fascination for systems
          created by technology and the abstraction and clarity they require. I
          explore these systems in order to mitigate power structures and
          distribution networks.
        </p>
        <p>
          The outcomes of these reflections entail every possible medium.
          Mostly, the works have gone through some stage of thinking about them
          from a perspective of software development. The outcomes are things
          like drawings, photographs, objects, installation, video, websites or
          NFTs.
        </p>
      </div>
    ),
    bio: (
      <div>
        <p>
          Amanda E. Metzger’s practice revolves around network theory, seemingly
          unquantifiable data collection and authorship. In her work she is
          interested in how memories are made, measured, shared and generated
          and how to create a multi-bodied common consciousness. Her practice
          spans across multiple mediums, such as installations and videos as
          well as objects and photographs.
        </p>
        <p>
          She obtained a BA in Media Art from Zurich University of the Arts as
          well as an MFA magna cum laude from LUCA School of Arts, Brussels. Her
          work has been exhibited, amongst others, at the House of Electronic
          Arts in Basel, Kunstmuseum Luzern, Fliesengalerie Leipzig and Pilar
          Brussels. In autumn 2025, she will complete the Connect Residency at
          CERN, Geneva, Switzerland.
        </p>
      </div>
    ),
    year: 2025,
  },
  {
    id: 3,
    roomID: 3,
    title: "Studio",
    userName: "seliciayxy",
    name: "Selicia",
    thumb: "xuyi-thumb.jpg",
    nameLink: "seliciaxy",
    instaLink: "https://www.instagram.com/seliciayxy/",
    webLink: "seliciaxuyiyao.cargo.site ",
    medium: "custom code, VR",
    description: (
      <div>
        <p>
          My artistic practice delves into the intersections of technology,
          gender, and identity, exploring these themes through immersive digital
          and interactive media. Drawing on influences from witchcraft, feminist
          theory, and cyber aesthetics, my works challenge traditional notions
          of embodiment and power. Projects like NetraHex and Warrior blend
          ancient symbolism with contemporary tech, while others such as Liminal
          Labyrinth and Future Nature reimagine the role of the body and the
          self in a digital world. By merging VR, AR, and web-based platforms, I
          explore how technology redefines personal agency, memory, and the
          labor of the digital age, offering a critique of contemporary societal
          systems and envisioning a n alternative reality to embrace.{" "}
        </p>
      </div>
    ),
    bio: (
      <div>
        <p>
          Fascinated by the intersections of art, technology, and human
          experience, my work includes moving images, fiction writing, VR games,
          and interactive installations. Studying Computational Arts, I explore
          the boundaries between reality and virtuality, examining the dynamic
          relationship between the body, technology, and the world. My work
          envisions alternate post-human realities, reimagining female bodies,
          technology, and power, and acknowledging the interconnectedness of
          humans, animals, deities, and nature. Her work has exhibited on
          LowlowLand Gallery, Guangzhou and St.James’ Hatcham Church, London
        </p>
      </div>
    ),
    year: 2025,
  },
  {
    id: 4,
    roomID: 4,
    title: "Studio",
    userName: "hostBot",
    name: "hostBot",
    customLink: "/lounge",
    thumb: "",
    nameLink: "",
    instaLink: "",
    webLink: "",
    medium: "",
    description: (
      <div>
        <p></p>
      </div>
    ),
    bio: "",
    year: 2025,
  },
];

// const roomIds = artists.map((artist) => artist.roomID);

const roomDetails = artists.map((artist, index) => ({
  id: index,
  x: index * 4,
  y: 0,
  dir: "centerBottom",
  userName: artist.userName,
  customLink: artist.customLink ? artist.customLink : null,
}));

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
    link:
      roomDetails[i].customLink ??
      `/${ShowConfig.link}/rooms/${getArtistID(i)}`,
  };
  roomsArray.push(roomDeets);
}

export const rooms = roomsArray;
