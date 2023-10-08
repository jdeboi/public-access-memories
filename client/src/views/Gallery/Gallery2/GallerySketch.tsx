import React from "react";
import Sketch from "react-p5";
import p5Types from 'p5';
import { IUser, IUsers } from "../../../interfaces";
import { connect } from "react-redux";
import { RootState } from '../../../store/store';
import { setFollowingHost } from '../../../store/user';

//////////////
// HELPERS
import { wallBoundary } from '../Gallery1/functions/crossing';
import { roundToMult2 } from '../Gallery1/functions/round';
import { drawAllFloors } from './functions/floor';
import { drawWalls, initOuterWalls } from './functions/building';
import { displayDancers } from '../Gallery1/functions/emojis';
import { reachedDestination, getNextStep, showMouseLoc, showUserEllipses, showDestination, mouseDidMove } from '../Gallery1/functions/destination';
import { drawUser, drawUsers, checkUserClicked } from '../Gallery1/functions/users';
import { addTableDivs, displayTrashDivs, checkTrashDivsDouble, addTrashDivs, addLightDivs, displayLightDivs, displayColumnDivs, endDivDrag, updateDivs, checkDivPress, displayFolderDivs, checkFolderDivsDouble } from '../Gallery1/functions/divs';
import { addColumnDivs } from "./functions/columns";
import { addFolderDivs } from "./functions/folders";
import { checkFanDivs, displayFans, endFanDivDrag, addFanDivs, updateFanDivs } from "./functions/fans";
import { addFloppyDivs, checkFloppyDivs, checkFloppyDivsDouble, displayFloppyDivs, endFloppyDivDrag, updateFloppyDivs } from "./functions/floppies";
import { addBarDivs, displayBarDivs, checkBarDivs, endBarDivDrag, updateBarDivs } from "./functions/bars";


//////////////
// COMPONENTS
import Dancer from '../components/p5/Dancer';
import FanDraggable from "./components/FanDraggable/FanDraggable";
import Floppy from "./components/Floppy/Floppy";
import HardDrive from "./components/FanDraggable/HardDrive";

//////////////
// CONFIG
import { GlobalConfig } from "../../../data/AsIRecall/GlobalConfig";
import { rooms } from "../../../data/AsIRecall/RoomConfig";
import { filterGalleryUsers, getTotalRoomCount } from "../../../helpers/helpers";
import { Dispatch } from "@reduxjs/toolkit";
// import { p5ToUserCoords, p5ToWorldCoords } from "../../../helpers/coordinates";
import { barTenders, danceFloor } from "../../../data/AsIRecall/BotConfig";
import { addBots } from "../../../App/useSockets";

//////////////
// BUILDING 
var walls: any = [];
// var rooms: any = [];
var roomTextures: p5Types.Image[] = [];
var eyeIcon: p5Types.Image;
var doors: any = [];
var doorImgs: p5Types.Image[] = [];
var floorTex: p5Types.Image;
var lightImgs: p5Types.Image[] = [];
var tableImgs: p5Types.Image[] = [];
var trashFiles: p5Types.Image[] = [];
var columnGif: p5Types.Image;


//////////////
// ICONS
var txtFile: p5Types.Image, instaImg: p5Types.Image;

//////////////
// EMOJIS
var ducks: any = [];
var duckImg: p5Types.Image;
var dancers: any = [];
var dancerImgs: p5Types.Image[] = [];
var baby: any;
var barEmojis: p5Types.Image[] = [];

//////////////
// FONT
var font: p5Types.Font;

//////////////
// DRAGGABLE DIVS
var divs = {};
const fans: FanDraggable[] = [];
let hardDrive: HardDrive;
const floppies: Floppy[] = [];
let floppyImg: p5Types.Image;
let sliderImg: p5Types.Image;
let bars: any = [];

// var miniMap;
// let updateObj = { dx: 0, dy: 0, mx: 0, my: 0, destX: 0, destY: 0 };

//////////////
// MOVEMENT
var isWalking = false;
const stepTo = { x: 0, y: 0 };
const userEase = { x: 0, y: 0 };
const destination = { x: 0, y: 0, time: new Date() };
var lastMouseMove = new Date();
let fan: any;

let prevFrame = 0;

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

