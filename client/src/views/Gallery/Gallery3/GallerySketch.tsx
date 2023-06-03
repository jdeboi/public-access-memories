import React from "react";
import Sketch from "react-p5";
import p5Types from 'p5';
import { IUser, IUsers } from "../../../interfaces";
import { connect } from "react-redux";
import { RootState } from '../../../store/store';
import { setFollowingHost } from '../../../store/user';

//////////////
// HELPERS
import { roomBoundary, roomDoorCrossing, wallBoundary } from '../Gallery1/functions/crossing';
import { roundToMult2 } from '../Gallery1/functions/round';
import { drawWalls } from '../Gallery1/functions/building';
import {initOuterFOVWalls} from './functions/building';
import { displayDanceFloor, drawAllFloors } from "./functions/floor";
import { displayDancers } from '../Gallery1/functions/emojis';

import { reachedDestination, getNextStep, showMouseLoc, showUserEllipses, showDestination, mouseDidMove } from '../Gallery1/functions/destination';
import { drawUser, drawUsers, checkUserClicked } from '../Gallery1/functions/users';
import { displayTrashDivs, checkTrashDivsDouble, addTrashDivs, addLightDivs, displayLightDivs, displayColumnDivs, endDivDrag, updateDivs, checkDivPress, displayFolderDivs, checkFolderDivsDouble, addRoomLabelDivs, displayRoomLabelDivs, addFolderDivs, addBarDivs, displayBarDivs } from './functions/divs';
import { addColumnDivs } from "./functions/divs";
import { drawRooms } from './functions/building';

//////////////
// COMPONENTS
import AnaglyphEffect from "./components/AnaglyphEffect";
import FOVRoom from "./components/FOVRoom";
import FOVIsometricCube from "./components/FOVIsometricCube";

//////////////
// CONFIG
import { GlobalConfig } from "../../../data/FieldsOfView/GlobalConfig";
import { rooms as globalRooms } from "../../../data/FieldsOfView/RoomConfig";
import { filterGalleryUsers, getTotalRoomCount } from "../../../helpers/helpers";
import { Dispatch } from "@reduxjs/toolkit";
import { displayIsometricGrid, initCubes } from "./functions/isometric";
import Dancer from "../components/p5/Dancer";
import { barTenders, danceFloor } from "../../../data/FieldsOfView/BotConfig";
import { addBots } from "../../../App/useSockets";

// import { p5ToUserCoords, p5ToWorldCoords } from "../../../helpers/coordinates";

//////////////
// BUILDING 
var walls: any = [];
var rooms: any = [];
var eyeIcon: p5Types.Image;
var doors: any = [];
var doorImgs: p5Types.Image[] = [];
var floorTex: p5Types.Image;
var lightImgs: p5Types.Image[] = [];
var trashFiles: p5Types.Image[] = [];
var columnGif: p5Types.Image;
let cubeTex: p5Types.Image;
let treeTex: p5Types.Image;

var cubes: FOVIsometricCube[] = [];
var isoAssets: p5Types.Image[] = [];

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

//////////////
// DRAGGABLE DIVS
var divs = {};
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

var isClosed: boolean;

