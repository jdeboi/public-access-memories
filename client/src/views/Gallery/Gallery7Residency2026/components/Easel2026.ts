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

// Buttons — stacked to the right of the easel, centered on the canvas area
const BTN_W = 60;
const BTN_H = 26;
const BTN_X = EASEL_W + 8;
const BTN_STACK_TOP =
  CANVAS_OY + Math.round(CANVAS_H / 2) - Math.round((BTN_H * 2 + 8) / 2);
const CLEAR_BTN_X = BTN_X;
const CLEAR_BTN_Y = BTN_STACK_TOP;
const SAVE_BTN_X = BTN_X;
const SAVE_BTN_Y = BTN_STACK_TOP + BTN_H + 8;

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
  saveBtn: ButtonRect;
  pendingSave: p5Types.Graphics | null;
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
    this.graphics.background(255);

    this.clearBtn = new ButtonRect("clear", CLEAR_BTN_X, CLEAR_BTN_Y, BTN_W, BTN_H, p5);
    this.saveBtn = new ButtonRect("save", SAVE_BTN_X, SAVE_BTN_Y, BTN_W, BTN_H, p5);
    this.pendingSave = null;

    this.isDrawing = false;
    this.lastDrawX = 0;
    this.lastDrawY = 0;
    this.isOverCanvas = false;
  }

  // Called by GallerySketch each frame — returns the saved graphic and clears the pending slot.
  consumeSave(): p5Types.Graphics | null {
    const g = this.pendingSave;
    this.pendingSave = null;
    return g;
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
    if (this.saveBtn.mouseOver(mx, my)) {
      // Hand off the current graphic; start a fresh canvas
      this.pendingSave = this.graphics;
      this.graphics = this.p5.createGraphics(CANVAS_W, CANVAS_H);
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
    this.saveBtn.display(mx, my);
    p5.pop();
  }
}
