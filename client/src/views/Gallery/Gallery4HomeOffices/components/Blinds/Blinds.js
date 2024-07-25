import ShadowDraggable from "../../../components/p5/Draggable/ShadowDraggable";
import { GlobalConfig } from "../../../../../data/Shows/HomeOffices/GlobalConfig";

export default class BlindsDraggable extends ShadowDraggable {
  constructor(id, x, y, w, h, blinds, p5) {
    super(id, x, y, w, h, p5, null, GlobalConfig);

    this.isClosed = true;
    this.closeAmt = 0;
    this.blinds = blinds;
  }

  displayMask(pg, color) {
    if (!this.closed && !this.minimized) {
      pg.fill(color);
      pg.noStroke();
      pg.rect(this.x, this.y, this.w, this.h + this.barH, this.bRad);

      // pg.rect(this.x, this.y+this.barH, this.w, this.h, this.bRad);
      // pg.rect(this.x, this.y+this.barH, this.w, this.barH);
    }
  }

  displayContent(userX, userY) {
    const dx = userX - this.x;
    // if (this.props.id == 0) console.log(pos, ogPos);
    const dy = userY - this.y;
    const dis = Math.sqrt(dx * dx + dy * dy);
    let maxDis = this.p5.map(this.p5.windowWidth, 400, 2560, 240, 500);
    maxDis = this.p5.constrain(maxDis, 240, 500);
    this.isClosed = dis > maxDis ? true : false;

    let closeSpeed = 0.03;
    if (this.isClosed) {
      this.closeAmt += closeSpeed;
    } else {
      this.closeAmt -= closeSpeed;
    }
    this.closeAmt = this.p5.constrain(this.closeAmt, 0.15, 1);

    let factor = 1.13;
    let w = this.w * factor;
    if (this.blinds)
      this.p5.image(
        this.blinds,
        (this.w - w) / 2,
        5,
        w,
        this.h * this.closeAmt * 0.97
      ); //1.11//1.14
    // super.displayContent(col);
  }
}
