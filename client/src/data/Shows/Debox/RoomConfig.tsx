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

// export const artists: IArtist[] = Array.from({ length: 10 }, (_, i) =>
//   getDefaultArtist(i)
// );

export const artists: IArtist[] = [
  {
    id: 0,
    roomID: 0,
    title: "Khazar Archeological Confabulations",
    name: "Nimrod Astarhan",
    thumb: "nimrod-astarhan-thumb.jpg",
    nameLink: "astarhan",
    instaLink: "nimrodastarhan",
    webLink: "https://www.nimrodastarhan.com",
    medium: "AI, custom software",
    description: (
      <>
        <p>
          In 2019, an archeologist from the University of Astarkhan, a city on
          the Russian steppe with a name identical to the artist’s last name,
          unearthed a benchmark finding - the legendary Khazar city of Atil – a
          modern Atlantis. The Khazars were Judeo-Turkic tribes converted from
          Tenegri Shamanism - a belief in the titular sky god and the eternal
          blue sky - into monotheistic religions. The story of their conversion
          to Judaism, “The Kuzari”, is a core text in Jewish Philosophy.
          However, all three Abrahamic religions were practiced freely and
          harmoniously within the Khazar kingdom.
        </p>
        <p>
          Astarhan’s long-term research of the ancient kingdom utilizes
          technology to re-figure Khazar myths, depict alter-zionist histories
          of the Jewish diaspora and his own ancestry, and reach back to a time
          and place where religious divides were not obstacles to a flourishing
          community and culture. They gather videos and images of objects from
          the archeological dig and model them in 3D, creating an object
          database to imagine Khazar pasts and futures.
        </p>
        <p>
          Khazar Archeological Confabulations uses line-drawing object
          renderings from the archive to generate a synthetic image database. It
          then employs machine learning to craft speculative archeological
          object drawings. The AI process is home-brewed, subverting hi-fi and
          photorealistic AI imagery. The results are abstract membrane,
          cell-like images, calling for a projection of what such a past and
          future might entail. The images are then turned into Cyanotypes
          exposed to natural light, reflecting Khazar Tenegrist myths of the
          titular sky god and the eternal blue sky.
        </p>
      </>
    ),
    statement: (
      <p>
        My works are thought experiments in sculpture, installation, and media
        art, often incorporating digital technology and electronic mechanisms to
        create reactive systems and interactive experiences. Through
        collaborations and a research-based practice, I learn, teach, and create
        a physical encounter with how hidden power structures shape our
        relationship with technology and history. My works reveal what's
        deliberately obscured from human perception - whether in digital
        interfaces or dominant Western narratives. Working with raw industrial
        materials and responsive elements, I create work that engages with
        environmental conditions and exposes the physical foundations of
        technological systems. Drawing parallels between ancient spiritual
        relationships to nature and our contemporary technological devotions, I
        examine how belief systems - from shamanic sky worship to artificial
        intelligence - shape our understanding of energy, power, and progress.
        Through these investigations of overlooked histories and imagined
        futures, my operational and responsive works invite viewers to question
        conventional notions of ownership, labor, and our relationship to both
        ancestral and emerging technologies.
      </p>
    ),
    bio: (
      <p>
        Nimrod Astarhan is an artist, technologist, and scholar. Their
        research-creation in sculpture and media art was exhibited worldwide and
        on the International Space Station. Recent showings include ISEA, the
        Gwangju Biennial Pavilion Project, Ars Electronica, and The Ammerman
        Center Biennial Symposium on Arts & Technology. They received grants and
        awards from the Municipal Arts League of Chicago and the Arts, Science +
        Culture Initiative at the University of Chicago, and their work was a
        finalist for the Lumen Prize. Nimrod holds an MFA in Art and Technology
        Studies from the School of the Art Institute of Chicago. They taught
        digital art, code, hardware, and critical theory at the School of the
        Art Institute of Chicago, China Academy of Art, and Shenkar College of
        Engineering, Art, and Design.
      </p>
    ),
    year: 2023,
  },
  {
    id: 1,
    roomID: 1,
    name: "Nick Briz",
    title: "How To Glitch AI",
    thumb: "nick-briz-thumb.jpg",
    nameLink: "briz",
    instaLink: "nbriz",
    customLink: "/briz",
    webLink: "https://nickbriz.com/",
    medium: "AI, Code, Video",
    essayLink: "https://outland.art/how-to-glitch-ai/",
    description: (
      <>
        <p>
          The work presented in this exhibition is a series of perspectives,
          which i'm calling &lt;VECTORS&gt;, from which we might begin to
          consider how, as glitch artists, we might approach producing glitch
          art w/artificial neural networks: the algorithms beginning to define
          this latest era of AI + Machine Learning.
          <sup id={`supp-1`}>
            <a style={{ color: "blue" }} href="#fnn-1" role="doc-noteref">
              [1]
            </a>
          </sup>
        </p>
        <p>
          Though I will be focusing primarily on images && communicating through
          text, it’s important to remember that glitch art can be experienced in
          multiple dimensions. Glitch art is an interdisciplinary + multi-modal
          artistic practice, genre, tag, scene, community && aesthetic. Diff
          artists have diff ways of defining the practice as well as its central
          concept. My fav definition of a g̴̤̀l̵̹̓i̶̤̍t̴̫̕c̵̫̃ḥ̸̕ is: an unexpected moment in a
          system that, by catching us off-guard, reveals aspects of that system
          that might otherwise have gone unnoticed. At its best, a glitch is an
          epiphany. My goal w/these &lt;VECTORS&gt; is to suggest ways we might
          set ourselves up for revelatory surprise. U might find some of the
          &lt;vector-views&gt; (the accompanying images) compelling, but it's in
          the process of creating glitch art that we develop a visceral
          understanding of the logic + politics mediating our digital lives, &&
          it's this practice i'm aiming on expanding through these
          &lt;VECTORS&gt;. These are not prescriptions, there is no "right way"
          to make glitch art, there are only critical, experimental && playful
          ways of engaging systems the "wrong way".
        </p>
        <div className="text-sm text-slate-800 mt-6" id="fnn-1">
          [1] As w/most my glitch thoughts, these are heavily informed by the
          community, in particularly by conversations i’ve had w/other glitch
          artists during{" "}
          <a
            href="https://not.gli.tc/h"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://not.gli.tc/h
          </a>{" "}
          in Chicago, as well as on our
          <a
            href="https://discord.com/channels/1063518177016954960/1072355936036999259"
            target="_blank"
            rel="noopener noreferrer"
          >
            💻🤖🧠🦾👨🏻💻artificial-unintelligence
          </a>{" "}
          thread on our discord server, which all are welcome to{" "}
          <a
            href="https://discord.gg/q4mS3nvrn"
            target="_blank"
            rel="noopener noreferrer"
          >
            join
          </a>
        </div>
      </>
    ),
    statement: (
      <p>
        my artistic practice has always been a pedagogical one. whether acting
        as an artist, educator or organizer, my goal is always the same: to help
        others better understand the digitally mediated world we live in, so
        that we can establish the skills + perspectives required to take
        advantage of these developing technologies rather than be exploited by
        them.
      </p>
    ),
    bio: (
      <>
        <p>
          "For the last 10 years new media artist, educator, and organizer Nick
          Briz produced an urgent and electrifying body of work that uses the
          tools of our digital age to illuminate its promises and perils. Taking
          shape through software, websites, video essays, and lecture series,
          Briz has examined the political and environmental implications of
          Apple's culture of continuous upgrades, made an early case against
          Facebook and a series of computer scripts to help users quit it, and
          mapped the invisible geography of Wi-Fi networks."
          <br />
          —Amy Beste
        </p>
        <p>
          "[his] work is bold [...] calculated and very clever [it] use[s] the
          contemporary capitalist system to reveal the inherent problems and
          obstructions to freedoms that those very systems create and protect."
          —Tara Judah "Although Briz's works are critical of many contemporary
          tech and internet-based companies and their practices, he doesn't
          cross the line into digital nihilism—instead, he offers practical
          solutions for caring for oneself online" <br />
          —Christy LeMaster
        </p>
      </>
    ),
    year: 2023,
  },
  {
    id: 2,
    roomID: 2,
    name: "Melody Mou Peijing",
    title: "(Un)Natural Language",
    thumb: "melody-mou-peijing-thumb.jpg",
    nameLink: "peijing",
    instaLink: "melodrama_yu",
    webLink: "https://www.melodymou.com/",
    medium: "Interactive online archive, API",
    description: (
      <p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/2Zbv3kZOP7w?si=h5drF8wzhfIeluEV"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </p>
    ),
    statement: (
      <p>
        I am a media artist whose work addresses issues of ecology and
        experimental narrative through computational technologies. My research
        explores threatened ecologies in the context of social conflicts,
        indigenous knowledges, and the ways language reproduces ideological
        assumptions. I work with the local environmental intelligence of rivers
        and oceans, studying the complex interactions between narrative,
        culture, and nature, as well as the interconnections between water and
        other organisms. What roles can art and technology play in addressing
        ecological crises? How can we extend empathy to nature? My goals revolve
        around investigating alternative uses of technology, especially machine
        learning and electronics, for ecological purposes, and demonstrating how
        digital media can nurture our coexistence with non-human agencies.
        Through my exploration, I contribute to interpretable AI and
        experimental storytelling strategies. I also investigate how
        culture—through social narrative, language, and communication—shapes our
        relationship with nature. I create transformative art projects that
        advocate for fairness and inclusion across all species, treating
        non-human subjects as independent agencies.
      </p>
    ),
    bio: (
      <>
        <p>
          Melody Mou Peijing is a media artist and researcher working across
          critical ecology, computation, and experimental narrative. She
          received her BA in Creative Media from City University of Hong Kong
          and is currently pursuing an MFA in Design | Media Arts at UCLA,
          supported by a University Fellowship, where she also serves as a
          Teaching Assistant. Her works have been exhibited internationally at
          FILE Festival, VIDEOFORMES, The New River, the New Media Writing
          Prize, and the FutureTense Awards, among others.
        </p>
        <p>
          Previously, Melody worked as a researcher and creative technologist at
          the Centre for Applied Computing and Interactive Media at School of
          Creative Media and the Hong Kong Arts Development Council, where she
          investigated the creative potential of machine learning in
          reconfiguring moving images through algorithmic experimentation. Her
          practice draws from critical ecologies and computational aesthetics,
          often entangling natural processes with digital systems to question
          narratives of anthropocentric assumptions.
        </p>
      </>
    ),
    year: 2025,
  },
  {
    id: 3,
    roomID: 3,
    name: "Everest Pipkin",
    title: "Shell Song",
    thumb: "everest-pipkin-thumb.jpg",
    nameLink: "pipkin",
    description: (
      <>
        <p>
          Shell Song is an interactive audio-narrative game which explores
          deep-fake voice technologies and the datasets that go into their
          construction. By considering physical and digital bodies and voices,
          it asks what a voice is worth, who can own a human sound, and how it
          feels to come face to face with a ghost of your body that may yet come
          to outlive you. The piece reminds us that data is people, both in
          representations of data that is collected but also tools built by
          people to collect this data.
        </p>
        <p>
          Commissioned by ODI Data as Culture for the Rules of Engagement online
          exhibition and produced as part of the ODI’s R&D programme exploring
          sustainable ethical practice around data, funded by Innovate UK.
        </p>
      </>
    ),
    bio: (
      <p>
        Everest Pipkin is a game developer, writer, and artist from central
        Texas who lives and works on a sheep farm in southern New Mexico. Their
        work both in the studio and in the garden follows themes of ecology,
        tool making, and collective care during collapse. When not at the
        computer in the heat of the day, you can find them in the hills spending
        time with their neighbors— both human and non-human.
      </p>
    ),
    instaLink: "https://www.instagram.com/everestpipkin/",
    webLink: "https://everest-pipkin.com/",
    medium: "AI, Custom Software",
    year: 2020,
  },
  {
    id: 4,
    roomID: 4,
    title: "Flowers Blooming Backward Into Noise",
    name: "Eryk Salvaggio",
    thumb: "eryk-salvaggio-thumb.jpg",
    nameLink: "salvaggio",
    instaLink: "https://www.instagram.com/cyberneticforests/",
    webLink: "https://www.cyberneticforests.com/",
    medium: "Video Essay, AI Generated Media",
    description: (
      <>
        <p>
          Flowers Blooming Backward Into Noise is a 20-minute animated
          “documanifesto” about AI art. It explains how Diffusion models work,
          as well as their entanglement with composite photography, statistical
          correlations and eugenics. In the end, the film veers into my own
          work, and how I see my work: as bending the tool to create images that
          may not be beautiful, but are a product of rejecting automated
          characterizations of images, bodies, and human beings.
        </p>
        <p>
          The film was created for the Adrenalin Prompt exhibition at the
          Forking Room in Seoul, and as a result, a version subtitled into
          Korean is also available.
        </p>
      </>
    ),
    bio: (
      <>
        <p>
          Eryk Salvaggio is an artist working critically with AI-generated
          media, using and subverting tools to reveal the problems embedded
          within them. As an artist working critically with technology, his work
          openly acknowledges its complicity. As such, the work is created
          through glitching the machines, repurposing generated imagery to
          emphasize biases or other problems, or highlighting the image’s
          relationship to its social, technical, and cultural context.
        </p>
        <p>
          Through video essays, sound art, and performance lectures, Salvaggio’s
          work confronts essential debates in AI, such as the politics of
          extraction, dehumanization, and information pollution that lay at
          their heart. “Many artists see AI as a tool for expanding the
          imagination,” Salvaggio says, “But I aim to pull the imagination out
          of AI, to see it for what it is.”
        </p>
        <p>
          Salvaggio's work informs and reflects his work in tech policy spheres;
          he is an artist but also a writer and researcher challenging the myths
          of artificial intelligence, flagging dangers such as surveillance
          linked to automated decision-making, and advocating for expanded data
          protections online. As the founder of the Algorithmic Resistance
          Research Group (with Caroline Sinders and Steph Maj Swanson),
          Salvaggio pioneered the practice of creative misuse of AI systems as a
          tool for revealing the biases and harms the models could create.
        </p>
      </>
    ),
    year: 2023,
  },
  {
    id: 5,
    roomID: 5,
    title: "Humans of AI",
    name: "Philipp Schmitt",
    thumb: "philip-schmitt-thumb.jpg",
    nameLink: "schmitt",
    instaLink: "https://www.instagram.com/phlpschmt/",
    webLink: "https://philippschmitt.com/",
    medium: "Custom software, AI image recognition",
    essayLink: "https://humans-of.ai/editorial/",
    statement: (
      <>
        <p>
          Philipp Schmitt is an artist and designer based in Brooklyn, USA. His
          creative practice engages with the philosophical, poetic, and
          political dimensions of computation.
        </p>
        <p>
          Schmitt often incorporates emerging computing technologies such as
          machine learning and computer vision with archival material and older
          media, such as analog photography and woodworking. He has created
          installations, artist books, websites, photography, lecture
          performances, and sound.
        </p>
      </>
    ),
    bio: (
      <>
        <p>
          Philipp Schmitt (he/him; b. 1993 at 356 PPM CO2) is an artist and
          designer based in Brooklyn Hamburg, Germany.
        </p>
        <p>
          Philipp’s work has been exhibited at The Photographers' Gallery
          London, Philadelphia Museum of Art, MAK Vienna, Science Gallery
          Dublin, Link Art Center, and Triennale Milano. Works are in the
          collections of the Philadelphia Museum of Art, Ars Electronica Center
          and the MoMA Library. He is the recipient of a NYFA Artist Fellowship
          (2023) and a Berggruen Fellowship (2019-21).
        </p>
      </>
    ),
    year: 2019,
  },

  {
    id: 6,
    roomID: 6,
    title: "Feminist Data Set",
    name: "Caroline Sinders",
    thumb: "caroline-sinders-thumb.jpg",
    nameLink: "sinders",
    instaLink: "https://www.instagram.com/carolinesinders/",
    webLink: "https://carolinesinders.com/",
    medium: "AI, Data, Workshop",
    // customLink: "/sinders",
    essayLink:
      "https://carolinesinders.com/wp-content/uploads/2020/05/Feminist-Data-Set-Final-Draft-2020-0526.pdf",
    description: (
      <>
        <p>
          Feminist Data Set is a multi-year project that interrogates every step
          of the AI process that includes data collection, data labeling, data
          training, selecting an algorithm to use, the algorithmic model, and
          then designing how the model is then placed into a chat bot (and what
          the chatbot looks like). Every step exists to question and analyze the
          pipeline of creating using machine learning—is each step feminist, is
          it intersectional, does each step have bias and how can that bias be
          removed?
        </p>
        <p>
          Current projects under the Feminist Data Set umbrella include Feminist
          Data Set workshops, the Feminist Data Set Tool Kit, and TRK (an open
          source tool to address wage inequity in data training and data
          labeling). This project has been shown at LABoral, Ars Electronica,
          Victoria and Albert Museum, the Museum of Modern Arts Bologna, SPACE
          Art and Technology, RePublica, SOHO20 Gallery, as well as others.
          Download the tool kit here.
        </p>
        <p>
          More about the project: Feminist Data Set is a public facing, social
          justice art practice. For example, the collecting of feminist data is
          held through public workshops and forums. Feminist Data Set imagines
          data creation, as well as data sets and archiving, as an act of
          protest. In a time where so much personal data is caught and hidden by
          large technology companies, used for targeted advertising and
          algorithmic suggestions, what does it mean to make a data set about
          political ideology, one designed for use as protest and to make a data
          set as a community?
        </p>
        <p>
          Pedagogically, Feminist Data Set operates in a similar vein to Thomas
          Thwaites’s “Toaster Project,” a critical design project in which
          Thwaites builds a commercial toaster from scratch. Feminist Data Set,
          however, takes a critical and artistic view on software, particularly
          machine learning. What does it mean to thoughtfully make machine
          learning, to carefully consider every angle of making, iterating, and
          designing? Every step of this process needs to be thoroughly
          re-examined through a feminist lens.
        </p>
        <p>
          <a
            href="https://carolinesinders.com/wp-content/uploads/2020/05/Feminist-Data-Set-Final-Draft-2020-0526.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download our open source tool kit
          </a>{" "}
          and essays on Feminist Data Set, funded by the Clinic for Open Source
          Arts (COSA) at the University of Denver.
        </p>
      </>
    ),
    bio: (
      <>
        <p>
          Caroline Sinders is a machine-learning-design researcher and artist.
          For the past few years, she has been examining the intersections of
          technology’s impact in society, interface design, artificial
          intelligence, abuse, and politics in digital, conversational spaces.
          Sinders is the founder of Convocation Design + Research, an agency
          focusing on the intersections of machine learning, user research,
          designing for public good, and solving difficult communication
          problems. As a designer and researcher, she has worked with Amnesty
          International, Intel, IBM Watson, the Wikimedia Foundation, and
          others.
        </p>
        <p>
          Sinders has held fellowships with the Harvard Kennedy School, the
          Mozilla Foundation, Yerba Buena Center for the Arts, Eyebeam, STUDIO
          for Creative Inquiry, and the International Center of Photography. Her
          work has been supported by the Ford Foundation, Omidyar Network, the
          Open Technology Fund and the Knight Foundation. Her work has been
          featured in the Tate Exchange in Tate Modern, Victoria and Albert
          Museum, MoMA PS1, LABoral, Ars Electronica, the Houston Center for
          Contemporary Craft, Slate, Quartz, Wired, as well as others. Sinders
          holds a Masters from New York University’s Interactive
          Telecommunications Program.
        </p>
      </>
    ),
    year: YEAR,
  },
  {
    id: 7,
    roomID: 7,
    title: "Consensus Sensing",
    name: "Chelsea Thompto",
    thumb: "chelsea-thompto-thumb.jpg",
    userName: "Chelsea",
    nameLink: "thompto",
    // instaLink: "https://www.instagram.com/cthompto",
    blueSkyLink: "https://bsky.app/profile/cthompto.bsky.social",
    webLink: "https://chelsea.technology/?",
    medium: "custom code",
    bio: (
      <>
        <p>
          Chelsea Thompto (she/her) is a transdisciplinary artist and educator
          working across, beyond, and through: art, trans studies, and
          technology. Her work is focused on the trans body as a site of
          political violence and potential. Born and raised in Iowa, she lived
          and worked between California and the Midwest until 2023 when moved to
          the Blue Ridge Mountains of Virginia where she is currently an
          Assistant Professor of Creative Technologies in the School of Visual
          Arts at Virginia Tech. She received an MFA and MA in 4D Art and an MA
          in Gender and Women's Studies from the University of Wisconsin
          Madison.
        </p>
        <p>
          She serves as the Executive Editor of Media-N: Journal of the New
          Media Caucus and is a recent alumni of the New Museum’s New Inc
          program. She has shown her work nationally and internationally
          including recent shows in Toronto, Vancouver, and San Francisco. Her
          written and creative works have been published in books and journals
          including the book "Trans Hirstory in 99 Objects", and e-flux and
          Transgender Studies Quarterly journals.
        </p>
      </>
    ),
    statement: (
      <>
        <p>
          I am a research-based transdisciplinary artist working across digital
          and traditional media, focused on the trans body as a site of
          political violence and potential. Much of my work starts with
          formulating and addressing questions. Through this process, I begin to
          create the objects, scenes, and interactions that form the basis of
          new works. These questions stem from my lived experience as a
          transwoman in the United States and long term fixation with the
          politics of visibility. More specifically, I am focused on the trans
          body as a site of contemporary productions of the inhuman, and of
          violence (physical, emotional, institutional, and otherwise) committed
          in the ongoing effort to reify gender as a binary system. These
          questions and explorations are centered around a critical engagement
          with current and historical systems of codification and control, to
          draw the viewer into an affective exploration of what it means to
          inhabit a fluid body subjected to colonial logics of visualization
          meant to fix, delineate, and stabilize.
        </p>
        <p>
          In my practice, I am deeply invested in material specificity,
          leveraging the inherent qualities (which are always contested and
          culturally situated) of materials is a central part of my practice.
          With technical knowledge that includes code, video, digital
          fabrication, traditional sculptural processes, writing, and
          bookbinding, I move works across and through different materials and
          processes to explore their formal and conceptual potential. This
          process enacts “trans-” as a tactic and gesture for art making.
        </p>
      </>
    ),
    description: (
      <>
        <p>
          “Consensus Sensing” is a continuation of my series of investigative
          experiments into the transphobia baked into AI image general. This
          project will expand my image series "Consensus Portraits" into an
          online interactive archive. "Consensus Portraits" is a series of
          portraits of trans and non-binary people, generated with popular
          generative AI tools. It has long been known that biases contained
          within datasets surface in generative “AI” systems trained on this
          data. The generated images in this series highlight the transphobic
          tropes baked into so-called AI systems and contain subtle tells about
          the source imagery used in their creation.
        </p>
        <p>
          “Consensus Sensing” will present this archive of AI images within an
          online custom user interface containing footnotes, context, and
          overlays, inviting viewers to closely read the images. Invested in
          looking critically at the data and process obscured by the black box,
          “Consensus Sensing” will offer the audience an opportunity to slow
          down their viewing and glimpse the inside of the black box.
        </p>
        <p>
          Using HTML, CSS, and JavaScript, this work culminates in an online
          interactive space containing a gallery of images, critical and
          descriptive texts, and custom UI elements.
        </p>
      </>
    ),
    year: 2025,
  },
  {
    id: 8,
    roomID: 8,
    title: "Artificial Archive: SCRYING INTIMACIES",
    name: "Rodell Warner",
    thumb: "rodell-warner-thumb.jpg",
    nameLink: "warner",
    instaLink: "https://www.instagram.com/rodellwarner/",
    webLink: "https://cargocollective.com/rodellwarner",
    medium: "1920x1080 single-channel video with sound",
    essayLink:
      "https://preelit.com/2023/11/09/brief-and-candid-notes-on-artificial-archive/",
    // description: TBA,
    bio: (
      <>
        <p>
          Rodell Warner is a Trinidadian artist working primarily in new media
          and photography, and a Moving Image master’s student at Bard College.
          Rooted in the exploration of race, nature, and technologies of
          representation, Rodell's artworks draw on personal and institutional
          archives to rethink the past, and on digital processes to index
          emancipatory futures. Rodell's digital animations intervening in early
          photography from the Caribbean have been exhibited at the Art Gallery
          of Ontario in the landmark exhibition{" "}
          <em>Fragments of Epic Memory</em> in 2022, and in 2024 in the Tito's
          Prize solo exhibition <em>Fictions More Precious</em> at Big Medium in
          Austin, Texas. Rodell’s <em>TERRARIA ⚘</em> - animated works showing
          hand-modeled digital 3D renderings of site-identified plant species
          seen through unique lenses in virtual environments - has been
          exhibited at the Museum of Contemporary Art, Taipei in{" "}
          <em>NEXUS－Video and New Media Art from the Caribbean</em> in 2023,
          and in 2024 at the Pérez Art Museum Miami in the exhibition Sea
          Change. Over the last 15 years Rodell has worked between Port of Spain
          in Trinidad, Kingston in Jamaica, and Austin, Texas in the U.S., and
          is currently living and working in Boston, Massachusetts.
        </p>
      </>
    ),
    year: 2025,
  },
  {
    id: 9,
    roomID: 9,
    title: "AMA y NO OLVIDA",
    name: "Emilia Yang",
    thumb: "emilia-yang-thumb.jpg",
    nameLink: "emiliayang",
    instaLink: "https://www.instagram.com/rojapordentro",
    webLink: "https://www.emiliayang.org/",
    medium:
      "Community Based Practice, Digital, Documentary, Installation, Memory, Political, Public art",
    statement: (
      <>
        <p>
          My practice is multidisciplinary and rooted in collective action. I
          move between artistic creation, design, writing, curating, and
          community organizing, weaving together archives, digital media, and
          public space interventions as strategies that invite reflection on
          memory, state violence, and exile.
        </p>
        <p>
          My creative process has been nourished by the urgent need to
          reconstruct and dignify the memory of those killed by the Nicaraguan
          state, as I have been a victim/survivor of state violence myself, from
          a place of dignity and exile. I investigate and experiment with
          expanded forms of media to design community based projects
          (transmedia, interactive and public interventions), that document and
          archive memories of human rights violations, denounce injustices, and
          worldbuild alternative futures.
        </p>
        <p>
          Through my work, I foster the creation of networks of collaboration,
          care, and solidarity that—through tenderness and mutual support—resist
          the multiple political, authoritarian, and patriarchal adversities
          that mark Central America. My interest lies in how these networks
          become forms of resistance against official narratives of oppression
          and forgetting.
        </p>
        <p>
          My motivation arises from a deep commitment to transformative justice,
          aiming to challenge colonial, state and para-state violence,
          militarization, police repression, prisons, borders, and other racist
          technologies of death. I conceive of imagination as an essential
          political tool for creating more just, decolonial, and
          depatriarchalized futures.
        </p>
      </>
    ),
    description: (
      <>
        <p>
          In Nicaragua, the government has denied the victims of state violence
          the right to truth, justice, and memory since 2018. “AMA y NO OLVIDA,”
          Museum of Memory Against Impunity, contributes to dignifying victims
          of state violence and honoring their memory, as well as countering the
          regime's impunity. It was created with a participatory approach
          involving all members of the Mothers of April Association (AMA), an
          organization of relatives of the victims' deaths.
        </p>
        <p>
          AMA y No Olvida is a transmedia community and participatory archive
          that holds more than 200 video testimonials, a photographic archive,
          memory artifacts, and hand-drawn maps that were turned into geographic
          information systems (GIS) digital maps that geo-localize the
          narratives of the murder of 100 victims, and an Interactive art book
          with an augmented reality component. The book I am proposing to
          exhibit, compiles around 100 stories of victims murdered by the
          regime, told through the voices of their families. It also shows
          augmented reality versions of 3D barricade shaped altars with memory
          objects that belonged to the victims.
        </p>
        <p>
          In conversation with Black, trans and decolonial scholars, I created a
          set of ethics of media representation and forms that I call “modular
          visibility”. Modular visibility counters impunity and state
          surveillance by actively refusing to make visible and reproduce the
          victims’ cruel deaths. It is as an activist strategy of refusal and
          opacity that problematize notions of access and open source to
          consider possibilities of data autonomy and self-governance.
        </p>
        <p>
          Instead, it emphasizes the victims' absence and their families
          struggle for recognition, and making that absence into a political
          statement. With the disappearance of public acts of protest and
          mourning in Nicaragua, this project allows the victims' stories to
          transcend their homes and families to transform public and private
          spaces into places of collective memory.
        </p>
        <p>
          <a
            href="https://www.museodelamemorianicaragua.org/en/home/"
            target="_blank"
            className="text-[cyan] hover:underline"
            rel="noopener noreferrer"
          >
            Read more about the project here.
          </a>
        </p>
      </>
    ),
    bio: (
      <>
        <p>
          Emilia Yang is a Central American artist, memory organizer and
          researcher based in Detroit. Her creative practice utilizes expanded
          forms of media for the creation of community-based feminist,
          anti-racist and transformative justice memory projects and futures.
          Her practice-based research explores the role of memory, violence,
          emotions, performance, and participation in the political imagination.
        </p>
        <p>
          Her artworks have been exhibited in international spaces such as the
          Resistance Biennial in Guatemala, the Legislative Assembly of Costa
          Rica, the Museum of Contemporary Art and Design (MADC) in Costa Rica,
          the Museum of Jade and Pre-Columbian Culture in Costa Rica, Casa
          América, the Museum and Vanguard Art Center Neomudéjar in Spain, Le
          Commun Contemporary Art Building in Geneva, and the Games and the New
          Media Summit at Tribeca Film Festival. 
        </p>
        <p>
          Yang earned her PhD in Interdisciplinary Media Arts + Practice at the
          School of Cinematic Arts at the University of Southern California and
          her Masters of Arts in Communications at Pennsylvania State
          University.  She has been the recipient of multiple awards and
          fellowships, including the 365 Year in Design Social Design Category
          by the American Institute of Graphic Arts (AIGA) in 2022 and the Arts
          for Gender Equality Fellowship by the Rockefeller Foundation and CARE
          USA in 2023 and the Hunting Family Faculty Fellow at U-M Institute of
          the Humanities in 2024. 
        </p>
        <p>
          She is currently an Assistant Professor of Art and Design at
          University of Michigan’s Penny W. Stamps School of Art and Design with
          a focus on Anti-Racism by Design. 
        </p>
      </>
    ),
    year: 2019,
  },
];

// const roomIds = artists.map((artist) => artist.roomID);

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
    id: i,
    x: 0,
    y: 0,
    dir: "bottom",
    artistID: getArtistID(i),
    link:
      artists[i].customLink ?? `/${ShowConfig.link}/rooms/${getArtistID(i)}`,
  };
  roomsArray.push(roomDeets);
}

export const rooms = roomsArray;
