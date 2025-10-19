import { getLimits } from "../../../helpers/helpers";
import { initOuterWalls } from "../../Gallery/Gallery1/functions/building";
import {
  GallerySketch1Props,
  GallerySketchTemplate1,
} from "../../Gallery/Gallery1/GallerySketchTemplate1";
import p5Types from "p5";
import Candle from "../../Gallery/components/p5/Candle";

export default class GalleryYangSketch extends GallerySketchTemplate1 {
  public candleGif: p5Types.Image | null = null;

  constructor(props: GallerySketch1Props) {
    super(props);
    this.initWorld();
  }

  preloadContent = (p5: p5Types) => {
    this.candleGif = p5.loadImage(
      "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/waveforms/candle.gif"
    );
  };

  initWorld = () => {
    this.galleryId = 7;
    const worldW = 15;
    const worldH = 8;
    this.GlobalConfig = { x: -1, y: -1, scaler: 70, worldW, worldH };
    this.limits = getLimits(0, worldW, 0, worldH);
  };

  add(x: number, y: number) {
    
  }

  initDivs = (p5: p5Types) => {
    this.divs.candles = [];
    const candlePos = [{ x: 0, y: 0 }];
    for (let i = 0; i < candlePos.length; i++) {
      const { x, y } = candlePos[i];
      if (!this.candleGif || !this.GlobalConfig) continue;
      const imgs = [
        this.candleGif,
        this.lightImgs[1],
        this.lightImgs[2],
        this.lightImgs[3],
      ];
      let candle = new Candle(i, x, y, imgs, p5, this.GlobalConfig);
      this.divs.candles.push(candle);
    }
  };

  initBuilding = (p5: p5Types) => {
    initOuterWalls(p5, this.walls, this.limits, this.GlobalConfig);
  };

  displayBackground = (p5: p5Types) => {
    p5.background(255);
  };

  displayScene = (p5: p5Types) => {
    const ellipsePos = { x: 300, y: 300, diam: 200 };

    if (this.distanceToUser(ellipsePos.x, ellipsePos.y) < ellipsePos.diam / 2) {
      p5.fill("red");
    } else {
      p5.fill("green");
    }
    p5.ellipse(ellipsePos.x, ellipsePos.y, ellipsePos.diam);
  };

  displayDivs = (p5: p5Types) => {
    p5.push();
    for (let i = 0; i < this.divs.candles.length; i++) {
      this.divs.candles[i].display(this.userEase.x, this.userEase.y);
      this.divs.candles[i].displayToolBar(this.userEase.x, this.userEase.y);
    }
    p5.pop();
  };

  displayOverUserStatic = (p5: p5Types) => {
    p5.fill(0);
    p5.textSize(16);
    p5.text("Yang Gallery", p5.width / 2, p5.height / 2);
    p5.text("mouse", p5.mouseX + 50, p5.mouseY + 50);
  };
}
