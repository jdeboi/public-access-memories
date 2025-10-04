import { mouseToWorld } from "../../../../helpers/coordinates";
import ShadowDraggable from "./Draggable/ShadowDraggable";

export default class TrashFolder extends ShadowDraggable {
  // constructor(id, x, y, w, h, p5, content, shadow) {
  //     super(id, x, y, w, h, p5, content, shadow);
  // }

  displayContent(userX, userY) {
    this.displayShadow();
    this.displaySolidBack(this.p5.color(255));

    this.p5.push();

    this.p5.translate(0, this.barH);
    // this.p5.image(this.content, 0, 0, this.w, this.h);
    this.displayLabels();
    this.p5.pop();
    this.displayFrame();
  }

  displayLabels() {
    this.p5.fill(0);
    this.p5.noStroke();
    this.p5.push();
    this.p5.translate(54, 38);
    // let dy = 40;
    // let labels = ["2020.pdf", "120K.banana", "thirsty.txt"];
    // if (this.id == 1) labels = ["getcrunk.exe", "oldnews.pdf", "rona.dmg"];
    // else if (this.id == 0) labels = ["rona.dmg", "grad_pdfs", "dump"];

    // let index = 0;
    // for (const lab of labels) {
    //   this.p5.text(lab, 0, dy * index++);
    // }
    this.p5.pop();
  }

  checkContentsClickedNormal = () => {
    if (this.closed) return false;
    let mouse = { x: this.p5.mouseX, y: this.p5.mouseY };
    // console.log(mx, my, userX, userY, this.x, this.y);
    if (this.checkBox(mouse.x, mouse.y)) {
      alert("Don't dig through the trash. You're in a gallery. Geez.");
      return true;
    }
    return false;
  };

  checkContentsClicked = (userX, userY, GlobalConfig) => {
    if (this.closed) return false;
    let mouse = mouseToWorld({ x: userX, y: userY }, this.p5, GlobalConfig);
    // console.log(mx, my, userX, userY, this.x, this.y);
    if (this.checkBox(mouse.x, mouse.y)) {
      alert("Don't dig through the trash. You're in a gallery. Geez.");
      return true;
    }
    return false;
  };

  checkBox = (mx, my) => {
    return (
      mx > this.x &&
      mx < this.x + this.w &&
      my > this.y + this.barH &&
      my < this.y + this.barH + this.h
    );
  };
}