interface Props extends ComponentProps, StateProps, DispatchProps { }


class GallerySketch extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  preload = (p5: p5Types) => {
    const url = "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";

    //////////////
    // building textures
    floorTex = p5.loadImage(url + "concrete-512.jpg");
    doorImgs[0] = p5.loadImage(url + "door/frame2.png");
    doorImgs[1] = p5.loadImage(url + "door/leftdoor2.png");
    roomTextures[0] = p5.loadImage(url + "rooms/bot.png");
    roomTextures[1] = p5.loadImage(url + "rooms/right.png");
    roomTextures[2] = p5.loadImage(url + "rooms/left.png");
    eyeIcon = p5.loadImage(url + "eye.png")

    //////////////
    // emojis
    duckImg = p5.loadImage(url + "duck.png");
    dancerImgs[0] = p5.loadImage(url + "dancers/dancer0.png");
    dancerImgs[1] = p5.loadImage(url + "dancers/dancer1.png");
    dancerImgs[2] = p5.loadImage(url + "dancers/dancer2.png");
    baby = p5.loadImage(url + "swing/baby.png");
    barEmojis[0] = p5.loadImage(url + "emojis/bread.png");
    barEmojis[1] = p5.loadImage(url + "emojis/cheese.png");
    barEmojis[2] = p5.loadImage(url + "emojis/wine.png");
    barEmojis[3] = p5.loadImage(url + "emojis/cocktail.png");
    barEmojis[4] = p5.loadImage(url + "emojis/chat.png");
    barEmojis[5] = p5.loadImage(url + "emojis/mic.png");

    //////////////
    // plants
    const pamURL = "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/";
    //////////////
    // folder icons
    txtFile = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/txt.png");
    instaImg = p5.loadImage(url + "instagram.png");
    trashFiles[0] = p5.loadImage(url + "trash/fullrec.png")
    trashFiles[3] = p5.loadImage(url + "trash/trash0.png")
    trashFiles[2] = p5.loadImage(url + "trash/trash1.png")
    trashFiles[1] = p5.loadImage(url + "trash/trash2.png")

    //////////////
    // tables
    tableImgs[0] = p5.loadImage(url + "table/um_open.png")
    tableImgs[1] = p5.loadImage(url + "table/um_closed.png")

    //////////////
    // lights
    lightImgs[0] = p5.loadImage(url + "tracklights/tracklights_vert.jpg");
    lightImgs[1] = p5.loadImage(url + "tracklights/light_shadow.png");
    lightImgs[2] = p5.loadImage(url + "tracklights/tracklights_dark_vert.jpg");
    lightImgs[3] = p5.loadImage(url + "tracklights/black_shadow.png");

    columnGif = p5.loadImage(pamURL + "gallery/column.png"); //not sure why this one has a cors issue
    floppyImg = p5.loadImage(pamURL + "as_i_recall/gallery/floppy_base2.png");
    sliderImg = p5.loadImage(pamURL + "as_i_recall/gallery/floppy_slider2.png");

