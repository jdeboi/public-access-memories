// src/content/exhibitions/asirecall.data.tsx
import React from "react";

import { artists, artistsLive } from "../../../../data/Shows/Debox/RoomConfig";
import { PastExhibitionDataInterface } from "./_PastExhibitionDataType";

const SHOW_TITLE = "Debox";

const promptClass =
  "flex flex-row gap-4 bg-gray-800 text-white p-4 rounded mb-4";
const responsePromptClass =
  "bg-gray-700 text-white p-4 rounded mb-4 flex flex-row gap-4";
const textNotesClass = "";
const highlightColor = "text-[cyan]";

export const DeboxData: PastExhibitionDataInterface = {
  pageLink: "/pastexhibitions/debox",
  awsLink: "debox",
  title: "Debox",
  year: 2026,
  exhibitionType: "The Wrong Biennale",
  shortDescription:
    "An exhibition and The Wrong Biennale pavilion exploring the 'black box' nature of AI.",
  videoLink: "https://www.youtube.com/embed/NeSgVudCS7Q?si=8gp4kV1-KBN0ha2-",
  imgs: [
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/debox/imgs/debox_gallery.jpg",
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/debox/Debox-Flyer.jpg",
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/debox/imgs/sinders.jpg",
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/debox/imgs/emilia.jpg",
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/debox/imgs/thompto.jpeg",
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/debox/imgs/emojis.jpg",
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/debox/imgs/briz.jpg",
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/debox/imgs/group.jpg",
  ],
  artists: artistsLive,
  thumbnail:
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/debox/imgs/debox_gallery.jpg",
  statement: (
    <>
      <div className="mb-4 text-lg">
        Artificial intelligence systems are often described as{" "}
        <span className={highlightColor}>“black boxes”</span>—highly complex
        models that receive inputs and produce outputs, yet whose inner workings
        remain largely inaccessible, even to their creators. The data used to
        train these systems is rarely open or traceable, especially in corporate
        models, creating layers of opacity that raise critical questions around{" "}
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
        artists to reveal the thinking behind their work: the inputs, revisions,
        training sets, workflows, and mistakes. Transparency becomes a radical
        aesthetic gesture.
      </div>

      <div className="mb-4 text-lg">
        Transparency isn’t just about the visible process of making—it’s also
        about showing the foundations: the values embedded in the data, and the{" "}
        <span className={highlightColor}>
          politics of what is remembered or forgotten
        </span>
        .
      </div>
      <div className="mb-4 text-lg">
        This show features projects that engage with{" "}
        <span className={highlightColor}>dataset creation</span>, especially
        those that center personal archives, underrepresented communities, or
        alternative knowledge systems. This includes memory work—acts of
        documenting, preserving, or resisting erasure through data.
      </div>
      <div className="mb-4 text-lg">
        This exhibition values intentionality, not as a rigid blueprint, but as
        an act of disclosure. What happens when we choose to reveal the process?
        When we surface the labor behind a work—the data, diagrams, voice memos,
        glitches, discarded fragments? In an age of computational opacity,
        transparency itself becomes a form of resistance.
      </div>
    </>
  ),
};
