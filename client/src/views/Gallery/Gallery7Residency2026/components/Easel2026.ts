import p5Types from "p5";
import { IGlobalConfig } from "../../../../interfaces";
import { mouseToWorld } from "../../../../helpers/coordinates";
import ButtonRect from "../../components/p5/Draggable/ButtonRect";

const EASEL_W = 220;
const EASEL_H = 250;

// Approximate canvas (paper) area within easel2.png
const CANVAS_OX = Math.round(EASEL_W * 0.13);
const CANVAS_OY = Math.round(EASEL_H * 0.07);
const CANVAS_W = Math.round(EASEL_W * 0.74);
const CANVAS_H = Math.round(EASEL_H * 0.55);

// Clear button — positioned to the right of the easel, vertically centered on the canvas area
const BTN_W = 60;
const BTN_H = 26;
const CLEAR_BTN_X = EASEL_W + 8;
const CLEAR_BTN_Y = CANVAS_OY + Math.round(CANVAS_H / 2) - Math.round(BTN_H / 2);

export default class Easel2026 {
  p5: p5Types;
  GlobalConfig: IGlobalConfig;
  x: number;
  y: number;
  w: number;
  h: number;
  easelImg: p5Types.Image;
  graphics: p5Types.Graphics;
  clearBtn: ButtonRect;
  isDrawing: boolean;
  lastDrawX: number;
  lastDrawY: number;
  isOverCanvas: boolean;

  constructor(
    xWorld: number,
    yWorld: number,
    easelImg: p5Types.Image,
    p5: p5Types,
    GlobalConfig: IGlobalConfig,
  ) {
    this.p5 = p5;
    this.GlobalConfig = GlobalConfig;
    const sc = GlobalConfig.scaler;
    this.x = xWorld * sc;
    this.y = yWorld * sc;
    this.w = EASEL_W;
    this.h = EASEL_H;
    this.easelImg = easelImg;

    this.graphics = p5.createGraphics(CANVAS_W, CANVAS_H);
    // this.graphics.clear(0, 0, 0, 0);
    this.graphics.background(255);

    this.clearBtn = new ButtonRect("clear", CLEAR_BTN_X, CLEAR_BTN_Y, BTN_W, BTN_H, p5);

    this.isDrawing = false;
    this.lastDrawX = 0;
    this.lastDrawY = 0;
    this.isOverCanvas = false;
  }

  private worldMouse(userX: number, userY: number) {
    return mouseToWorld({ x: userX, y: userY }, this.p5, this.GlobalConfig);
  }

  private overCanvas(userX: number, userY: number): boolean {
    const m = this.worldMouse(userX, userY);
    const cx = this.x + CANVAS_OX;
    const cy = this.y + CANVAS_OY;
    return (
      m.x >= cx && m.x <= cx + CANVAS_W && m.y >= cy && m.y <= cy + CANVAS_H
    );
  }

  private toLocal(userX: number, userY: number) {
    const m = this.worldMouse(userX, userY);
    return { x: m.x - this.x - CANVAS_OX, y: m.y - this.y - CANVAS_OY };
  }

  checkButtons(userX: number, userY: number): boolean {
    const m = this.worldMouse(userX, userY);
    const mx = m.x - this.x;
    const my = m.y - this.y;
    if (this.clearBtn.mouseOver(mx, my)) {
      this.graphics.background(255);
      return true;
    }
    if (this.overCanvas(userX, userY)) {
      this.isDrawing = true;
      const local = this.toLocal(userX, userY);
      this.lastDrawX = local.x;
      this.lastDrawY = local.y;
      return true;
    }
    return false;
  }

  checkDragging(_userX: number, _userY: number): boolean {
    return false;
  }

  endDrag() {
    this.isDrawing = false;
  }

  update() {}

  display(userX: number, userY: number) {
    const p5 = this.p5;

    this.isOverCanvas = this.overCanvas(userX, userY);
    document.body.style.cursor = this.isOverCanvas ? "none" : "";

    if (this.isDrawing && p5.mouseIsPressed) {
      const local = this.toLocal(userX, userY);
      this.graphics.stroke(0);
      this.graphics.strokeWeight(2);
      this.graphics.noFill();
      this.graphics.line(this.lastDrawX, this.lastDrawY, local.x, local.y);
      this.lastDrawX = local.x;
      this.lastDrawY = local.y;
    } else if (!p5.mouseIsPressed) {
      this.isDrawing = false;
    }

    p5.push();
    p5.translate(this.x, this.y);
    p5.image(this.easelImg, 0, 0, this.w, this.h);
    p5.image(this.graphics, CANVAS_OX, CANVAS_OY);
    const m = this.worldMouse(userX, userY);
    const mx = m.x - this.x;
    const my = m.y - this.y;
    this.clearBtn.display(mx, my);
    p5.pop();
  }
}
