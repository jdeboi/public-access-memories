import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { IUser, IUsers } from "../../../interfaces";
import { connect } from "react-redux";
import { RootState } from "../../../store/store";
import { setFollowingHost } from "../../../store/user";

//////////////
// HELPERS
import {
  doorCrossing,
  roomDoorCrossing,
  roomDoorEntryCrossing,
  roomDoorBoundary,
  roomBoundary,
  wallBoundary,
} from "../Gallery1/functions/crossing";
import { roundToMult2 } from "../Gallery1/functions/round";
import { drawAllFloors } from "../Gallery1/functions/floor";
import {
  drawWalls,
  drawRooms,
  initHomeBodyWalls,
  initOuterWalls,
} from "../Gallery1/functions/building";
import { displayDancers } from "../Gallery1/functions/emojis";
import {
  reachedDestination,
  getNextStep,
  showMouseLoc,
  showUserEllipses,
  showDestination,
  mouseDidMove,
} from "../Gallery1/functions/destination";
import {
  drawUser,
  drawUsers,
  checkUserClicked,
} from "../Gallery1/functions/users";
import {
  displayBarDivs,
  displayTrashDivs,
  checkTrashDivsDouble,
  addTrashDivs,
  displayRoomLabelDivs,
  addDoorDivs,
  addLightDivs,
  addColumnDivs,
  addBarDivs,
  addFolderDivs,
  displayDoorDivs,
  displayLightDivs,
  displayColumnDivs,
  endDivDrag,
  updateDivs,
  checkDivPress,
  displayFolderDivs,
  checkFolderDivsDouble,
  addRoomLabelDivs,
} from "../Gallery1/functions/divs";

//////////////
// COMPONENTS
import Dancer from "../components/p5/Dancer";

//////////////
// CONFIG
import {
  GlobalConfig,
  limits,
} from "../../../data/Shows/Residency/GlobalConfig";
import { rooms as globalRooms } from "../../../data/Shows/Residency/RoomConfig";
import {
  filterGalleryUsers,
  getTotalRoomCount,
} from "../../../helpers/helpers";
// import { displayWall } from "./p5/functions/ground";
import {
  hostBotPoints,
  danceFloor,
  barTenders,
} from "../../../data/Shows/HomeBody/BotConfig";
import { Dispatch } from "@reduxjs/toolkit";
import { p5ToUserCoords } from "../../../helpers/coordinates";
// import { danceFloor } from "../../../data/BotConfig";
// import { artists, roomConfig } from "../../../data/RoomConfig";
import HBRoom from "../Gallery1/components/HBRoom";
import { addBots } from "../../../App/useSockets";
import { LMD_URL, loadEmojis, PAM_URL } from "../functions/loadImages";
var isClosed: boolean;

//////////////
// BUILDING
var walls: any = [];
var rooms: any = [];
var roomTextures: p5Types.Image[] = [];
var eyeIcon: p5Types.Image;
var doors: any = [];
var doorImgs: p5Types.Image[] = [];
var lightImgs: p5Types.Image[] = [];
var trashFiles: p5Types.Image[] = [];
var columnGif: p5Types.Image;
var closedSign: p5Types.Image;

//////////////
// ICONS
var txtFile: p5Types.Image, instaImg: p5Types.Image;

//////////////
// EMOJIS
var dancers: any = [];
var dancerImgs: p5Types.Image[] = [];
var barEmojis: p5Types.Image[] = [];

//////////////
// FONT
var font: p5Types.Font;
var timesFont: p5Types.Font;

//////////////
// DRAGGABLE DIVS
var divs = {};

// var miniMap;
// let updateObj = { dx: 0, dy: 0, mx: 0, my: 0, destX: 0, destY: 0 };

//////////////
// MOVEMENT
var isWalking = false;
const stepTo = { x: 0, y: 0 };
const userEase = { x: 0, y: 0 };
const destination = { x: 0, y: 0, time: new Date() };
var lastMouseMove = new Date();

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

