import ResidencyRoom from "../../Gallery0Residency/components/ResidencyRoom";
import p5Types from "p5";
import { GlobalConfig } from "../../../../data/Shows/Residency2026/GlobalConfig";
import {
  roomConfig as Residency2026RoomConfig,
  artists as Residency2026Artists,
  rooms as Residency2026Rooms,
} from "../../../../data/Shows/Residency2026/RoomConfig";
const HEADER_H = 10;
const SIDEBAR_W = 42;
const SCROLL_W = 8;
const ROW_H = 13;
const ROW_GAP = 3;
const LINE_WIDTHS = [0.9, 0.65, 0.8, 0.5, 0.72, 0.58, 0.85, 0.42, 0.78, 0.9];

const LINE_COL: [number, number, number] = [200, 200, 200];
const BG: [number, number, number] = [215, 225, 232];
const INK: [number, number, number] = [70, 80, 88];
const MUTED: [number, number, number] = [140, 155, 165];
const GLASS_COL: [number, number, number] = [0, 122, 230];

type DoorPt = (u: number, v: number) => [number, number];

export default class ResidencyRoom2026 extends ResidencyRoom {
  constructor(
    p5: p5Types,
    door: p5Types.Image,
    i: number,
    globalConfig: any = GlobalConfig,
    roomConfig: any = Residency2026RoomConfig,
    artists: any = Residency2026Artists,
    rooms: any = Residency2026Rooms,
  ) {
    super(p5, door, i, globalConfig, roomConfig, artists, rooms);
    this.id = i;
  }

  displayArtistInRoom(
    user: any,
    roomTextures: p5Types.Image[],
    onIcon: p5Types.Image,
    _roomUserName = "",
  ) {
    this.displayRoomTexture(roomTextures, this.getIsDoorOpen(user));
    this.displayRoomToolbarFrame(true, onIcon);
  }

  displayArtistNotInRoom(
    user: any,
    roomTextures: p5Types.Image[],
    offIcon: p5Types.Image,
    _roomUserName = "",
  ) {
    this.displayRoomTexture(roomTextures, this.getIsDoorOpen(user));
    this.displayRoomToolbarFrame(false, offIcon);
  }

  displayHostBotRoom(
    roomTextures: p5Types.Image[],
    onIcon: p5Types.Image,
    user?: any,
  ) {
    this.displayRoomTexture(
      roomTextures,
      user ? this.getIsDoorOpen(user) : false,
    );
    this.displayRoomToolbarFrame(true, onIcon);
  }

  displayRoomTexture(roomTextures: p5Types.Image[], isDoorOpen = false) {
    const p5 = this.p5 as p5Types;
    const sc = this.GlobalConfig.scaler;
    const spacingX = 1; // SCROLL_W / 2 - 1;
    const spacingY = 0.5;
    const hw = (this.w / 2) * sc - 2 * spacingX;
    const hh = (this.h / 2) * sc - 2 * spacingY;

    p5.push();
    this.translateToRoomCenter();
    p5.image(roomTextures[this.id], -hw, -hh, hw * 2, hh * 2);

    const x = -hw;
    const y = -hh;
    const w = hw * 2;
    const h = hh * 2;

    this.drawFrontWall(p5, x, y, w, h, isDoorOpen);
    p5.pop();
  }

  private drawFrontWall(
    p5: p5Types,
    x: number,
    y: number,
    w: number,
    h: number,
    isDoorOpen: boolean,
  ) {
    this.drawWallPanels(p5, x, y, w, h);
    this.drawDoor(p5, x, y, w, h, isDoorOpen);
  }

