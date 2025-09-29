import React from "react";
import { Link } from "react-router-dom";
import PageTemplate from "../templates/PageTemplate";

export const Residency = () => {
  return (
    <PageTemplate
      title="Residency"
      intro={
        <div className="windows p-5">
          {/* <h2 className="showTitle">PAM Digital Residency</h2> */}
          <h3>
            A monthly program supporting artists working in browser-based and
            digitally native forms.
          </h3>
        </div>
      }
    >
      <h2>What is the PAM Digital Residency?</h2>
      <p>
        The PAM Digital Residency is a month-long, online program running
        through June 2025. Each month, selected artists are given a virtual
        studio to develop and share works in progress, engage in critical
        dialogue, and experiment with public modes of digital practice.
      </p>

      <br />
      <h2>What Can Visitors Expect?</h2>
      <p>
        Visitors to the residency space can explore each artist’s evolving
        project through interactive studio portals, online documentation, and
        occasional live events.{" "}
      </p>

      <p>
        Each residency culminates in a group exhibition, showcasing the work
        developed over the course of the month and reflecting the unique
        approaches of each artist.
      </p>

      <br />
      <h2>Residency Structure</h2>
      <p>
        Residents commit to a mix of structured meetings and self-directed
        creation. Each month’s structure centers around building community,
        supporting peer critique, and fostering opportunities for collaboration.
        Artists meet regularly for one-on-one studio visits and group
        conversations, while also carving out time for independent research and
        digital experimentation.
      </p>

      <p>
        During the residency, artists also host online "office hours" where
        visitors can drop in to chat, watch work in progress, or simply observe
        the digital studio at work.
      </p>

      <br />
      <h2>Join Us</h2>
      <p>
        Whether you're a longtime net artist or simply curious about PAM, we
        invite you to connect. Follow our{" "}
        <a
          href="https://www.instagram.com/publicaccessmemories/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>{" "}
        or check out the <Link to="/">home page</Link> page to see works in
        progress.
      </p>
    </PageTemplate>
  );
};

export default Residency;