let anaglyph: AnaglyphEffect;

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
    // floorTex = p5.loadImage(url + "concrete-512.jpg");
    cubeTex = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/spacepond.png");// url + "concrete-512.jpg");
    floorTex = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/gallery/FOV/Transparency500.jpg")
    treeTex = p5.loadImage(url + "grass/tree.png");
    doorImgs[0] = p5.loadImage(url + "door/frame2.png");
    doorImgs[1] = p5.loadImage(url + "door/leftdoor2.png");
    eyeIcon = p5.loadImage(url + "eye.png")


    //////////////
    // emojis
    dancerImgs[0] = p5.loadImage(url + "dancers/dancer0.png");
    dancerImgs[1] = p5.loadImage(url + "dancers/dancer1.png");
    dancerImgs[2] = p5.loadImage(url + "dancers/dancer2.png");
    barEmojis[0] = p5.loadImage(url + "emojis/bread.png");
    barEmojis[1] = p5.loadImage(url + "emojis/cheese.png");
    barEmojis[2] = p5.loadImage(url + "emojis/wine.png");
    barEmojis[3] = p5.loadImage(url + "emojis/cocktail.png");
    barEmojis[4] = p5.loadImage(url + "emojis/chat.png");


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
    isoAssets[0] = p5.loadImage(pamURL + "fields_of_view/isometric/0.png");
    isoAssets[1] = p5.loadImage(pamURL + "fields_of_view/isometric/1.png");
    isoAssets[2] = p5.loadImage(pamURL + "fields_of_view/isometric/2.png");

    //////////////
    // lights
    lightImgs[0] = p5.loadImage(url + "tracklights/tracklights_vert.jpg");
    lightImgs[1] = p5.loadImage(url + "tracklights/light_shadow.png");
    lightImgs[2] = p5.loadImage(url + "tracklights/tracklights_dark_vert.jpg");
    lightImgs[3] = p5.loadImage(url + "tracklights/black_shadow.png");

    columnGif = p5.loadImage(pamURL + "gallery/column.png"); //not sure why this one has a cors issue

    // font
    font = p5.loadFont("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fonts/sysfont.woff");

  }

  ////////////////////////////////////////////////////////////////////////
  // INITIALIZE
  ////////////////////////////////////////////////////////////////////////
  setup = (p5: p5Types, canvasParentRef: Element) => {
    const { user, loadingDone, setUserActive } = this.props;

    p5.textFont(font, 14);

    initOuterFOVWalls(p5, walls);
    for (let i = 0; i < globalRooms.length; i++) {
      rooms.push(new FOVRoom(p5, i));
    }


    this.initEmojis(p5);
    this.initDivs(p5);

    cubes = initCubes(isoAssets, p5);

    // miniMap = new MiniMap(p5, 50, p5.windowHeight - 200 - 80, 200, 200);
    stepTo.x = user.x;
    stepTo.y = user.y;
    destination.x = stepTo.x;
    destination.y = stepTo.y;

    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.triggerMove(p5));

    anaglyph = new AnaglyphEffect(400, 400, p5);
    anaglyph.setDivergence(-.3);


    p5.frameRate(20);
    p5.pixelDensity(2);

    loadingDone();

    addBots(barTenders);
  };

  initEmojis = (p5: p5Types) => {
    dancers[0] = new Dancer(p5, dancerImgs[0], 0, 160, false, danceFloor);
    dancers[1] = new Dancer(p5, dancerImgs[1], 100, 380, false, danceFloor);
    dancers[2] = new Dancer(p5, dancerImgs[2], 200, 150, true, danceFloor);
  }


  initDivs = (p5: p5Types) => {
    addLightDivs(divs, lightImgs, p5);
    addColumnDivs(divs, columnGif, p5, .83);
    addTrashDivs(divs, trashFiles, p5);
    addFolderDivs(divs, instaImg, txtFile, p5);
    addBarDivs(bars, lightImgs[3], p5);
    addRoomLabelDivs(divs, eyeIcon, font, p5);
  }

  ////////////////////////////////////////////////////////////////////////
  // DRAW
  ////////////////////////////////////////////////////////////////////////

  draw = (p5: p5Types) => {
    anaglyph.draw((pg) => scene(pg, p5, floorTex));

    const { user, users } = this.props;
    p5.clear();
    
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);

    p5.pop();

   
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    p5.push();
    p5.translate(-userEase.x, -userEase.y);


    p5.push();
    p5.translate(GlobalConfig.x * GlobalConfig.scaler, GlobalConfig.y * GlobalConfig.scaler)

    //////////////
    // floors
    // drawAllFloors(p5);

    displayIsometricGrid(500, 450, 1000, 1000, p5);
    displayIsometricGrid(1500, 750, 1500, 1500, p5);
    displayIsometricGrid(1700, 1750, 1200, 750, p5);
    displayIsometricGrid(700, 1550, 600, 600, p5);


    p5.push();
    p5.translate(GlobalConfig.scaler*10, -GlobalConfig.scaler);
    for (const cube of cubes) {
      cube.display();
    }
    p5.pop();

    

    //////////////
    // building
    drawWalls(walls, p5);

    //////////////
    // emojis
    displayDancers(dancers);
    displayDanceFloor(danceFloor.x, danceFloor.y, danceFloor.w, danceFloor.h, p5);

    //////////////
    // draggable

    const roomCount = getTotalRoomCount(users, rooms);
    drawRooms(rooms, anaglyph.output);
    drawWalls(walls, p5);
    if (!isClosed)
      displayRoomLabelDivs(font, roomCount, divs);


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
    this.updateUserEase(p5);


  };

  debugMove = (p5: p5Types) => {
    p5.fill(0);
    p5.noStroke();
    // p5.textSize(20);
    // p5.text(updateObj.destX + " " + updateObj.destY, p5.mouseX, p5.mouseY);
    // p5.text(p5.round(userEase.x) + " " + p5.round(userEase.y), p5.width / 2, p5.height / 2)
  }

  displayFrameRate = (p5: p5Types) => {
    p5.fill(0);
    p5.textSize(30);
    p5.text(p5.frameRate(), 50, 50);
  }


  drawOverTarget = (p5: p5Types) => {
    const { user, users } = this.props;
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.translate(-userEase.x, -userEase.y);
    p5.translate(GlobalConfig.x * GlobalConfig.scaler, GlobalConfig.y * GlobalConfig.scaler)

    if (users) {
      // p5.textFont(font, 34);
      drawUsers(userEase, filterGalleryUsers(user, users), font, p5, barEmojis, GlobalConfig);
    }

    p5.pop();
  }



  drawOverUser = (p5: p5Types) => {
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.translate(-userEase.x, -userEase.y);
    p5.translate(GlobalConfig.x * GlobalConfig.scaler, GlobalConfig.y * GlobalConfig.scaler);
    displayBarDivs(userEase.x, userEase.y, bars);
    displayLightDivs(userEase.x, userEase.y, divs);
    displayColumnDivs(userEase.x, userEase.y, divs);
    displayTrashDivs(userEase.x, userEase.y, divs);

    p5.textFont(font, 12);
    displayFolderDivs(divs);




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
    const { isClosed, isMobile, userNewRoom } = this.props;
    var t = new Date();
    let space = GlobalConfig.scaler;
    const prevStep = { x: stepTo.x, y: stepTo.y }
    const userStep = { x: stepTo.x + x * space, y: stepTo.y + y * space };
    const roomDoor = roomDoorCrossing(rooms, prevStep, userStep);
   
    if (roomDoor) {

      if (!isMobile) {
        if (window.confirm('Leave the main gallery?')) {
          userNewRoom(roomDoor);
        }
      }
      else {
        userNewRoom(roomDoor);
      }
      isWalking = false;
    }

    else if (roomBoundary(rooms, prevStep, userStep)) {
      this.stopWalking();
    } 
    else if (wallBoundary(walls, prevStep, userStep)) {
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
    else if (checkDivPress(userEase.x, userEase.y, divs)) {

      return;
    }

    // else if (checkBarDivs(userEase.x, userEase.y, bars)) {
    //   return;
    // }
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
      // endFanDivDrag(fans, hardDrive);
      // let endD = endFloppyDivDrag(floppies, p5);
      // if (endD) {
      //   if (window.confirm('Leave the main gallery?')) {
      //     this.props.userNewRoom(endD);
      //   }
      // }
      // endBarDivDrag(bars);
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
      checkTrashDivsDouble(userEase.x, userEase.y, divs);
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


function scene(pg: p5Types.Graphics, p5: p5Types, floorTex: p5Types.Image) {
  const boxW = 300;

  pg.background(0);

  pg.rectMode(pg.CENTER);
  pg.imageMode(pg.CENTER);
  pg.noFill();
  pg.strokeWeight(8);
  pg.stroke(255);
  for (let z = 0; z < 30; z++) {
    pg.push();
    let dz = (z * 100 + p5.millis() / 100) % 2000;
    dz -= 800;
    pg.translate(0, 0, dz);

    pg.rect(0, 0, boxW, boxW * 2);
    pg.pop();
  }

  pg.push();
  // pg.translate(0, 0, -150 + 250 * pg.sin(p5.millis() / 1000));
  // pg.noStroke();
  // pg.texture(cubeTex);
  // pg.box(30);
  pg.translate(0, 0, -800);
  // pg.image(treeTex, 0, 0, boxW, boxW);
  pg.pop();

  pg.push();

  pg.rotateY(pg.PI / 2);
  pg.translate(0, 0, boxW / 2);

  // right
  pg.push();
  pg.translate(0, 0, 30);
  pg.textureWrap(pg.CLAMP);
  pg.texture(treeTex);
  pg.noStroke();
  pg.plane(1800, boxW);
  
  // pg.image(cubeTex, 0, 0, 1800, boxW);
  pg.pop();

  // left
  pg.translate(0, 0, -boxW);
  pg.push();
  pg.translate(0, 0, -20);
  pg.texture(treeTex);
  pg.noStroke();
  pg.plane(1800, boxW);
  // pg.image(cubeTex, 0, 0, 1800, boxW);
  pg.pop();
  pg.pop();

  pg.push();
  pg.rotateX(pg.PI / 2);

  // floor
  pg.translate(0, 0, -boxW / 2);
  pg.push();
  pg.translate(0, 0, -2);
  pg.image(floorTex, 0, 0, boxW, 1800);
  pg.pop();
  pg.rect(0, 0, boxW, 1800);

  // ceiling
  pg.translate(0, 0, boxW);
  pg.push();
  pg.translate(0, 0, 2);
  pg.image(floorTex, 0, 0, boxW, 1800);
  pg.pop();
  pg.rect(0, 0, boxW, 1800);

  pg.pop();
}


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
    let sW = p5.random(1, 5)
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
    for (let i = 0; i < 360; i += c.sp / c.diam * 100) {
      p5.rotate(p5.radians(c.sp));
      p5.stroke(255, c.str);
      p5.strokeWeight(c.sW);
      p5.line(0, c.diam - c.r, 0, c.diam);
    }
    p5.pop();
  }
}
export default connect<StateProps, DispatchProps, ComponentProps, RootState>(mapStateToProps, mapDispatchToProps)(GallerySketch);


