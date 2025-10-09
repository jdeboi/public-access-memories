import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { IGlobalConfig, IRoom, IUser, IUsers } from "../../../interfaces";

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
  checkTrashDivsDouble,
  endDivDrag,
  updateDivs,
  checkDivPress,
  checkFolderDivsDouble,
} from "./functions/divs";
import { drawWalls, drawRooms } from "./functions/building";

import { filterGalleryUsersPage } from "../../../helpers/helpers";

//////////////
// CONFIG
import { addBots } from "../../../App/useSockets";
import Dancer from "../components/p5/Dancer";
import { userToWorldCoords } from "../../../helpers/coordinates";

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

export interface GallerySketch1Props
  extends ComponentProps,
    StateProps,
    DispatchProps {}

export class GallerySketchTemplate1<
  P extends GallerySketch1Props = GallerySketch1Props
> extends React.Component<P> {
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

  private otherEase = new Map<string, { x: number; y: number }>();

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
  public divs: any = {};

  public GlobalConfig: IGlobalConfig | null = null;
  public barTenders: any = null;

  public globalRooms: IRoom[] = [];
  public limits: { x: number; y: number }[] = [];

  public danceFloor: { x: number; y: number; w: number; h: number } | null =
    null;
  public dancers: Dancer[] = [new Dancer(), new Dancer(), new Dancer()];

  private easeTauSec = 0.12;

  constructor(props: P) {
    super(props);
    // this.GlobalConfig = GlobalConfig;
    // this.barTenders = barTenders;
    // this.danceFloor = danceFloor;
  }

  preload = (p5: p5Types) => {
    this.preloadRoomTextures(p5);

    this.dancerImgs[0] = p5.loadImage(this.lmdURL + "dancers/dancer0.png");
    this.dancerImgs[1] = p5.loadImage(this.lmdURL + "dancers/dancer1.png");
    this.dancerImgs[2] = p5.loadImage(this.lmdURL + "dancers/dancer2.png");

    this.preloadBarEmojis(p5);

    this.preloadFixtures(p5);
    this.preloadContent(p5);
  };

  preloadContent = (p5: p5Types) => {
    // override this function
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
    this.trashFiles[4] = p5.loadImage(
      "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/loop/folder.png"
    );

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
    const { loadingDone } = this.props;
    const userPos = this.getUserStoreCoords();
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)

    this.initBuilding(p5);
    this.initEmojis(p5);
    this.initDivs(p5);
    this.stepTo.x = userPos.x;
    this.stepTo.y = userPos.y;
    this.destination.x = this.stepTo.x;
    this.destination.y = this.stepTo.y;

    const cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
    cnv.parent(canvasParentRef);
    cnv.mousePressed(() => this.triggerMove(p5));

    this.setupContent(p5);

    if (this.font) {
      p5.textFont(this.font, 14);
    }
    p5.frameRate(30);
    loadingDone();

    // if (this.barTenders) addBots(this.barTenders);
  };

  setupContent = (p5: p5Types) => {
    // override this function
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

  initDivs = (p5: p5Types) => {
    // if (
    //   this.columnGif &&
    //   this.instaImg &&
    //   this.eyeIcon &&
    //   this.txtFile &&
    //   this.font
    // ) {
    //   // addDoorDivs(this.divs, this.doors, this.doorImgs, p5);
    //   addLightDivs(this.divs, this.lightImgs, p5, this.GlobalConfig, [
    //     { x: 22.5, y: 7, isFlipped: false },
    //     { x: 8, y: 15, isFlipped: true },
    //     { x: 13, y: 20, isFlipped: false },
    //   ]);
    //   addColumnDivs(this.divs, this.columnGif, p5);
    //   // addTableDivs(this.divs, this.tableImgs, p5);
    //   addBarDivs(
    //     this.divs,
    //     this.lightImgs[3],
    //     p5,
    //     this.GlobalConfig,
    //     this.galleryId
    //   );
    //   addTrashDivs(this.divs, this.trashFiles, p5);
    //   addFolderDivs(
    //     this.divs,
    //     this.instaImg,
    //     this.txtFile,
    //     p5,
    //     this.GlobalConfig,
    //     [
    //       {
    //         x: 25.5 * this.GlobalConfig.scaler,
    //         y: 26.5 * this.GlobalConfig.scaler,
    //       },
    //     ]
    //   );
    // addRoomLabelDivs(this.divs, this.eyeIcon, this.font, p5);
    // }
  };

  ////////////////////////////////////////////////////////////////////////
  // DRAW
  ////////////////////////////////////////////////////////////////////////
  draw = (p5: p5Types) => {
    const { user } = this.props;
    const users = this.getRoomUsers();

    p5.clear(0, 0, 0, 0);
    this.displayBackground(p5);

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);

    p5.push();
    p5.translate(-this.userEase.x, -this.userEase.y);

    p5.push();
    this.worldTranslate(p5);

    this.displayBuilding(p5);
    this.displayScene(p5);

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
    this.displayOverUserScene(p5);

    this.displayOverUserStatic(p5);
    //////////////
    // updating
    if (users) updateDivs(this.userEase, users, this.divs);
    this.updateUserEase(p5);
    this.checkResize(p5);
  };

  displayBackground = (p5: p5Types) => {
    p5.clear(0, 0, 0, 0);
  };

  displayBuilding = (p5: p5Types) => {
    drawRooms(this.rooms, this.roomTextures);
    drawWalls(this.walls, p5);
  };

  displayScene = (p5: p5Types) => {
    // override this function
    // if (this.danceFloor && this.dancers) {
    //   displayDancers(this.dancers, this.danceFloor, p5);
    // }
  };

  displayOverUserStatic = (p5: p5Types) => {
    // override this function
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

  getRoomUsers = () => {
    const { user, users, roomPath } = this.props;
    const filteredUsers = filterGalleryUsersPage(user, users, roomPath);
    return filteredUsers;
  };

  drawOverTarget = (p5: p5Types) => {
    const usersRaw = this.getRoomUsers();
    const usersEased = usersRaw ? this.getEasedUsers(usersRaw) : null;

    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.translate(-this.userEase.x, -this.userEase.y);
    this.worldTranslate(p5);
    if (usersEased) {
      drawUsers(
        this.userEase,
        usersEased,
        this.font,
        p5,
        this.barEmojis,
        this.GlobalConfig,
        this.props.roomPath
      );
    }

    p5.pop();
  };

  displayOverUserScene = (p5: p5Types) => {
    // override this function
    p5.push();
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.translate(-this.userEase.x, -this.userEase.y);
    this.worldTranslate(p5);
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

  worldTranslate = (p5: p5Types) => {
    if (this.GlobalConfig) {
      p5.translate(
        this.GlobalConfig.x * this.GlobalConfig.scaler,
        this.GlobalConfig.y * this.GlobalConfig.scaler
      );
    }
  };

  displayDivs = (p5: p5Types) => {
    // p5.push();
    // this.worldTranslate(p5);
    // displayDoorDivs(
    //   this.userEase.x,
    //   this.userEase.y,
    //   this.divs,
    //   this.isClosed,
    //   this.closedSign
    // );
    // displayBarDivs(this.userEase.x, this.userEase.y, this.divs);
    // displayLightDivs(this.userEase.x, this.userEase.y, this.divs);
    // displayColumnDivs(this.userEase.x, this.userEase.y, this.divs);
    // if (this.font) {
    //   p5.textFont(this.font, 12);
    // }
    // displayFolderDivs(this.divs);
    // displayTrashDivs(this.userEase.x, this.userEase.y, this.divs);
    // p5.pop();
  };

  ////////////////////////////////////////////////////////////////////////
  // MOVEMENT
  ////////////////////////////////////////////////////////////////////////
  showTarget = (p5: p5Types) => {
    this.displayTarget(p5);
  };

  distanceToUser = (x: number, y: number) => {
    const pos = userToWorldCoords(x, y, this.GlobalConfig);
    return p5Types.prototype.dist(
      this.userEase.x,
      this.userEase.y,
      pos.x - 50,
      pos.y - 50
    );
  };

  displayTarget = (p5: p5Types, strokeCol?: p5Types.Color | undefined) => {
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
    let space = this.GlobalConfig?.scaler || 50;
    const prevStep = { x: this.stepTo.x, y: this.stepTo.y };
    const userStep = {
      x: this.stepTo.x + x * space,
      y: this.stepTo.y + y * space,
    };
    const outsideDoor = doorCrossing(this.doors, prevStep, userStep);
    const roomDoorEntry = this.rooms
      ? roomDoorEntryCrossing(this.rooms, prevStep, userStep)
      : null;
    const roomDoor = this.rooms
      ? roomDoorCrossing(this.rooms, prevStep, userStep)
      : null;
    const roomDoorB = this.rooms
      ? roomDoorBoundary(this.rooms, prevStep, userStep)
      : null;

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
    // time-based smoothing (EMA)
    const dt = Math.min(0.05, Math.max(0.001, p5.deltaTime / 1000)); // clamp 1–50ms
    const k = 1 - Math.exp(-dt / this.easeTauSec); // convert tau -> per-frame gain

    this.userEase.x += (this.stepTo.x - this.userEase.x) * k;
    this.userEase.y += (this.stepTo.y - this.userEase.y) * k;

    const d = p5.dist(
      this.userEase.x,
      this.userEase.y,
      this.stepTo.x,
      this.stepTo.y
    );
    if (d < 0.5) {
      this.userEase.x = this.stepTo.x;
      this.userEase.y = this.stepTo.y;
      this.props.userMove(this.userEase.x, this.userEase.y);
    }
  };

  getGlobalScaler = () => {
    return this.GlobalConfig?.scaler || 50;
  };

  getUserStoreCoords = () => {
    const { useRoomCoords, user } = this.props;
    const pos = {
      x: useRoomCoords ? user.roomX : user.x,
      y: useRoomCoords ? user.roomY : user.y,
    };
    return pos;
  };

  triggerMove = (p5: p5Types) => {
    if (!(p5.frameCount > 0)) return;
    const userPos = this.getUserStoreCoords();

    const { setUserActive } = this.props;
    const users = this.getRoomUsers();

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
      let steps = this.getGlobalScaler() - 20;
      const dx = p5.mouseX > p5.windowWidth / 2 ? steps : -steps;
      const dy = p5.mouseY > p5.windowHeight / 2 ? steps : -steps;
      const mx = roundToMult2(
        p5.mouseX - p5.windowWidth / 2 + dx,
        this.getGlobalScaler()
      );
      const my = roundToMult2(
        p5.mouseY - p5.windowHeight / 2 + dy,
        this.getGlobalScaler()
      );

      // console.log(mx, my, dx, dy);
      if (!(mx === 0 && my === 0)) {
        // resolved???
        // TODO - issue is if that destination is a no go, effs up future destinations
        // destination.x += mx;
        // destination.y += my;
        const x = mx + userPos.x;
        const y = my + userPos.y;
        this.destination.x = x;
        this.destination.y = y;
        this.destination.time = new Date();
        this.isWalking = true;
      }
    }
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

  displayFrameRate = (p5: p5Types) => {
    p5.fill(255);

    p5.noStroke();
    if (this.font) p5.textFont(this.font, 20);
    p5.textSize(30);
    p5.text(p5.round(p5.frameRate()), 100, 100);
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
