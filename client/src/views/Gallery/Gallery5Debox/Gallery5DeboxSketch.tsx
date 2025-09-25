import p5Types from "p5";
import {
  GallerySketchTemplate1,
  GallerySketch1Props,
} from "../Gallery1/GallerySketchTemplate1";

import { limits, GlobalConfig } from "../../../data/Shows/Debox/GlobalConfig";
import { rooms as globalRooms } from "../../../data/Shows/Debox/RoomConfig";
import { barTenders, danceFloor } from "../../../data/Shows/Debox/BotConfig";
import {
  addLightDivs,
  display2D3DGridPlanes,
  displayBarDivs,
  drawAllFloors,
  drawRooms,
  roomDoorEntry,
} from "./functions/building";
import DeboxRoom from "./components/DeboxRoom";
import { drawWalls, initOuterWalls } from "../Gallery1/functions/building";
import { wallBoundary } from "../Gallery1/functions/crossing";
import {
  addBarDivs,
  addColumnDivs,
  addFolderDivs,
  displayColumnDivs,
  displayFolderDivs,
  displayLightDivs,
} from "../Gallery1/functions/divs";
import { DEBOX_ID } from "../../../data/CurrentShow/GalleryConfig";
import { displayDancers } from "../Gallery1/functions/emojis";
import Dancer from "../components/p5/Dancer";

export default class Gallery5DeboxSketch extends GallerySketchTemplate1 {
  roomsPerLayer: number[] = [1, 3, 5, 1];
  // strongly type this so we remember it’s 2D, of DeboxRoom instances
  neuralNetRooms: DeboxRoom[][] = [];
  limits: any;

  constructor(props: GallerySketch1Props) {
    super(props);
    this.GlobalConfig = GlobalConfig;
    this.barTenders = barTenders;
    this.globalRooms = globalRooms;
    this.limits = limits;
    this.galleryId = DEBOX_ID;
    this.danceFloor = danceFloor;
  }

  initNodes = (p5: p5Types) => {
    if (!this.rooms.length) return;

    const spacingX = this.rooms[0].w * 3;
    const spacingY = this.rooms[0].h * 4;
    const startX = 19;
    const startY = 5;
    this.neuralNetRooms = [];
    let idx = 10;
    let n = 0;
    for (let y = 0; y < this.roomsPerLayer.length; y++) {
      n = this.roomsPerLayer[y];
      const layer: DeboxRoom[] = [];
      for (let x = 0; x < n; x++) {
        const id = idx - n + x;
        const room = this.rooms[id] as DeboxRoom;
        room.connections = []; // reset!
        room.x = -((n - 1) * spacingX) / 2 + x * spacingX + startX;
        room.y = y * spacingY + startY;
        layer.push(room);
      }
      idx -= n;
      this.neuralNetRooms.push(layer);
    }

    // fully connect to previous layer
    for (let y = 1; y < this.neuralNetRooms.length; y++) {
      for (const room of this.neuralNetRooms[y]) {
        for (const prev of this.neuralNetRooms[y - 1]) {
          if (Number.isFinite(prev.x) && Number.isFinite(prev.y)) {
            room.connections.push({
              x: prev.x,
              y: prev.y,
            });
          }
        }
      }
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
      addLightDivs(this.divs, this.lightImgs, p5);
      addColumnDivs(
        this.divs,
        this.columnGif,
        p5,
        [
          { x: 8.5, y: 3.5 },
          { x: 10, y: 3.5 },
          // right side top
          { x: 32, y: 6.5 },
          { x: 33.5, y: 6.5 },
          { x: 35, y: 6.5 },
          // bottom
          { x: 3.5, y: 29 },
          { x: 5, y: 29 },
          { x: 6.5, y: 29 },

          // right side bottom
          { x: 25, y: 33 },
          { x: 26.5, y: 33 },
          { x: 33, y: 25 },
          { x: 34.5, y: 25 },
        ],
        1,
        gconfig
      );
      addBarDivs(this.divs, this.lightImgs[3], p5, gconfig, galleryId);

      const sc = this.GlobalConfig.scaler;
      const folderPoints = [
        { x: 25.5 * sc, y: 26.5 * sc },
        { x: 27.5 * sc, y: 27 * sc },
        { x: 26 * sc, y: 29 * sc },
      ];
      addFolderDivs(
        this.divs,
        this.instaImg,
        this.txtFile,
        p5,
        this.GlobalConfig,
        folderPoints
      );
    }
  };

  initEmojis = (p5: p5Types) => {
    const dancerPositions = [
      { x: 0, y: 0 },
      { x: 400, y: 50 },
      { x: 200, y: 100 },
    ];
    this.dancers = [];
    let i = 0;
    for (const pos of dancerPositions) {
      this.dancers.push(
        new Dancer(p5, this.dancerImgs[i], pos.x, pos.y, true, this.danceFloor)
      );
      i++;
    }
  };

  initBuilding = (p5: p5Types) => {
    // create all room instances first so we know size for spacing
    initOuterWalls(p5, this.walls, this.limits, this.GlobalConfig);
    this.rooms = [];
    for (let i = 0; i < 10; i++) this.rooms.push(new DeboxRoom(p5, i));
    this.initNodes(p5);
  };

  showTarget = (p5: p5Types) => {
    this.displayTarget(p5, p5.color(0, 255, 0, 50));
  };

  displayBackground = (p5: p5Types) => {
    const renderRooms = this.neuralNetRooms.flat(); // <- only these
    if (this.fontManolo) p5.textFont(this.fontManolo, 14);
    drawAllFloors(p5);

    drawWalls(this.walls, p5);
    const { user } = this.props;
    drawRooms(renderRooms, user, this.userEase);

    p5.push();
    p5.translate(
      26.25 * this.GlobalConfig.scaler,
      32.5 * this.GlobalConfig.scaler
    );
    display2D3DGridPlanes(p5, 54, 10, 5, 5);
    p5.pop();

    displayDancers(this.dancers, this.danceFloor, p5);
  };

  displayDivs = (p5: p5Types) => {
    // return;
    p5.push();
    p5.translate(
      this.GlobalConfig.x * this.GlobalConfig.scaler,
      this.GlobalConfig.y * this.GlobalConfig.scaler
    );
    displayBarDivs(this.userEase.x, this.userEase.y, this.divs);

    displayLightDivs(this.userEase.x, this.userEase.y, this.divs);
    displayColumnDivs(this.userEase.x, this.userEase.y, this.divs);

    if (this.font) {
      p5.textFont(this.font, 12);
    }
    displayFolderDivs(this.divs);

    // displayTrashDivs(this.userEase.x, this.userEase.y, this.divs);
    p5.pop();
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
    const roomEntry = roomDoorEntry(this.rooms, userStep);

    if (roomEntry) {
      if (window.confirm("Leave the main gallery?")) {
        userNewRoom(roomEntry.link);
      } else {
        this.stepTo.x = prevStep.x;
        this.stepTo.y = prevStep.y;
      }
      this.stopWalking();
    } else if (wallBoundary(this.walls, prevStep, userStep)) {
      this.stopWalking();
    } else {
      this.stepTo.x = userStep.x;
      this.stepTo.y = userStep.y;
    }
  };
}
