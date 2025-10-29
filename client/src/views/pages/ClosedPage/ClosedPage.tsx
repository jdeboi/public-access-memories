// src/views/pages/ClosedPage/ClosedPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import PageTemplate from "../templates/PageTemplate";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";

const ClosedPage: React.FC = () => {
  const { isResidency, showOpens, calendarLink } = ShowConfig;

  const title = "Gallery Closed";
  const subtitle = isResidency
    ? "Please join us for residency open studios!"
    : "Please join us for the opening!";

  return (
    <PageTemplate title={title} className="bg-black mb-20 ">
      <div className="windows p-6">
        <div className="text-3xl font-semibold mb-8">{subtitle}</div>
        {/* <div className="text-white/90 mb-8">{subtitle}</div> */}
        <div className="font-mono">
          {showOpens?.date && <div className="mt-1">{showOpens.date}</div>}
          {showOpens?.time && (
            <div className="opacity-80">{showOpens.time}</div>
          )}
          {calendarLink && (
            <div className="mt-10 mb-2">
              <a href={calendarLink} target="_blank" rel="noopener noreferrer">
                <button className="standardButton primary">
                  🗓️ Add to your calendar!
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default ClosedPage;
