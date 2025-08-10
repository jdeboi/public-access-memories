import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

type OpenCallVersion = {
  id: number;
  user: string;
  timestamp: Date;
  isAddition: boolean;
  addPosition?: string;
  newContent: React.ReactNode;
  staticContent?: React.ReactNode;
};

const SHOW_TITLE = "Debox";

const promptClass =
  "flex flex-row gap-4 bg-gray-800 text-white p-4 rounded mb-4";
const responsePromptClass =
  "bg-gray-700 text-white p-4 rounded mb-4 flex flex-row gap-4";
const textNotesClass = "";
const highlightColor = "text-[cyan]";

const chatGPTLogo = (
  <div className="w-4 h-4 flex-shrink-0">
    <img
      src="/backgroundImgs/chatgpt.png"
      alt="ChatGPT Logo"
      className="w-full h-full object-contain"
    />
  </div>
);
const openCallVersionsOG: OpenCallVersion[] = [
  {
    id: 0,
    user: "Jenna",
    timestamp: new Date("June 23, 2025 19:21:00"),
    isAddition: false,
    newContent: (
      <div>
        <div className="mb-4 text-lg">
          A show about the black box nature of AI.{" "}
        </div>
        <div className="mb-4 text-lg">
          Black Box // White Cube - a play on words with the white cube gallery
          space and the black box of AI? Too on the nose?
        </div>
      </div>
    ),
  },
  {
    id: 1,
    user: "Jenna",
    timestamp: new Date("June 23, 2025 19:24:30"),
    isAddition: true,
    addPosition: "bottom",
    newContent: (
      <div>
        <div className="mb-4 text-lg">
          The phrase "AI is a black box" refers to the difficulty of
          understanding how complex AI systems arrive at their decisions. This
          lack of transparency raises concerns about trust, accountability, and
          the potential for bias or errors.
        </div>
        <div className="mb-4 text-lg">
          Public Access Memories invites submissions of digital works that
          prioritize exposing the artistic process; novel approaches that
          artfully lay bare the conceptual, theoretical, aesthetic, formal
          considerations that shape the creation of their art.
        </div>
      </div>
    ),
  },

  {
    id: 2,
    user: "Jenna",
    timestamp: new Date("June 23, 2025 20:32:00"),
    isAddition: true,
    addPosition: "bottom",
    newContent: (
      <div>
        <ul className="list-disc list-outside ml-6 space-y-2 text-lg">
          <li>
            Foreground the <strong>artistic process</strong>- make process the
            art object in a manner that emphasizes intentionality and
            transparency.
          </li>
          <li>
            Any type of work that attempts to{" "}
            <strong>subvert the black box.</strong>
          </li>
          <li>
            Show your research - digital sticky notes, journal entries, poetry
            snippets
          </li>
        </ul>
      </div>
    ),
  },

  {
    id: 3,
    user: "Jenna",
    timestamp: new Date("June 23, 2025 20:46:00"),
    isAddition: true,
    addPosition: "top",
    newContent: (
      <div className={promptClass}>
        <div>
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div>
          Can you help me clean up these ideas and turn them into a polished
          open call statement for the virtual art gallery Public Access
          Memories?
        </div>
      </div>
    ),
  },
  {
    id: 3.5,
    user: "Jenna",
    timestamp: new Date("June 23, 2025 20:46:00"),
    isAddition: false,
    addPosition: "bottom",
    staticContent: (
      <div className={promptClass}>
        <div>
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div>
          Can you help me clean up these ideas and turn them into a polished
          open call statement for the virtual art gallery Public Access
          Memories?
        </div>
      </div>
    ),
    newContent: <div></div>,
  },
  {
    id: 4,
    user: "Jenna",
    timestamp: new Date("June 23, 2025 20:47:00"),
    isAddition: true,
    addPosition: "bottom",
    newContent: (
      <div className={responsePromptClass}>
        {chatGPTLogo}
        <div>
          <div className="mb-4 text-lg">
            The phrase “AI is a black box” describes the profound opacity of
            artificial intelligence systems. Complex models receive inputs and
            produce outputs, but the internal workings remain largely
            inaccessible—even to their creators. This lack of transparency
            raises urgent questions about power, authorship, accountability, and
            bias. Public Access Memories invites digital artists to turn this
            black box inside out. In contrast to AI’s hidden logic, Black Box //
            White Cube foregrounds the artistic process itself as the subject of
            inquiry. We seek works that make transparent the decisions,
            revisions, influences, and constraints behind their creation. This
            exhibition values intentionality—not as a rigid blueprint, but as a
            deliberate act of exposure. Here, the process becomes the artwork:
            concept maps, version histories, generative pathways, inspirations,
            and failures are surfaced rather than concealed. We encourage:
          </div>
          <ul className="list-disc list-outside ml-6 space-y-2 mb-4 text-lg">
            <li>
              Works that reveal the conceptual and technical underpinnings of
              their creation, such as code, sketches, or prompts.
            </li>
            <li>
              Projects that document the evolution of ideas, including early
              drafts, iterations, and decision-making processes.
            </li>
            <li>Works that subvert or play with the black box nature of AI.</li>
          </ul>
          <div className="mb-4 text-lg">
            Show us your work process - sticky notes, journal entries, pinterest
            boards, poems, UI design proposals that can be implemented on Public
            Access Memories to give current or future artists the ability to
            visualize artistic thinking, relationships, and influences across
            artists and artworks.
          </div>
          <div className="mb-4 text-lg">
            While art often emerges through intuition and accident, Black Box //
            White Cube asks: What happens when we choose to make our methods
            visible? In an era of computational opacity, transparency itself
            becomes a radical aesthetic gesture.
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    timestamp: new Date("July 6, 2025 09:25:00"),
    user: "Jon",
    isAddition: false,
    addPosition: "top",
    staticContent: (
      <div className={responsePromptClass}>
        {chatGPTLogo}
        <div>
          <div className="mb-4 text-lg">
            The phrase “AI is a black box” describes the profound opacity of
            artificial intelligence systems. Complex models receive inputs and
            produce outputs, but the internal workings remain largely
            inaccessible—even to their creators. This lack of transparency
            raises urgent questions about power, authorship, accountability, and
            bias. Public Access Memories invites digital artists to turn this
            black box inside out. In contrast to AI’s hidden logic, Black Box //
            White Cube foregrounds the artistic process itself as the subject of
            inquiry. We seek works that make transparent the decisions,
            revisions, influences, and constraints behind their creation. This
            exhibition values intentionality—not as a rigid blueprint, but as a
            deliberate act of exposure. Here, the process becomes the artwork:
            concept maps, version histories, generative pathways, inspirations,
            and failures are surfaced rather than concealed. We encourage:
          </div>
          <ul className="list-disc list-outside ml-6 space-y-2 mb-4 text-lg">
            <li>
              Works that reveal the conceptual and technical underpinnings of
              their creation, such as code, sketches, or prompts.
            </li>
            <li>
              Projects that document the evolution of ideas, including early
              drafts, iterations, and decision-making processes.
            </li>
            <li>Works that subvert or play with the black box nature of AI.</li>
          </ul>
          <div className="mb-4 text-lg">
            Show us your work process - sticky notes, journal entries, pinterest
            boards, poems, UI design proposals that can be implemented on Public
            Access Memories to give current or future artists the ability to
            visualize artistic thinking, relationships, and influences across
            artists and artworks.
          </div>
          <div className="mb-4 text-lg">
            While art often emerges through intuition and accident, Black Box //
            White Cube asks: What happens when we choose to make our methods
            visible? In an era of computational opacity, transparency itself
            becomes a radical aesthetic gesture.
          </div>
        </div>
      </div>
    ),
    newContent: (
      <div className={textNotesClass}>
        <div className="mb-4 text-lg">References:</div>
        <ul className="list-disc list-outside ml-6 space-y-2 mb-4 text-lg">
          <li>
            <a
              target="_blank"
              style={{ textDecoration: "underline" }}
              href="https://www.technologyreview.com/2024/03/04/1089403/large-language-models-amazing-but-nobody-knows-why/?truid=&utm_source=the_algorithm&utm_medium=email&utm_campaign=the_algorithm.unpaid.engagement&utm_content=03-04-2024"
            >
              Large language models can do jaw-dropping things. But nobody knows
              exactly why.
            </a>
          </li>
          <li>
            <a
              target="_blank"
              style={{ textDecoration: "underline" }}
              href="https://www.nytimes.com/2024/11/04/technology/meta-ai-military.html"
            >
              Meta Permits Its A.I. Models to Be Used for U.S. Military Purposes
            </a>
          </li>
          <li>
            <a
              target="_blank"
              style={{ textDecoration: "underline" }}
              href="https://www.theverge.com/news/688041/openai-us-defense-department-200-million-contract"
            >
              OpenAI awarded $200 million US defense contract
            </a>
          </li>
          <li>
            <a
              target="_blank"
              style={{ textDecoration: "underline" }}
              href="https://www.politico.com/news/2023/10/31/new-orleans-police-facial-recognition-00121427"
            >
              Inside New Orleans’ struggle with facial-recognition policing
            </a>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 6,
    timestamp: new Date("July 6, 2025 11:27:00"),
    user: "Jon",
    isAddition: true,
    addPosition: "top",
    newContent: (
      <div className={textNotesClass}>
        <div className="mb-4 text-lg">
          Politics of AI in contrast with human identity and bodies?{" "}
        </div>
        <div className="mb-4 text-lg">
          Human decision making, feelings, reflections,{" "}
        </div>
        <div className="mb-4 text-lg">
          Human Scale, human connection, different modes and models of thinking
        </div>
        <div className="mb-4 text-lg">
          Transparency of thinking and process{" "}
        </div>
      </div>
    ),
  },
  {
    id: 7,
    timestamp: new Date("July 6, 2025 14:50:00"),
    user: "Jon",
    isAddition: true,
    addPosition: "top",
    newContent: (
      <div className={textNotesClass}>
        <ol className="list-decimal list-outside ml-6 space-y-2 text-lg">
          <li>
            AI systems are “black boxes” in that the data being used to train
            them is opaque, leading to questions around power, bias, consent
            etc. This is especially true for corporate AI models.
          </li>
          <li>
            In contrast to this, we want artists who use AI tools to be
            transparent about their process in the form of drawings, workflows,
            node maps, training data, etc.
          </li>
          <li>Transparency is a radical gesture when working with AI models</li>
          <li>What are the unknowns?</li>
        </ol>
      </div>
    ),
  },
  {
    id: 8,
    timestamp: new Date("July 6, 2025 15:04:00"),
    user: "Jon",
    isAddition: true,
    addPosition: "top",
    newContent: (
      <div className={textNotesClass}>
        <div className="mb-4 text-lg">
          <strong>Proposed other names:</strong>
        </div>
        <div className="mb-4 text-lg">Black Box // White Cube </div>
        <div className="mb-4 text-lg">Transparency of the Black Box </div>
        <div className="mb-4 text-lg">Transparent Black Boxes and Myths </div>
        <div className="mb-4 text-lg">Black Box Systems </div>
      </div>
    ),
  },
  {
    id: 9,
    timestamp: new Date("July 9, 2025 10:02:00"),
    user: "Jenna",
    isAddition: true,
    addPosition: "top",
    newContent: (
      <div className={promptClass}>
        <div>
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div>
          Can you help clean up this open call and make a concise, polished
          version?
        </div>
      </div>
    ),
  },
  {
    id: 10,
    timestamp: new Date("July 9, 2025 10:03:00"),
    user: "Jenna",
    addPosition: "bottom",
    isAddition: false,
    staticContent: (
      <div className={promptClass}>
        <div>
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div>
          Can you help clean up this open call and make a concise, polished
          version?
        </div>
      </div>
    ),
    newContent: (
      <div className={responsePromptClass}>
        {chatGPTLogo}
        <div>
          <div className="mb-4 text-lg">
            Artificial intelligence systems are often described as “black
            boxes”—highly complex models that receive inputs and produce
            outputs, yet whose inner workings remain largely inaccessible, even
            to their creators. The data used to train these systems is rarely
            open or traceable, especially in corporate models, creating layers
            of opacity that raise critical questions around power, bias,
            authorship, and consent. This is particularly troubling as AI is
            increasingly deployed in policing, surveillance, and military
            operations.
          </div>
          <div className="mb-4 text-lg">
            In contrast, Black Box // White Cube foregrounds transparency—of
            process, memory, intention, and data. This exhibition invites
            artists to reveal the thinking behind their work: the inputs,
            revisions, training sets, workflows, and mistakes. Transparency
            becomes a radical aesthetic gesture.
          </div>
          <div className="mb-4 text-lg">
            We’re especially interested in how data itself—what is collected,
            excluded, or reimagined—shapes creative practice. We welcome
            projects that engage with dataset creation or curation as a form of
            authorship, especially those that center personal archives,
            underrepresented communities, or alternative knowledge systems. This
            includes works of memory work—acts of documenting, preserving, or
            resisting erasure through data.
          </div>
          <div className="mb-4 text-lg">
            Transparency isn’t just about the visible process of making—it’s
            also about showing the foundations: the values embedded in the data,
            and the politics of what is remembered or forgotten.
          </div>
          <div className="mb-4 text-lg">
            This exhibition values intentionality, not as a rigid blueprint, but
            as an act of disclosure. What happens when we choose to reveal the
            process? When we surface the labor behind a work—the data, diagrams,
            voice memos, glitches, discarded fragments? In an age of
            computational opacity, transparency itself becomes a form of
            resistance. We encourage submissions that include:
          </div>
          <ul className="list-disc list-outside ml-6 space-y-2 mb-4 text-lg">
            <li>
              Open-source or personal datasets, especially from marginalized or
              underrepresented perspectives
            </li>
            <li>
              Works of memory work—projects that document, preserve, or call
              attention to lost or missing data
            </li>
            <li>
              Visual traces of process: sketches, notes, mind maps, code, failed
              experiments
            </li>

            <li>
              Projects that interrogate or subvert the black-box logic of AI
            </li>

            <li>Artifacts of reflection, memory, and intentional making</li>
          </ul>

          <div className="mb-4 text-lg">
            Turn the black box inside out. Make the invisible visible.{" "}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 11,
    timestamp: new Date("July 20, 2025 13:03:00"),
    user: "",
    isAddition: false,
    addPosition: "top",
    staticContent: (
      <div>
        <div className="mb-4 text-lg">
          Artificial intelligence systems are often described as{" "}
          <span className={highlightColor}>“black boxes”</span>—highly complex
          models that receive inputs and produce outputs, yet whose inner
          workings remain largely inaccessible, even to their creators. The data
          used to train these systems is rarely open or traceable, especially in
          corporate models, creating layers of opacity that raise critical
          questions around{" "}
          <span className={highlightColor}>
            power, bias, authorship, and consent
          </span>
          . This is increasingly alarming as AI continues to be deployed in
          policing, surveillance, and military contexts.
        </div>
        <div className="mb-4 text-lg">
          In contrast,{" "}
          <span className={highlightColor}>
            {SHOW_TITLE} foregrounds transparency
          </span>
          —of process, memory, intention, and data. This exhibition invites
          artists to reveal the thinking behind their work: the inputs,
          revisions, training sets, workflows, and mistakes. Transparency
          becomes a radical aesthetic gesture.
        </div>

        <div className="mb-4 text-lg">
          Transparency isn’t just about the visible process of making—it’s also
          about showing the foundations: the values embedded in the data, and
          the{" "}
          <span className={highlightColor}>
            politics of what is remembered or forgotten
          </span>
          .
        </div>
        <div className="mb-4 text-lg">
          We welcome projects that engage with{" "}
          <span className={highlightColor}>dataset creation</span>, especially
          those that center personal archives, underrepresented communities, or
          alternative knowledge systems. This includes memory work—acts of
          documenting, preserving, or resisting erasure through data.
        </div>
        <div className="mb-4 text-lg">
          This exhibition values intentionality, not as a rigid blueprint, but
          as an act of disclosure. What happens when we choose to reveal the
          process? When we surface the labor behind a work—the data, diagrams,
          voice memos, glitches, discarded fragments? In an age of computational
          opacity, transparency itself becomes a form of resistance. We
          encourage submissions that include:
        </div>
        <ul className="list-disc list-outside ml-6 space-y-2 mb-8 text-lg">
          <li>
            Open-source or{" "}
            <span className={highlightColor}>personal datasets</span>,
            especially from marginalized or underrepresented perspectives
          </li>
          <li>
            <span className={highlightColor}>Memory work—projects</span> that
            document, preserve, or call attention to lost or missing data
          </li>
          <li>
            Visual <span className={highlightColor}>traces of process</span>:
            sketches, notes, mind maps, code, failed experiments
          </li>

          <li>
            Projects that interrogate or{" "}
            <span className={highlightColor}>subvert the black-box</span> logic
            of AI
          </li>
        </ul>

        <div className="mb-8 text-xl">We look forward to your submission! </div>
        <div>
          <a
            href="https://forms.gle/Zx8gsSxT5Ynf5dmS7"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "black" }}
            className="windowsBlackNoPadding font-['geoFont'] p-4 text-2xl inline-block min-w-[200px] text-center bg-white font-semibold shadow-md hover:shadow-lg hover:bg-gray-100 transition"
          >
            APPLY
          </a>
        </div>
      </div>
    ),
    newContent: <></>,
  },
];

openCallVersionsOG[0].id = 1;
for (let i = 1; i < openCallVersionsOG.length; i++) {
  const version = openCallVersionsOG[i];
  version.id = i + 1;
  const previousVersion = openCallVersionsOG[i - 1];
  if (version.isAddition) {
    const addPreviousPosition = previousVersion.addPosition || "bottom";
    const previousStaticContent = previousVersion.staticContent || null;
    const previousNewContent = previousVersion.newContent || null;
    version.staticContent = (
      <>
        {addPreviousPosition === "bottom" ? previousStaticContent : null}
        {previousNewContent}
        {addPreviousPosition === "top" ? previousStaticContent : null}
      </>
    );
  }
}

export const openCallVersions = openCallVersionsOG;
