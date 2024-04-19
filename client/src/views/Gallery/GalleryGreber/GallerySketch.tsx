import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { IUser, IUsers } from "../../../interfaces";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { setFollowingHost } from "../../../store/user";

//////////////
// CONFIG
import { Dispatch } from "@reduxjs/toolkit";

var font: p5Types.Font;

interface ComponentProps {
  users: IUsers;
  isClosed: boolean;
  userMove: (x: number, y: number) => void;
  userNewRoom: (room: string) => void;
  loadingDone: () => void;
  toggleOutside: () => void;
  isMobile: boolean;
  setUserActive: (user: IUser) => void;
  clickedUserChat: (user: IUser) => void;
}

// redux props
interface StateProps {
  user: IUser;
}
// dispatch props = functions to execute
interface DispatchProps {
  setFollowingHost: (isFollowing: boolean) => void;
}

interface Props extends ComponentProps, StateProps, DispatchProps {}

class GallerySketch extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  preload = (p5: p5Types) => {
    const url =
      "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";

    //////////////
    // plants
    const pamURL =
      "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/";
    //////////////

    // font
    font = p5.loadFont(
      "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fonts/sysfont.woff"
    );
  };

  ////////////////////////////////////////////////////////////////////////
  // INITIALIZE
  ////////////////////////////////////////////////////////////////////////
  setup = (p5: p5Types, canvasParentRef: Element) => {
    const { user, loadingDone, setUserActive } = this.props;

    p5.textFont(font, 14);

    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.triggerMove(p5));

    p5.frameRate(20);
    p5.pixelDensity(2);
  };

  triggerMove = (p5: p5Types) => {};

  draw = (p5: p5Types) => {
    const { loadingDone } = this.props;
    if (p5.millis() > 3000) {
      loadingDone();
    }
  };

  keyPressed = (p5: p5Types) => {};

  windowResized = (p5: p5Types) => {};

  mouseReleased = (p5: p5Types) => {};

  doubleClicked = (p5: p5Types) => {};

  render() {
    // TODO - key & mouse listeners called twice (like 2 instances... one always at frame count 0)
    return (
      <Sketch
        preload={this.preload}
        setup={this.setup}
        draw={this.draw}
        windowResized={this.windowResized}
        keyPressed={this.keyPressed}
        mouseReleased={this.mouseReleased}
        doubleClicked={this.doubleClicked}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setFollowingHost: (isFollowing: boolean) =>
      dispatch(setFollowingHost(isFollowing)),
  };
};

function circleLines(p5: p5Types) {
  // p5.background("black");
  p5.randomSeed(0);
  p5.colorMode(p5.RGB, 255);
  let circs = [];
  for (let i = 0; i < 30; i++) {
    let x = p5.random(p5.width);
    let y = p5.random(p5.height);
    let diam = p5.random(50, 400);
    let r = p5.random(10, 100);
    r = p5.constrain(r, 10, diam);
    let sW = p5.random(1, 5);
    let sp = p5.random(4, 10);
    let spinR = p5.random(6000, 12000);
    let str = p5.random(30, 85);
    if (i % 2 == 0) spinR *= -1;
    circs.push({ x, y, diam, r, sW, sp, str, spinR });
  }
  for (const c of circs) {
    p5.push();
    p5.translate(c.x, c.y);
    p5.rotate(p5.millis() / c.spinR);
    for (let i = 0; i < 360; i += (c.sp / c.diam) * 100) {
      p5.rotate(p5.radians(c.sp));
      p5.stroke(255, c.str);
      p5.strokeWeight(c.sW);
      p5.line(0, c.diam - c.r, 0, c.diam);
    }
    p5.pop();
  }
}
export default connect<StateProps, DispatchProps, ComponentProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(GallerySketch);
