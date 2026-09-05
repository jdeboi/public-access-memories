import p5Types from "p5";
import { IGlobalConfig } from "../../../../interfaces";
import { mouseToWorld } from "../../../../helpers/coordinates";
import ButtonRect from "../../components/p5/Draggable/ButtonRect";

const IMG_W = 300;
const IMG_H = Math.round((130 / 200) * IMG_W); // preserve original image aspect ratio
const PANEL_H = 42;
const TOT_H = IMG_H + PANEL_H;
const MAX_SLOTS = 10;

// Viewer area — overlaid on top of the cabinet image when open
const VIEW_PAD = 14;
const VIEW_X = VIEW_PAD;
const VIEW_Y = VIEW_PAD;
const VIEW_W = IMG_W - VIEW_PAD * 2;
const VIEW_H = IMG_H - VIEW_PAD * 2;

// Panel layout (y values are absolute from local origin 0)
const TOG_W = 38;
const TOG_H = 20;
const TOG_X = 6;
const TOG_Y = IMG_H + Math.round((PANEL_H - TOG_H) / 2);

const BTN_W = 22;
const BTN_H = 22;
const BTN_Y = IMG_H + Math.round((PANEL_H - BTN_H) / 2);

// Nav buttons (shown when open, centered in the right portion of the panel)
const NAV_CENTER_X = Math.round((IMG_W + TOG_X + TOG_W + 16) / 2);
const PREV_X = NAV_CENTER_X - BTN_W - 28;
const NEXT_X = NAV_CENTER_X + 28;

// Fill bar (shown when closed, same right portion of panel)
const FILL_X = TOG_X + TOG_W + 16;
const FILL_W = IMG_W - FILL_X - 8;
const FILL_Y = BTN_Y;
const FILL_H = BTN_H;

export default class FlatFile2026 {
  p5: p5Types;
  GlobalConfig: IGlobalConfig;
  x: number;
  y: number;
  readonly w = IMG_W;
  readonly h = TOT_H;

  closedImg: p5Types.Image;
  openImg: p5Types.Image;
  isOpen: boolean;
  drawings: p5Types.Graphics[];
  viewIdx: number;

  dragging: boolean;
  startDrag: { x: number; y: number };
  startDragCoords: { x: number; y: number };

  openCloseBtn: ButtonRect;
  prevBtn: ButtonRect;
  nextBtn: ButtonRect;
  font: p5Types.Font | null;

  constructor(
    xWorld: number,
    yWorld: number,
    closedImg: p5Types.Image,
    openImg: p5Types.Image,
    p5: p5Types,
    GlobalConfig: IGlobalConfig,
    font: p5Types.Font | null = null,
  ) {
    this.p5 = p5;
    this.GlobalConfig = GlobalConfig;
    const sc = GlobalConfig.scaler;
    this.x = xWorld * sc;
    this.y = yWorld * sc;
    this.closedImg = closedImg;
    this.openImg = openImg;
    this.isOpen = false;
    this.drawings = [];
    this.viewIdx = 0;
    this.dragging = false;
    this.startDrag = { x: 0, y: 0 };
    this.startDragCoords = { x: 0, y: 0 };

    this.font = font;
    this.openCloseBtn = new ButtonRect("open", TOG_X, TOG_Y, TOG_W, TOG_H, p5, font);
    this.prevBtn = new ButtonRect("◄", PREV_X, BTN_Y, BTN_W, BTN_H, p5);
    this.nextBtn = new ButtonRect("►", NEXT_X, BTN_Y, BTN_W, BTN_H, p5);
  }

  isFull(): boolean {
    return this.drawings.length >= MAX_SLOTS;
  }

  // Returns false if full — caller should warn the user.
  addDrawing(g: p5Types.Graphics): boolean {
    if (this.isFull()) return false;
    this.drawings.push(g);
    this.viewIdx = this.drawings.length - 1; // jump to the newly filed drawing
    return true;
  }

  private localMouse(userX: number, userY: number) {
    const m = mouseToWorld({ x: userX, y: userY }, this.p5, this.GlobalConfig);
    return { x: m.x - this.x, y: m.y - this.y };
  }

