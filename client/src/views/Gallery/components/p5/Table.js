import Draggable from "./Draggable/Draggable";
import { mouseToWorld, p5ToWorldCoords } from "../../../../helpers/coordinates";

import ButtonTog from "./Draggable/ButtonTog";

export default class Table extends Draggable {
  constructor(id, x, y, w, h, p5, open, closed, GlobalConfig) {
    super(id, x, y, w, h, p5, open, GlobalConfig);

    let pt = p5ToWorldCoords(x, y, GlobalConfig);
    this.x = pt.x;
    this.y = pt.y;

    this.button = new ButtonTog(this.w - 40, this.h, 30, 15, p5);
    this.closedImg = closed;

    // this.isUmbrellaOpen = false;
  }

  displayContent(userX, userY) {
    this.p5.push();
    // this.p5.translate(this.origin.x, this.origin.y);
    this.p5.translate(0, this.barH);

    if (this.button.isOn) this.p5.image(this.content, 0, 0, this.w, this.h);
    else this.p5.image(this.closedImg, 0, 0, this.w, this.h);

    this.p5.pop();
    this.displayFrame();
    this.displayButton(userX, userY);
  }

  checkButtons(userX, userY) {
    if (super.checkButtons(userX, userY)) return true;
    else if (this.checkButton(userX, userY)) return true;
    return false;
  }

  checkButton(userX, userY) {
    let mouse = mouseToWorld(
      { x: userX, y: userY },
      this.p5,
      this.GlobalConfig
    );
    mouse.x -= this.x;
    mouse.y -= this.y;
    if (this.button.mouseOver(mouse.x, mouse.y)) {
      this.button.toggle();
      return true;
    }
    return false;
  }

  displayButton(userX, userY) {
    let mouse = mouseToWorld(
      { x: userX, y: userY },
      this.p5,
      this.GlobalConfig
    );
    mouse.x -= this.x;
    mouse.y -= this.y;
    this.button.display(mouse.x, mouse.y);
  }

  checkButtonsNormal() {
    if (super.checkButtonsNormal()) return true;
    else if (this.checkButtonNormal()) return true;
    return false;
  }

  checkButtonNormal() {
    let mouse = { x: this.p5.mouseX, y: this.p5.mouseY };
    mouse.x -= this.x;
    mouse.y -= this.y;
    if (this.button.mouseOver(mouse.x, mouse.y)) {
      this.button.toggle();
      return true;
    }
    return false;
  }

  displayButtonNormal() {
    let mouse = { x: this.p5.mouseX, y: this.p5.mouseY };
    mouse.x -= this.x;
    mouse.y -= this.y;
    this.button.display(this.isOn, mouse.x, mouse.y);
  }

  displayButton(userX, userY) {
    let mouse = mouseToWorld(
      { x: userX, y: userY },
      this.p5,
      this.GlobalConfig
    );
    mouse.x -= this.x;
    mouse.y -= this.y;
    this.button.display(mouse.x, mouse.y);
  }
}
