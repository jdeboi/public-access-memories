import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { IUser, IUsers, IWindowUI } from "../../../interfaces";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { setFollowingHost } from "../../../store/user";
import RectFrame from "./components/RectFrame";
import Timer from "./components/Timer";
import { addBots } from "../../../App/useSockets";

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
  closeToDestination,
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
  addGiftShopDivs,
  addBarDivs,
  displayBarDivs,
  addColumnDivs,
} from "../Gallery4HomeOffices/functions/divs";

import {
  barTenders,
  danceFloor,
} from "../../../data/Shows/HomeOffices/BotConfig";
import {
  displayPageFlips,
  isPageBackwardCorner,
  isPageForwardCorner,
  pageIsTurning,
} from "./functions/page";

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
let previousPage = 0;
let pageFlipImg: p5Types.Image;

let officeImgs: p5Types.Image[] = [];
let giftShopImgs: p5Types.Image[] = [];
let currentImgIndex = 1;
let frameGraphics: p5Types.Graphics;
let frames: RectFrame[] = [];
let timer1 = new Timer(200);
let timer2 = new Timer(200);
let frameDim = { w: 100, h: 100 };

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
  userNewRoomPage: (roomPage: number) => void;
  loadingDone: () => void;
  setOutside: (state: { isOutside: boolean }) => void;
  windowUI: IWindowUI;
  changePage: (page: number) => void;
  setUserActive: (user: IUser) => void;
  clickedUserChat: (user: IUser) => void;
  currentPage: number;
  numLayouts: number;
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

    columnGif = p5.loadImage(pamURL + "/gallery/column.png"); //not sure why this one has a cors issue

    pageFlipImg = p5.loadImage(pamURL + "/homeoffices/pagecorner.webp");

    for (let i = 0; i < 4; i++) {
      giftShopImgs[i] = p5.loadImage(
        `https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/pages/Office_15/${
          i + 1
        }.jpg`
      );
    }

    this.loadOfficeImages(p5);
  };

  ////////////////////////////////////////////////////////////////////////
  // INITIALIZE
  ////////////////////////////////////////////////////////////////////////

  setup = (p5: p5Types, canvasParentRef: Element) => {
    const { user, loadingDone, setOutside, windowUI, userMove } = this.props;

    p5.textFont(font, 14);

    const cnv = p5.createCanvas(windowUI.contentW, windowUI.contentH);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.triggerMove(p5));

    //p5.frameRate(20);
    p5.pixelDensity(2);

    frameGraphics = p5.createGraphics(windowUI.contentW, windowUI.contentH);
    frameGraphics.clear(0, 0, 0, 0);

    this.initEmojis(p5);
    this.initDivs(p5);

    loadingDone();
    setOutside({ isOutside: false });
    this.setUserInitialPosition(p5);

    addBots(barTenders);
  };

  initDivs = (p5: p5Types) => {
    addLightDivs(divs, lightImgs, p5);
    addColumnDivs(divs, columnGif, p5);
    addTrashDivs(divs, trashFiles, p5);
    addFolderDivs(divs, instaImg, txtFile, p5);
    addGiftShopDivs(divs, giftShopImgs, p5);
    addBarDivs(bars, lightImgs[3], p5);
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
    const { user, users, currentPage } = this.props;

    if (isLoadingImages) {
      frameGraphics.clear(0, 0, 0, 0);
      p5.clear(0, 0, 0, 0);
      p5.push();
      p5.translate(movement.userEase.x, movement.userEase.y);
      drawUser(user, p5, barEmojis);
      p5.pop();
      return;
    }

    if (pageIsTurning(pageTurnTime, p5)) {
      frameGraphics.clear(0, 0, 0, 0);
      p5.clear(0, 0, 0, 0);
      p5.push();
      p5.translate(movement.userEase.x, movement.userEase.y);
      drawUser(user, p5, barEmojis);
      p5.pop();
      return;
    }

    p5.clear(0, 0, 0, 0);
    //this.displayFrameRate(p5);

    p5.push();

    if (this.isGiftShop()) {
      this.displayGiftShop(p5);
    } else {
      this.displayRandomRects(p5);
      this.displayLayoutContent(p5);
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

    // displayPageFlips(
    //   pageFlipImg,
    //   this.props.currentPage,
    //   this.props.numLayouts,
    //   p5
    // );

    //////////////
    // updating
    if (users) updateDivs(this.getRoomLayoutNum(), divs);

    this.updateUserEase(p5);
    this.checkPageChange(p5);
    if (
      p5.width !== this.props.windowUI.contentW ||
      p5.height !== this.props.windowUI.contentH
    )
      this.manualResize(p5);
  };

  displayLayoutContent = (p5: p5Types) => {
    let layoutNum = this.props.currentPage / 2;
    switch (layoutNum) {
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
  };
  display0 = (p5: p5Types) => {};
  display1 = (p5: p5Types) => {};
  display2 = (p5: p5Types) => {};

  displayGiftShop = (p5: p5Types) => {};

  isGiftShop() {
    const { currentPage, numLayouts } = this.props;
    return currentPage == (numLayouts - 1) * 2;
  }

  displayRandomRects(p5: p5Types) {
    timer1.dt = 100;
    timer2.dt = 4000;

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

    if (frames && frames.length > 0) frames[frames.length - 1].displayFrame(p5);
  }

  newRandomFrame(p5: p5Types) {
    if (officeImgs == null || officeImgs.length == 0) return;
    let _x = this.props.user.x - frameDim.w / 2;
    let _y = this.props.user.y - frameDim.h / 2;

    let x = p5.constrain(_x, 0, p5.width - frameDim.w / 2);
    let y = p5.constrain(_y, 0, p5.height - frameDim.h / 2);
    let frame = new RectFrame(x, y, frameDim.w, frameDim.h, currentImgIndex);

    frames.push(frame);

    frameGraphics.erase(30);
    frameGraphics.rect(0, 0, p5.width, p5.height);
    frameGraphics.noErase();

    frame.displayImg(frameGraphics, officeImgs, this.getBackgroundSize(p5));
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
    const { currentPage, userMove, user } = this.props;
    if (previousPage === currentPage) return;

    pageTurnTime = p5.millis();
    this.loadOfficeImages(p5);
    this.stopWalking();
    if (currentPage > previousPage) {
      this.setUserPosition(p5.width - 100, p5.height - 100);
    } else if (currentPage < previousPage) {
      this.setUserPosition(100, p5.height - 100);
    }

    previousPage = currentPage;
  };

  getRoomLayoutNum = () => {
    return this.props.currentPage; //Math.floor(this.props.currentPage / 2);
  };

  loadOfficeImages = (p5: p5Types) => {
    const {
      currentPage,
      windowUI,
      numLayouts: numPages,
      setOutside,
    } = this.props;
    const currentRoom = (currentPage / 2) % numPages;
    const imagePromises = [];

    setOutside({ isOutside: true });

    // if (currentRoom == 0) {
    //   setOutside({ isOutside: false });
    //   return;
    // }

    isLoadingImages = true;

    for (let i = 1; i < 5; i++) {
      let imgUrl = `https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/HomePage/${i}.jpg`;

      if (currentRoom > 0) {
        imgUrl = `https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/pages/Office_${
          currentRoom - 1
        }/${i}.jpg`;
      }
      const imgPromise = new Promise((resolve, reject) => {
        p5.loadImage(
          imgUrl,
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
      })
      .finally(() => {
        setOutside({ isOutside: false });
      });
  };

  displayFrameRate = (p5: p5Types) => {
    p5.fill(0);
    p5.noStroke();
    p5.text(p5.round(p5.frameRate()), 20, 20);
    p5.text("props.user.roomPage " + this.props.user.roomPage, 20, 40);
    p5.text("layout " + this.getRoomLayoutNum(), 20, 60);
    p5.text("props.currentPage " + this.props.currentPage, 20, 80);
  };

  drawOverTarget = (p5: p5Types) => {
    const { user, users } = this.props;
    p5.push();

    if (users) {
      p5.textFont(font, 34);
      drawUsers(user, filterGalleryUsers(user, users), font, p5, barEmojis);
    }

    p5.pop();
  };

  drawOverUser = (p5: p5Types) => {
    let room = this.getRoomLayoutNum();
    p5.push();
    // p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    const userEase = { x: 0, y: 0 };
    displayBarDivs(room, bars);
    displayLightDivs(room, divs);
    displayColumnDivs(room, divs);
    displayTrashDivs(room, divs);

    p5.textFont(font, 12);
    displayFolderDivs(room, divs);

    p5.pop();
  };

  manualResize = (p5: p5Types) => {
    // p5.windowWidth = window.innerWidth;
    // p5.windowHeight = window.innerHeight;
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
    this.checkPageCorners(stepTo, p5);
  };

  stopWalking = () => {
    movement.isWalking = false;
  };

  checkPageCorners = (userStep: { x: number; y: number }, p5: p5Types) => {
    if (isPageForwardCorner(userStep, p5)) {
      this.props.changePage(1);
    } else if (isPageBackwardCorner(userStep, p5)) {
      this.props.changePage(-1);
    }
  };

  // checkPageCorners = (userStep: { x: number; y: number }, p5: p5Types) => {
  //   let changedPage = false;
  //   if (isPageForwardCorner(userStep, p5)) {
  //     changedPage = true;

  //     if (!justChangedPage) {
  //       this.props.changePage(1);
  //       justChangedPage = true;
  //     }
  //   } else if (isPageBackwardCorner(userStep, p5)) {
  //     changedPage = true;

  //     if (!justChangedPage) {
  //       this.props.changePage(-1);
  //       justChangedPage = true;
  //     }
  //   }

  //   if (!changedPage) {
  //     justChangedPage = false;
  //   }
  // };

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
    } else if (checkDivPress(this.getRoomLayoutNum(), divs)) {
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
      if (closeToDestination(movement.stepTo, movement.destination)) {
        this.setUserPositionImmediate(
          movement.destination.x,
          movement.destination.y
        );
        movement.isWalking = false;
        this.checkPageCorners(movement.destination, p5);
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
      } else if (p5.key == "w") {
        this.props.changePage(1);
      } else if (p5.key == "q") {
        this.props.changePage(-1);
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
    //frameGraphics = p5.createGraphics(windowUI.contentW, windowUI.contentH);
    p5.resizeCanvas(windowUI.contentW, windowUI.contentH);
    this.setUserBoundaries(p5);
  };

  setUserBoundaries = (p5: p5Types) => {
    const { user } = this.props;
    let x = user.x;
    let y = user.y;
    if (x > p5.width - 50) {
      x = p5.width - 50;
    }
    if (y > p5.height - 50) {
      y = p5.height - 50;
    }
    this.setUserPositionImmediate(x, y);
  };

  getBackgroundSize = (p5: p5Types) => {
    // const { windowUI } = this.props;
    const aspect = 1920 / 1080;
    const screenWidth = this.props.windowUI.contentW;
    const screenHeight = this.props.windowUI.contentH;
    const screenAspect = screenWidth / screenHeight;

    if (screenAspect < aspect) {
      // width is max
      let h = screenWidth / aspect;
      let dy = (screenHeight - h) / 2;
      return { w: screenWidth, h, x: 0, y: dy };
    } else {
      let newHeight = screenHeight;

      let newWidth = (1920 * newHeight) / 1080;
      let dx = (screenWidth - newWidth) / 2;
      return { w: newWidth, h: newHeight, x: dx, y: 0 };
    }
  };

  doubleClicked = (p5: p5Types) => {
    if (p5.frameCount > 0) {
      checkFolderDivsDouble(this.getRoomLayoutNum(), divs);
      checkTrashDivsDouble(this.getRoomLayoutNum(), divs);
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
)(GallerySketch);
