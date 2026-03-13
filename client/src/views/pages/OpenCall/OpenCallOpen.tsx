import React from "react";
import "../Page.css";
import SectionHeader from "../templates/SectionHeader";
import PageTemplate from "../templates/PageTemplate";

export const OpenCallOpen = () => {
  const highlightColor = "text-[cyan]";

  return (
    <PageTemplate title="Open Call — Group Exhibition">
      <div className="windows p-8 mb-6">
        <div className="text-2xl mb-4">
          Public Access Memories is inviting proposals for a{" "}
          <strong className={highlightColor}>new group exhibition</strong>{" "}
          exploring web-native art.
        </div>

        <h4 className={`mb-6 ${highlightColor} font-mono`}>
          DEADLINE: Sunday, May 17, 2026
        </h4>

        <div className="mb-6 text-md font-mono">
          Submissions are welcome from curators, solo artists, and collectives.
          Artists may propose a group exhibition and include their own work if
          it aligns with the curatorial concept.
        </div>

        <div className="text-lg">
          <a
            href="https://forms.gle/G9bpqQTiXJFtGQsJ9"
            target="_blank"
            rel="noopener noreferrer"
            className="standardButton primary"
          >
            APPLY NOW
          </a>
        </div>
      </div>
      <div className="windows p-1">
        <div className="w-full aspect-square">
          <iframe
            className="w-full h-full"
            src="/iframes/opencall/curator.html"
          ></iframe>
        </div>
      </div>
    </PageTemplate>
  );
};

export default OpenCallOpen;
