import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import {
  IGlobalConfig,
  IRoom,
  IUser,
  IUsers,
  IWindowUI,
} from "../../../interfaces";

//////////////
// HELPERS

import {
  reachedDestination,
  showMouseLoc,
  showUserEllipses,
  showDestination,
  mouseDidMove,
} from "./functions/destination";
import {
  drawUser,
  drawUsers,
  checkUserClicked,
  checkUserClickedNormalRoom,
  drawUsersRoomCoords,
} from "./functions/users";
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
  addBlindsDiv,
} from "../Gallery4HomeOffices/functions/divs";

import {
  filterGalleryUsers,
  filterGalleryUsersPage,
} from "../../../helpers/helpers";

//////////////
// CONFIG
import { GlobalConfig } from "../../../data/Shows/HomeOffices/GlobalConfig";
// import { barTenders, danceFloor } from "../../../data/Shows/HomeBody/BotConfig";
import { addBots } from "../../../App/useSockets";
// import { rooms as globalRooms } from "../../../data/Shows/HomeBody/RoomConfig";
import Dancer from "../components/p5/Dancer";
// import { displayDancers } from "./functions/emojis";
import { getNextStep } from "../Gallery4HomeOffices/functions/destination";

//////////////
// MOVEMENT

interface ComponentProps {
  useRoomCoords: boolean;
  users: IUsers;
  isClosed: boolean;
  userMove: (x: number, y: number) => void;
  userNewRoom: (room: string) => void;
  loadingDone: () => void;
  toggleOutside: () => void;
  windowUI: IWindowUI;
  isMobile: boolean;
  setUserActive: (user: IUser) => void;
  clickedUserChat: (user: IUser) => void;
  roomPath: string;
}

// redux props
interface StateProps {
  user: IUser;
}
interface DispatchProps {}

export interface GallerySketch2Props
  extends ComponentProps,
    StateProps,
    DispatchProps {}

export class GallerySketchTemplate2 extends React.Component<GallerySketch2Props> {
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

  public GlobalConfig: IGlobalConfig | null = null;
  public barTenders: any = null;

  public globalRooms: IRoom[] = [];

  public danceFloor: { x: number; y: number; w: number; h: number } | null =
    null;
  public dancers: Dancer[] = [new Dancer(), new Dancer(), new Dancer()];

  public movement = {
    isWalking: false,
    stepTo: { x: 0, y: 0 },
    userEase: { x: 0, y: 0 },
    destination: { x: 0, y: 0, time: new Date() },
    lastMouseMove: new Date(),
    lastStepTime: 0,
  };

  private otherEase = new Map<string, { x: number; y: number }>();

  constructor(props: GallerySketch2Props) {
    super(props);
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
  };

  ////////////////////////////////////////////////////////////////////////
  // INITIALIZE
  ////////////////////////////////////////////////////////////////////////
  setup = (p5: p5Types, canvasParentRef: Element) => {
    const { loadingDone } = this.props;
    const userPos = this.getUserStoreCoords();
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)

