type OpenCallVersion = {
  id: number;
  user: string;
  type: string;
  timestamp: Date;
  content: React.ReactNode;
  prompt?: React.ReactNode;
};

export const openCallVersions: OpenCallVersion[] = [
  {
    id: 0,
    user: "Jenna",
    timestamp: new Date("June 23, 2025 19:21:00"),
    type: "text",
    content: (
      <div>
        <p>Black Box // White Cube</p>
        <p>
          Public Access Memories invites submissions of digital works that
          prioritize exposing the artistic process; novel approaches that
          artfully lay bare the conceptual, theoretical, aesthetic, formal
          considerations that shape the creation of their art.
        </p>
      </div>
    ),
  },
  {
    id: 1,
    user: "Jenna",
    timestamp: new Date("June 23, 2025 20:32:00"),
    type: "prompt-text",
    prompt: (
      <div>
        <p>
          Can you help me write a show statement for the virtual art gallery
          Public Access Memories? Here is what I have so far:
        </p>

        <p>Black Box // White Cube</p>
        <p>
          The phrase "AI is a black box" refers to the difficulty of
          understanding how complex AI systems, particularly deep learning
          models, arrive at their decisions. Users can input data and see the
          output, but the internal processes and logic behind the output are
          often opaque and difficult to interpret. This lack of transparency
          raises concerns about trust, accountability, and the potential for
          bias or errors.
        </p>
        <p>
          [insert paragraph about why PAM wants to do this differently -
          subvert? Critique? Emphasize the human?]
        </p>
        <p>
          Public Access Memories invites submissions of digital works that
          prioritize exposing the artistic process; novel approaches that
          artfully lay bare the conceptual, theoretical, aesthetic, formal
          considerations that shape the creation of their art.
        </p>
        <p>
          Artists that want to design, build, collaborate on novel UI elements
          for the virtual art gallery - UI elements that use interesting formal
          and spatial tools to materialize artists’ thoughts, visualize
          connections to other artists and works and inspirations…
        </p>
        <p>
          Work that is intentionally foregrounds the artistic process - makes
          decisions, connections, influences obvious.
        </p>
        <p>
          Make the artistic process the art object in a manner that emphasizes
          intentionality and transparency.
        </p>
        <p>Any type of work that attempts to subvert the black box.</p>
        <p>
          Maybe some nod to the fact that art isn’t always intentional or
          thought out, but this show wants that … ?
        </p>
      </div>
    ),
    content: (
      <div>
        <p>Black Box // White Cube</p>
        <p>A virtual exhibition by Public Access Memories</p>
        <p>
          The phrase “AI is a black box” describes the profound opacity of
          artificial intelligence systems. Complex models receive inputs and
          produce outputs, but the internal workings remain largely
          inaccessible—even to their creators. This lack of transparency raises
          urgent questions about power, authorship, accountability, and bias.
          Public Access Memories invites digital artists to turn this black box
          inside out. In contrast to AI’s hidden logic, Black Box // White Cube
          foregrounds the artistic process itself as the subject of inquiry. We
          seek works that make transparent the decisions, revisions, influences,
          and constraints behind their creation. This exhibition values
          intentionality—not as a rigid blueprint, but as a deliberate act of
          exposure. Here, the process becomes the artwork: concept maps, version
          histories, generative pathways, inspirations, and failures are
          surfaced rather than concealed. We encourage:
        </p>
        <ul>
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
        <p>
          Show us your work process - sticky notes, journal entries, pinterest
          boards, poems, UI design proposals that can be implemented on Public
          Access Memories to give current or future artists the ability to
          visualize artistic thinking, relationships, and influences across
          artists and artworks.
        </p>
        <p>
          While art often emerges through intuition and accident, Black Box //
          White Cube asks: What happens when we choose to make our methods
          visible? In an era of computational opacity, transparency itself
          becomes a radical aesthetic gesture.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    timestamp: new Date("June 24, 2025 10:00:00"),
    user: "Jon",
    type: "note",
    content: (
      <div>
        <p>References:</p>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://www.technologyreview.com/2024/03/04/1089403/large-language-models-amazing-but-nobody-knows-why/?truid=&utm_source=the_algorithm&utm_medium=email&utm_campaign=the_algorithm.unpaid.engagement&utm_content=03-04-2024"
            >
              Large language models can do jaw-dropping things. But nobody knows
              exactly why.
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.nytimes.com/2024/11/04/technology/meta-ai-military.html"
            >
              Meta Permits Its A.I. Models to Be Used for U.S. Military Purposes
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.theverge.com/news/688041/openai-us-defense-department-200-million-contract"
            >
              OpenAI awarded $200 million US defense contract
            </a>
          </li>
          <li>
            <a
              target="_blank"
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
    id: 3,
    timestamp: new Date("June 24, 2025 11:00:00"),
    user: "Jon",
    type: "top-note",
    content: (
      <div>
        <p>Politics of AI in contrast with human identity and bodies?</p>
        <p>Human decision making, feelings, reflections,</p>
        <p>
          Human Scale, human connection, different modes and models of thinking
        </p>
        <p>Transparency of thinking and process</p>
      </div>
    ),
  },
];