  private drawWallPanels(
    p5: p5Types,
    x: number,
    y: number,
    w: number,
    h: number,
  ) {
    const doorH = (h * 3) / 4;

    // left bottom panel
    this.drawWallPanel(p5, x, y + h / 4, w / 3, doorH, 3);

    // right bottom panel
    this.drawWallPanel(p5, x + (w * 2) / 3, y + h / 4, w / 3, doorH, 4);

    // top left panel
    this.drawWallPanel(p5, x, y, w / 3, h / 4, 0);
    this.drawLeftMenu(p5, x, y, w / 3, h / 4);

    // top center panel
    this.drawWallPanel(p5, x + w / 3, y, w / 3, h / 4, 1);
    this.drawMiddleMenu(p5, x + w / 3, y, w / 3, h / 4, p5.frameCount + 50);
    // top right panel
    this.drawWallPanel(p5, x + (w * 2) / 3, y, w / 3, h / 4, 2);
    this.drawTopRails(p5, x, y, w, h);
  }

  private drawLeftMenu(
    p5: p5Types,
    x: number,
    y: number,
    w: number,
    h: number,
  ) {
    p5.push();
    p5.translate(x, y);
    p5.fill(255, 220);
    p5.noStroke();
    p5.rect(0, 0, w, h);

    // draw hamburger lines
    p5.stroke(...LINE_COL);
    p5.strokeWeight(1);
    p5.push();
    p5.translate(10, 10);
    const lineW = 12;
    const lineH = 1;
    const lineSpacing = 2;
    for (let i = 0; i < 3; i++) {
      p5.line(0, i * (lineH + lineSpacing), lineW, i * (lineH + lineSpacing));
    }
    p5.pop();
    p5.pop();
  }

  private drawMiddleMenu(
    p5: p5Types,
    x: number,
    y: number,
    w: number,
    h: number,
    t: number = 0,
  ) {
    p5.push();
    p5.translate(x, y);
    p5.fill(255, 220);
    p5.noStroke();
    const barH2 = 20;
    p5.rect(0, 0, w, barH2);

    p5.noFill();
    const sw = 4;
    p5.strokeWeight(sw);
    p5.stroke(255, 220);
    p5.rect(sw / 2, barH2 + sw / 2, w - sw, h - barH2 - sw * 3);
    p5.pop();
  }

  private drawTopRails(
    p5: p5Types,
    x: number,
    y: number,
    w: number,
    h: number,
  ) {
    const t = p5.frameCount;
    p5.push();
    p5.fill(...BG);
    p5.translate(x, y);
    p5.rect(0, 0, SCROLL_W / 2, h);
    p5.rect(w / 3 - SCROLL_W, 0, SCROLL_W, h);
    p5.rect((w * 2) / 3, 0, SCROLL_W, h);
    p5.rect(w - SCROLL_W / 2, 0, SCROLL_W / 2, h);

    // horizontal
    p5.rect(0, 0, w, SCROLL_W / 2);
    p5.rect(0, h / 4 - SCROLL_W, w, SCROLL_W);
    p5.rect(0, h - SCROLL_W / 2, w / 3, SCROLL_W / 2);
    p5.rect((w * 2) / 3, h - SCROLL_W / 2, w / 3, SCROLL_W / 2);

    p5.noFill();
    p5.stroke(...LINE_COL);
    p5.strokeWeight(1);

    p5.line(w / 3 - SCROLL_W / 2, 0, w / 3 - SCROLL_W / 2, h);
    p5.line((w * 2) / 3 + SCROLL_W / 2, 0, (w * 2) / 3 + SCROLL_W / 2, h);
    p5.line(0, h / 4 - SCROLL_W / 2, w, h / 4 - SCROLL_W / 2);

    this.drawScrollScrubber(p5, w / 3 - SCROLL_W, 0, h, t);
    this.drawScrollScrubber(p5, (w * 2) / 3, 0, h, t + 50);
    // this.drawScrollScrubber(p5, 0, h / 4 - SCROLL_W / 2, w, t + 10, true);

    p5.pop();
  }

