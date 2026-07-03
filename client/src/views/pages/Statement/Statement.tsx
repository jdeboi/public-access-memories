import React from "react";
import "../Page.css";
// import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
// import { Link } from "react-router-dom";
// import {
//   getLayoutSlug,
//   GIFT_PAGE,
// } from "../../../data/Shows/HomeOffices/PageConstants";
import DeboxStatement from "./DeboxStatement";
import OpenCall from "../OpenCall/OpenCall";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";

export const Statement = () => {
  if (ShowConfig.isOpenCallTime) {
    return <OpenCall />;
  }

  return <DeboxStatement />;
};

export default Statement;
