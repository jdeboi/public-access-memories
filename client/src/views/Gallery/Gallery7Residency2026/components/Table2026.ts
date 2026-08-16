import p5Types from "p5";
import { IGlobalConfig } from "../../../../interfaces";
import { mouseToWorld } from "../../../../helpers/coordinates";
import ButtonRect from "../../components/p5/Draggable/ButtonRect";
import Stool2026 from "./Stool2026";

const MAX_STOOLS = 8;
const BACK_ROW_MAX = 4; // indices 0–3 drawn behind the table
const TABLE_W = 600;
const TABLE_H = TABLE_W / 3;
const STOOL_W = 144;
const STOOL_H = 144;

// Back stools are positioned so roughly half the stool shows above the table top
const BACK_STOOL_OFFSET_Y = -Math.round(STOOL_H * 0.3);

// Counter pill dimensions (relative to table local origin)
const BAR_Y = TABLE_H / 8;
const BAR_H = 32;
const BAR_W = 160;
const BTN_W = 30;
const BTN_H = 26;

export default class Table2026 {
  p5: p5Types;
  GlobalConfig: IGlobalConfig;
  x: number;
  y: number;
  w: number;
  h: number;
  tableImg: p5Types.Image;
  stoolImg: p5Types.Image;
  stoolCount: number;
  stools: Stool2026[];
  minusBtn: ButtonRect;
  plusBtn: ButtonRect;

  constructor(
    xWorld: number,
    yWorld: number,
    tableImg: p5Types.Image,
    stoolImg: p5Types.Image,
    p5: p5Types,
    GlobalConfig: IGlobalConfig,
    defaultStoolCount: number = 6,
  ) {
    this.p5 = p5;
    this.GlobalConfig = GlobalConfig;
    const sc = GlobalConfig.scaler;
    this.x = xWorld * sc;
    this.y = yWorld * sc;
    this.w = TABLE_W;
    this.h = TABLE_H;
    this.tableImg = tableImg;
    this.stoolImg = stoolImg;
    this.stoolCount = defaultStoolCount;
    this.stools = [];

    const midX = this.w / 2;
    this.minusBtn = new ButtonRect(
      "−",
      midX - BAR_W / 2 + 4,
      BAR_Y + (BAR_H - BTN_H) / 2,
      BTN_W,
      BTN_H,
      p5,
    );
    this.plusBtn = new ButtonRect(
      "+",
      midX + BAR_W / 2 - BTN_W - 4,
      BAR_Y + (BAR_H - BTN_H) / 2,
      BTN_W,
      BTN_H,
      p5,
    );

    this.syncStools();
  }

  private stoolDefaultPos(i: number): { x: number; y: number } {
    const isBack = i < BACK_ROW_MAX;
    const slot = isBack ? i : i - BACK_ROW_MAX;
    const sx =
      this.x + (this.w / (BACK_ROW_MAX + 1)) * (slot + 1) - STOOL_W / 2;
    const sy = isBack ? this.y + BACK_STOOL_OFFSET_Y : this.y + this.h / 2;
    return { x: sx, y: sy };
  }

  private syncStools() {
    while (this.stools.length > this.stoolCount) this.stools.pop();
    while (this.stools.length < this.stoolCount) {
      const i = this.stools.length;
      const { x, y } = this.stoolDefaultPos(i);
      this.stools.push(
        new Stool2026(
          i,
          x,
          y,
          STOOL_W,
          STOOL_H,
          this.stoolImg,
          this.p5,
          this.GlobalConfig,
        ),
      );
    }
  }

  display(userX: number, userY: number) {
    const p5 = this.p5;

    // 1. Back stools — drawn before table image so table overlaps them
    const numBack = Math.min(this.stoolCount, BACK_ROW_MAX);
    for (let i = 0; i < numBack; i++) this.stools[i].display();

    // 2. Table image + counter UI
    p5.push();
    p5.translate(this.x, this.y);
    p5.image(this.tableImg, 0, 0, this.w, this.h);
    this.displayCounter(userX, userY);
    p5.pop();

    // 3. Front stools — drawn after table image so they appear in front
    for (let i = BACK_ROW_MAX; i < this.stoolCount; i++) {
      this.stools[i].display();
    }
  }

  private displayCounter(userX: number, userY: number) {
    const p5 = this.p5;
    const mouse = mouseToWorld({ x: userX, y: userY }, p5, this.GlobalConfig);
    const mx = mouse.x - this.x;
    const my = mouse.y - this.y;

    const midX = this.w / 2;

    p5.push();
    p5.noStroke();
    p5.fill(20, 20, 20, 210);
    p5.rect(midX - BAR_W / 2, BAR_Y, BAR_W, BAR_H, 6);
    p5.textFont("Arial");

    this.minusBtn.display(mx, my);
    this.plusBtn.display(mx, my);

    p5.fill(255);
    p5.noStroke();
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(15);

    p5.text(this.stoolCount, midX, BAR_Y + BAR_H / 2 - 1);

    p5.fill(160);
    p5.textSize(10);
    p5.text("stools (0–8)", midX, BAR_Y + BAR_H + 11);

    p5.pop();
  }

  checkButtons(userX: number, userY: number): boolean {
    const mouse = mouseToWorld(
      { x: userX, y: userY },
      this.p5,
      this.GlobalConfig,
    );
    const mx = mouse.x - this.x;
    const my = mouse.y - this.y;

    if (this.minusBtn.mouseOver(mx, my)) {
      if (this.stoolCount > 0) {
        this.stoolCount--;
        this.syncStools();
      }
      return true;
    }
    if (this.plusBtn.mouseOver(mx, my)) {
      if (this.stoolCount < MAX_STOOLS) {
        this.stoolCount++;
        this.syncStools();
      }
      return true;
    }
    return false;
  }

  checkDragging(userX: number, userY: number): boolean {
    for (const stool of [...this.stools].reverse()) {
      if (stool.checkDragging(userX, userY)) return true;
    }
    return false;
  }

  endDrag() {
    for (const stool of this.stools) stool.endDrag();
  }

  update() {
    for (const stool of this.stools) stool.update();
  }
}