class GallerySketchClean extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  preload = (p5: p5Types) => {
    //////////////
    // building textures
    doorImgs[0] = p5.loadImage(LMD_URL + "door/frame2.png");
    doorImgs[1] = p5.loadImage(LMD_URL + "door/leftdoor2.png");
    roomTextures[0] = p5.loadImage(LMD_URL + "rooms/bot.png");
    roomTextures[1] = p5.loadImage(LMD_URL + "rooms/right.png");
    roomTextures[2] = p5.loadImage(LMD_URL + "rooms/left.png");
    eyeIcon = p5.loadImage(LMD_URL + "eye.png");
    closedSign = p5.loadImage(LMD_URL + "closed.png");

    loadEmojis(p5, lightImgs, dancerImgs, barEmojis, trashFiles);
    //////////////

    //////////////
    // folder icons
    txtFile = p5.loadImage(LMD_URL + "waveforms/txt.png");
    instaImg = p5.loadImage(LMD_URL + "instagram.png");

    // columnGif = p5.loadImage(url + "column.gif");
    columnGif = p5.loadImage(PAM_URL + "gallery/column.png"); //not sure why this one has a cors issue

    // font
    font = p5.loadFont(
      "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fonts/sysfont.woff"
    );
    // timesFont = p5.loadFont("https://cdn.jsdelivr.net/gh/googlefonts/noto-emoji/fonts/NotoColorEmoji.ttf");
  };

  ////////////////////////////////////////////////////////////////////////
  // INITIALIZE
  ////////////////////////////////////////////////////////////////////////
  setup = (p5: p5Types, canvasParentRef: Element) => {
    const { user, userMove, loadingDone } = this.props;
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)

    this.initBuilding(p5);
    this.initEmojis(p5);
    this.initDivs(p5);
    stepTo.x = user.x;
    stepTo.y = user.y;
    destination.x = stepTo.x;
    destination.y = stepTo.y;

    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.triggerMove(p5));

    p5.textFont(font, 14);
    p5.frameRate(20);
    loadingDone();
    addBots(barTenders);
  };

  initEmojis = (p5: p5Types) => {
    dancers[0] = new Dancer(p5, dancerImgs[0], 10, 160, false, danceFloor);
    dancers[1] = new Dancer(p5, dancerImgs[1], 200, 380, false, danceFloor);
    dancers[2] = new Dancer(p5, dancerImgs[2], 300, 150, true, danceFloor);
  };

  initBuilding = (p5: p5Types) => {
    initOuterWalls(p5, walls);
    initHomeBodyWalls(p5, walls);

    for (let i = 0; i < globalRooms.length; i++) {
      rooms.push(new HBRoom(p5, doorImgs[0], i));
    }
  };

  initDivs = (p5: p5Types) => {
    addDoorDivs(divs, doors, doorImgs, p5);
    addLightDivs(divs, lightImgs, p5);
    addColumnDivs(divs, columnGif, p5);
    addBarDivs(divs, lightImgs[3], p5);
    addTrashDivs(divs, trashFiles, p5);
    addFolderDivs(divs, instaImg, txtFile, p5);
    addRoomLabelDivs(divs, eyeIcon, font, p5);
    // addSwingDivs(divs, baby, null, p5);
  };

  ////////////////////////////////////////////////////////////////////////
  // DRAW
  ////////////////////////////////////////////////////////////////////////
  draw = (p5: p5Types) => {
    const { user, users } = this.props;
    p5.clear(255, 255, 255, 255);

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    p5.push();
    p5.translate(-userEase.x, -userEase.y);

    p5.push();
    p5.translate(
      GlobalConfig.x * GlobalConfig.scaler,
      GlobalConfig.y * GlobalConfig.scaler
    );

    //////////////
    // building
    const roomCount = getTotalRoomCount(users, rooms);
    drawRooms(rooms, roomTextures);
    drawWalls(walls, p5);
    if (!isClosed) displayRoomLabelDivs(font, roomCount, divs);

    //////////////
    // emojis
    displayDancers(dancers);
    // updateDucks(user.hasCheese, userEase.x, userEase.y, ducks);

    p5.textFont(font, 10);

    p5.pop();
    p5.pop();
    p5.pop();

    //////////////
    // step visualization
    this.mouseStep();
    this.showTarget(p5);

    //////////////
    // drawing
    this.drawOverTarget(p5);
    // p5.textFont(font, 34);
    drawUser(user, p5, barEmojis);
    this.drawOverUser(p5);

    //////////////
    // updating
    if (users) updateDivs(userEase, users, divs);
    this.updateUserEase(p5);
  };

  debugMove = (p5: p5Types) => {
    p5.fill(0);
    p5.noStroke();
    p5.textSize(20);
    // p5.text(updateObj.destX + " " + updateObj.destY, p5.mouseX, p5.mouseY);
    p5.text(
      p5.round(userEase.x) + " " + p5.round(userEase.y),
      p5.width / 2,
      p5.height / 2
    );
  };

  drawOverTarget = (p5: p5Types) => {
    const { user, users } = this.props;
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.translate(-userEase.x, -userEase.y);
    p5.translate(
      GlobalConfig.x * GlobalConfig.scaler,
      GlobalConfig.y * GlobalConfig.scaler
    );

    if (users) {
      // p5.textFont(font, 34);
      drawUsers(
        userEase,
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
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.translate(-userEase.x, -userEase.y);
    p5.translate(
      GlobalConfig.x * GlobalConfig.scaler,
      GlobalConfig.y * GlobalConfig.scaler
    );
    displayDoorDivs(userEase.x, userEase.y, divs, isClosed, closedSign);
    displayBarDivs(userEase.x, userEase.y, divs);
    displayLightDivs(userEase.x, userEase.y, divs);
    displayColumnDivs(userEase.x, userEase.y, divs);

    p5.textFont(font, 12);
    displayFolderDivs(divs);
    displayTrashDivs(userEase.x, userEase.y, divs);

    p5.pop();
  };

  checkResize = (p5: p5Types) => {
    if (
      p5.windowWidth !== window.innerWidth ||
      p5.windowHeight !== window.innerHeight
    ) {
      p5.windowWidth = window.innerWidth;
      p5.windowHeight = window.innerHeight;
      this.windowResized(p5);
    }
  };
  ////////////////////////////////////////////////////////////////////////
  // MOVEMENT
  ////////////////////////////////////////////////////////////////////////
  showTarget = (p5: p5Types) => {
    const { isMobile } = this.props;
    showDestination(userEase, destination, isWalking, p5);
    showUserEllipses(userEase, destination, isWalking, p5);

    if (mouseDidMove(p5)) {
      lastMouseMove = new Date();
    }
    showMouseLoc(isMobile, lastMouseMove, p5);
  };

  userTakeStep = (x: number, y: number) => {
    const { isMobile, userNewRoom, toggleOutside } = this.props;
    var t = new Date();
    let space = GlobalConfig.scaler;
    const prevStep = { x: stepTo.x, y: stepTo.y };
    const userStep = { x: stepTo.x + x * space, y: stepTo.y + y * space };
    const outsideDoor = doorCrossing(doors, prevStep, userStep);
    const roomDoorEntry = roomDoorEntryCrossing(rooms, prevStep, userStep);
    const roomDoor = roomDoorCrossing(rooms, prevStep, userStep);
    const roomDoorB = roomDoorBoundary(rooms, prevStep, userStep);

    if (roomDoor) {
      if (!isMobile) {
        if (window.confirm("Leave the main gallery?")) {
          userNewRoom(roomDoor);
        }
      } else {
        userNewRoom(roomDoor);
      }
      isWalking = false;
    } else if (outsideDoor) {
      stepTo.x = userStep.x;
      stepTo.y = userStep.y;
      toggleOutside();
    } else if (roomDoorEntry) {
      stepTo.x = userStep.x;
      stepTo.y = userStep.y;
    } else if (roomBoundary(rooms, prevStep, userStep)) {
      this.stopWalking();
    } else if (roomDoorB) {
      this.stopWalking();
    } else if (wallBoundary(walls, prevStep, userStep)) {
      this.stopWalking();
    } else {
      stepTo.x = userStep.x;
      stepTo.y = userStep.y;
    }
  };

  stopWalking = () => {
    isWalking = false;
  };

  updateUserEase = (p5: p5Types) => {
    const { userMove } = this.props;
    if (!reachedDestination(userEase, stepTo)) {
      let amt = 0.7;
      userEase.x = userEase.x * amt + stepTo.x * (1 - amt);
      userEase.y = userEase.y * amt + stepTo.y * (1 - amt);
      let d = p5.dist(userEase.x, userEase.y, stepTo.x, stepTo.y);
      if (d < 15) {
        userEase.x = stepTo.x;
        userEase.y = stepTo.y;
        userMove(userEase.x, userEase.y);
      }
    }
  };

  triggerMove = (p5: p5Types) => {
    const { user } = this.props;
    // if (this.props.user.isFollowingHost)
    //   return;

    const { users, setUserActive } = this.props;
    let userClicked = null;
    if (users)
      userClicked = checkUserClicked(userEase, users, p5, GlobalConfig);
    if (userClicked) {
      setUserActive(userClicked);
      return;
    } else if (checkDivPress(userEase.x, userEase.y, divs)) return;
    else {
      let steps = GlobalConfig.scaler - 20;
      const dx = p5.mouseX > p5.windowWidth / 2 ? steps : -steps;
      const dy = p5.mouseY > p5.windowHeight / 2 ? steps : -steps;
      const mx = roundToMult2(
        p5.mouseX - p5.windowWidth / 2 + dx,
        GlobalConfig.scaler
      );
      const my = roundToMult2(
        p5.mouseY - p5.windowHeight / 2 + dy,
        GlobalConfig.scaler
      );

      // console.log(mx, my, dx, dy);
      if (!(mx === 0 && my === 0)) {
        // resolved???
        // TODO - issue is if that destination is a no go, effs up future destinations
        // destination.x += mx;
        // destination.y += my;
        const x = mx + user.x;
        const y = my + user.y;
        destination.x = x;
        destination.y = y;
        destination.time = new Date();
        isWalking = true;
      }
    }
  };

  mouseStep = () => {
    const t = new Date().getTime() - destination.time.getTime();
    const { user } = this.props;
    if (isWalking) {
      if (reachedDestination(stepTo, destination)) {
        isWalking = false;
      } else if (t > 150) {
        let step = getNextStep(stepTo, destination);
        this.userTakeStep(step[0], step[1]);
        destination.time = new Date();
      }
    }
  };

  keyPressed = (p5: p5Types) => {
    if (p5.frameCount > 0) {
      if (this.props.user.isFollowingHost) return;

      if (p5.keyCode === p5.UP_ARROW) {
        this.userTakeStep(0, -1);
      } else if (p5.keyCode === p5.RIGHT_ARROW) {
        this.userTakeStep(1, 0);
      } else if (p5.keyCode === p5.LEFT_ARROW) {
        this.userTakeStep(-1, 0);
      } else if (p5.keyCode === p5.DOWN_ARROW) {
        this.userTakeStep(0, 1);
      }
    }
  };

  mouseReleased = (p5: p5Types) => {
    endDivDrag(divs);
  };

  windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  };

  doubleClicked = (p5: p5Types) => {
    checkFolderDivsDouble(userEase.x, userEase.y, divs);
    checkTrashDivsDouble(userEase.x, userEase.y, divs);
  };

  render() {
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

export default connect<StateProps, DispatchProps, ComponentProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(GallerySketchClean);
