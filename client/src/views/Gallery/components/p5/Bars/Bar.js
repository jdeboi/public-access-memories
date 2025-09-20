// import { GlobalConfig } from '../../../../../../data/HomeBody/GlobalConfig';
import { draw3D2DBox } from "../../../Gallery5Debox/functions/building";
import Draggable from "../Draggable/Draggable";
// import { numBarItems } from '../../../../../data/HomeBody/BotConfig';

export default class Bar extends Draggable {
  constructor(
    id,
    { x, y, w, h, isFlipped, type },
    shadow,
    numBarItems,
    p5,
    GlobalConfig
  ) {
    super(
      id,
      x * GlobalConfig.scaler,
      y * GlobalConfig.scaler,
      w,
      h,
      p5,
      null,
      GlobalConfig
    );
    this.shadow = shadow;
    this.type = type;
    this.sz = 34;
    this.isFlipped = isFlipped;
    this.isResidencyBar = GlobalConfig.isResidency;

    if (isFlipped) {
      let w = this.w;
      this.w = this.h;
      this.h = w;
    }
    this.img0 = null;
    this.img1 = null;

    this.numBarItems = numBarItems;
  }

  displayContent() {
    this.p5.push();

    // shadow / glow
    this.displayShadow();

    this.displaySolidBack(this.p5.color(255));
    this.p5.translate(0, this.barH);

    this.p5.push();
    // this.p5.scale(-1, 1);
    this.p5.translate(5, 40);
    this.displayBarContents();

    this.p5.pop();

    this.p5.pop();

    this.displayFrame();
  }

  displayShadow() {
    var backW = this.w * 1.25;
    var backH = this.h * 1.2;
    // if (this.isFlipped) {
    //     backW = this.w * 1.17;
    //     backH = this.h * 1.25;
    // }
    var backY = 0;

    this.p5.push();
    this.p5.translate(0, this.barH);
    this.p5.image(this.shadow, 0, backY, backW, backH);
    this.p5.pop();
  }

  displayBarContents() {
    this.p5.textFont("times");
    this.p5.textSize(34);
    this.displaySpecificBar();
  }

  displaySpecificBar() {
    this.p5.textSize(this.sz);
    if (this.img0 && this.img1) {
      if (this.isFlipped) {
        for (let i = 0; i < this.numBarItems; i++) {
          this.p5.image(this.img0, i * 40 - 30, 0, this.sz, this.sz);
          this.p5.image(this.img1, i * 40 - 30, 40, this.sz, this.sz);
        }
      } else {
        for (let i = 0; i < this.numBarItems; i++) {
          this.p5.image(this.img0, 0, i * 40 - 30, this.sz, this.sz);
          this.p5.image(this.img1, 40, i * 40 - 30, this.sz, this.sz);
        }
      }
    }
  }

  displayDebox(userX, userY) {
    this.p5.push();
    this.p5.translate(this.x, this.y + 27);
    if (!this.closed) {
      if (!this.minimized) {
        draw3D2DBox(
          this.p5,
          this.w,
          this.h,
          this.p5.color(180 / 2, 200 / 2, 255 / 2, 80),
          this.p5.color(this.p5.color(180, 200, 255)),
          8,
          5,
          2
        );
        this.p5.translate(5, 40);
        this.displayBarContents();
      }
    }
    this.p5.pop();
    this.displayToolBar(userX, userY);
  }
}
