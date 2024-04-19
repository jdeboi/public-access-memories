import React, { useEffect } from "react";
import "../../Page.css";
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
  ];
  for (let i = 0; i < imgNames.length; i++) {
    imgNames[i] =
      "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/screenshots/" +
      imgNames[i];
  }

  useEffect(() => {
    // Create a copy of the original array
    sortedArtists.sort((a, b) => a.name.localeCompare(b.name)); // Sort the copy
  }, []);

  return (
    <div className="Statement  Page">
      <div className="container">
        <h1>Fields of View</h1>
        <h3>
          A <a href="https://thewrong.org/">wrong biennale</a> pavilion
        </h3>
        <div className="d-flex">
          <img
            className="logo"
            src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/PAM_logos/logo_black_lg.png"
            height={80}
          />

          <img
            src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/LOGO-BLACK_small.png"
            height={80}
          />
        </div>
        <br />
        <hr />
        <h3>Statement</h3>
        <div>
          <div className="twoCol">
            <div>
              <p>
                As part of The Wrong Biennale 2023-24, {ShowConfig.galleryTitle}{" "}
                presented "Fields of View," a virtual “pavilion” of 12 digital
                artists exploring new modes of representing, constructing, and
                traversing online space.
              </p>

              <p>
                The primary channel for communication in many aspects of our
                contemporary reality is the flatscreen computer monitor;
                however, our perceptions of this technology are often altered by
                illusions of space that betray the conditions of its surface. At
                the two-dimensional level, scrolling and hyperlinking operate as
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
                stereoscopic imagery, or simply the textual description of
                spatial experience, the work in this exhibition expands the
                space of the computer screen without attempting to erase our
                awareness of it.
              </p>
            </div>
            <div>
              <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/announce.jpg" />
              {/* <iframe id="p5Frame" src="https://www.publicaccessmemories.com/opencallp5"></iframe> */}
            </div>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <ImageGrid images={imgNames} />
        <br />
        <hr />
        <h3>Artists</h3>
        <p>
          <ArtistsList awsLink="fields_of_view" artists={sortedArtists} />
        </p>
      </div>
    </div>
  );
};

export default FieldsOfView;