    // font
    font = p5.loadFont("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fonts/sysfont.woff");

  }

  ////////////////////////////////////////////////////////////////////////
  // INITIALIZE
  ////////////////////////////////////////////////////////////////////////
  setup = (p5: p5Types, canvasParentRef: Element) => {
    const { user, loadingDone, setUserActive } = this.props;
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)

    initOuterWalls(p5, walls);
    this.initEmojis(p5);
    this.initDivs(p5);


    // miniMap = new MiniMap(p5, 50, p5.windowHeight - 200 - 80, 200, 200);
    stepTo.x = user.x;
    stepTo.y = user.y;
    destination.x = stepTo.x;
    destination.y = stepTo.y;

    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.triggerMove(p5));

    p5.textFont(font, 14);
    p5.frameRate(20);
    p5.pixelDensity(2);

    loadingDone();
    addBots(barTenders);
  };

  initEmojis = (p5: p5Types) => {
    dancers[0] = new Dancer(p5, dancerImgs[0], 10, 160, false, danceFloor);
    dancers[1] = new Dancer(p5, dancerImgs[1], 200, 380, false, danceFloor);
    dancers[2] = new Dancer(p5, dancerImgs[2], 300, 150, true, danceFloor);
  }


  initDivs = (p5: p5Types) => {
    // addLightDivs(divs, lightImgs, p5);
    addColumnDivs(divs, columnGif, p5, .83);
    addTableDivs(divs, tableImgs, p5);
    addTrashDivs(divs, trashFiles, p5);
    addFolderDivs(divs, instaImg, txtFile, p5);
    hardDrive = new HardDrive(0, 17 * GlobalConfig.scaler, 13 * GlobalConfig.scaler, 434 / 2, 616 / 2, p5)
    addFloppyDivs(floppies, eyeIcon, floppyImg, sliderImg, font, p5);
    addBarDivs(bars, lightImgs[3], p5);
    addFanDivs(fans, p5);
    // addRoomLabelDivs(divs, eyeIcon, p5);
  }

  ////////////////////////////////////////////////////////////////////////
  // DRAW
  ////////////////////////////////////////////////////////////////////////
  draw = (p5: p5Types) => {
    const { user, users } = this.props;
    p5.clear();

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    p5.push();
    p5.translate(-userEase.x, -userEase.y);


    p5.push();
    p5.translate(GlobalConfig.x * GlobalConfig.scaler, GlobalConfig.y * GlobalConfig.scaler)

    //////////////
    // floors
    drawAllFloors(floppies, p5);


    //////////////
    // building
    drawWalls(walls, p5);

    //////////////
    // emojis
    displayDancers(dancers);

    //////////////
    // draggable
    p5.textFont(font, 10);
    displayFans(userEase.x, userEase.y, fans, hardDrive);

    const roomCount = getTotalRoomCount(users, rooms);
    displayFloppyDivs(userEase.x, userEase.y, roomCount, this.props.isMobile, floppies);
    // p5.textFont(font, 12);
    displayFolderDivs(divs);
    // displayTrashDivs(userEase.x, userEase.y, divs);


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
    drawUser(user, p5, barEmojis);
    this.drawOverUser(p5);

    //////////////
    // updating
    if (users)
      updateDivs(userEase, users, divs);
    updateFanDivs(fans, hardDrive);
    updateBarDivs(bars);
    updateFloppyDivs(userEase, users, floppies);
    this.updateUserEase(p5);

  };

  debugMove = (p5: p5Types) => {
    p5.fill(0);
    p5.noStroke();
    p5.textSize(20);
    // p5.text(updateObj.destX + " " + updateObj.destY, p5.mouseX, p5.mouseY);
    p5.text(p5.round(userEase.x) + " " + p5.round(userEase.y), p5.width / 2, p5.height / 2)
  }


  drawOverTarget = (p5: p5Types) => {
    const { user, users } = this.props;
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.translate(-userEase.x, -userEase.y);
    p5.translate(GlobalConfig.x * GlobalConfig.scaler, GlobalConfig.y * GlobalConfig.scaler)

    if (users)
      drawUsers(userEase, filterGalleryUsers(user, users), font, p5, barEmojis, GlobalConfig);

    p5.pop();
  }



  drawOverUser = (p5: p5Types) => {
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.translate(-userEase.x, -userEase.y);
    p5.translate(GlobalConfig.x * GlobalConfig.scaler, GlobalConfig.y * GlobalConfig.scaler);
    displayBarDivs(userEase.x, userEase.y, bars);
    // displayLightDivs(userEase.x, userEase.y, divs);
    displayColumnDivs(userEase.x, userEase.y, divs);




    p5.pop();

    if (p5.windowWidth !== window.innerWidth || p5.windowHeight !== window.innerHeight)
      this.manualResize(p5);
  }

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
  }

  userTakeStep = (x: number, y: number) => {
    const { isClosed, isMobile, userNewRoom, toggleOutside } = this.props;
    var t = new Date();
    let space = GlobalConfig.scaler;
    const prevStep = { x: stepTo.x, y: stepTo.y }
    const userStep = { x: stepTo.x + x * space, y: stepTo.y + y * space };
    if (wallBoundary(walls, prevStep, userStep)) {
      this.stopWalking();
    }
    else {
      stepTo.x = userStep.x;
      stepTo.y = userStep.y;
    }
  }

  stopWalking = () => {
    isWalking = false;
  }


  updateUserEase = (p5: p5Types) => {
    const { userMove } = this.props;
    if (!reachedDestination(userEase, stepTo)) {
      let amt = .7;
      userEase.x = userEase.x * amt + stepTo.x * (1 - amt);
      userEase.y = userEase.y * amt + stepTo.y * (1 - amt);
      let d = p5.dist(userEase.x, userEase.y, stepTo.x, stepTo.y);
      if (d < 15) {
        userEase.x = stepTo.x;
        userEase.y = stepTo.y;
        // isStepping = false;
        userMove(userEase.x, userEase.y);
      }

    }
  }

  triggerMove = (p5: p5Types) => {
    const { user } = this.props;
    const { users, setUserActive, } = this.props;
    let userClicked = null;

    if (users)
      userClicked = checkUserClicked(userEase, users, p5, GlobalConfig);
    if (userClicked) {
      setUserActive(userClicked);
      return;
    }
    else if (checkDivPress(userEase.x, userEase.y, divs))
      return;
    else if (checkFanDivs(userEase.x, userEase.y, fans, hardDrive))
      return;
    else if (checkFloppyDivs(userEase.x, userEase.y, floppies)) {
      return;
    }
    else if (checkBarDivs(userEase.x, userEase.y, bars)) {
      return;
    }
    else {
      let steps = GlobalConfig.scaler - 20;
      const dx = p5.mouseX > p5.windowWidth / 2 ? steps : -steps;
      const dy = p5.mouseY > p5.windowHeight / 2 ? steps : -steps;
      const mx = roundToMult2((p5.mouseX - p5.windowWidth / 2) + dx, GlobalConfig.scaler);
      const my = roundToMult2((p5.mouseY - p5.windowHeight / 2) + dy, GlobalConfig.scaler);

      if (!(mx === 0 && my === 0)) {
        const x = mx + user.x;
        const y = my + user.y;
        destination.x = x;
        destination.y = y;
        destination.time = new Date();
        isWalking = true;
      }
    }

  }


  mouseStep = () => {
    const t = new Date().getTime() - destination.time.getTime();
    const { user } = this.props;
    if (isWalking) {
      if (reachedDestination(stepTo, destination)) {
        isWalking = false;
      }
      else if (t > 150) {
        let step = getNextStep(stepTo, destination);
        this.userTakeStep(step[0], step[1]);
        destination.time = new Date();
      }
    }
  }

  keyPressed = (p5: p5Types) => {
    if (p5.frameCount > 0) {
      if (p5.keyCode === p5.UP_ARROW) {
        this.userTakeStep(0, -1);
      }
      else if (p5.keyCode === p5.RIGHT_ARROW) {
        this.userTakeStep(1, 0);
      }
      else if (p5.keyCode === p5.LEFT_ARROW) {
        this.userTakeStep(-1, 0);
      }
      else if (p5.keyCode === p5.DOWN_ARROW) {
        this.userTakeStep(0, 1);
      }
    }
    return;

  }

  mouseReleased = (p5: p5Types) => {
    if (p5.frameCount > 0) {
      endDivDrag(divs);
      endFanDivDrag(fans, hardDrive);
      let endD = endFloppyDivDrag(floppies, p5);
      if (endD) {
        if (window.confirm('Leave the main gallery?')) {
          this.props.userNewRoom(endD);
        }
      }
      endBarDivDrag(bars);
    }
  }

  manualResize = (p5: p5Types) => {
    p5.windowWidth = window.innerWidth;
    p5.windowHeight = window.innerHeight;
    this.windowResized(p5);
  }

  windowResized = (p5: p5Types) => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }

  doubleClicked = (p5: p5Types) => {
    if (p5.frameCount > 0) {
      checkFolderDivsDouble(userEase.x, userEase.y, divs);
      // checkTrashDivsDouble(userEase.x, userEase.y, divs);
      // checkFloppyDivsDouble(userEase.x, userEase.y, floppies);
    }
    return;
  }

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
};


const mapStateToProps = (state: RootState) => ({
  user: state.user,
});


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setFollowingHost: (isFollowing: boolean) => dispatch(setFollowingHost(isFollowing))
  }
}

export default connect<StateProps, DispatchProps, ComponentProps, RootState>(mapStateToProps, mapDispatchToProps)(GallerySketch);


