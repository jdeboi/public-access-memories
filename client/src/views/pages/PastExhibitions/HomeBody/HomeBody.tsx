import React, { useEffect } from "react";
import "../../Page.css";
import ArtistsArchiveList from "../ArtistsArchiveList";
import { artists } from "../../../../data/Shows/HomeBody/RoomConfig";

export const HomeBody = () => {
  const sortedArtists = [...artists];

  useEffect(() => {
    // Create a copy of the original array
    sortedArtists.sort((a, b) => a.name.localeCompare(b.name)); // Sort the copy
  }, []);

  return (
    <div className="Statement  Page">
      <div className="containerOG">
        <h1>home &lt;/body&gt;</h1>
        <h3>
          A <a href="https://thewrong.org/">wrong biennale</a> pavilion
        </h3>
        <img
          src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/tw5_logo_w.png"
          width={200}
        />
        <br />
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/o-Zw43PhvR8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <hr />
        <h3>Statement</h3>
        <p>
          <strong>home &lt;/body&gt;</strong> considers the spaces, experiences,
          and ephemera of digital homemaking. From housekeeping chores
          (decluttering desktops and inboxes) to nesting rituals (websurfing for
          superlative sourdough starter), the meaning of home is rapidly
          evolving.
        </p>
        <p>
          In addition to a new visual language, the exhibition seeks to uncover
          tensions of digital denizenship, for example, the nature of home as a
          &ldquo;safe haven&rdquo; in an age of surveillance capitalism, fake
          news, and internet trolls. Particularly in the context of a global
          pandemic, the paradox of home as both sanctuary and asylum, as both a
          confined and liberated space, offers ample opportunity for reflection.
        </p>
        <p>
          Situating digital works within their native environment, public access
          memories Gallery offers the HTML gallery as a canvas. Artists in this
          pavilion use various digital media formats as they probe the new
          meaning of home.
        </p>
        <br />
        <hr />
        <h3>Artists</h3>
        <p>
          <ArtistsArchiveList awsLink="home_body" artists={sortedArtists} />
        </p>
      </div>
    </div>
  );
};

export default HomeBody;
