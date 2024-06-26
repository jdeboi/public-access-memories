import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { IUser, IUsers, IWindowUI } from "../../../interfaces";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { setFollowingHost } from "../../../store/user";
import RectFrame from "./components/RectFrame";
import Timer from "./components/Timer";

import Dancer from "../components/p5/Dancer";

//////////////
// CONFIG
import { Dispatch } from "@reduxjs/toolkit";
import { GlobalConfig } from "../../../data/Shows/HomeOffices/GlobalConfig";

import { filterGalleryUsers } from "../../../helpers/helpers";

import {
  roomBoundary,
  roomDoorCrossing,
  wallBoundary,
} from "../Gallery1/functions/crossing";
import { roundToMult2 } from "../Gallery1/functions/round";

import {
  reachedDestination,
  getNextStep,
  showMouseLoc,
  showUserEllipses,
  showDestination,
  mouseDidMove,
} from "../Gallery1/functions/destination";

import { checkUserClicked, drawUser, drawUsers } from "./functions/users";

import {
  displayTrashDivs,
  checkTrashDivsDouble,
  addTrashDivs,
  addLightDivs,
  displayLightDivs,
  displayColumnDivs,
  endDivDrag,
  updateDivs,
  checkDivPress,
  displayFolderDivs,
  checkFolderDivsDouble,
  addFolderDivs,
  addBarDivs,
  displayBarDivs,
  addColumnDivs,
} from "../Gallery3/functions/divs";

import {
  barTenders,
  danceFloor,
} from "../../../data/Shows/HomeOffices/BotConfig";

//////////////
// EMOJIS
var dancers: any = [];
var dancerImgs: p5Types.Image[] = [];
var barEmojis: p5Types.Image[] = [];
var lightImgs: p5Types.Image[] = [];
var trashFiles: p5Types.Image[] = [];
var columnGif: p5Types.Image;
var txtFile: p5Types.Image, instaImg: p5Types.Image;

//////////////
// EMOJIS
var dancers: any = [];
var dancerImgs: p5Types.Image[] = [];
var barEmojis: p5Types.Image[] = [];

var font: p5Types.Font;
let previousPage = 0;
let canvas0Flipped = false;
let canvas1Flipped = false;
let flippingTime = 0;

let officeImgs: p5Types.Image[] = [];
let currentImgIndex = 1;
let pgraphics: p5Types.Graphics;
let frameGraphics: p5Types.Graphics;
let frames: RectFrame[] = [];
let timer1 = new Timer(200);
let timer2 = new Timer(200);
let frameDim = { w: 100, h: 100 };
let hasResized = false;
let currentRoom = 1;

let isLoadingImages = false;
let pageTurnTime = 0;

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

let justChangedPage = false;