  checkButtons(userX: number, userY: number): boolean {
    const { x: lx, y: ly } = this.localMouse(userX, userY);

    if (this.openCloseBtn.mouseOver(lx, ly)) {
      this.isOpen = !this.isOpen;
      return true;
    }
    if (this.isOpen && this.drawings.length > 1) {
      if (this.prevBtn.mouseOver(lx, ly)) {
        this.viewIdx =
          (this.viewIdx - 1 + this.drawings.length) % this.drawings.length;
        return true;
      }
      if (this.nextBtn.mouseOver(lx, ly)) {
        this.viewIdx = (this.viewIdx + 1) % this.drawings.length;
        return true;
      }
    }
    return false;
  }

  checkDragging(userX: number, userY: number): boolean {
    const { x: lx, y: ly } = this.localMouse(userX, userY);
    if (lx >= 0 && lx <= this.w && ly >= 0 && ly <= IMG_H) {
      this.dragging = true;
      this.startDrag = { x: this.p5.mouseX, y: this.p5.mouseY };
      this.startDragCoords = { x: this.x, y: this.y };
      return true;
    }
    return false;
  }

  endDrag() {
    this.dragging = false;
  }

  update() {
    if (this.dragging) {
      this.x = this.startDragCoords.x + (this.p5.mouseX - this.startDrag.x);
      this.y = this.startDragCoords.y + (this.p5.mouseY - this.startDrag.y);
    }
  }

  display(userX: number, userY: number) {
    const p5 = this.p5;
    const { x: lx, y: ly } = this.localMouse(userX, userY);
    const n = this.drawings.length;

    p5.push();
    p5.translate(this.x, this.y);

    // Cabinet image
    p5.image(this.isOpen ? this.openImg : this.closedImg, 0, 0, IMG_W, IMG_H);

    // Drawing viewer (open state)
    if (this.isOpen) {
      p5.push();
      p5.translate(0, -VIEW_H - 18);
      if (n > 0) {
        p5.noStroke();
        p5.fill(248);
        p5.rect(VIEW_X, VIEW_Y, VIEW_W, VIEW_H, 2);
        p5.image(this.drawings[this.viewIdx], VIEW_X, VIEW_Y, VIEW_W, VIEW_H);
      } else {
        p5.noStroke();
        p5.fill(200, 200, 200, 150);
        p5.rect(VIEW_X, VIEW_Y, VIEW_W, VIEW_H, 2);
        p5.fill(110);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textFont("Arial");
        p5.textSize(11);
        p5.text(
          "no drawings filed yet",
          VIEW_X + VIEW_W / 2,
          VIEW_Y + VIEW_H / 2,
        );
      }
      p5.pop();
    }

    // Panel background
    p5.fill(240, 238, 234);
    p5.stroke(0);
    p5.strokeWeight(1);
    p5.rect(0, IMG_H, IMG_W, PANEL_H, 0, 0, 6, 6);

    // Open/close button
    this.openCloseBtn.label = this.isOpen ? "close" : "open";
    this.openCloseBtn.display(lx, ly);

    if (this.isOpen) {
      // Nav arrows + "X / N" counter
      if (n > 1) {
        this.prevBtn.display(lx, ly);
        this.nextBtn.display(lx, ly);
      }
      p5.fill(n === 0 ? 120 : 60);
      p5.noStroke();
      p5.textAlign(p5.CENTER, p5.CENTER);
      if (this.font) p5.textFont(this.font); else p5.textFont("Arial");
      p5.textSize(8);
      p5.text(
        n === 0 ? "empty" : `${this.viewIdx + 1} / ${n}`,
        NAV_CENTER_X,
        IMG_H + PANEL_H / 2,
      );
    } else {
      // Fill bar showing how many drawings are stored
      p5.stroke(0);
      p5.strokeWeight(1);
      p5.fill(210, 208, 204);
      p5.rect(FILL_X, FILL_Y, FILL_W, FILL_H, 3);
      if (n > 0) {
        const pct = n / MAX_SLOTS;
        p5.noStroke();
        p5.fill(pct > 0.8 ? p5.color(180, 40, 40) : p5.color(20, 80, 180));
        p5.rect(FILL_X, FILL_Y, Math.max(4, FILL_W * pct), FILL_H, 3);
      }
      p5.fill(40);
      p5.noStroke();
      p5.textAlign(p5.CENTER, p5.CENTER);
      if (this.font) p5.textFont(this.font); else p5.textFont("Arial");
      p5.textSize(8);
      p5.text(
        `${n} / ${MAX_SLOTS} drawings`,
        FILL_X + FILL_W / 2,
        FILL_Y + FILL_H / 2,
      );
    }

    p5.pop();
  }
}
