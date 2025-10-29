// GalleryQuadrantCircleSketch.ts
import { getLimits } from "../../../helpers/helpers";
import { initOuterWalls } from "../../Gallery/Gallery1/functions/building";
import {
  GallerySketch1Props,
  GallerySketchTemplate1,
} from "../../Gallery/Gallery1/GallerySketchTemplate1";
import p5Types from "p5";
import { BrizData, BrizQuadType } from "./briz";
import {
  p5ToDomCoords,
  p5ToUserCoords,
  p5ToWorldCoords,
  userToWorldCoords,
} from "../../../helpers/coordinates";
import { Didactic } from "./Didactic";

interface GalleryBrizSketchProps extends GallerySketch1Props {
  openContent: (c: BrizQuadType) => void;
}

export default class GalleryBrizSketch extends GallerySketchTemplate1<GalleryBrizSketchProps> {
  // --- content wired to your pamUrl + didactics ---
  private quadrants: BrizQuadType[] = []; // filled in initDidactics()

  // private imgs: (p5Types.Image | null)[] = [null, null, null, null];
  private activeQi: number = -1;

  constructor(props: GalleryBrizSketchProps) {
    super(props);
    this.initWorld();
    this.initDidactics();
  }

  private initDidactics() {
    this.quadrants = BrizData;
  }

  preloadContent = (p5: p5Types) => {};

  setupContent = (p5: p5Types) => {
    // this.imgs = this.quadrants.map((q) => p5.loadImage(q.imgUrl));
  };

  initWorld = () => {
    this.galleryId = 7;
    const worldW = 30;
    const worldH = worldW;
    this.GlobalConfig = {
      x: -worldW / 2 + 1,
      y: -worldH / 2 + 1,
      scaler: 70,
      worldW,
      worldH,
    };
    this.limits = getLimits(0, worldW, 0, worldH);
  };

  initDivs = (p5: p5Types) => {
    const centerWorld = this.centerAndRadius(p5);
    this.divs.lights = [];
    let index = 0;
    for (let data of this.quadrants) {
      const d = 400;
      const w = 500;

      const didacticDiv = new Didactic(
        0,
        (index == 0 || index == 3 ? -d - w : d) + centerWorld.cx,
        (index == 2 || index == 3 ? d : -d - w) + centerWorld.cy,
        w,
        w,
        data,
        p5,
        this.GlobalConfig,
        () => {
          this.props.openContent(data);
        },

        this.fontGeo,
        this.font
      );
      index++;
      this.divs.lights.push(didacticDiv);
    }
  };

  initBuilding = (p5: p5Types) => {
    initOuterWalls(p5, this.walls, this.limits, this.GlobalConfig);
  };

  displayBackground = (p5: p5Types) => {
    const blueGray = p5.color(50, 100, 150);
    const col = p5.lerpColor(blueGray, p5.color(0), 0.7);
    p5.background(p5.red(col), p5.green(col), p5.blue(col), 100);
  };

  // -------------------- helpers --------------------
  private centerAndRadius(p5: p5Types) {
    if (!this.GlobalConfig) {
      return { cx: 0, cy: 0, R: 600 };
    }
    const cx = (this.GlobalConfig.worldW / 2) * this.GlobalConfig.scaler;
    const cy = (this.GlobalConfig.worldH / 2) * this.GlobalConfig.scaler;
    const R = 300;
    return { cx, cy, R };
  }
  private posPolar(p5: p5Types, cx: number, cy: number) {
    const { x, y } = this.userEase;
    const posWorld = userToWorldCoords(x, y, this.GlobalConfig);
    const dx = posWorld.x - cx;
    const dy = posWorld.y - cy;
    const r = Math.hypot(dx, dy);
    let a = Math.atan2(dy, dx);
    if (a < 0) a += p5.TWO_PI;
    return { r, a };
  }

  private quadrantIndexFromAngle(p5: p5Types, a: number) {
    if (a >= 0 && a < p5.HALF_PI) return 2;
    if (a >= p5.HALF_PI && a < p5.PI) return 3;
    if (a >= p5.PI && a < 1.5 * p5.PI) return 0;
    return 1;
  }

  private quadrantMidAngle(p5: p5Types, i: number) {
    return [
      5 * p5.QUARTER_PI,
      7 * p5.QUARTER_PI,

      p5.QUARTER_PI,
      3 * p5.QUARTER_PI,
    ][i];
  }

