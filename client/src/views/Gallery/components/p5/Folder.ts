import Draggable from "./Draggable/Draggable";
import p5Types from "p5";
import { mouseToWorld } from "../../../../helpers/coordinates";

export default class Folder extends Draggable {
  label: string;
  link: string;
  img: p5Types.Image;
  tw: number;

  constructor(
    p5: p5Types,
    id: number,
    x: number,
    y: number,
    label: string,
    link: string,
    img: p5Types.Image,
    GlobalConfig: any
  ) {
    super(id, x, y, 80, 80, p5, img, GlobalConfig);
    // TODO - my coordinate system needs formalization
    // let point = domCoordsToP5World(x, y);
    // this.x = point.x;
    // this.y = point.y;
    this.label = label;
    this.link = link;
    this.img = img;
    this.tw = 40;
  }

  displayInRoom(room: string) {
    if (room !== "" && room !== this.roomToDisplay) {
      return;
    }
    this.display();
  }
  display() {
    this.p5.push();
    this.p5.translate(this.x, this.y);
    this.p5.image(this.img, 0, 0, this.w, this.h);
    this.drawLabel();
    this.p5.pop();
  }

  drawLabel() {
    this.p5.textSize(16);
    this.p5.push();

    this.tw = this.p5.textWidth(this.label);
    this.p5.translate(this.w / 2 - this.tw / 2, this.h + 16);

    // back text
    this.p5.stroke(0);
    this.p5.strokeWeight(1);
    this.p5.fill(0);
    this.p5.text(this.label, 0, 0);

    // white text
    this.p5.noStroke();
    this.p5.fill(255);
    this.p5.text(this.label, 0, 0);

    this.p5.pop();
  }

  checkDraggingNormal(room: string = "") {
    if (room !== "" && room !== this.roomToDisplay) {
      return false;
    }
    let mouse = { x: this.p5.mouseX, y: this.p5.mouseY };
    if (this.checkOver(mouse.x, mouse.y)) {
      this.dragging = true;
      this.startDrag.x = this.p5.mouseX;
      this.startDrag.y = this.p5.mouseY;
      this.startDragCoords.x = this.x;
      this.startDragCoords.y = this.y;
      return true;
    }
    return false;
  }
  checkDragging(userX: number, userY: number) {
    let mouse = mouseToWorld(
      { x: userX, y: userY },
      this.p5,
      this.GlobalConfig
    );
    // console.log(mx, my, userX, userY, this.x, this.y);
    if (this.checkOver(mouse.x, mouse.y)) {
      // console.log("over toolbar");
      // this.draggingOn(mx, my);
      this.dragging = true;
      this.startDrag.x = this.p5.mouseX;
      this.startDrag.y = this.p5.mouseY;
      this.startDragCoords.x = this.x;
      this.startDragCoords.y = this.y;
      return true;
    }
    return false;
  }

  checkOver = (mx: number, my: number) => {
    if (
      mx > this.x &&
      mx < this.x + this.w &&
      my > this.y &&
      my < this.y + this.h
    )
      return true;
    // check label

    let xLab = this.x + this.w / 2 - this.tw / 2;
    if (
      mx > xLab &&
      mx < xLab + this.tw &&
      my > this.y + this.h + 14 &&
      my < this.y + this.h + 14 * 2
    )
      return true;
    return false;
  };

  checkDoubleClickedNormal = (room: string = "") => {
    if (room !== "" && room !== this.roomToDisplay) {
      return;
    }
    let mouse = { x: this.p5.mouseX, y: this.p5.mouseY };
    if (this.checkOver(mouse.x, mouse.y)) {
      this.openInNewTab(this.link);
    }
  };

  checkDoubleClickedAlertNormal = (room: string = "") => {
    if (room !== "" && room !== this.roomToDisplay) {
      return;
    }
    let mouse = { x: this.p5.mouseX, y: this.p5.mouseY };
    if (this.checkOver(mouse.x, mouse.y)) {
      alert("Don't dig through the trash. You're in a gallery. Geez.");
    }
  };

  checkDoubleClicked = (userX: number, userY: number) => {
    let mouse = mouseToWorld(
      { x: userX, y: userY },
      this.p5,
      this.GlobalConfig
    );
    if (this.checkOver(mouse.x, mouse.y)) {
      this.openInNewTab(this.link);
    }
  };

  checkDoubleClickedAlert = (userX: number, userY: number) => {
    let mouse = mouseToWorld(
      { x: userX, y: userY },
      this.p5,
      this.GlobalConfig
    );
    // console.log(mx, my, userX, userY, this.x, this.y);
    if (this.checkOver(mouse.x, mouse.y)) {
      alert("Don't dig through the trash. You're in a gallery. Geez.");
    }
  };

  openInNewTab = (url: string) => {
    var win = window.open(url, "_blank");
    if (win) win.focus();
  };
}
