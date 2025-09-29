import React from "react";
import "../Page.css";

export const OpenCallOpen = () => {
  return (
    <React.Fragment>
      <div className="windows p-5">
        <h2 className="showTitle">Online Residency</h2>
        <h4>Deadline to apply - Tuesday, February 18th 2025</h4>
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

      <h4>
        <a href="https://forms.gle/ucoPQfakucGuoBGb9" target="_blank">
          Apply here by 2/18/2025
        </a>
      </h4>
      <p>
        For questions please email{" "}
        <a href="mailto:publicaccessmemories@gmail.compublicaccessmemories@gmail.com">
          publicaccessmemories@gmail.com
        </a>
      </p>
      <p>
        <a href="https://forms.gle/ucoPQfakucGuoBGb9" target="_blank">
          <img
            src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/residency/residency.jpg"
            width="100%"
            style={{ maxWidth: "500px" }}
          />
        </a>
      </p>
    </React.Fragment>
  );
};

export default OpenCallOpen;
