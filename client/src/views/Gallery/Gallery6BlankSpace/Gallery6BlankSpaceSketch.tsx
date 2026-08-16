import p5Types from "p5";
import {
  GallerySketchTemplate1,
  GallerySketch1Props,
} from "../Gallery1/GallerySketchTemplate1";
import {
  limits,
  GlobalConfig,
} from "../../../data/Shows/BlankSpace/GlobalConfig";
import { BLANK_SPACE_ID } from "../../../data/CurrentShow/GalleryConfig";
import { initOuterWalls } from "../Gallery1/functions/building";
import { wallBoundary } from "../Gallery1/functions/crossing";

export default class Gallery6BlankSpaceSketch extends GallerySketchTemplate1 {
  constructor(props: GallerySketch1Props) {
    super(props);
    this.GlobalConfig = GlobalConfig;
    this.limits = limits;
    this.galleryId = BLANK_SPACE_ID;
    this.barTenders = null;
    this.globalRooms = [];
  }

  preload = (p5: p5Types) => {
    this.font = p5.loadFont(this.pamURL + "fonts/sysfont.woff");
    this.fontManolo = p5.loadFont(this.pamURL + "fonts/manolo-mono.ttf");
  };

  initBuilding = (p5: p5Types) => {
    initOuterWalls(p5, this.walls, this.limits, this.GlobalConfig);
  };

  initDivs = (_p5: p5Types) => {};

  initEmojis = (_p5: p5Types) => {
    this.dancers = [];
  };

  displayBackground = (p5: p5Types) => {
    p5.background(8, 8, 12);
  };

  displayBuilding = (_p5: p5Types) => {};

  displayScene = (_p5: p5Types) => {};

  showTarget = (p5: p5Types) => {
    this.displayTarget(p5, p5.color(100, 100, 140, 60));
  };

  userTakeStep = (x: number, y: number) => {
    const space = this.getGlobalScaler();
    const prevStep = { x: this.stepTo.x, y: this.stepTo.y };
    const userStep = {
      x: this.stepTo.x + x * space,
      y: this.stepTo.y + y * space,
    };
    if (wallBoundary(this.walls, prevStep, userStep)) {
      this.stopWalking();
    } else {
      this.stepTo.x = userStep.x;
      this.stepTo.y = userStep.y;
    }
  };
}
