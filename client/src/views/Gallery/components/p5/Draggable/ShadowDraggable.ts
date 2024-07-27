import Draggable from "./Draggable";
import p5Types from "p5";

export default class ShadowDraggable extends Draggable {
  static shadow: p5Types.Image;

  constructor(
    id: number,
    x: number,
    y: number,
    w: number,
    h: number,
    p5: p5Types,
    content: p5Types.Image | null,
    GlobalConfig: any
  ) {
    super(id, x, y, w, h, p5, content, GlobalConfig);

    // Load the image only once and store it in the static property
    if (!ShadowDraggable.shadow) {
      ShadowDraggable.shadow = p5.loadImage(
        "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/tracklights/black_shadow.png"
      );
    }

  }

  displayContent(userX: number, userY: number) {
    this.displayShadow();
    super.displayContent(userX, userY);
  }

  displayShadow() {
    var backW = this.w * 1.25;
    var backH = this.h * 1.2;

    var backY = 0;

    this.p5.push();
    this.p5.translate(0, this.barH);
    this.p5.image(ShadowDraggable.shadow, 0, backY, backW, backH);
    this.p5.pop();
  }
}
