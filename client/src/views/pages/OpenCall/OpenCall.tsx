import React from "react";
import "../Page.css";
import { Link } from "react-router-dom";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import OpenCallOpen from "./OpenCallOpen";
import PageTemplate from "../templates/PageTemplate";

export const OpenCall = () => {
  return (
    <>
      {ShowConfig.isOpenCallTime ? (
        <OpenCallOpen />
      ) : (
        <PageTemplate title="Open Call">
          <React.Fragment>
            <h3>...is CLOSED...</h3>
            <p>
              Please checkout the <Link to="/statement">statement</Link>.
            </p>
          </React.Fragment>
        </PageTemplate>
      )}
    </>
  );
};

export default OpenCall;