    this.initBuilding(p5);
    this.initEmojis(p5);
    this.initDivs(p5, this.GlobalConfig, this.galleryId);
    this.stepTo.x = userPos.x;
    this.stepTo.y = userPos.y;
    this.destination.x = this.stepTo.x;
    this.destination.y = this.stepTo.y;

    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.triggerMove(p5));

    if (this.font) {
      p5.textFont(this.font, 14);
    }
    p5.frameRate(20);

    if (this.barTenders) addBots(this.barTenders);

    p5.pixelDensity(2);

    this.setUserInitialPosition(p5);
    loadingDone();
  };

  setUserInitialPosition = (p5: p5Types) => {
    let dx = Math.floor(p5.random(-20, 20));
    let dy = Math.floor(p5.random(-20, 20));
    let x = Math.floor(p5.width / 2 + dx);
    let y = Math.floor(p5.height / 2 + dy);
    this.setUserPositionImmediate(x, y);
  };

  getUserStoreCoords = () => {
    const { useRoomCoords, user } = this.props;
    const pos = {
      x: useRoomCoords ? user.roomX : user.x,
      y: useRoomCoords ? user.roomY : user.y,
    };
    return pos;
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
    // initOuterWalls(p5, this.walls);
    // initHomeBodyWalls(p5, this.walls);
    // for (let i = 0; i < this.globalRooms.length; i++) {
    //   this.rooms.push(new HBRoom(p5, this.doorImgs[0], i));
    // }
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
      addLightDivs(this.divs, this.lightImgs, p5);
      addColumnDivs(this.divs, this.columnGif, p5);
      //   addBarDivs(this.divs, this.lightImgs[3], p5, gconfig, galleryId);
      addTrashDivs(this.divs, this.trashFiles, p5);
      //   addFolderDivs(this.divs, this.instaImg, this.txtFile, p5, gconfig);
    }
  };

  draw = (p5: p5Types) => {
    p5.push();

    const { user, roomPath } = this.props;

    p5.clear(0, 0, 0, 0);
    this.drawSceneBack(p5);

    const usersRaw = this.getRoomUsers();
    const usersEased = usersRaw ? this.getEasedUsers(usersRaw) : null;
    if (usersEased && this.font) {
      p5.textFont(this.font, 34);
      drawUsersRoomCoords(user, usersEased, roomPath, this.font, p5, []);
    }

    p5.push();
    p5.translate(-p5.width / 2, -p5.height / 2);
    p5.translate(this.movement.userEase.x, this.movement.userEase.y);
    drawUser(user, p5, []);
    p5.pop();

    this.drawSceneFront(p5);

    //////////////
    // step visualization
    this.mouseStep(p5);
    this.showTarget(p5);

    this.drawOverTarget(p5);
    this.drawOverUser(p5);

    p5.noStroke();
    p5.fill(255);
    // p5.textFont(font, 30);

    this.updateUserEase(p5);
    if (
      p5.width !== this.props.windowUI.contentW ||
      p5.height !== this.props.windowUI.contentH
    )
      this.manualResize(p5);

    // this.displayFrameRate(p5);
    p5.pop();
  };

  ////////////////////////////////////////////////////////////////////////

  drawSceneBack(p5: p5Types) {}

  drawSceneFront(p5: p5Types) {}

  ////////////////////////////////////////////////////////////////////

  displayFrameRate = (p5: p5Types) => {
    p5.fill(0);
    p5.noStroke();
    // p5.textFont(font, 12);
    p5.text(p5.round(p5.frameRate()), 30, 30);
  };

  getRoomUsers = () => {
    const { user, users, roomPath } = this.props;
    const filteredUsers = filterGalleryUsersPage(user, users, roomPath);
    // console.log(users, filteredUsers, this.props.roomPath);
    return filteredUsers;
  };

  drawOverTarget = (p5: p5Types) => {};

  drawOverUser = (p5: p5Types) => {
    p5.push();

    // p5.textFont(font, 12);
    // displayFolderDivs(room, divs);

    p5.pop();
  };

  distanceToUser = (x: number, y: number) => {
    const { userEase, destination, isWalking } = this.movement;
    return p5Types.prototype.dist(userEase.x, userEase.y, x, y);
  };

  checkResize = (p5: p5Types) => {
    if (
      p5.windowWidth !== window.innerWidth ||
      p5.windowHeight !== window.innerHeight
    )
      this.manualResize(p5);
  };

  manualResize = (p5: p5Types) => {
    p5.windowWidth = window.innerWidth;
    p5.windowHeight = window.innerHeight;
    this.windowResized(p5);
  };

  ////////////////////////////////////////////////////////////////////////
  // MOVEMENT
  ////////////////////////////////////////////////////////////////////////
  showTarget = (p5: p5Types) => {
    const { windowUI } = this.props;
    const { userEase, destination, isWalking } = this.movement;

    if (mouseDidMove(p5)) {
      this.movement.lastMouseMove = new Date();
    }
    // showMouseLoc(windowUI.isMobile, this.movement.lastMouseMove, p5);
  };

  userTakeStep = (p5: p5Types, x: number, y: number) => {
    const { stepTo } = this.movement;
    this.movement.lastStepTime = p5.millis();

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
    this.movement.isWalking = false;
  };

  setUserPosition = (x: number, y: number) => {
    this.stopWalking();
    this.movement.stepTo.x = x;
    this.movement.stepTo.y = y;
    this.movement.destination.x = x;
    this.movement.destination.y = y;
    this.props.userMove(x, y);
  };

  setUserPositionImmediate = (x: number, y: number) => {
    this.stopWalking();
    this.movement.userEase.x = x;
    this.movement.userEase.y = y;
    this.movement.stepTo.x = x;
    this.movement.stepTo.y = y;
    this.movement.destination.x = x;
    this.movement.destination.y = y;
    this.props.userMove(x, y);
  };

  updateUserEase = (p5: p5Types) => {
    const { userMove } = this.props;
    const { userEase, stepTo } = this.movement;
    if (!reachedDestination(userEase, stepTo)) {
      let amt = 0.7;
      userEase.x = userEase.x * amt + stepTo.x * (1 - amt);
      userEase.y = userEase.y * amt + stepTo.y * (1 - amt);
      let d = p5.dist(userEase.x, userEase.y, stepTo.x, stepTo.y);
      if (d < 15) {
        this.movement.userEase.x = stepTo.x;
        this.movement.userEase.y = stepTo.y;
        userMove(userEase.x, userEase.y);
      }
    }
  };

  triggerMove = (p5: p5Types) => {
    const { user, setUserActive } = this.props;
    const users = this.getRoomUsers();

    let userClicked = null;

    if (users)
      userClicked = checkUserClickedNormalRoom(
        user,
        users,
        p5,
        this.props.roomPath
      );
    if (userClicked) {
      setUserActive(userClicked);
      return;
    } else if (checkDivPress(0, this.divs)) {
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
        this.movement.destination.x = x;
        this.movement.destination.y = y;
        this.movement.destination.time = new Date();
        this.movement.isWalking = true;
      }
    }
  };

  mouseStep = (p5: p5Types) => {
    const t = new Date().getTime() - this.movement.destination.time.getTime();
    const { user } = this.props;
    if (this.movement.isWalking) {
      // if it's in the corner, stop moving

      if (reachedDestination(this.movement.stepTo, this.movement.destination)) {
        this.setUserPositionImmediate(
          this.movement.destination.x,
          this.movement.destination.y
        );
        this.movement.isWalking = false;
      } else if (t > 150) {
        let step = getNextStep(
          this.movement.stepTo,
          this.movement.destination,
          true
        );
        this.userTakeStep(p5, step[0], step[1]);
        this.movement.destination.time = new Date();
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
      endDivDrag(this.divs);
    }
  };

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

  // key selector you already have on IUser; fall back to userName if needed
  private getUserKey = (u: IUser) => u.id ?? u.userName ?? String(u);
  private getEasedUsers = (users: IUsers): IUsers => {
    const mode: "room" | "screen" = this.props.useRoomCoords
      ? "room"
      : "screen";

    const easedUsers: IUsers = [];
    const alpha = 0.15; // smoothing factor (0..1)
    const snapIfDistGt = 300; // px

    const liveKeys = new Set<string>();
    const suffix = mode === "room" ? ":r" : ":s";

    for (const u of users) {
      const key = this.getUserKey(u) + suffix;
      liveKeys.add(key);

      // read target based on current mode, with safe fallbacks
      const tx = mode === "room" ? u.roomX ?? u.x ?? 0 : u.x ?? u.roomX ?? 0;
      const ty = mode === "room" ? u.roomY ?? u.y ?? 0 : u.y ?? u.roomY ?? 0;

      // seed or update eased position
      let s = this.otherEase.get(key);
      if (!s) {
        s = { x: tx, y: ty };
        this.otherEase.set(key, s);
      } else {
        const dx = tx - s.x;
        const dy = ty - s.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > snapIfDistGt * snapIfDistGt) {
          s.x = tx;
          s.y = ty; // big teleport: snap
        } else {
          s.x += dx * alpha; // ease
          s.y += dy * alpha;
        }
      }

      // For rendering only: set the active coord pair AND mirror into the other pair
      // so both draw paths (room coords vs screen coords) see eased values.
      const eased =
        mode === "room"
          ? { ...u, roomX: s.x, roomY: s.y, x: s.x, y: s.y }
          : { ...u, x: s.x, y: s.y, roomX: s.x, roomY: s.y };

      easedUsers.push(eased);
    }

    // cleanup stale cache entries
    for (const k of Array.from(this.otherEase.keys())) {
      if (!liveKeys.has(k)) this.otherEase.delete(k);
    }

    return easedUsers;
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
          keyPressed={this.keyPressed}
          mouseReleased={this.mouseReleased}
          doubleClicked={this.doubleClicked}
        />
      </>
    );
  }
}