  // -------------------- drawing --------------------
  private drawWireframe(p5: p5Types, cx: number, cy: number, R: number) {
    const { r, a } = this.posPolar(p5, cx, cy);
    const rings = 20;
    const rays = 20;

    p5.push();
    p5.translate(cx, cy);
    p5.noFill();

    for (let i = 1; i <= rings; i++) {
      const alphaVal = p5.sin(p5.frameCount / 20 + i) * 80 + 100;
      p5.stroke(0, 255, 0, alphaVal);
      p5.circle(0, 0, i * 200);
    }

    p5.stroke(0, 255, 0, 100);

    const spread = p5.PI / 3;
    for (let i = 0; i < rays; i++) {
      const t = i / (rays - 1 || 1) - 0.5;
      const ang = a + t * spread;
      p5.line(0, 0, Math.cos(ang) * R * 2, Math.sin(ang) * R * 2);
    }
    p5.pop();
  }

  private drawCircleAndDivisions(
    p5: p5Types,
    cx: number,
    cy: number,
    R: number
  ) {
    p5.noStroke();
    p5.fill(0, 100);
    p5.circle(cx, cy, R * 2);

    // if (this.activeQi !== -1) {
    //   p5.push();
    //   p5.translate(cx, cy);
    //   p5.noStroke();
    //   p5.fill(0, 40);
    //   // const starts = [0, p5.HALF_PI, p5.PI, 1.5 * p5.PI];
    //   const s = this.quadrantMidAngle(p5, this.activeQi) - p5.QUARTER_PI;
    //   p5.fill("red");
    //   p5.arc(0, 0, R * 2, R * 2, s, s + p5.HALF_PI, p5.PIE);
    //   p5.pop();
    // }

    p5.stroke(0, 255, 0, 50);
    p5.strokeWeight(1);
    p5.line(cx - R, cy, cx + R, cy);
    p5.line(cx, cy - R, cx, cy + R);
  }

  private drawArrow(p5: p5Types, cx: number, cy: number, R: number) {
    const arrowColor = p5.color(0, 255, 0);
    if (this.activeQi === -1) return;
    const ang = this.quadrantMidAngle(p5, this.activeQi);
    const len = R * 0.55;

    p5.push();
    p5.translate(cx, cy);
    p5.stroke(arrowColor);
    p5.strokeWeight(2);
    p5.line(0, 0, Math.cos(ang) * len, Math.sin(ang) * len);

    p5.push();
    p5.translate(Math.cos(ang) * len, Math.sin(ang) * len);
    p5.rotate(ang);
    p5.noStroke();
    p5.fill(arrowColor);
    const ah = 12,
      aw = 7;
    p5.triangle(0, 0, -ah, -aw, -ah, aw);
    p5.pop();
    p5.pop();
  }

  // -------------------- main frame --------------------
  displayScene = (p5: p5Types) => {
    const { cx, cy, R } = this.centerAndRadius(p5);

    // wireframe + quadrant detection
    this.drawWireframe(p5, cx, cy, R);
    const { r, a } = this.posPolar(p5, cx, cy);
    this.activeQi = this.quadrantIndexFromAngle(p5, a);

    // circle, arrow, image + didactic
    this.drawCircleAndDivisions(p5, cx, cy, R);
    this.drawArrow(p5, cx, cy, R);
    this.displayVector(p5);
  };

  displayVector = (p5: p5Types) => {
    const label = this.quadrants[this.activeQi]?.vector || "";
    const { cx, cy, R } = this.centerAndRadius(p5);
    p5.noStroke();
    p5.fill(255);
    p5.textAlign(p5.CENTER, p5.CENTER);
    if (this.fontManolo) p5.textFont(this.fontManolo, 56);
    // p5.textSize(36);
    p5.text(label, cx + 5, cy - 8);
  };

  displayDivs = (_p5: p5Types) => {
    let index = 0;
    const pos = userToWorldCoords(
      this.userEase.x,
      this.userEase.y,
      this.GlobalConfig
    );
    for (const div of this.divs.lights) {
      if (this.activeQi == index) {
        div.display(pos.x, pos.y);
        div.displayToolBar(pos.x, pos.y);
      }
      index++;
    }
  };

  displayOverUserStatic = (p5: p5Types) => {
    // (optional) HUD
    // this.displayFrameRate(p5);
  };
}
