import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { IUser, IUsers, IWindowUI } from "../../../interfaces";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { setFollowingHost } from "../../../store/user";
import Timer from "../../Gallery/Gallery4HomeOffices/components/Timer";

import Dancer from "../../Gallery/components/p5/Dancer";

//////////////
// CONFIG
import { Dispatch } from "@reduxjs/toolkit";
import { GlobalConfig } from "../../../data/Shows/HomeOffices/GlobalConfig";

import { filterGalleryUsers } from "../../../helpers/helpers";

import {
  showMouseLoc,
  mouseDidMove,
} from "../../Gallery/Gallery1/functions/destination";

import {
  reachedDestination,
  getNextStep,
} from "../../Gallery/Gallery4HomeOffices/functions/destination";

import {
  checkUserClicked,
  drawUser,
  drawUsers,
} from "../../Gallery/Gallery4HomeOffices/functions/users";

import {
  endDivDrag,
  updateDivs,
  checkDivPress,
} from "../../Gallery/Gallery4HomeOffices/functions/divs";

import {
  barTenders,
  danceFloor,
} from "../../../data/Shows/HomeOffices/BotConfig";
import {
  LMD_BASE_URL,
  LMD_URL,
  loadEmojis,
  PAM_URL,
} from "../../Gallery/functions/loadImages";
import {
  checkUserClickedNormalRoom,
  drawUsersRoomCoords,
} from "../../Gallery/Gallery1/functions/users";

//////////////
// EMOJIS
const dancers: any = [];
const dancerImgs: p5Types.Image[] = [];
const barEmojis: p5Types.Image[] = [];
const lightImgs: p5Types.Image[] = [];
const trashFiles: p5Types.Image[] = [];
let columnGif: p5Types.Image;
let txtFile: p5Types.Image, instaImg: p5Types.Image;

let font: p5Types.Font;
let currentImgIndex = 1;
let timer1 = new Timer(200);
let timer2 = new Timer(200);
let blindsImg: p5Types.Image;

//////////////
// DRAGGABLE DIVS
var divs = {};
let bars: any = [];

// MOVEMENT
const movement = {
  isWalking: false,
  stepTo: { x: 0, y: 0 },
  userEase: { x: 0, y: 0 },
  destination: { x: 0, y: 0, time: new Date() },
  lastMouseMove: new Date(),
  lastStepTime: 0,
};

interface ComponentProps {
  users: IUsers;
  isClosed: boolean;
  userMove: (x: number, y: number) => void;
  // userNewRoomPage: (roomPage: number) => void;
  loadingDone: () => void;
  // setOutside: (state: { isOutside: boolean }) => void;
  windowUI: IWindowUI;
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

class GallerySketchEmrys extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  preload = (p5: p5Types) => {
    loadEmojis(p5, lightImgs, dancerImgs, barEmojis, trashFiles, false);
    barEmojis[0] = p5.loadImage(LMD_URL + "emojis/popcorn.png");
    barEmojis[1] = p5.loadImage(LMD_URL + "emojis/beer.png");
    barEmojis[2] = p5.loadImage(LMD_URL + "emojis/coffee.png");
    barEmojis[3] = p5.loadImage(LMD_URL + "emojis/cocktail.png");
    barEmojis[4] = p5.loadImage(LMD_URL + "emojis/chat.png");

    // folder icons
    txtFile = p5.loadImage(LMD_BASE_URL + "sketches/waveforms/txt.png");
    instaImg = p5.loadImage(LMD_URL + "instagram.png");
    columnGif = p5.loadImage(PAM_URL + "gallery/column.png");

    // font
    font = p5.loadFont(PAM_URL + "fonts/sysfont.woff");
  };

  ////////////////////////////////////////////////////////////////////////
  // INITIALIZE
  ////////////////////////////////////////////////////////////////////////

  setup = (p5: p5Types, canvasParentRef: Element) => {
    const { user, loadingDone, windowUI, userMove } = this.props;

    p5.textFont(font, 14);

    const cnv = p5.createCanvas(windowUI.contentW, windowUI.contentH);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.triggerMove(p5));

    //p5.frameRate(20);
    p5.pixelDensity(2);

    this.initEmojis(p5);
    this.initDivs(p5);

    loadingDone();
    // setOutside({ isOutside: false });
    this.setUserInitialPosition(p5);

