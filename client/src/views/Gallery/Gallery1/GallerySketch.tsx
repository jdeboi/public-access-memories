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
} from "./functions/crossing";
import { roundToMult2 } from "./functions/round";
import { drawAllFloors } from "./functions/floor";
import {
  drawWalls,
  drawRooms,
  initHomeBodyWalls,
  initOuterWalls,
} from "./functions/building";
import { displayDancers, updateDucks } from "./functions/emojis";
import {
  reachedDestination,
  getNextStep,
  showMouseLoc,
  showUserEllipses,
  showDestination,
  mouseDidMove,
} from "./functions/destination";
import { drawUser, drawUsers, checkUserClicked } from "./functions/users";
import { drawPlantRow, drawGrassPatch } from "./functions/garden";
import {
  addTableDivs,
  displayTableDivs,
  addSwingDivs,
  displaySwingDivs,
  displayOakDivs,
  displayTreeDivs,
  displayBarDivs,
  displayTrashDivs,
  checkTrashDivsDouble,
  addTrashDivs,
  displayRoomLabelDivs,
  addDoorDivs,
  addLightDivs,
  addColumnDivs,
  addTreeDivs,
  addBarDivs,
  addOakDivs,
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
} from "./functions/divs";
import TreeSlider from "../components/p5/TreeSlider";

//////////////
// COMPONENTS
// import Wall from "../components/p5/Wall";
// import Room from "../components/p5/Room";
import Duck from "../components/p5/Duck";
import Dancer from "../components/p5/Dancer";

//////////////
// CONFIG
import {
  GlobalConfig,
  limits,
} from "../../../data/Shows/HomeBody/GlobalConfig";
import { rooms as globalRooms } from "../../../data/Shows/HomeBody/RoomConfig";
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
import HBRoom from "./components/HBRoom";
import { addBots } from "../../../App/useSockets";
var isClosed: boolean;

//////////////
// BUILDING
var walls: any = [];
var rooms: any = [];
var roomTextures: p5Types.Image[] = [];
var eyeIcon: p5Types.Image;
var doors: any = [];
var doorImgs: p5Types.Image[] = [];
var floorTex: p5Types.Image;
var lightImgs: p5Types.Image[] = [];
var tableImgs: p5Types.Image[] = [];
var trashFiles: p5Types.Image[] = [];
var columnGif: p5Types.Image;
var closedSign: p5Types.Image;

//////////////
// PLANTS
var flowerRow: p5Types.Image,
  ivory: p5Types.Image,
  tree: p5Types.Image,
  oakImg: p5Types.Image;
