import React from "react";
import "../Page.css";

export const OpenCallOpen = () => {
  return (
    <React.Fragment>
      <div className="windows">
        <h2 className="showTitle">Stay Tuned!</h2>
        <h4>Deadline TBA</h4>
        <h3>
          Have curatorial ideas for a{" "}
          <a href="https://thewrong.org/">wrong biennale</a> pavilion?
        </h3>

        <h5>
          Email thoughts, questions, and ideas to:{" "}
          <a href="mailto:publicaccessmemories@gmail.com">
            publicaccessmemories@gmail.com
          </a>
        </h5>
      </div>
      <br />
      <br />
    </React.Fragment>
  );
};

export default OpenCallOpen;
