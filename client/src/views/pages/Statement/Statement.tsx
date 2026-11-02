import React from "react";
import "../Page.css";
// import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
// import { Link } from "react-router-dom";
// import {
//   getLayoutSlug,
//   GIFT_PAGE,
// } from "../../../data/Shows/HomeOffices/PageConstants";
import DeboxStatement from "./DeboxStatement";
import Residency2026Statement from "./Residency2026Statement";
import OpenCall from "../OpenCall/OpenCall";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";

export const Statement = () => {
  if (ShowConfig.isOpenCallTime) {
    return <OpenCall />;
  }

  return ShowConfig.isResidency ? <Residency2026Statement /> : <DeboxStatement />;
};

export default Statement;
