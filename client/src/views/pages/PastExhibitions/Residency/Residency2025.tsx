import React, { useEffect } from "react";
import "../../Page.css";
import ArtistsArchiveList from "../ArtistsArchiveList";
import { artists } from "../../../../data/Shows/Residency/RoomConfig";

export const Residency2025 = () => {
  const sortedArtists = [...artists];

  //   remove hostbot from artists
  const filteredArtists = sortedArtists.filter(
    (artist) => artist.name !== "hostBot"
  );

  useEffect(() => {
    // Create a copy of the original array
    sortedArtists.sort((a, b) => a.name.localeCompare(b.name)); // Sort the copy
  }, []);

  return (
    <div className="Statement  Page">
      <div className="containerOG">
        <h1>Residency 2025</h1>

        <br />

        <p>
          Public Access Memories was excited to offer two month-long online
          residency programs in the summer of 2025. Net artists met weekly to
          participate in studio visits and critiques, and discuss works in
          progress. The residency concluded with a virtual exhibition.
        </p>
        <br />

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/syVPp78A1iA?si=74usAd5uR9Lo53M7"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <br />
        <br />
        <hr />
        <h3>Artists</h3>
        <p>
          <ArtistsArchiveList awsLink="residency" artists={filteredArtists} />
        </p>
      </div>
    </div>
  );
};

export default Residency2025;