  private drawWallPanel(
    p5: p5Types,
    x: number,
    y: number,
    w: number,
    h: number,
    _randomNum: number,
  ) {
    p5.push();
    p5.translate(x, y);
    p5.noStroke();
    p5.fill(...GLASS_COL, 20);
    p5.rect(0, 0, w, h);

    p5.pop();
  }

  private drawDoor(
    p5: p5Types,
    x: number,
    y: number,
    w: number,
    h: number,
    isDoorOpen: boolean,
  ) {
    const sp = 0.5;
    const doorW = w / 3 - 2 * sp;
    const doorH = (h * 3) / 4 - 2 * sp;
    const angle = isDoorOpen ? Math.PI / 3 : 0;
    const f = w * 3;
    const z = doorW * Math.sin(angle);
    const scale = f / (f + z);
    const rightX = doorW * Math.cos(angle) * scale;

    const hx = x + w / 3 + sp;
    const hy = y + h / 4 + sp;
    const midY = hy + doorH / 2;
    const trY = midY - (doorH / 2) * scale;
    const brY = midY + (doorH / 2) * scale;

    // Map normalized door coords (u=0 hinge, v=0 top) to screen coords
    const pt: DoorPt = (u, v) => {
      const lx = hx,
        ly = hy + v * doorH;
      const rx = hx + rightX,
        ry = trY + v * (brY - trY);
      return [lx + u * (rx - lx), ly + u * (ry - ly)];
    };

    // Main door panel
    p5.fill(...GLASS_COL, 22);
    p5.strokeWeight(1);
    p5.stroke(...LINE_COL);
    // p5.noStroke();
    const [x0, y0] = pt(0, 0),
      [x1, y1] = pt(1, 0);
    const [x2, y2] = pt(1, 1),
      [x3, y3] = pt(0, 1);
    p5.beginShape();
    p5.vertex(x0, y0);
    p5.vertex(x1, y1);
    p5.vertex(x2, y2);
    p5.vertex(x3, y3);
    p5.endShape(p5.CLOSE);

    this.drawDoorBars(p5, pt);
    this.drawDoorHandle(p5, pt);
  }

  private drawDoorBars(p5: p5Types, pt: DoorPt) {
    const barV = 0.07;
    p5.fill(BG);
    // p5.noStroke();

    const drawBar = (v0: number, v1: number) => {
      const [ax, ay] = pt(0, v0),
        [bx, by] = pt(1, v0);
      const [cx, cy] = pt(1, v1),
        [dx, dy] = pt(0, v1);
      p5.beginShape();
      p5.vertex(ax, ay);
      p5.vertex(bx, by);
      p5.vertex(cx, cy);
      p5.vertex(dx, dy);
      p5.endShape(p5.CLOSE);
    };
    drawBar(0, barV);
    drawBar(0, barV);
    drawBar(1 - barV, 1);
  }

  private drawDoorHandle(p5: p5Types, pt: DoorPt) {
    const u = 0.74;
    const v0 = 0.38,
      v1 = 0.62;
    const [x0, y0] = pt(u, v0);
    const [x1, y1] = pt(u, v1);

    p5.strokeWeight(3);
    p5.stroke(...BG);
    p5.line(x0, y0, x1, y1);

    this.drawScrollScrubber(
      p5,
      x0 - 4,
      y0 - 4,
      y1 - y0,
      p5.frameCount + 20,
      false,
      0.4,
    );
  }

  private drawHeader(p5: p5Types, x: number, y: number, w: number) {
    p5.noStroke();
    p5.fill(185, 40, 40, 210);
    p5.rect(x, y, w, HEADER_H);
  }

