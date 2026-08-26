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

const BG: [number, number, number] = [232, 228, 210];
const INK: [number, number, number] = [55, 62, 45];
const MUTED: [number, number, number] = [118, 128, 98];

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

  displayHostBotRoom(roomTextures: p5Types.Image[], onIcon: p5Types.Image) {
    this.displayRoomTexture(roomTextures);
    this.displayRoomToolbarFrame(true, onIcon);
  }

  displayRoomTexture(roomTextures: p5Types.Image[], isDoorOpen = false) {
    // super.displayRoomTexture(roomTexture);

    const p5 = this.p5 as p5Types;
    const sc = this.GlobalConfig.scaler;
    const hw = (this.w / 2) * sc;
    const hh = (this.h / 2) * sc;
    const t = p5.frameCount;

    p5.push();
    this.translateToRoomCenter();
    p5.image(roomTextures[this.id], -hw, -hh, hw * 2, hh * 2);

    const x = -hw;
    const y = -hh;
    const w = hw * 2;
    const h = hh * 2;

    const bodyY = y + HEADER_H;
    const bodyH = h - HEADER_H;

    // content region bounds
    const cx = x + SIDEBAR_W + 8;
    const cw = w - SIDEBAR_W - SCROLL_W - 14;
    const ctop = bodyY + 4;
    const cbottom = y + h - 4;

    this.drawFrontWall(p5, x, y, w, h, isDoorOpen);
    // this.drawHeader(p5, x, y, w);
    this.drawScrollbar(p5, x, w, bodyY, bodyH, t);
    this.drawSidebar(p5, x, bodyY, bodyH, t);
    // this.drawContent(p5, cx, cw, ctop, cbottom, t);

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
    const doorW = w / 3;
    const doorH = (h * 3) / 4;
    const angle = isDoorOpen ? Math.PI / 3 : 0;

    p5.strokeWeight(4);
    p5.stroke(0);

    p5.fill(0, 150, 200, 20);
    p5.rect(x, y, w, h / 4);                            // top
    p5.rect(x, y + h / 4, w / 3, doorH);                // left
    p5.rect(x + (w * 2) / 3, y + h / 4, w / 3, doorH); // right

    // Perspective door: 3D rotateY projected to 2D.
    // Hinge at left edge. Right edge rotates into room (Z increases).
    // Point (u, v) on door → 3D (u·cosθ, v, u·sinθ) → screen via f/(f+Z).
    const f = w * 3; // focal length in screen-space units
    const z = doorW * Math.sin(angle); // Z of the right edge
    const scale = f / (f + z);        // perspective scale at right edge
    const rightX = doorW * Math.cos(angle) * scale;
    const rightY = doorH * scale;     // right edge appears shorter

    const hx = x + w / 3; // hinge x (left side of doorway)
    const hy = y + h / 4; // top of doorway

    // Eye-level at door vertical center: both top and bottom edges converge
    const midY = hy + doorH / 2;
    const trY = midY - (doorH / 2) * scale; // top-right drops toward center
    const brY = midY + (doorH / 2) * scale; // bottom-right rises toward center

    p5.fill(0, 150, 200, 20);
    p5.strokeWeight(2);
    p5.beginShape();
    p5.vertex(hx,          hy);           // TL — hinge top
    p5.vertex(hx + rightX, trY);          // TR — top of free edge (foreshortened)
    p5.vertex(hx + rightX, brY);          // BR — bottom of free edge (foreshortened)
    p5.vertex(hx,          hy + doorH);   // BL — hinge bottom
    p5.endShape(p5.CLOSE);

    // outline on top
    p5.noFill();
    p5.strokeWeight(4);
    p5.rect(x, y, w, h);
  }

  private drawHeader(p5: p5Types, x: number, y: number, w: number) {
    p5.noStroke();
    p5.fill(185, 40, 40, 210);
    p5.rect(x, y, w, HEADER_H);
  }

  private drawScrollbar(
    p5: p5Types,
    x: number,
    w: number,
    bodyY: number,
    bodyH: number,
    t: number,
  ) {
    const tx = x + w - SCROLL_W - 2;
    const ty = bodyY + 2;
    const trackH = bodyH - 4;
    const thumbH = trackH * 0.22;
    const thumbY = ty + (trackH - thumbH) * ((Math.sin(t * 0.018) + 1) / 2);

    p5.strokeWeight(0.8);
    p5.stroke(...INK);
    p5.fill(...BG, 200);
    p5.rect(tx, ty, SCROLL_W, trackH);
    p5.noStroke();
    p5.fill(...MUTED, 230);
    p5.rect(tx + 1, thumbY, SCROLL_W - 2, thumbH, 2);
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
      p5.rect(sideX + 3, ry + 4, 6, 5); // icon
      p5.rect(sideX + 13, ry + 5, SIDEBAR_W - 17, 3); // label
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
