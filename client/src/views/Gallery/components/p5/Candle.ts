import p5Types from "p5";

import { IGlobalConfig } from "../../../../interfaces";
import Light from "./Light";

export default class Candle extends Light {
  constructor(
    id: number,
    x: number,
    y: number,
    imgs: p5Types.Image[],
    p5: p5Types,
    GlobalConfig: IGlobalConfig
  ) {
    super(id, x, y, false, imgs, p5, GlobalConfig);

    this.scaler = 1;
    this.w = 80;
    this.h = 140;
    this.x = x;
    this.y = y;

    this.origX = this.x;
    this.origY = this.y;

    this.imgs = imgs;

    this.isOn = true;

    this.button.x = this.w / 2 - 7.5;
    this.button.y = this.h - 15;
  }

  displayContent(userX: number, userY: number) {
    if (!this.imgs) return;

    this.p5.push();

    var img, imgBack, backW, backH, backY;
    if (this.isOn) {
      img = this.imgs[0];
      imgBack = this.imgs[1];

      backW = imgBack.width * 0.8;
      backH = imgBack.height * 0.65;
      backY = 0;
    } else {
      img = this.imgs[2];
      imgBack = this.imgs[3];

      backW = imgBack.width * 0.8;
      backH = imgBack.height * 0.8;
      backY = -30;
    }

    // shadow / glow
    this.p5.push();
    this.p5.translate(0, this.barH);
    this.p5.image(imgBack, 0, backY, backW, backH);
    this.p5.pop();

    this.displaySolidBack(this.p5.color(0));
    this.p5.translate(0, this.barH);

    if (this.isOn) {
      this.p5.push();
      this.p5.image(img, 0, 0, 80, 80);
      this.p5.pop();
    }

    this.p5.pop();
    this.displayFrame();
    this.displayButton(userX, userY);
  }
}
