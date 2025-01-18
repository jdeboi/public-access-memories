import React from "react";
import "../Page.css";

export const OpenCallOpen = () => {
  return (
    <React.Fragment>
      <div className="windows">
        <h2 className="showTitle">Online Residency</h2>
        <h4>Deadline to apply - February 15, 2025</h4>
        <h3>
          <a href="https://forms.gle/ucoPQfakucGuoBGb9" target="_blank">
            Apply here
          </a>
        </h3>
      </div>
      <br />
      <br />
      <p>
        Public Access Memories is excited to offer an online residency program
        from March - June, 2025. Net artists are invited to apply for dedicated
        time and virtual space to develop works in progress, participate in
        studio visits and critiques, and optionally present an artist talk.
      </p>
      <p>
        We especially encourage those eager to experiment with how the gallery
        itself might be reimagined to augment digital residencies and net art
        practices more broadly. The design, aesthetic, function, UI, etc. are
        offered to the artist as a canvas (with ample coding support from PAM).
      </p>

      <p>
        For questions please email{" "}
        <a href="mailto:publicaccessmemories@gmail.compublicaccessmemories@gmail.com">
          publicaccessmemories@gmail.com
        </a>
      </p>
    </React.Fragment>
  );
};

export default OpenCallOpen;
