import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { IUser, IUsers } from "../../../interfaces";

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
import {
  reachedDestination,
  getNextStep,
  showMouseLoc,
  showUserEllipses,
  showDestination,
  mouseDidMove,
} from "./functions/destination";
import { drawUser, drawUsers, checkUserClicked } from "./functions/users";
import {
  addTableDivs,
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
} from "./functions/divs";
import {
  drawWalls,
  drawRooms,
  initHomeBodyWalls,
  initOuterWalls,
} from "./functions/building";

import { filterGalleryUsers } from "../../../helpers/helpers";

//////////////
// CONFIG
import { GlobalConfig } from "../../../data/Shows/HomeBody/GlobalConfig";
import { barTenders, danceFloor } from "../../../data/Shows/HomeBody/BotConfig";
import { addBots } from "../../../App/useSockets";
import { rooms as globalRooms } from "../../../data/Shows/HomeBody/RoomConfig";
import HBRoom from "./components/HBRoom";
import Dancer from "../components/p5/Dancer";
import { displayDancers } from "./functions/emojis";

//////////////
// MOVEMENT

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
interface DispatchProps {}

export interface GallerySketch1Props
  extends ComponentProps,
    StateProps,
    DispatchProps {}

export class GallerySketchTemplate1 extends React.Component<GallerySketch1Props> {
  public lmdURL =
    "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/";
  public pamURL =
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/";

  public isWalking = false;

  public galleryId: number = 1;

  public stepTo = { x: 0, y: 0 };
  public userEase = { x: 0, y: 0 };
  public destination = { x: 0, y: 0, time: new Date() };
  public lastMouseMove = new Date();

  public eyeIcon: p5Types.Image | null = null;
  public walls: any = [];
  public rooms: any = [];
  public roomTextures: p5Types.Image[] = [];
  public doors: any = [];
  public doorImgs: p5Types.Image[] = [];
  public floorTex: p5Types.Image | null = null;
  public flowerRow: p5Types.Image | null = null;
  public lightImgs: p5Types.Image[] = [];
  public tableImgs: p5Types.Image[] = [];
  public trashFiles: p5Types.Image[] = [];
  public columnGif: p5Types.Image | null = null;
  public closedSign: p5Types.Image | null = null;
  public font: p5Types.Font | null = null;
  public fontGeo: p5Types.Font | null = null;
  public fontManolo: p5Types.Font | null = null;
  public isClosed: boolean = false;

  //////////////
  // ICONS
  public txtFile: p5Types.Image | null = null;
  public instaImg: p5Types.Image | null = null;

  //////////////
  // EMOJIS
  //   public dancers: any = [];
  public dancerImgs: p5Types.Image[] = [];
  public barEmojis: p5Types.Image[] = [];

  //////////////
  // DRAGGABLE DIVS
  public divs = {};

  public GlobalConfig: typeof GlobalConfig;
  public barTenders: any = [];

  public globalRooms = globalRooms;

  public danceFloor: { x: number; y: number; w: number; h: number };
  public dancers: Dancer[] = [new Dancer(), new Dancer(), new Dancer()];

  constructor(props: GallerySketch1Props) {
    super(props);
    this.GlobalConfig = GlobalConfig;
    this.barTenders = barTenders;
    this.danceFloor = danceFloor;
  }

  preload = (p5: p5Types) => {
    this.preloadRoomTextures(p5);

    this.dancerImgs[0] = p5.loadImage(this.lmdURL + "dancers/dancer0.png");
    this.dancerImgs[1] = p5.loadImage(this.lmdURL + "dancers/dancer1.png");
    this.dancerImgs[2] = p5.loadImage(this.lmdURL + "dancers/dancer2.png");

    this.preloadBarEmojis(p5);

    this.preloadFixtures(p5);
  };

  preloadRoomTextures = (p5: p5Types) => {
    //////////////
    // building textures
    this.floorTex = p5.loadImage(this.lmdURL + "concrete-512.jpg");
    this.doorImgs[0] = p5.loadImage(this.lmdURL + "door/frame2.png");
    this.doorImgs[1] = p5.loadImage(this.lmdURL + "door/leftdoor2.png");
    this.roomTextures[0] = p5.loadImage(this.lmdURL + "rooms/bot.png");
    this.roomTextures[1] = p5.loadImage(this.lmdURL + "rooms/right.png");
    this.roomTextures[2] = p5.loadImage(this.lmdURL + "rooms/left.png");
    this.eyeIcon = p5.loadImage(this.lmdURL + "eye.png");
    this.closedSign = p5.loadImage(this.lmdURL + "closed.png");
  };

