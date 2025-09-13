import p5Types from "p5";
import {
  GallerySketchTemplate1,
  GallerySketch1Props,
} from "../Gallery1/GallerySketchTemplate1";

import { limits, GlobalConfig } from "../../../data/Shows/Debox/GlobalConfig";
import { rooms as globalRooms } from "../../../data/Shows/Debox/RoomConfig";
import { barTenders } from "../../../data/Shows/Debox/BotConfig";
import { drawAllFloors, drawRooms, roomDoorEntry } from "./functions/building";
import DeboxRoom from "./components/DeboxRoom";
import { drawWalls, initOuterWalls } from "../Gallery1/functions/building";
import { wallBoundary } from "../Gallery1/functions/crossing";
import {
  addBarDivs,
  addColumnDivs,
  addLightDivs,
  displayBarDivs,
} from "../Gallery1/functions/divs";
import { DEBOX_ID } from "../../../data/CurrentShow/GalleryConfig";

export default class Gallery5DeboxSketch extends GallerySketchTemplate1 {
  roomsPerLayer: number[] = [1, 3, 5, 4, 1];
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
  }

  initNodes = (p5: p5Types) => {
    if (!this.rooms.length) return;

    const spacingX = this.rooms[0].w * 3;
    const spacingY = this.rooms[0].h * 4;
    const startX = 17;
    const startY = 5;
    this.neuralNetRooms = [];
    let idx = 0;

    for (let y = 0; y < this.roomsPerLayer.length; y++) {
      const n = this.roomsPerLayer[y];
      const layer: DeboxRoom[] = [];
      for (let x = 0; x < n && idx < this.rooms.length; x++, idx++) {
        const room = this.rooms[idx] as DeboxRoom;
        room.connections = []; // reset!
        room.x = -((n - 1) * spacingX) / 2 + x * spacingX + startX;
        room.y = y * spacingY + startY;
        layer.push(room);
      }
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

  initBuilding = (p5: p5Types) => {
    // create all room instances first so we know size for spacing
    initOuterWalls(p5, this.walls, this.limits, this.GlobalConfig);
    const needed = this.roomsPerLayer.reduce((a, b) => a + b, 0);
    const count = Math.min(needed, this.globalRooms.length);
    this.rooms = [];
    for (let i = 0; i < count; i++) this.rooms.push(new DeboxRoom(p5, i));
    this.initNodes(p5);
  };

  displayBackground = (p5: p5Types) => {
    const renderRooms = this.neuralNetRooms.flat(); // <- only these
    if (this.fontManolo) p5.textFont(this.fontManolo, 14);
    // drawAllFloors(p5);
    drawWalls(this.walls, p5);
    const { user } = this.props;
    drawRooms(renderRooms, user, this.userEase);
  };

  displayDivs = (p5: p5Types) => {
    p5.push();
    p5.translate(
      this.GlobalConfig.x * this.GlobalConfig.scaler,
      this.GlobalConfig.y * this.GlobalConfig.scaler
    );
    displayBarDivs(this.userEase.x, this.userEase.y, this.divs);

    // displayLightDivs(this.userEase.x, this.userEase.y, this.divs);
    // displayColumnDivs(this.userEase.x, this.userEase.y, this.divs);

    // if (this.font) {
    //   p5.textFont(this.font, 12);
    // }
    // displayFolderDivs(this.divs);
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
        this.isWalking = false;
      }
    } else if (wallBoundary(this.walls, prevStep, userStep)) {
      this.stopWalking();
    } else {
      this.stepTo.x = userStep.x;
      this.stepTo.y = userStep.y;
    }
  };
}
