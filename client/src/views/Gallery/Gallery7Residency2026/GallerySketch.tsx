import p5Types from "p5";
import {
  GallerySketchTemplate1,
  GallerySketch1Props,
} from "../Gallery1/GallerySketchTemplate1";

// Gallery1 shared crossing helpers
import {
  doorCrossing,
  roomDoorCrossing,
  roomDoorEntryCrossing,
  roomDoorBoundary,
  roomBoundary,
  wallBoundary,
} from "../Gallery1/functions/crossing";

// Gallery7-local building / divs
import {
  drawGalleryGround,
  drawConcreteTileLine,
  drawColumns,
  drawRooms,
  drawWalls,
  initOuterWalls,
} from "./functions/building";
import {
  addLightDivs,
  // addDoorDivs,
  addBarDivs,
  addTableDiv,
  addEaselDiv,
  displayAllDivs,
} from "./functions/divs";

// Config
import { GlobalConfig } from "../../../data/Shows/Residency2026/GlobalConfig";
import {
  artists,
  rooms as globalRooms,
  roomConfig,
} from "../../../data/Shows/Residency2026/RoomConfig";
import {
  danceFloor,
  barTenders,
} from "../../../data/Shows/Residency2026/BotConfig";
import { RESIDENCY2026_ID } from "../../../data/CurrentShow/GalleryConfig";

// Room component (display logic identical to Residency)
import ResidencyRoom from "../Gallery0Residency/components/ResidencyRoom";
import { Pipes2026 } from "./components/Pipes2026";

// URLs
import { LMD_URL, PAM_URL } from "../functions/loadImages";

// Floor grid: x [-5, 27), y [-3, 22) in world units
const FLOOR_COLS = 32;
const FLOOR_ROWS = 25;
const FLOOR_X0 = -5; // world-unit left edge
const FLOOR_Y0 = -3; // world-unit top edge

export default class GallerySketch extends GallerySketchTemplate1 {
  roomTextures: p5Types.Image[] = [];
  otherImgs: p5Types.Image[] = [];
  floorTex1: p5Types.Image | null = null;
  tableImg: p5Types.Image | null = null;
  stoolImg: p5Types.Image | null = null;
  easelImg: p5Types.Image | null = null;
  pipesImg: p5Types.Image | null = null;
  concreteTiles1Img: p5Types.Image | null = null;
  pipes2026: Pipes2026 | null = null;

  constructor(props: GallerySketch1Props) {
    super(props);
    this.GlobalConfig = GlobalConfig;
    this.barTenders = barTenders;
    this.danceFloor = danceFloor;
    this.globalRooms = globalRooms;
    this.galleryId = RESIDENCY2026_ID;
  }

  preloadRoomTextures = (p5: p5Types) => {
    this.doorImgs[0] = p5.loadImage(LMD_URL + "door/frame2.png");
    this.doorImgs[1] = p5.loadImage(LMD_URL + "door/leftdoor2.png");
    this.roomTextures[0] = p5.loadImage(
      PAM_URL + "residency/assets/openLightStudioDoor.jpg",
    );
    this.roomTextures[1] = p5.loadImage(
      PAM_URL + "residency/assets/closedLightStudioDoor.jpg",
    );
    this.roomTextures[2] = p5.loadImage(
      PAM_URL + "residency/assets/lightsOffDoorOpen.jpg",
    );
    this.roomTextures[3] = p5.loadImage(
      PAM_URL + "residency/assets/lightsOffDoorClosed.jpg",
    );
    this.roomTextures[4] = p5.loadImage(
      PAM_URL + "residency/assets/lounge.jpg",
    );
    this.eyeIcon = p5.loadImage(LMD_URL + "eye.png");
    // two concrete textures — randomly mixed per tile
    this.floorTex = p5.loadImage("/online_assets/residency2026/concrete_0.png");
    this.floorTex1 = p5.loadImage(
      "/online_assets/residency2026/concrete_1.png",
    );
  };

  preloadBarEmojis = (p5: p5Types) => {
    this.barEmojis[0] = p5.loadImage(LMD_URL + "emojis/popcorn.png");
    this.barEmojis[1] = p5.loadImage(LMD_URL + "emojis/beer.png");
    this.barEmojis[2] = p5.loadImage(LMD_URL + "emojis/coffee.png");
  };

  preloadContent = (p5: p5Types) => {
    this.otherImgs[0] = p5.loadImage(
      PAM_URL + "residency/assets/redCircle.png",
    );
    this.otherImgs[1] = p5.loadImage(
      PAM_URL + "residency/assets/greenCircle.png",
    );
    // override the template's column with the local residency2026 version
    this.columnGif = p5.loadImage("/online_assets/residency2026/column.png");
    this.tableImg = p5.loadImage("/online_assets/residency2026/table.png");
    this.stoolImg = p5.loadImage("/online_assets/residency2026/stool.png");
    this.easelImg = p5.loadImage("/online_assets/residency2026/easel2.png");
    this.pipesImg = p5.loadImage("/online_assets/residency2026/pipes.png");
    this.concreteTiles1Img = p5.loadImage(
      "/online_assets/residency2026/concrete_tiles1.jpg",
    );
  };

