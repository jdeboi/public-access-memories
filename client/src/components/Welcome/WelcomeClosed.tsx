import React, { useEffect } from "react";

import { SignInSubmitType } from "../SignIn/SignIn";
import { welcomeButtons, prevNextButtons } from "./components/buttons";

// components
import CenterModal from "../CenterModal/CenterModal";
import DetailsStart from "./components/DetailsStart";
import DetailsClosed from "./components/DetailsClosed";
import SignIn from "../SignIn/SignIn";
import DetailsTour from "./components/DetailsTour";
import WelcomeVideo from "./components/WelcomeVideo/WelcomeVideo";

interface IWelcome {
  showWelcome: boolean;
  title: string;
  prevStep: () => void;
  nextStep: () => void;
  onHide: () => void;
  step: number;
  hasAvatar: boolean;
  hasLoadedCookies: boolean;
  closeWelcome: () => void;
}

const WelcomeClosed = (props: IWelcome) => {
  const signInRef = React.useRef<SignInSubmitType>(null);

  useEffect(() => {
    if (signInRef.current) {
      signInRef.current.clicked();
    }
  }, []);

  const nextStep = () => {
    props.nextStep();
    props.closeWelcome();
  };

  const getContent = (): JSX.Element => {
    if (props.step === 0) return <DetailsStart />;
    else if (props.step === 1) return <DetailsClosed />;
    // return <DetailsTour />
    // else if (props.step == 2)
    return (
      <SignIn
        hasAvatar={props.hasAvatar}
        hasLoadedCookies={props.hasLoadedCookies}
        // nextStep={props.nextStep}
        nextStep={props.closeWelcome}
        isFrame={false}
        ref={signInRef}
      />
    );
    // else return <WelcomeVideo nextStep={props.closeWelcome} />;
  };

  const getButtons = (): JSX.Element => {
    if (props.step === 0) return welcomeButtons(props.nextStep);
    else if (props.step === 1)
      return prevNextButtons(props.prevStep, props.nextStep);
    else if (props.step == 2)
      return (
        <div className="center-buttons">
          <button className="standardButton secondary" onClick={props.prevStep}>
            back
          </button>
          {signInRef.current ? (
            <button
              className="standardButton primary"
              onClick={() => {
                if (signInRef.current) signInRef.current.clicked();
              }}
            >
              submit
            </button>
          ) : null}
        </div>
      );
    else
      return (
        <div className="center-buttons flexItem">
          <button className="standardButton secondary" onClick={props.prevStep}>
            back
          </button>
          <button
            className="standardButton primary"
            onClick={props.closeWelcome}
          >
            submit
          </button>
        </div>
      );
  };

  return (
    <CenterModal
      title={props.title}
      isHidden={!props.showWelcome}
      onHide={props.onHide}
      z={2500}
      isRelative={false}
      classN="Welcome"
      content={getContent()}
      buttons={getButtons()}
    />
  );
};

export default WelcomeClosed;
