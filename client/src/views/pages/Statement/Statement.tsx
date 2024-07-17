import React from "react";
import "../Page.css";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import { Link } from "react-router-dom";

export const Statement = () => {
  return (
    <div className="Statement  Page">
      <div className="container">
        <h1>Statement</h1>

        <br />
        <br />
        <br />

        {ShowConfig.isOpenCallOpen ? (
          <React.Fragment>
            <h3>
              Check out the current <Link to="/opencall">open call</Link>.
            </h3>
            <br />
            <br />
            <br />
          </React.Fragment>
        ) : ShowConfig.underConstruction ? (
          <>
            <h3>Stay tuned for the next PAM show!</h3>
            <br />
            <br />
            <br />
          </>
        ) : (
          <React.Fragment>
            <div className="windows">
              <h2 className="showTitle">Home Offices</h2>
              <h3>
                A solo show by artist&nbsp;
                <a href="https://www.thesculpted.com/">Dave Greber</a>
              </h3>
            </div>
            <br />
            <br />

            <h3>Statement</h3>
            <div className="twoCol">
              <div>
                <p>
                  "HomeOffices" delves into the idealized corporate environments
                  of the 1980s, now transposed into the domestic spaces we work
                  in today. Through generative AI, retro office furniture images
                  alter, transforming as you navigate them with your cursor.
                  This exhibit reflects on the absurdity of merging professional
                  and personal spaces, offering a satirical yet sublime
                  commentary on our current work-from-home culture.
                </p>
                <p>
                  To celebrate the launch, a series of limited-edition prints
                  and NFTs will be available for purchase. These collectibles
                  capture the essence of the exhibition, merging nostalgia with
                  modernity.
                </p>
              </div>
              <div>
                <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/pages/Office_15/1.jpg" />
              </div>
            </div>

            <br />
            <br />
            <h3>About the Artist</h3>
            <p>
              Dave Greber is a contemporary artist and educator based in
              Baltimore, MD, known for his innovative installations and
              multimedia projects that explore the intersection of technology,
              art, and everyday life. His work, exhibited extensively nationally
              and internationally, blends traditional and digital media to
              create immersive experiences that subvert everyday expectations.
              Recents projects include a large-scale public art commission with
              the MTA Arts and Design and a solo show at the Ogden Museum of
              Art. Greber's latest project, "HomeOffices," uses generative AI to
              satirically reimagine the corporate dream within the context of
              modern home offices, offering insightful commentary on today's
              work culture.
            </p>

            <br />
            <br />
            <p>
              <img
                className="logo"
                src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/PAM_logos/logo_black_lg.png"
                height={80}
              />
            </p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Statement;
