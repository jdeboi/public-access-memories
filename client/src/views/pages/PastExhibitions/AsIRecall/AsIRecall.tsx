import React, { useEffect } from "react";
import "../../Page.css";
import { artists } from "../../../../data/Shows/AsIRecall/RoomConfig";
import ArtistsArchiveList from "../ArtistsArchiveList";
import ImageGrid from "../ImageGrid";

export const AsIRecall = () => {
  const sortedArtists = [...artists];

  useEffect(() => {
    sortedArtists.sort((a, b) => a.name.localeCompare(b.name)); // Sort the copy
  }, []);
  return (
    <div className="Statement  Page">
      <div className="containerOG">
        <h1>As I Recall</h1>
        {/* <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/as_i_recall.png" width="500px" /> */}

        <br />
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/E0_eOfj5XDs"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <hr />
        <h3>Statement</h3>

        <blockquote
          className="quoteC"
          cite="https://doi.org/10.3389/fpsyg.2012.00257"
        >
          “If anything has been learned about memory, it is that it is fragile
          and error prone... Although often associated with negative
          consequences there is growing evidence to suggest that memory's
          imperfections may also be a virtue. The reconstructive nature of
          memory is believed to provide greater cognitive flexibility...and
          support the construction and maintenance of self-identity and
          life-stories” (
          <a href="https://doi.org/10.3389/fpsyg.2012.00257">citation</a>)
        </blockquote>
        <br />
        <p>
          "As I Recall" reflects upon the implications of digital memory-making.
          For example, how do social media stories form or infiltrate our
          personal narratives, and to what extent have we maintained control
          over our memories as tech companies mine and monetize our digital
          histories? How does the persistence and fixed-nature of our data (e.g.
          decades-old content preserved on Myspace) disrupt or augment the
          ability to reshape visions of the past? On the other hand, does the
          continual copy / paste / transfer of internet imagery slowly degrade
          visual memories until low res web junk is all that remains? These are
          just a few questions that seek to probe the evolving nature of
          memory—one that is simultaneously analog and digital, permanent and
          pliable.
        </p>
        <br />
        <hr />
        <br />
        <ImageGrid
          images={[
            "https://publicaccessmemories.com/asirecall_bg.png",
            "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/as_i_recall.png",
          ]}
        />

        <br />
        <hr />
        <br />
        <h3>Artists</h3>
        <p>
          <ArtistsArchiveList awsLink="as_i_recall" artists={sortedArtists} />
        </p>
      </div>
    </div>
  );
};

export default AsIRecall;
