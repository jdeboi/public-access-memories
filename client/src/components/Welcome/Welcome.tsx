import React, { useState } from "react";
import "./Welcome.css";

import WelcomeOpen from "./WelcomeOpen";
import WelcomeClosed from "./WelcomeClosed";

// store
import { useSelector } from "react-redux";
import { selectWindow } from "../../store/store";

interface IWelcome {
  isClosed: boolean;
  showWelcome: boolean;
  hasAvatar: boolean;
  hasLoadedCookies: boolean;
  closeWelcome: () => void;
}

const stepTitles = ["welcome", "welcome", "welcome"];

const Welcome = (props: IWelcome) => {
  // https://codepen.io/JohJakob/pen/YPxgwo
  const windowUI = useSelector(selectWindow);
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("Welcome");

  const onHide = () => {
    alert("Sorry, please click through to the end of this dialog box.");
  };

  const prevStep = () => {
    setTitle(stepTitles[step - 1]);
    setStep((step) => step - 1);
  };

  const nextStep = () => {
    setTitle(stepTitles[step + 1]);
    setStep((step) => step + 1);
  };

  const { showWelcome, closeWelcome, hasAvatar, hasLoadedCookies } = props;
  const propsW = {
    prevStep,
    nextStep,
    onHide,
    title,
    step,
    closeWelcome,
    showWelcome,
    hasAvatar,
    hasLoadedCookies,
  };

  return (
    <>
      {props.isClosed ? (
        <WelcomeClosed {...propsW} />
      ) : (
        <WelcomeOpen {...propsW} />
      )}
    </>
  );
};

export default Welcome;
