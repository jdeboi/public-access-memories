// src/views/pages/ClosedPage/ClosedPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import PageTemplate from "../templates/PageTemplate";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";

const ClosedPage: React.FC = () => {
  const { isResidency, showOpens } = ShowConfig;

  const title = "Gallery Closed";
  const subtitle = isResidency
    ? "Please join us for residency open studios!"
    : "Please join us for the opening!";

  return (
    <PageTemplate title={title} className="bg-black">
      <h3 className="mt-20 text-lg font-semibold">Stay tuned ✨</h3>
      <div className="text-white/90">{subtitle}</div>
      {showOpens?.date && <div className="mt-1">{showOpens.date}</div>}
      {showOpens?.time && <div className="opacity-80">{showOpens.time}</div>}
    </PageTemplate>
  );
};

export default ClosedPage;