    // addBots(barTenders);
  };

  initDivs = (p5: p5Types) => {
    // addLightDivs(divs, lightImgs, p5);
    // addColumnDivs(divs, columnGif, p5);
    // addBlindsDiv(blindsImg, divs, p5);
    // addTrashDivs(divs, trashFiles, p5);
    // addFolderDivs(divs, instaImg, txtFile, p5);
    // addGiftShopDivs(divs, giftShopImgs, p5);
    // addBarDivs(bars, lightImgs[3], p5);
  };

  initEmojis = (p5: p5Types) => {
    dancers[0] = new Dancer(p5, dancerImgs[0], 0, 160, false, danceFloor);
    dancers[1] = new Dancer(p5, dancerImgs[1], 100, 380, false, danceFloor);
    dancers[2] = new Dancer(p5, dancerImgs[2], 200, 150, true, danceFloor);
  };

  setUserInitialPosition = (p5: p5Types) => {
    let dx = Math.floor(p5.random(-20, 20));
    let dy = Math.floor(p5.random(-20, 20));
    let x = Math.floor(p5.width / 2 + dx);
    let y = Math.floor(p5.height / 2 + dy);
    this.setUserPositionImmediate(x, y);
  };

  draw = (p5: p5Types) => {
    const { user, users } = this.props;

    p5.clear(0, 0, 0, 0);
    //this.displayFrameRate(p5);

    //////////////
    // step visualization
    this.mouseStep(p5);
    this.showTarget(p5);

    //////////////
    // drawing
    p5.push();
    p5.translate(movement.userEase.x, movement.userEase.y);
    drawUser(user, p5, barEmojis);
    p5.pop();

    this.drawOverTarget(p5);
    this.drawOverUser(p5);

    p5.noStroke();
    p5.fill(255);
    p5.textFont(font, 30);
    p5.text("UNDER CONSTRUCTION", 50, 80);

    //////////////
    // updating
    // if (users) updateDivs(this.getRoomLayoutNum(), divs);

    this.updateUserEase(p5);
    if (
      p5.width !== this.props.windowUI.contentW ||
      p5.height !== this.props.windowUI.contentH
    )
      this.manualResize(p5);
  };

  displayLayoutContent = (p5: p5Types) => {};

  displayFrameRate = (p5: p5Types) => {
    p5.fill(0);
    p5.noStroke();
    p5.text(p5.round(p5.frameRate()), 20, 20);
  };

  drawOverTarget = (p5: p5Types) => {
    const { user, users } = this.props;
    p5.push();

    if (users) {
      p5.textFont(font, 34);
      drawUsersRoomCoords(
        user,
        filterGalleryUsers(user, users),
        "/emrys",
        font,
        p5,
        barEmojis
      );
    }

    p5.pop();
  };

  drawOverUser = (p5: p5Types) => {
    const { user } = this.props;
    p5.push();

    const userEase = { x: 0, y: 0 };

    p5.textFont(font, 12);
    // displayFolderDivs(room, divs);

    p5.pop();
  };

  manualResize = (p5: p5Types) => {
    this.windowResized(p5);
  };
  ////////////////////////////////////////////////////////////////////////
  // MOVEMENT
  ////////////////////////////////////////////////////////////////////////
  showTarget = (p5: p5Types) => {
    const { windowUI } = this.props;
    const { userEase, destination, isWalking } = movement;

    if (mouseDidMove(p5)) {
      movement.lastMouseMove = new Date();
    }
    showMouseLoc(windowUI.isMobile, movement.lastMouseMove, p5);
  };

  userTakeStep = (p5: p5Types, x: number, y: number) => {
    const { stepTo } = movement;
    movement.lastStepTime = p5.millis();

    let space = GlobalConfig.scaler; //40;
    const userStep = { x: stepTo.x + x * space, y: stepTo.y + y * space };

    if (userStep.x > p5.width) {
      this.stopWalking();
    } else if (userStep.y > p5.height) {
      this.stopWalking();
    } else if (userStep.x < 0) {
      this.stopWalking();
    } else if (userStep.y < 0) {
      this.stopWalking();
    } else {
      stepTo.x = userStep.x;
      stepTo.y = userStep.y;
    }
  };

  stopWalking = () => {
    movement.isWalking = false;
  };

  setUserPosition = (x: number, y: number) => {
    this.stopWalking();
    movement.stepTo.x = x;
    movement.stepTo.y = y;
    movement.destination.x = x;
    movement.destination.y = y;
    this.props.userMove(x, y);
  };

  setUserPositionImmediate = (x: number, y: number) => {
    this.stopWalking();
    movement.userEase.x = x;
    movement.userEase.y = y;
    movement.stepTo.x = x;
    movement.stepTo.y = y;
    movement.destination.x = x;
    movement.destination.y = y;
    this.props.userMove(x, y);
  };

  updateUserEase = (p5: p5Types) => {
    const { userMove } = this.props;
    const { userEase, stepTo } = movement;
    if (!reachedDestination(userEase, stepTo)) {
      let amt = 0.7;
      userEase.x = userEase.x * amt + stepTo.x * (1 - amt);
      userEase.y = userEase.y * amt + stepTo.y * (1 - amt);
      let d = p5.dist(userEase.x, userEase.y, stepTo.x, stepTo.y);
      if (d < 15) {
        movement.userEase.x = stepTo.x;
        movement.userEase.y = stepTo.y;
        userMove(userEase.x, userEase.y);
      }
    }
  };

  triggerMove = (p5: p5Types) => {
    const { user, users, setUserActive } = this.props;
    let userClicked = null;

    if (users)
      userClicked = checkUserClickedNormalRoom(user, users, p5, "/emrys");
    if (userClicked) {
      setUserActive(userClicked);
      return;
    } else if (checkDivPress(0, divs)) {
      return;
    } else {
      let steps = GlobalConfig.scaler - 20;
      const dx = p5.mouseX > user.roomX ? steps : -steps;
      const dy = p5.mouseY > user.roomY ? steps : -steps;
      const mx = p5.mouseX;
      const my = p5.mouseY;

      if (!(mx === 0 && my === 0)) {
        const x = mx;
        const y = my;
        movement.destination.x = x;
        movement.destination.y = y;
        movement.destination.time = new Date();
        movement.isWalking = true;
      }
    }
  };

  mouseStep = (p5: p5Types) => {
    const t = new Date().getTime() - movement.destination.time.getTime();
    const { user } = this.props;
    if (movement.isWalking) {
      if (reachedDestination(movement.stepTo, movement.destination)) {
        this.setUserPositionImmediate(
          movement.destination.x,
          movement.destination.y
        );
        movement.isWalking = false;
      } else if (t > 150) {
        let step = getNextStep(movement.stepTo, movement.destination, true);
        this.userTakeStep(p5, step[0], step[1]);
        movement.destination.time = new Date();
      }
    }
  };

  keyPressed = (p5: p5Types) => {
    if (p5.frameCount > 0) {
      if (p5.keyCode === p5.UP_ARROW) {
        this.userTakeStep(p5, 0, -1);
      } else if (p5.keyCode === p5.RIGHT_ARROW) {
        this.userTakeStep(p5, 1, 0);
      } else if (p5.keyCode === p5.LEFT_ARROW) {
        this.userTakeStep(p5, -1, 0);
      } else if (p5.keyCode === p5.DOWN_ARROW) {
        this.userTakeStep(p5, 0, 1);
      }
    }
    return;
  };

  mouseReleased = (p5: p5Types) => {
    if (p5.frameCount > 0) {
      endDivDrag(divs);
    }
  };

  mouseMoved = (p5: p5Types) => {};

  windowResized = (p5: p5Types) => {
    const { windowUI } = this.props;
    p5.resizeCanvas(windowUI.contentW, windowUI.contentH);
    this.setUserBoundaries(p5);
  };

  setUserBoundaries = (p5: p5Types) => {
    const { user } = this.props;
    let x = user.roomX;
    let y = user.roomY;
    if (x > p5.width - 50) {
      x = p5.width - 50;
    }
    if (y > p5.height - 50) {
      y = p5.height - 50;
    }
    this.setUserPositionImmediate(x, y);
  };

  doubleClicked = (p5: p5Types) => {
    if (p5.frameCount > 0) {
      // checkFolderDivsDouble(this.getRoomLayoutNum(), divs);
      // checkTrashDivsDouble(this.getRoomLayoutNum(), divs);
    }
    return;
  };

  render() {
    // TODO - key & mouse listeners called twice (like 2 instances... one always at frame count 0)
    return (
      <>
        <Sketch
          preload={this.preload}
          setup={this.setup}
          draw={this.draw}
          windowResized={this.windowResized}
          mouseMoved={this.mouseMoved}
          keyPressed={this.keyPressed}
          mouseReleased={this.mouseReleased}
          doubleClicked={this.doubleClicked}
        />
      </>
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

export default connect<StateProps, DispatchProps, ComponentProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(GallerySketchEmrys);