  preloadBarEmojis = (p5: p5Types) => {
    this.barEmojis[0] = p5.loadImage(this.lmdURL + "emojis/cheese.png");
    this.barEmojis[1] = p5.loadImage(this.lmdURL + "emojis/bread.png");
    this.barEmojis[2] = p5.loadImage(this.lmdURL + "emojis/wine.png");
    this.barEmojis[3] = p5.loadImage(this.lmdURL + "emojis/cocktail.png");
    this.barEmojis[4] = p5.loadImage(this.lmdURL + "emojis/chat.png");
    this.barEmojis[5] = p5.loadImage(this.lmdURL + "emojis/mic.png");
  };

  preloadFixtures = (p5: p5Types) => {
    //////////////
    // folder icons
    this.txtFile = p5.loadImage(
      "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/txt.png"
    );
    this.instaImg = p5.loadImage(this.lmdURL + "instagram.png");
    this.trashFiles[0] = p5.loadImage(this.lmdURL + "trash/fullrec.png");
    this.trashFiles[3] = p5.loadImage(this.lmdURL + "trash/trash0.png");
    this.trashFiles[2] = p5.loadImage(this.lmdURL + "trash/trash1.png");
    this.trashFiles[1] = p5.loadImage(this.lmdURL + "trash/trash2.png");

    //////////////
    // lights
    this.lightImgs[0] = p5.loadImage(
      this.lmdURL + "tracklights/tracklights_vert.jpg"
    );
    this.lightImgs[1] = p5.loadImage(
      this.lmdURL + "tracklights/light_shadow.png"
    );
    this.lightImgs[2] = p5.loadImage(
      this.lmdURL + "tracklights/tracklights_dark_vert.jpg"
    );
    this.lightImgs[3] = p5.loadImage(
      this.lmdURL + "tracklights/black_shadow.png"
    );

    // columnGif = p5.loadImage(url + "column.gif");
    this.columnGif = p5.loadImage(this.pamURL + "gallery/column.png"); //not sure why this one has a cors issue

    // font
    this.font = p5.loadFont(this.pamURL + "fonts/sysfont.woff");
    this.fontGeo = p5.loadFont(this.pamURL + "fonts/Geo-Regular.ttf");
    this.fontManolo = p5.loadFont(this.pamURL + "fonts/manolo-mono.ttf");

    this.flowerRow = p5.loadImage(this.lmdURL + "grass/cac3.png");
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
    this.initDivs(p5, this.GlobalConfig, this.galleryId);
    this.stepTo.x = user.x;
    this.stepTo.y = user.y;
    this.destination.x = this.stepTo.x;
    this.destination.y = this.stepTo.y;

    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.triggerMove(p5));

