import Folder from "./Folder";
import { mouseToWorld } from "../../../../../helpers/coordinates";

export default class Trash extends Folder {
  constructor(p5, id, x, y, label, img, folder, GlobalConfig) {
    super(p5, id, x, y, label, "", img, GlobalConfig);

    this.x = x;
    this.y = y;

    this.folder = folder;
    this.folder.closeWindow();
  }

  drawLabel() {
    this.p5.push();

    this.tw = this.p5.textWidth(this.label);
    this.p5.translate(this.w / 2 - this.tw / 2, this.h + 16);

    // back text
    this.p5.stroke(0);
    this.p5.strokeWeight(2);
    this.p5.fill(0);
    this.p5.text(this.label, 0, 0);

    // white text
    this.p5.stroke(255);
    this.p5.strokeWeight(1);
    this.p5.fill(255);
    this.p5.text(this.label, 0, 0);

    this.p5.pop();
  }

  checkDoubleClickedNormal = (room = -1) => {
    if (room !== -1 && room !== this.roomToDisplay) {
      return;
    }
    let mouse = { x: this.p5.mouseX, y: this.p5.mouseY };

    if (this.checkOver(mouse.x, mouse.y)) {
      // alert("Don't dig through the trash. You're in a gallery. Geez.")
      this.folder.openWindow();
    }
  };

  checkDoubleClicked = (userX, userY, GlobalConfig) => {
    let mouse = mouseToWorld({ x: userX, y: userY }, this.p5, GlobalConfig);
    // console.log(mx, my, userX, userY, this.x, this.y);
    if (this.checkOver(mouse.x, mouse.y)) {
      // alert("Don't dig through the trash. You're in a gallery. Geez.")
      this.folder.openWindow();
    }
  };
}
