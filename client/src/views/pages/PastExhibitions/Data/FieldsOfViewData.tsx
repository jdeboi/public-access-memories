// src/content/exhibitions/fieldsofview.data.tsx
import { artists } from "../../../../data/Shows/FieldsOfView/RoomConfig";
import { PastExhibitionDataInterface } from "./_PastExhibitionDataType";

const imgNames = [
  "fieldsofview.jpeg",
  "alex.jpg",
  "christina.jpg",
  "isolini.jpg",
  "petra.jpg",
  "ziyi.jpg",
].map(
  (name) =>
    `https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/screenshots/${name}`
);

export const fieldsOfViewData: PastExhibitionDataInterface = {
  pageLink: "/pastexhibitions/fieldsofview",
  awsLink: "fields_of_view",
  title: "Fields of View",
  year: 2023,
  exhibitionType: "The Wrong Biennale",
  shortDescription:
    "“Fields of View” explores spatial perception on the flat plane of the screen, where scrolling, links, and 3D renderings stretch a two-dimensional surface into many dimensions.",
  videoLink: "https://www.youtube.com/embed/g5Fpi5lwxmI?si=q77WCLqZnSIB28wK",
  imgs: imgNames,
  artists,
  thumbnail:
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/fieldsofview.jpg",

  statement: (
    <div className="flex flex-col md:flex-row gap-12 mb-12">
      <div className="space-y-4 text-sm leading-relaxed">
        <p>
          As part of The Wrong Biennale 2023-24, PAM presented "Fields of View,"
          a virtual “pavilion” of 12 digital artists exploring new modes of
          representing, constructing, and traversing online space.
        </p>
        <p>
          The primary channel for communication in many aspects of our
          contemporary reality is the flatscreen computer monitor; however, our
          perceptions of this technology are often altered by illusions of space
          that betray the conditions of its surface. At the two-dimensional
          level, scrolling and hyperlinking operate as methods of expanding the
          spatial boundaries of the screen into a dense, multidimensional
          experience.
        </p>
        <p>
          Three-dimensional projections push this expansion further, but rarely
          deviate from conventional systems of linear perspective. Within such
          conventions exist assumptions about the relationship between ourselves
          and the environments we inhabit that limit our potential scope of
          experience.
        </p>
        <p>
          The artists in this exhibition approach the representation of space in
          ways that acknowledge the materiality of the screen. Whether through
          the presentation of alternative or extreme perspective projections,
          isometric diagrams, glitch landscapes, stereoscopic imagery, or simply
          the textual description of spatial experience, the work in this
          exhibition expands the space of the computer screen without attempting
          to erase our awareness of it.
        </p>
      </div>
      <div className="flex-shrink-0">
        <img
          src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/announce.jpg"
          alt="Announcement"
          className="w-64 h-auto"
        />
      </div>
    </div>
  ),
};