    if (this.font) {
      p5.textFont(this.font, 14);
    }
    p5.frameRate(20);
    loadingDone();
    addBots(this.barTenders);
  };

  initEmojis = (p5: p5Types) => {
    this.dancers[0] = new Dancer(
      p5,
      this.dancerImgs[0],
      10,
      160,
      false,
      this.danceFloor
    );
    this.dancers[1] = new Dancer(
      p5,
      this.dancerImgs[1],
      200,
      380,
      false,
      this.danceFloor
    );
    this.dancers[2] = new Dancer(
      p5,
      this.dancerImgs[2],
      300,
      150,
      true,
      this.danceFloor
    );
  };

  initBuilding = (p5: p5Types) => {
    initOuterWalls(p5, this.walls);
    initHomeBodyWalls(p5, this.walls);
    for (let i = 0; i < this.globalRooms.length; i++) {
      this.rooms.push(new HBRoom(p5, this.doorImgs[0], i));
    }
  };

  initDivs = (
    p5: p5Types,
    gconfig: any = this.GlobalConfig,
    galleryId: number = this.galleryId
  ) => {
    if (
      this.columnGif &&
      this.instaImg &&
      this.eyeIcon &&
      this.txtFile &&
      this.font
    ) {
      addDoorDivs(this.divs, this.doors, this.doorImgs, p5);
      addLightDivs(this.divs, this.lightImgs, p5);
      addColumnDivs(this.divs, this.columnGif, p5);
      addTableDivs(this.divs, this.tableImgs, p5);
      addBarDivs(this.divs, this.lightImgs[3], p5, gconfig, galleryId);
      addTrashDivs(this.divs, this.trashFiles, p5);
      addFolderDivs(this.divs, this.instaImg, this.txtFile, p5, gconfig);
      addRoomLabelDivs(this.divs, this.eyeIcon, this.font, p5);
    }
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
    p5.translate(-this.userEase.x, -this.userEase.y);

    p5.push();
    p5.translate(
      this.GlobalConfig.x * this.GlobalConfig.scaler,
      this.GlobalConfig.y * this.GlobalConfig.scaler
    );

    this.displayBackground(p5);

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
    drawUser(user, p5, this.barEmojis);
    this.drawOverUser(p5);

    //////////////
    // updating
    if (users) updateDivs(this.userEase, users, this.divs);
    this.updateUserEase(p5);
    this.checkResize(p5);
  };

  displayBackground = (p5: p5Types) => {
    // override this function

    //////////////
    // building
    drawRooms(this.rooms, this.roomTextures);
    drawWalls(this.walls, p5);
    if (!this.isClosed) displayRoomLabelDivs(this.font, 0, this.divs);
    displayDancers(this.dancers, this.danceFloor, p5);
  };

  debugMove = (p5: p5Types) => {
    p5.fill(0);
    p5.noStroke();
    p5.textSize(20);
    // p5.text(updateObj.destX + " " + updateObj.destY, p5.mouseX, p5.mouseY);
    p5.text(
      p5.round(this.userEase.x) + " " + p5.round(this.userEase.y),
      p5.width / 2,
      p5.height / 2
    );
  };

  drawOverTarget = (p5: p5Types) => {
    const { user, users } = this.props;
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.translate(-this.userEase.x, -this.userEase.y);
    p5.translate(
      this.GlobalConfig.x * this.GlobalConfig.scaler,
      this.GlobalConfig.y * this.GlobalConfig.scaler
    );

    if (users) {
      // p5.textFont(font, 34);
      drawUsers(
        this.userEase,
        filterGalleryUsers(user, users),
        this.font,
        p5,
        this.barEmojis,
        this.GlobalConfig
      );
    }

    p5.pop();
  };

  drawOverUser = (p5: p5Types) => {
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.translate(-this.userEase.x, -this.userEase.y);

    this.displayDivs(p5);
    p5.pop();
  };

  checkResize = (p5: p5Types) => {
    if (
      p5.windowWidth !== window.innerWidth ||
      p5.windowHeight !== window.innerHeight
    )
      this.manualResize(p5);
  };

  displayDivs = (p5: p5Types) => {
    p5.push();
    p5.translate(
      this.GlobalConfig.x * this.GlobalConfig.scaler,
      this.GlobalConfig.y * this.GlobalConfig.scaler
    );
    displayDoorDivs(
      this.userEase.x,
      this.userEase.y,
      this.divs,
      this.isClosed,
      this.closedSign
    );
    displayBarDivs(this.userEase.x, this.userEase.y, this.divs);

    displayLightDivs(this.userEase.x, this.userEase.y, this.divs);
    displayColumnDivs(this.userEase.x, this.userEase.y, this.divs);

    if (this.font) {
      p5.textFont(this.font, 12);
    }
    displayFolderDivs(this.divs);
    displayTrashDivs(this.userEase.x, this.userEase.y, this.divs);
    p5.pop();
  };

  ////////////////////////////////////////////////////////////////////////
  // MOVEMENT
  ////////////////////////////////////////////////////////////////////////
  showTarget = (p5: p5Types) => {
    this.displayTarget(p5, null);
  };

  displayTarget = (p5: p5Types, strokeCol: p5Types.Color | null) => {
    const { isMobile } = this.props;
    showDestination(
      this.userEase,
      this.destination,
      this.isWalking,
      p5,
      strokeCol
    );
    showUserEllipses(
      this.userEase,
      this.destination,
      this.isWalking,
      p5,
      strokeCol
    );

    if (mouseDidMove(p5)) {
      this.lastMouseMove = new Date();
    }
    showMouseLoc(isMobile, this.lastMouseMove, p5, strokeCol);
  };

  userTakeStep = (x: number, y: number) => {
    const { isClosed, isMobile, userNewRoom, toggleOutside } = this.props;
    var t = new Date();
    let space = this.GlobalConfig.scaler;
    const prevStep = { x: this.stepTo.x, y: this.stepTo.y };
    const userStep = {
      x: this.stepTo.x + x * space,
      y: this.stepTo.y + y * space,
    };
    const outsideDoor = doorCrossing(this.doors, prevStep, userStep);
    const roomDoorEntry = roomDoorEntryCrossing(this.rooms, prevStep, userStep);
    const roomDoor = roomDoorCrossing(this.rooms, prevStep, userStep);
    const roomDoorB = roomDoorBoundary(this.rooms, prevStep, userStep);

    // const this.walls = limits.map(pt => { return { x: pt.x * GlobalConfig.scaler, y: pt.y * GlobalConfig.scaler } });

    if (roomDoor) {
      if (!isMobile) {
        if (window.confirm("Leave the main gallery?")) {
          userNewRoom(roomDoor);
        }
      } else {
        userNewRoom(roomDoor);
      }
      this.stopWalking();
    } else if (outsideDoor) {
      this.stepTo.x = userStep.x;
      this.stepTo.y = userStep.y;
      toggleOutside();
    } else if (roomDoorEntry) {
      this.stepTo.x = userStep.x;
      this.stepTo.y = userStep.y;
    } else if (roomBoundary(this.rooms, prevStep, userStep)) {
      this.stopWalking();
    } else if (roomDoorB) {
      this.stopWalking();
    } else if (wallBoundary(this.walls, prevStep, userStep)) {
      this.stopWalking();
    } else {
      this.stepTo.x = userStep.x;
      this.stepTo.y = userStep.y;
    }
  };

  stopWalking = () => {
    this.isWalking = false;
  };

  updateUserEase = (p5: p5Types) => {
    const { userMove } = this.props;
    if (!reachedDestination(this.userEase, this.stepTo)) {
      let amt = 0.7;
      this.userEase.x = this.userEase.x * amt + this.stepTo.x * (1 - amt);
      this.userEase.y = this.userEase.y * amt + this.stepTo.y * (1 - amt);
      let d = p5.dist(
        this.userEase.x,
        this.userEase.y,
        this.stepTo.x,
        this.stepTo.y
      );
      if (d < 15) {
        this.userEase.x = this.stepTo.x;
        this.userEase.y = this.stepTo.y;
        userMove(this.userEase.x, this.userEase.y);
      }
    }
  };

  triggerMove = (p5: p5Types) => {
    if (!(p5.frameCount > 0)) return;
    const { user } = this.props;
    // if (this.props.user.isFollowingHost)
    //   return;

    const { users, setUserActive } = this.props;
    let userClicked = null;
    if (users)
      userClicked = checkUserClicked(
        this.userEase,
        users,
        p5,
        this.GlobalConfig
      );
    if (userClicked) {
      setUserActive(userClicked);
      return;
    } else if (checkDivPress(this.userEase.x, this.userEase.y, this.divs)) {
      return;
    } else {
      let steps = this.GlobalConfig.scaler - 20;
      const dx = p5.mouseX > p5.windowWidth / 2 ? steps : -steps;
      const dy = p5.mouseY > p5.windowHeight / 2 ? steps : -steps;
      const mx = roundToMult2(
        p5.mouseX - p5.windowWidth / 2 + dx,
        this.GlobalConfig.scaler
      );
      const my = roundToMult2(
        p5.mouseY - p5.windowHeight / 2 + dy,
        this.GlobalConfig.scaler
      );

      // console.log(mx, my, dx, dy);
      if (!(mx === 0 && my === 0)) {
        // resolved???
        // TODO - issue is if that destination is a no go, effs up future destinations
        // destination.x += mx;
        // destination.y += my;
        const x = mx + user.x;
        const y = my + user.y;
        this.destination.x = x;
        this.destination.y = y;
        this.destination.time = new Date();
        this.isWalking = true;
      }
    }
  };

  displayFrameRate = (p5: p5Types) => {
    p5.fill(255);
    p5.noStroke();
    p5.textSize(20);
    p5.text(p5.round(p5.frameRate()), 60 - p5.width / 2, 60 - p5.height / 2);
  };

  mouseStep = () => {
    const t = new Date().getTime() - this.destination.time.getTime();
    const { user } = this.props;
    if (this.isWalking) {
      if (reachedDestination(this.stepTo, this.destination)) {
        this.isWalking = false;
      } else if (t > 150) {
        let step = getNextStep(this.stepTo, this.destination);
        this.userTakeStep(step[0], step[1]);
        this.destination.time = new Date();
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
    if (!(p5.frameCount > 0)) return;
    endDivDrag(this.divs);
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
    if (!(p5.frameCount > 0)) return;
    checkFolderDivsDouble(this.userEase.x, this.userEase.y, this.divs);
    checkTrashDivsDouble(this.userEase.x, this.userEase.y, this.divs);
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
