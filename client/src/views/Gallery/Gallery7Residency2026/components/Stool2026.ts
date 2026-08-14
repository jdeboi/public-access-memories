import p5Types from "p5";
import Draggable from "../../components/p5/Draggable/Draggable";
import { mouseToWorld } from "../../../../helpers/coordinates";
import { IGlobalConfig } from "../../../../interfaces";

export default class Stool2026 extends Draggable {
  constructor(
    id: number,
    x: number,
    y: number,
    w: number,
    h: number,
    img: p5Types.Image,
    p5: p5Types,
    GlobalConfig: IGlobalConfig
  ) {
    super(id, x, y, w, h, p5, img, GlobalConfig);
  }

  display() {
    if (!this.content) return;
    this.p5.push();
    this.p5.translate(this.x, this.y);
    this.p5.image(this.content, 0, 0, this.w, this.h);
    this.p5.pop();
  }

  checkButtons(_userX: number, _userY: number): boolean {
    return false;
  }

  checkDragging(userX: number, userY: number): boolean {
    const mouse = mouseToWorld(
      { x: userX, y: userY },
      this.p5,
      this.GlobalConfig
    );
    if (
      mouse.x > this.x &&
      mouse.x < this.x + this.w &&
      mouse.y > this.y &&
      mouse.y < this.y + this.h
    ) {
      this.dragging = true;
      this.startDrag.x = this.p5.mouseX;
      this.startDrag.y = this.p5.mouseY;
      this.startDragCoords.x = this.x;
      this.startDragCoords.y = this.y;
      return true;
    }
    return false;
  }
}