  setupContent = (p5: p5Types) => {
    p5.pixelDensity(2);
    p5.frameRate(20);
    this.pipes2026 = new Pipes2026(FLOOR_COLS, FLOOR_ROWS, GlobalConfig.scaler);
    this.pipes2026.init(p5);
  };

  initBuilding = (p5: p5Types) => {
    initOuterWalls(p5, this.walls);
    for (let i = 0; i < this.globalRooms.length; i++) {
      this.rooms.push(
        new ResidencyRoom(
          p5,
          this.doorImgs[0],
          i,
          GlobalConfig,
          roomConfig,
          artists,
          globalRooms,
        ),
      );
    }
  };

  initDivs = (p5: p5Types) => {
    // addDoorDivs(this.divs, this.doors, this.doorImgs, p5);
    addLightDivs(this.divs, this.lightImgs, p5);
    addBarDivs(this.divs, this.lightImgs[3], p5);
    if (this.tableImg && this.stoolImg) {
      addTableDiv(this.divs, this.tableImg, this.stoolImg, p5);
    }
    if (this.easelImg) {
      addEaselDiv(this.divs, this.easelImg, p5);
    }
  };

  displayBackground = (p5: p5Types) => {
    p5.clear(0, 0, 0, 0);
  };

  pipesDraw = (p5: p5Types) => {
    if (this.pipes2026) {
      const sc = GlobalConfig.scaler;

      this.pipes2026.update();
      const pg = this.pipes2026.getGraphics();
      if (pg) {
        p5.image(
          pg,
          FLOOR_X0 * sc,
          FLOOR_Y0 * sc,
          FLOOR_COLS * sc,
          FLOOR_ROWS * sc,
        );
      }
    }
  };
  displayBuilding = (p5: p5Types) => {
    // Pipes screensaver — drawn first, clipped to floor bounds
    // this.pipesDraw(p5);

    // Floor: concrete tiles drawn at partial alpha so pipes show through
    if (this.floorTex && this.floorTex1) {
      // p5.tint(255, 245);
      drawGalleryGround(this.floorTex, this.floorTex1, p5);
      // p5.noTint();
    }

    if (this.concreteTiles1Img) {
      drawConcreteTileLine(this.concreteTiles1Img, p5);
    }

    if (this.font) p5.textFont(this.font, 12);

    if (this.pipesImg && this.pipesImg.width > 0) {
      const img = this.pipesImg;
      const sc = GlobalConfig.scaler;
      const HALF_LIGHT_W_PX = 150;
      const pipeW = HALF_LIGHT_W_PX * 2;
      const pipeH = pipeW * (img.height / img.width);
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 10; c++) {
          const x = c * 3 - 5;
          const y = r * 14 - 2.3;
          p5.image(img, x * sc, y * sc, pipeW, pipeH);
        }
      }
    }
    // Columns: static (not draggable), drawn directly
    if (this.columnGif) drawColumns(this.columnGif, p5);

    const localUser = {
      ...this.props.user,
      x: this.stepTo.x,
      y: this.stepTo.y,
    };
    drawRooms(
      this.rooms,
      this.roomTextures,
      this.otherImgs,
      this.props.users,
      localUser,
      p5,
    );

    drawWalls(this.walls, p5);
  };

  // Called before drawUser — table+stools and easel render under the emoji
  displayScene = (_p5: p5Types) => {
    if (this.divs.table2026) {
      for (const table of this.divs.table2026) {
        table.display(this.userEase.x, this.userEase.y);
      }
    }
    if (this.divs.easel2026) {
      for (const easel of this.divs.easel2026) {
        easel.display(this.userEase.x, this.userEase.y);
      }
    }
  };

  displayOverUserStatic = (p5: p5Types) => {
    if (!this.divs.easel2026) return;
    for (const easel of this.divs.easel2026) {
      if (easel.isOverCanvas) {
        p5.push();
        p5.textSize(28);
        p5.textAlign(p5.LEFT, p5.BOTTOM);
        p5.noStroke();
        p5.text("🖌️", p5.mouseX, p5.mouseY);
        p5.pop();
      }
    }
  };

  displayDivs = (_p5: p5Types) => {
    displayAllDivs(this.userEase.x, this.userEase.y, this.divs);
  };

  userTakeStep = (x: number, y: number) => {
    const { isMobile, userNewRoom, toggleOutside } = this.props;
    const space = this.GlobalConfig?.scaler ?? 50;
    const prevStep = { x: this.stepTo.x, y: this.stepTo.y };
    const userStep = {
      x: this.stepTo.x + x * space,
      y: this.stepTo.y + y * space,
    };

    const outsideDoor = doorCrossing(this.doors, prevStep, userStep);
    const roomDoorEntry = roomDoorEntryCrossing(this.rooms, prevStep, userStep);
    const roomDoor = roomDoorCrossing(this.rooms, prevStep, userStep);
    const roomDoorB = roomDoorBoundary(this.rooms, prevStep, userStep);

    if (roomDoor) {
      if (!isMobile) {
        if (window.confirm("Enter this artist studio?")) userNewRoom(roomDoor);
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
}