  private drawScrollbar(
    p5: p5Types,
    x: number,
    y: number,
    h: number,
    t: number,
    isHorizontal = false,
    per: number = 0.22,
  ) {
    p5.push();
    p5.translate(x, y);
    if (isHorizontal) {
      p5.translate(0, 6);
      p5.rotate(-Math.PI / 2);
    } else {
      p5.translate(0, 0);
    }

    const tx = 0;
    const ty = 0;
    const trackH = h;
    const thumbH = trackH * per;
    const thumbY = ty + (trackH - thumbH) * ((Math.sin(t * 0.018) + 1) / 2);

    // p5.strokeWeight(0.8);
    // p5.stroke(...INK);
    p5.noStroke();
    p5.fill(...BG);
    p5.rect(tx, ty, SCROLL_W, trackH);

    p5.fill(...INK, 50);
    p5.rect(tx + 3, ty, 1, trackH);

    p5.noStroke();
    p5.fill(...MUTED, 230);
    p5.rect(tx + 1, thumbY, SCROLL_W - 2, thumbH, 2);

    p5.pop();
  }

  private drawScrollScrubber(
    p5: p5Types,
    x: number,
    y: number,
    h: number,
    t: number,
    isHorizontal = false,
    per: number = 0.22,
  ) {
    p5.push();
    p5.translate(x, y);
    if (isHorizontal) {
      p5.translate(0, 4);
      p5.rotate(-Math.PI / 2);
    } else {
      p5.translate(0, 0);
    }

    const tx = 0;
    const ty = 0;
    const trackH = h;
    const thumbH = trackH * per;
    const thumbY = ty + (trackH - thumbH) * ((Math.sin(t * 0.018) + 1) / 2);
    p5.noStroke();
    p5.fill(...MUTED, 230);
    p5.rect(tx + 1, thumbY, SCROLL_W - 2, thumbH, 2);
    p5.pop();
  }

  private drawSidebar(
    p5: p5Types,
    x: number,
    bodyY: number,
    bodyH: number,
    t: number,
  ) {
    const sideX = x + 2;
    const sideY = bodyY + 4;
    const numRows = Math.floor((bodyH - 6) / (ROW_H + ROW_GAP));
    const activeRow = Math.floor(t / 28) % numRows;

    for (let i = 0; i < numRows; i++) {
      const ry = sideY + i * (ROW_H + ROW_GAP);
      const active = i === activeRow;

      p5.strokeWeight(0.5);
      p5.stroke(...INK);
      p5.fill(
        active ? MUTED[0] : BG[0],
        active ? MUTED[1] : BG[1],
        active ? MUTED[2] : BG[2],
        active ? 200 : 140,
      );
      p5.rect(sideX, ry, SIDEBAR_W, ROW_H, 1);

      p5.noStroke();
      p5.fill(...INK, active ? 230 : 100);
      p5.rect(sideX + 3, ry + 4, 6, 5);
      p5.rect(sideX + 13, ry + 5, SIDEBAR_W - 17, 3);
    }
  }

  private drawContent(
    p5: p5Types,
    cx: number,
    cw: number,
    ctop: number,
    cbottom: number,
    t: number,
  ) {
    const lineH = 3;
    const lineStep = 15;
    const scroll = (t * 0.4) % (LINE_WIDTHS.length * lineStep);

    p5.noStroke();
    for (let i = -1; i < LINE_WIDTHS.length + 3; i++) {
      const ly = ctop - scroll + i * lineStep;
      if (ly + lineH < ctop || ly > cbottom) continue;

      const fadeIn = ly < ctop + 20 ? p5.map(ly, ctop, ctop + 20, 0, 1) : 1;
      const fadeOut =
        ly > cbottom - 20 ? p5.map(ly, cbottom - 20, cbottom, 1, 0) : 1;
      const alpha = 160 * Math.min(fadeIn, fadeOut);

      const lw = cw * LINE_WIDTHS[Math.abs(i) % LINE_WIDTHS.length];
      p5.fill(...INK, alpha);
      p5.rect(cx, ly, lw, lineH, 1);

      if (i % 3 === 1) {
        p5.fill(...INK, alpha * 0.5);
        p5.rect(cx, ly + 5, lw * 0.55, 2, 1);
      }
    }
  }
}
