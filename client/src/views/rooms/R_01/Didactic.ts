import p5Types from "p5";
import { IGlobalConfig } from "../../../interfaces";
import { mouseToWorld } from "../../../helpers/coordinates";
import ButtonRect from "../../Gallery/components/p5/Draggable/ButtonRect";
import { BrizQuadType } from "./briz";
import ShadowDraggable from "../../Gallery/components/p5/Draggable/ShadowDraggable";

export class Didactic extends ShadowDraggable {
  public img: p5Types.Image | null = null;
  public button: ButtonRect;
  public callback: () => void;
  public data: BrizQuadType | null = null;
  public font: p5Types.Font | null = null;
  public font2: p5Types.Font | null = null;

  constructor(
    id: number,
    x: number,
    y: number,
    w: number,
    h: number,
    data: BrizQuadType,
    p5: p5Types,
    GlobalConfig: IGlobalConfig | null,
    callback: () => void,
    font: p5Types.Font | null = null,
    font2: p5Types.Font | null = null
  ) {
    super(id, 0, 0, w, h, p5, null, GlobalConfig);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = p5.loadImage(data.imgUrl);
    this.origX = this.x;
    this.origY = this.y;
    this.data = data;
    this.callback = callback;
    this.font = font;
    this.font2 = font2;

    this.button = new ButtonRect(
      "READ MORE",
      0,
      h + 50,
      90,
      24,
      p5,
      this.font2
    );
  }

  checkButtons(userX: number, userY: number) {
    if (super.checkButtons(userX, userY)) return true;
    else if (this.checkButton(userX, userY)) return true;
    return false;
  }

  checkButton(userX: number, userY: number) {
    let mouse = mouseToWorld(
      { x: userX, y: userY },
      this.p5,
      this.GlobalConfig
    );
    mouse.x -= this.x;
    mouse.y -= this.y;
    if (this.button.mouseOver(mouse.x, mouse.y)) {
      this.callback();
      return true;
    }
    return false;
  }

  displayButton(userX: number, userY: number) {
    let mouse = mouseToWorld(
      { x: userX, y: userY },
      this.p5,
      this.GlobalConfig
    );
    mouse.x -= this.x;
    mouse.y -= this.y;
    const alphaVal = this.getAlphaVal(userX, userY);
    this.button.displayAlpha(mouse.x, mouse.y, 255 - alphaVal);
  }

  display(mx: number, my: number) {
    if (!this.img || !this.data) return;
    super.display(mx, my);
  }

  displayContent(userX: number, userY: number) {
    if (!this.img || !this.data) return;

    this.displayShadow();
    this.displaySolidBack(this.p5.color(0));

    const pad = 3;

    const imgW = this.w - pad * 2;
    const imgH = imgW;

    this.p5.push();
    // this.p5.imageMode(this.p5.CENTER);
    this.p5.noStroke();

    this.p5.fill(0, 160);
    // this.p5.rectMode(this.p5.CENTER);
    // this.p5.rect(x, y, imgW + 16, imgH + 16, 10);

    this.p5.image(this.img, pad, this.barH + pad, imgW, imgH);
    this.displayDidactic();
    this.displayCover(userX, userY);
    this.p5.pop();
    this.displayFrame();

    this.displayButton(userX, userY);
  }

  getAlphaVal(userX: number, userY: number) {
    const dis = this.p5.dist(
      this.x + this.w / 2,
      this.y + this.h / 2,
      userX,
      userY
    );
    // console.log(dis);
    if (dis < 400) return 0;

    // const alphaVal = p5.map(dis, 0, 300, 100, 0);
    const alphaVal = this.p5.map(dis, 400, 600, 0, 255, true);
    return alphaVal;
  }

  displayCover(userX: number, userY: number) {
    const alphaVal = this.getAlphaVal(userX, userY);
    this.p5.fill(0, alphaVal);
    this.p5.rect(0, 0, this.w, this.h + this.barH);
  }

  displayDidactic() {
    // short didactic box
    const boxW = this.w;
    const boxH = 64;
    const bx = 0;
    const by = this.h - boxH + this.barH;

    this.p5.fill(0);
    this.p5.rect(bx, by, boxW, boxH, 0, 0, this.bRad, this.bRad);

    this.p5.fill(255);
    this.p5.textAlign(this.p5.LEFT, this.p5.TOP);

    // if (this.font) this.p5.textFont(this.font, 24);
    // if (this.data?.vector) this.p5.text(this.data?.vector, bx + 10, by + 8);
    // this.p5.textSize(14);
    if (this.font) this.p5.textFont(this.font, 17);
    if (this.data?.didactic) {
      this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
      this.p5.text(
        this.data.vector + ": " + this.data.label + " " + this.data.didactic,
        bx + 10,
        by + 8,
        boxW - 20,
        boxH - 16
      );
    }
  }
}
