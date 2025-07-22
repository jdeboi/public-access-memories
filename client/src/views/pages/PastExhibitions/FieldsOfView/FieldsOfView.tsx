import React, { useEffect } from "react";
import { ShowConfig } from "../../../../data/CurrentShow/ShowConfig";
import ArtistsList from "../ArtistsArchiveList";
import ImageGrid from "../ImageGrid";
import { artists } from "../../../../data/Shows/FieldsOfView/RoomConfig";

export const FieldsOfView = () => {
  const sortedArtists = [...artists];
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

  useEffect(() => {
    sortedArtists.sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <div className="w-full min-h-screen overflow-y-auto text-white bg-gradient-to-b from-[#5b43cd] to-[#0da6ff] px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-4xl font-bold mb-2">Fields of View</div>
        <div className="text-lg mb-4">
          A{" "}
          <a
            href="https://thewrong.org/"
            className="underline hover:text-cyan-300"
          >
            wrong biennale
          </a>{" "}
          pavilion
        </div>

        <div className="flex flex-row gap-4 mb-6">
          <img
            src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/PAM_logos/logo_black_lg.png"
            className="h-20 w-auto object-contain"
            alt="PAM logo"
          />
          <img
            src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/LOGO-BLACK_small.png"
            height={80}
            className="h-20 w-auto object-contain"
            alt="Wrong logo"
          />
        </div>

        {/* <hr className="border-white/30 mb-8" /> */}

        {/* <div className="text-xl font-semibold mb-4">Statement</div> */}

        <div className="flex flex-col md:flex-row gap-12 mb-12">
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              As part of The Wrong Biennale 2023-24, {ShowConfig.galleryTitle}{" "}
              presented "Fields of View," a virtual “pavilion” of 12 digital
              artists exploring new modes of representing, constructing, and
              traversing online space.
            </p>
            <p>
              The primary channel for communication in many aspects of our
              contemporary reality is the flatscreen computer monitor; however,
              our perceptions of this technology are often altered by illusions
              of space that betray the conditions of its surface. At the
              two-dimensional level, scrolling and hyperlinking operate as
              methods of expanding the spatial boundaries of the screen into a
              dense, multidimensional experience.
            </p>
            <p>
              Three-dimensional projections push this expansion further, but
              rarely deviate from conventional systems of linear perspective.
              Within such conventions exist assumptions about the relationship
              between ourselves and the environments we inhabit that limit our
              potential scope of experience.
            </p>
            <p>
              The artists in this exhibition approach the representation of
              space in ways that acknowledge the materiality of the screen.
              Whether through the presentation of alternative or extreme
              perspective projections, isometric diagrams, glitch landscapes,
              stereoscopic imagery, or simply the textual description of spatial
              experience, the work in this exhibition expands the space of the
              computer screen without attempting to erase our awareness of it.
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

        {/* <hr className="border-white/30 mb-12" /> */}

        <ImageGrid images={imgNames} />

        {/* <hr className="border-white/30 my-12" /> */}
        <div className="mb-10"></div>
        <div className="text-3xl font-semibold mb-6">Artists</div>
        <div className="text-sm">
          <ArtistsList awsLink="fields_of_view" artists={sortedArtists} />
        </div>
      </div>
    </div>
  );
};

export default FieldsOfView;
