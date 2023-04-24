


import Button from './Button';
import { mouseToWorld } from "../../../../../helpers/coordinates";
// import { GlobalConfig } from '../../../../../../data/HomeBody/GlobalConfig';
import p5Types from 'p5';

export default class Draggable {

  p5: p5Types;
  x: number;
  y: number;
  w: number;
  h: number;
  id: number;
  origX: number;
  origY: number;
  offsetX = 0;
  offsetY = 0;
  toolbarH = 25;

  startDrag = { x: 0, y: 0 };
  startDragCoords = { x: 0, y: 0 };
  dragging = false;
  locked = false;

  closed = false;
  minimized = false;

  barH: number;
  bRad: number;

  closeButton: any;
  minButton: any;
  maxButton: any;

  content: p5Types.Image | null;
  GlobalConfig: any;
  mask: any;

  constructor(id: number, x: number, y: number, w: number, h: number, p5: p5Types, content: p5Types.Image | null, GlobalConfig: any) {
    this.p5 = p5;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.origX = this.x;
    this.origY = this.y;
    this.offsetX = 0;
    this.offsetY = 0;
    this.toolbarH = 25;

    this.startDrag = { x: 0, y: 0 };
    this.startDragCoords = { x: 0, y: 0 };

    this.dragging = false;
    this.locked = false;

    this.closed = false;
    this.minimized = false;

    this.barH = 26;
    this.bRad = 10;

    let xp = 15;
    let yp = 12;
    let sp = 20;
    this.closeButton = new Button(xp, yp, p5);
    this.minButton = new Button(xp + sp, yp, p5);
    this.maxButton = new Button(xp + sp * 2, yp, p5);

    this.content = content;

    this.GlobalConfig = GlobalConfig;
    // this.mask;
    // this.initMask();
  }

  initMask() {
    this.mask = this.p5.createGraphics(this.w, this.h + this.barH);
    this.mask.background(0);
    this.mask.fill(255);
    this.mask.noStroke();
    // this.mask.rect(0, 0, this.w, this.h, this.bRad, this.bRad);
    this.mask.ellipse(this.w / 2, this.h / 2, 50, 50);
    if (this.content && this.content.width > 0) {

      this.content.mask(this.mask);
    }
  }

  display(userX: number, userY: number) {
    this.p5.push();
    this.p5.translate(this.x, this.y);
    if (!this.closed) {
      if (!this.minimized)
        this.displayContent(userX, userY);
    }
    this.p5.pop();
  }

  displayToolBar(userX: number, userY: number) {
    this.p5.push();
    this.p5.translate(this.x, this.y);
    if (!this.closed) {
      this.p5.fill(0);
      this.p5.noStroke();
      if (!this.minimized) this.p5.rect(0, 10, this.w, (this.barH - 10));
      this.p5.rect(0, 0, this.w, this.barH, this.bRad);

      const { x, y } = this.getMouseCoords(userX, userY);
      this.closeButton.display(x, y);
      this.minButton.display(x, y);
      this.maxButton.display(x, y);
    }
    this.p5.pop();
  }

  getMouseCoords(userX: number, userY: number) {
    let gx = this.GlobalConfig.x * this.GlobalConfig.scaler;
    let gy = this.GlobalConfig.y * this.GlobalConfig.scaler;
    let mx = this.p5.mouseX + userX - gx - this.p5.windowWidth / 2 - this.x;
    let my = this.p5.mouseY + userY - gy - this.p5.windowHeight / 2 - this.y;
    if (!mx || !my) {
      return {x: 0, y: 0}
      
    }
    return { x: mx, y: my }
  }

  getMouseButtons(userX: number, userY: number) {
    let mouse = mouseToWorld({ x: userX, y: userY }, this.p5, this.GlobalConfig);
    mouse.x -= this.x;
    mouse.y -= this.y;
    return mouse;
  }

  getMouse(userX: number, userY: number) {
    return mouseToWorld({ x: userX, y: userY }, this.p5, this.GlobalConfig);
  }

  displayContent(userX: number, userY: number) {
    // this.p5.fill(255);
    this.p5.push();

    this.p5.translate(0, this.barH);
    if (this.content) {
      this.p5.image(this.content, 0, 0, this.w, this.h);
    }
    this.p5.pop();
    this.displayFrame();

  }

  displaySolidBack(col: p5Types.Color) {
    this.p5.push();
    this.p5.fill(col);
    this.p5.stroke(0);
    this.p5.strokeWeight(2);
    this.p5.rect(0, 0, this.w, this.h + this.barH, this.bRad);
    this.p5.pop();
  }

  displayFrame() {
    this.p5.noFill();
    this.p5.stroke(0);
    this.p5.strokeWeight(2);
    this.p5.rect(0, 0, this.w, this.h + this.barH, this.bRad);
  }

  checkButtons(userX: number, userY: number) {
    if (this.closed)
      return false;
    let mouse = this.getMouseButtons(userX, userY);
    if (this.closeButton.mouseOver(mouse.x, mouse.y)) {
      this.closeWindow();
      return true;
    }
    else if (this.minButton.mouseOver(mouse.x, mouse.y)) {
      this.toggleMinimze();
      return true;
    }
    else if (this.maxButton.mouseOver(mouse.x, mouse.y)) {
      this.maximizeWindow();
      return true;
    }
    return false;
  }

  checkDragging(userX: number, userY: number) {
    if (this.closed)
      return false;
    let mouse = this.getMouse(userX, userY);
    if (this.overToolBar(mouse.x, mouse.y)) {
      // this.draggingOn(mx, my);
      this.dragging = true;
      this.startDrag.x = this.p5.mouseX;
      this.startDrag.y = this.p5.mouseY;
      this.startDragCoords.x = this.x;
      this.startDragCoords.y = this.y;
      return true;
    }
    return false;
  }

  overToolBar(mx: number, my: number) {
    return mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.barH;
  }


  endDrag() {
    this.dragging = false;
  }

  update() {
    if (this.dragging) {
      this.offsetX = this.p5.mouseX - this.startDrag.x;
      this.offsetY = this.p5.mouseY - this.startDrag.y;

      this.x = this.startDragCoords.x + this.offsetX;
      this.y = this.startDragCoords.y + this.offsetY;
    }
  }

  toggleCloseWindow(div: any) {
    this.locked = !this.locked;
    this.closeWindow();
  }

  openWindow() {
    this.closed = false;
    this.minimized = false;
    this.locked = false; // ? what does this do
  }

  closeWindow() {
    this.closed = true;
  }

  maximizeWindow() {
    this.x = this.origX;
    this.y = this.origY;
    this.offsetX = 0;
    this.offsetY = 0;
  }


  toggleMinimze() {
    this.minimized = !this.minimized;
  }
}