var treeSlider: any;

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
let currentHostStep = 0;

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
    // building textures
    floorTex = p5.loadImage(url + "concrete-512.jpg");
    doorImgs[0] = p5.loadImage(url + "door/frame2.png");
    doorImgs[1] = p5.loadImage(url + "door/leftdoor2.png");
    roomTextures[0] = p5.loadImage(url + "rooms/bot.png");
    roomTextures[1] = p5.loadImage(url + "rooms/right.png");
    roomTextures[2] = p5.loadImage(url + "rooms/left.png");
    eyeIcon = p5.loadImage(url + "eye.png");
    closedSign = p5.loadImage(url + "closed.png");

    //////////////
    // emojis
    duckImg = p5.loadImage(url + "duck.png");
    dancerImgs[0] = p5.loadImage(url + "dancers/dancer0.png");
    dancerImgs[1] = p5.loadImage(url + "dancers/dancer1.png");
    dancerImgs[2] = p5.loadImage(url + "dancers/dancer2.png");
    baby = p5.loadImage(url + "swing/baby.png");
    barEmojis[0] = p5.loadImage(url + "emojis/cookies.png");
    barEmojis[1] = p5.loadImage(url + "emojis/popcorn.png");
    barEmojis[2] = p5.loadImage(url + "emojis/coffee.png");
    barEmojis[3] = p5.loadImage(url + "emojis/beer.png");
    barEmojis[4] = p5.loadImage(url + "emojis/chat.png");
    barEmojis[5] = p5.loadImage(url + "emojis/mic.png");

    //////////////
    // plants
    const pamURL =
      "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/";
    tree = p5.loadImage(url + "grass/tree.png");
    ivory = p5.loadImage(pamURL + "gallery/palm.png");
    flowerRow = p5.loadImage(url + "grass/cac3.png");
    oakImg = p5.loadImage(url + "grass/oak.png");

    //////////////
    // folder icons
    txtFile = p5.loadImage(
      "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/txt.png"
    );
    instaImg = p5.loadImage(url + "instagram.png");
    trashFiles[0] = p5.loadImage(url + "trash/fullrec.png");
    trashFiles[3] = p5.loadImage(url + "trash/trash0.png");
    trashFiles[2] = p5.loadImage(url + "trash/trash1.png");
    trashFiles[1] = p5.loadImage(url + "trash/trash2.png");

    //////////////
    // tables
    tableImgs[0] = p5.loadImage(url + "table/um_open.png");
    tableImgs[1] = p5.loadImage(url + "table/um_closed.png");

    //////////////
    // lights
    lightImgs[0] = p5.loadImage(url + "tracklights/tracklights_vert.jpg");
    lightImgs[1] = p5.loadImage(url + "tracklights/light_shadow.png");
    lightImgs[2] = p5.loadImage(url + "tracklights/tracklights_dark_vert.jpg");
    lightImgs[3] = p5.loadImage(url + "tracklights/black_shadow.png");

    // columnGif = p5.loadImage(url + "column.gif");
    columnGif = p5.loadImage(pamURL + "gallery/column.png"); //not sure why this one has a cors issue

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
    treeSlider = new TreeSlider(31, 40, 2, GlobalConfig);
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
    for (let i = 0; i < 8; i++) {
      ducks.push(new Duck(p5, 300, 2200, duckImg, GlobalConfig));
    }
    dancers[0] = new Dancer(p5, dancerImgs[0], 10, 160, false, danceFloor);
    dancers[1] = new Dancer(p5, dancerImgs[1], 200, 380, false, danceFloor);
    dancers[2] = new Dancer(p5, dancerImgs[2], 300, 150, true, danceFloor);
  };

  initBuilding = (p5: p5Types) => {
    initOuterWalls(p5, walls);
    initHomeBodyWalls(p5, walls);
    // for (let i = 0; i < 2; i++) {
    //   walls.push(new Wall(p5, i, GlobalConfig));
    // }

    for (let i = 0; i < globalRooms.length; i++) {
      rooms.push(new HBRoom(p5, doorImgs[0], i));
    }
  };

  initDivs = (p5: p5Types) => {
    addOakDivs(divs, oakImg, p5);
    addDoorDivs(divs, doors, doorImgs, p5);
    addLightDivs(divs, lightImgs, p5);
    addColumnDivs(divs, columnGif, p5);
    addTreeDivs(divs, tree, p5);
    addTableDivs(divs, tableImgs, p5);
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
    // floors
    drawAllFloors(floorTex, p5);

    //////////////
    // plants
    drawGrassPatch(ivory, ivory, p5);
    drawPlantRow(-5, 17, 1, 1, flowerRow, p5);
    drawPlantRow(0, 22, 1, 1, flowerRow, p5);
    drawPlantRow(5, 27, 1, 1, flowerRow, p5);
    drawPlantRow(20, 21, 1, 1, flowerRow, p5);
    drawPlantRow(27, 15, 1, 1, flowerRow, p5);

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

    //////////////
    // draggable
    displayOakDivs(userEase.x, userEase.y, divs);
    displayTableDivs(userEase.x, userEase.y, divs);
    p5.textFont(font, 10);
    // displaySwingDivs(userEase.x, userEase.y, divs);
    // this.displayOuterWalls(p5);

    // seeUserClicked(userEase, users, p5)

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
    treeSlider.update(p5);
    this.checkFollowHost();
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
    displayTreeDivs(userEase.x, userEase.y, treeSlider.getValue(p5), divs);
    displayLightDivs(userEase.x, userEase.y, divs);
    displayColumnDivs(userEase.x, userEase.y, divs);

    p5.textFont(font, 12);
    displayFolderDivs(divs);
    displayTrashDivs(userEase.x, userEase.y, divs);

    treeSlider.display(p5);

    p5.pop();

    if (
      p5.windowWidth !== window.innerWidth ||
      p5.windowHeight !== window.innerHeight
    )
      this.manualResize(p5);
  };

  // displayOuterWalls = (p5: p5Types) => {
  //   const walls = limits.map(pt => { return { x: pt.x * GlobalConfig.scaler, y: pt.y * GlobalConfig.scaler } });
  //   for (let i = 0; i < walls.length - 1; i++) {
  //     displayWall(walls[i], walls[i + 1], p5);
  //   }

  // }

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
    const { isClosed, isMobile, userNewRoom, toggleOutside } = this.props;
    var t = new Date();
    let space = GlobalConfig.scaler;
    const prevStep = { x: stepTo.x, y: stepTo.y };
    const userStep = { x: stepTo.x + x * space, y: stepTo.y + y * space };
    const outsideDoor = doorCrossing(doors, prevStep, userStep);
    const roomDoorEntry = roomDoorEntryCrossing(rooms, prevStep, userStep);
    const roomDoor = roomDoorCrossing(rooms, prevStep, userStep);
    const roomDoorB = roomDoorBoundary(rooms, prevStep, userStep);

    // const walls = limits.map(pt => { return { x: pt.x * GlobalConfig.scaler, y: pt.y * GlobalConfig.scaler } });

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
    // destination.x = stepTo.x;
    // destination.y = stepTo.y;
    // console.log("stop walking");
  };

  checkFollowHost = () => {
    const { user } = this.props;
    if (user.isFollowingHost) {
      if (currentHostStep === 0 && isWalking === false) {
        isWalking = true;
        const pt = p5ToUserCoords(
          hostBotPoints[0].x,
          hostBotPoints[0].y,
          GlobalConfig
        );
        destination.x = pt.x;
        destination.y = pt.y;
        destination.time = new Date();
      }
    }
  };

  nextHostStep = () => {
    const { user } = this.props;
    if (!user.isFollowingHost) {
      return;
    }
    currentHostStep++;
    console.log("next", currentHostStep);
    if (currentHostStep < hostBotPoints.length) {
      isWalking = true;
      const pt = p5ToUserCoords(
        hostBotPoints[currentHostStep].x,
        hostBotPoints[currentHostStep].y,
        GlobalConfig
      );
      destination.x = pt.x;
      destination.y = pt.y;
      destination.time = new Date();
    } else {
      currentHostStep = 0;
      this.props.setFollowingHost(false);
    }
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
    else if (treeSlider.checkDragging(userEase.x, userEase.y, p5)) return;
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
    // TODO - why running twice??
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
    if (treeSlider) treeSlider.endDrag();
  };

  manualResize = (p5: p5Types) => {
    p5.windowWidth = window.innerWidth;
    p5.windowHeight = window.innerHeight;
    this.windowResized(p5);
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
)(GallerySketch);