interface ComponentProps {
  users: IUsers;
  isClosed: boolean;
  userMove: (x: number, y: number) => void;
  userNewRoom: (room: string) => void;
  loadingDone: () => void;
  toggleOutside: () => void;
  windowUI: IWindowUI;
  changePage: (page: number) => void;
  setUserActive: (user: IUser) => void;
  clickedUserChat: (user: IUser) => void;
  currentPage: number;
  numPages: number;
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
    previousPage = props.currentPage;
  }

  preload = (p5: p5Types) => {
    const url =
      "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";

    //////////////
    // plants
    const pamURL =
      "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories";
    //////////////

    // font
    font = p5.loadFont(pamURL + "/fonts/sysfont.woff");

    //////////////
    // lights
    lightImgs[0] = p5.loadImage(url + "tracklights/tracklights_vert.jpg");
    lightImgs[1] = p5.loadImage(url + "tracklights/light_shadow.png");
    lightImgs[2] = p5.loadImage(url + "tracklights/tracklights_dark_vert.jpg");
    lightImgs[3] = p5.loadImage(url + "tracklights/black_shadow.png");

    // emojis
    dancerImgs[0] = p5.loadImage(url + "dancers/dancer0.png");
    dancerImgs[1] = p5.loadImage(url + "dancers/dancer1.png");
    dancerImgs[2] = p5.loadImage(url + "dancers/dancer2.png");
    barEmojis[0] = p5.loadImage(url + "emojis/bread.png");
    barEmojis[1] = p5.loadImage(url + "emojis/cheese.png");
    barEmojis[2] = p5.loadImage(url + "emojis/wine.png");
    barEmojis[3] = p5.loadImage(url + "emojis/cocktail.png");
    barEmojis[4] = p5.loadImage(url + "emojis/chat.png");
    barEmojis[5] = p5.loadImage(url + "emojis/mic.png");

    // folder icons
    txtFile = p5.loadImage(
      "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/txt.png"
    );
    instaImg = p5.loadImage(url + "instagram.png");
    trashFiles[0] = p5.loadImage(url + "trash/fullrec.png");
    trashFiles[3] = p5.loadImage(url + "trash/trash0.png");
    trashFiles[2] = p5.loadImage(url + "trash/trash1.png");
    trashFiles[1] = p5.loadImage(url + "trash/trash2.png");

    this.loadOfficeImages(p5);
  };

  ////////////////////////////////////////////////////////////////////////
  // INITIALIZE
  ////////////////////////////////////////////////////////////////////////

  setup = (p5: p5Types, canvasParentRef: Element) => {
    const { user, loadingDone, windowUI } = this.props;

    p5.textFont(font, 14);

    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.triggerMove(p5));

    //p5.frameRate(20);
    p5.pixelDensity(2);

    pgraphics = p5.createGraphics(p5.windowWidth, p5.windowHeight);

    // // resize images
    // for (let i = 0; i < officeImgs.length; i++) {
    //   // var h = p5.windowHeight;
    //   // var w = (h * officeImgs[i].width) / officeImgs[i].height;
    //   var w = windowUI.contentW;
    //   var h = (w * officeImgs[i].height) / officeImgs[i].width;
    //   officeImgs[i].resize(w, h);
    // }
    // hasResized = true;

    frameGraphics = p5.createGraphics(p5.windowWidth, p5.windowHeight);
    frameGraphics.clear(0, 0, 0, 0);

    this.initEmojis(p5);
    this.initDivs(p5);

    loadingDone();
  };

  initDivs = (p5: p5Types) => {
    addLightDivs(divs, lightImgs, p5);
    addColumnDivs(divs, columnGif, p5, 0.83);
    addTrashDivs(divs, trashFiles, p5);
    addFolderDivs(divs, instaImg, txtFile, p5);
    addBarDivs(bars, lightImgs[3], p5);
  };

  initEmojis = (p5: p5Types) => {
    dancers[0] = new Dancer(p5, dancerImgs[0], 0, 160, false, danceFloor);
    dancers[1] = new Dancer(p5, dancerImgs[1], 100, 380, false, danceFloor);
    dancers[2] = new Dancer(p5, dancerImgs[2], 200, 150, true, danceFloor);
  };

  draw = (p5: p5Types) => {
    const { user, users } = this.props;

    if (isLoadingImages) {
      p5.clear(0, 0, 0, 0);
      p5.push();
      p5.translate(movement.userEase.x, movement.userEase.y);
      drawUser(user, p5, barEmojis);
      p5.pop();
      return;
    }

    if (this.pageIsTurning(p5)) {
      p5.clear(0, 0, 0, 0);
      p5.push();
      p5.translate(movement.userEase.x, movement.userEase.y);
      drawUser(user, p5, barEmojis);
      p5.pop();
      return;
    }

    p5.clear(0, 0, 0, 0);
    this.displayFrameRate(p5);

    p5.push();
    p5.translate(0, this.getBackgroundShift());

    if (this.props.currentPage != 0) {
      this.displayRandomRects(p5);
    }

    switch (this.props.currentPage) {
      case 0:
        this.display0(p5);
        break;
      case 1:
        this.display1(p5);
        break;
      case 2:
        this.display2(p5);
        break;
      default:
        break;
    }
    p5.pop();

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

    //////////////
    // updating
    if (users) updateDivs(movement.userEase, users, divs);

    this.updateUserEase(p5);
    this.checkPageChange(p5);
    if (
      p5.windowWidth !== window.innerWidth ||
      p5.windowHeight !== window.innerHeight
    )
      this.manualResize(p5);
  };

  display0 = (p5: p5Types) => {};
  display1 = (p5: p5Types) => {};
  display2 = (p5: p5Types) => {};

  displayRandomRects(p5: p5Types) {
    timer1.dt = 100;
    timer2.dt = 2000;

    if (p5.millis() - movement.lastStepTime < 200) {
      if (p5.frameCount % 15 == 0) {
        this.frameRandomSize(p5);
      }

      if (timer1.isTimeUp(p5)) {
        this.newRandomFrame(p5);
      }

      if (timer2.isTimeUp(p5)) {
        this.nextImage();
      }
    }

    p5.image(frameGraphics, 0, 0);

    if (frames && frames.length > 0)
      frames[frames.length - 1].displayFrame(p5, 100);
  }

  getBackgroundShift() {
    if (
      officeImgs == null ||
      officeImgs.length == 0 ||
      officeImgs[0].height == 0
    )
      return 0;
    return (this.props.windowUI.contentH - officeImgs[0].height) * 0.5;
  }

  newRandomFrame(p5: p5Types) {
    if (officeImgs == null || officeImgs.length == 0) return;
    let dy = this.getBackgroundShift();
    let _x = this.props.user.x; //+ p5.windowWidth / 2;
    let _y = this.props.user.y; // + p5.windowHeight / 2 - dy;

    let x = p5.constrain(_x - frameDim.w / 2, 0, p5.windowWidth - frameDim.w);
    let y = p5.constrain(_y - frameDim.h / 2, 0, p5.windowHeight - frameDim.h);
    let frame = new RectFrame(x, y, frameDim.w, frameDim.h, currentImgIndex);

    frames.push(frame);

    frameGraphics.erase(50);
    frameGraphics.rect(0, 0, p5.windowWidth, p5.windowHeight);
    frameGraphics.noErase();

    frame.displayImg(frameGraphics, officeImgs, this.getBackgroundSize());
  }

  nextImage() {
    currentImgIndex++;
    if (currentImgIndex >= officeImgs.length) {
      currentImgIndex = 1;
    }
  }

  frameRandomSize(p5: p5Types) {
    frameDim.w = p5.random(100, 500);
    frameDim.h = p5.random(50, 500);
  }

  checkPageChange = (p5: p5Types) => {
    const { currentPage } = this.props;
    if (currentPage > previousPage) {
      this.goForwardPage(p5);
    } else if (currentPage < previousPage) {
      this.goBackwardPage(p5);
    }
    previousPage = currentPage;
  };

  goForwardPage = (p5: p5Types) => {
    pageTurnTime = p5.millis();
    this.loadOfficeImages(p5);
  };

  goBackwardPage = (p5: p5Types) => {
    pageTurnTime = p5.millis();
    this.loadOfficeImages(p5);
  };

  isPageForwardCorner = (nextStep: { x: number; y: number }, p5: p5Types) => {
    const { x, y } = nextStep;
    const cornerDim = GlobalConfig.scaler;
    return x > p5.width - cornerDim && y > p5.height - cornerDim;
  };

  isPageBackwardCorner = (nextStep: { x: number; y: number }, p5: p5Types) => {
    const { x, y } = nextStep;
    const cornerDim = GlobalConfig.scaler;
    return x < cornerDim && y > p5.height - cornerDim;
  };

  pageIsTurning = (p5: p5Types) => {
    return p5.millis() - pageTurnTime < 500;
  };

  loadOfficeImages2 = (p5: p5Types) => {
    const { currentPage, windowUI } = this.props;
    const currentRoom = currentPage / 2;
    for (let i = 1; i < 5; i++) {
      officeImgs[i - 1] = p5.loadImage(
        `https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/pages/Office_${currentRoom}/${i}.jpg`
      );
    }
  };

  loadOfficeImages = (p5: p5Types) => {
    const { currentPage, windowUI, numPages } = this.props;
    const currentRoom = (currentPage / 2) % numPages;
    const imagePromises = [];

    if (currentRoom == 0) return;

    isLoadingImages = true;

    for (let i = 1; i < 5; i++) {
      const imgPromise = new Promise((resolve, reject) => {
        p5.loadImage(
          `https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/pages/Office_${currentRoom}/${i}.jpg`,
          (img) => {
            // Resize the image
            // const w = windowUI.contentW;
            // const h = (w * img.height) / img.width;
            // img.resize(w, h);

            officeImgs[i - 1] = img;
            resolve(img);
          },
          (err) => {
            reject(err);
          }
        );
      });

      imagePromises.push(imgPromise);
    }

    return Promise.all(imagePromises)
      .then((images) => {
        isLoadingImages = false;
        return images;
      })
      .catch((error) => {
        isLoadingImages = false;
        throw error;
      });
  };

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
      drawUsers(
        user,
        filterGalleryUsers(user, users),
        font,
        p5,
        barEmojis,
        GlobalConfig
      );
    }

    p5.pop();
  };

  drawOverUser = (p5: p5Types) => {
    p5.push();
    // p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    const userEase = { x: 0, y: 0 };
    displayBarDivs(userEase.x, userEase.y, bars);
    displayLightDivs(userEase.x, userEase.y, divs);
    displayColumnDivs(userEase.x, userEase.y, divs);
    displayTrashDivs(userEase.x, userEase.y, divs);

    p5.textFont(font, 12);
    displayFolderDivs(divs);

    p5.pop();
  };

  manualResize = (p5: p5Types) => {
    console.log("resizing...");
    p5.windowWidth = window.innerWidth;
    p5.windowHeight = window.innerHeight;
    this.windowResized(p5);
  };
  ////////////////////////////////////////////////////////////////////////
  // MOVEMENT
  ////////////////////////////////////////////////////////////////////////
  showTarget = (p5: p5Types) => {
    const { windowUI } = this.props;
    const { userEase, destination, isWalking } = movement;
    //showDestination(userEase, destination, isWalking, p5);
    //showUserEllipses(userEase, destination, isWalking, p5);

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

    if (userStep.x > p5.windowWidth) {
      this.stopWalking();
    } else if (userStep.y > p5.windowHeight) {
      this.stopWalking();
    } else if (userStep.x < 0) {
      this.stopWalking();
    } else if (userStep.y < 0) {
      this.stopWalking();
    } else {
      stepTo.x = userStep.x;
      stepTo.y = userStep.y;
    }
    this.checkPageCorners(stepTo, p5);
  };

  stopWalking = () => {
    movement.isWalking = false;
  };

  checkPageCorners = (userStep: { x: number; y: number }, p5: p5Types) => {
    let changedPage = false;
    if (this.isPageForwardCorner(userStep, p5)) {
      changedPage = true;

      if (!justChangedPage) {
        this.props.changePage(1);
        justChangedPage = true;
      }
    } else if (this.isPageBackwardCorner(userStep, p5)) {
      changedPage = true;

      if (!justChangedPage) {
        this.props.changePage(-1);
        justChangedPage = true;
      }
    }

    if (!changedPage) {
      justChangedPage = false;
    }
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
        // isStepping = false;
        userMove(userEase.x, userEase.y);
      }
    }
  };

  triggerMove = (p5: p5Types) => {
    const { user, users, setUserActive } = this.props;
    let userClicked = null;

    if (users) userClicked = checkUserClicked(user, users, p5);
    if (userClicked) {
      setUserActive(userClicked);
      return;
    } else if (checkDivPress(movement.userEase.x, movement.userEase.y, divs)) {
      return;
    } else {
      let steps = GlobalConfig.scaler - 20;
      const dx = p5.mouseX > user.x ? steps : -steps;
      const dy = p5.mouseY > user.y ? steps : -steps;
      const mx = roundToMult2(p5.mouseX + dx, GlobalConfig.scaler);
      const my = roundToMult2(p5.mouseY + dy, GlobalConfig.scaler);

      if (!(mx === 0 && my === 0)) {
        const x = mx; // + user.x;
        const y = my; // + user.y;
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
        movement.isWalking = false;
      } else if (t > 150) {
        let step = getNextStep(movement.stepTo, movement.destination);
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
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

    const bg = this.getBackgroundSize();
  };

  getBackgroundSize = () => {
    const { windowUI } = this.props;
    let aspect = 1920 / 1080;
    let w = windowUI.width;
    let screenAspect = w / windowUI.contentH;

    if (screenAspect < aspect) {
      // width is max
      let h = w / aspect;
      let dy = (windowUI.contentH - h) / 2;
      return { w, h, x: 0, y: dy };
    } else {
      let newHeight = windowUI.contentH;

      let newWidth = (1920 * newHeight) / 1080;
      let dx = (w - newWidth) / 2;
      return { w: newWidth, h: newHeight, x: dx, y: 0 };
    }
  };

  doubleClicked = (p5: p5Types) => {};

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
)(GallerySketch);
