import Draggable from "../../../../Gallery/components/p5/Draggable/Draggable";
import p5Types from "p5";
import {
  domCoordsToP5World,
  mouseToWorld,
} from "../../../../../helpers/coordinates";
import {
  roomConfig,
  artists,
  rooms,
} from "../../../../../data/Shows/AsIRecall/RoomConfig";
import { GlobalConfig } from "../../../../../data/Shows/AsIRecall/GlobalConfig";
import RoomLabel from "../../../../Gallery/components/p5/RoomLabel";
import { setTraceStroke } from "../../functions/floor";
import FloppyButton from "./FloppyButton";

export default class Floppy extends Draggable {
  connection: { x: number; y: number };
  label: RoomLabel;
  link: string;
  // img: p5Types.Image;
  tw: number;
  slider: p5Types.Image;
  openAmt: number;
  isOpen: boolean;
  mobileButton: FloppyButton;
  dragCount: number;

  constructor(
    p5: p5Types,
    id: number,
    x: number,
    y: number,
    link: string,
    eyeIcon: p5Types.Image,
    img: p5Types.Image,
    slider: p5Types.Image,
    font: p5Types.Font,
    connection: { x: number; y: number }
  ) {
    super(
      id,
      x,
      y,
      roomConfig.w * GlobalConfig.scaler,
      roomConfig.h * GlobalConfig.scaler,
      p5,
      img,
      GlobalConfig
    );
    // TODO - my coordinate system needs formalization
    // let point = domCoordsToP5World(x, y);
    // this.x = point.x;
    // this.y = point.y;
    this.slider = slider;
    this.label = new RoomLabel(
      p5,
      id,
      eyeIcon,
      font,
      GlobalConfig,
      artists,
      rooms,
      roomConfig
    );
    this.link = link;
    // this.img = img;
    this.tw = roomConfig.w * 0.8;
    this.connection = connection;

    this.openAmt = 0;
    this.isOpen = false;

    const buttonW = this.w * 0.5;
    this.mobileButton = new FloppyButton(
      (this.w - buttonW) / 2,
      -buttonW * 0.5,
      buttonW,
      0.4 * buttonW,
      p5
    );

    this.dragCount = this.p5.frameCount;
  }

  getTrace() {
    let loopX = this.x + this.w * 0.5; //+ this.w *.8;
    let loopY = this.y + this.h + 30;

    const len = GlobalConfig.scaler * 2;
    return {
      startX: loopX,
      startY: loopY + 15,
      endX: loopX,
      endY: loopY + len,
    };
  }

  displayWithLabel(x: number, y: number, roomCount: any) {
    // this.p5.push();
    // this.p5.translate(0, -this.barH);
    // this.displayToolBar(x, y);
    // this.p5.pop();

    this.display(x, y);
    this.displayLabel(roomCount);
    this.displayConnection();
    // this.displayLoading();
  }

  checkOpen(userEase: any, users: any) {
    // user position
    let coord = domCoordsToP5World(userEase.x, userEase.y, GlobalConfig);
    if (
      this.p5.dist(coord.x, coord.y, this.x + this.w / 2, this.y + this.h / 2) <
      250
    ) {
      return true;
    }

    // mouse position
    let mouse = mouseToWorld(userEase, this.p5, GlobalConfig);
    if (this.checkOver(mouse.x, mouse.y)) {
      return true;
    }
    return false;
  }

  openDoor(userEase: any, users: any) {
    let maxOpen = this.w * 0.13;

    this.isOpen = this.checkOpen(userEase, users);
    let speed = 10;
    if (this.isOpen) {
      this.openAmt += speed;
      if (this.openAmt > maxOpen) this.openAmt = maxOpen;
    } else {
      this.openAmt -= speed;
      if (this.openAmt < 0) this.openAmt = 0;
    }
  }

  displayContent(userX: number, userY: number) {
    let fac = this.content ? this.w / this.content.width : 1;
    if (this.content) {
      this.p5.image(this.content, 0, 0, this.w, this.h);
    }
    this.p5.image(
      this.slider,
      -this.openAmt + 22,
      0,
      this.slider.width * fac,
      this.slider.height * fac
    );
  }

  displayMobileButton(userX: number, userY: number) {
    this.p5.push();
    this.p5.translate(this.x, this.y);
    this.mobileButton.display(userX, userY);
    this.p5.pop();
  }

  displayLoading() {
    const buttonW = this.w * 0.6;
    const x = this.x + this.w - buttonW;
    const y = this.y + this.h + 12;

    this.p5.push();
    // this.p5.translate(this.x + (this.w - buttonW)/2, this.y - buttonH*1.2);
    // this.p5.translate(this.x, y);
    this.p5.translate(x, y);

    this.p5.fill(0);
    this.p5.strokeWeight(2);
    this.p5.stroke(255);
    // this.p5.rect(0, 0, buttonW, 20, 5);

    this.displayBars();
    this.p5.pop();
  }

  displayBars() {
    // const barW = 6;
    // const numBars = 10;
    // const spacing = 4;
    // const buttonW = numBars*barW + (numBars+1)*spacing;//this.w *.5;
    // const buttonH = 30; //buttonW/4;

    const buttonW = this.w * 0.63;
    const spacing = 4;
    const numBars = 10;
    const barW = (buttonW - 2 * spacing - (numBars - 1) * spacing) / numBars;
    const buttonH = 23;

    this.p5.noStroke();
    const c1 = this.p5.color(50); //255, 50);
    // c1.setAlpha(100);
    const c2 = this.p5.color("#4bdb88");
    for (let i = 0; i < numBars; i++) {
      const col = this.p5.lerpColor(
        c1,
        c2,
        this.p5.map(i, 0, numBars - 1, 0, 1)
      );
      this.p5.fill(col);
      this.p5.translate(spacing, 0);
      this.p5.rect(0, 3, barW, buttonH - 6, 3);
      this.p5.translate(barW, 0);
    }
  }

  displayConnection() {
    let loopX = this.x + this.w / 2;
    let loopY = this.y + this.h + 30;
    this.p5.noFill();
    const len = GlobalConfig.scaler * 2;
    let point = this.getTrace();

    setTraceStroke(this.p5);
    this.p5.ellipse(point.startX, point.startY - 20, 28);
    this.p5.line(point.startX, point.startY, point.endX, point.endY);

    setTraceStroke(this.p5, 150, 5);
    this.p5.ellipse(point.startX, point.startY - 20, 28);
    this.p5.line(point.startX, point.startY, point.endX, point.endY);

    setTraceStroke(this.p5, 150, 2, "white");
    this.p5.ellipse(point.startX, point.startY - 20, 28);
    this.p5.line(point.startX, point.startY, point.endX, point.endY);
  }

  displayLabel(roomCount: any) {
    this.p5.push();
    this.p5.translate(this.x, this.y);

    let x = roomConfig.w * GlobalConfig.scaler * 0.2;

    this.label.displayFloppy(x, this.h * 0.65, roomCount);
    this.p5.pop();
  }

  drawLabelOG() {
    this.p5.textSize(16);
    this.p5.push();

    this.tw = this.p5.textWidth(this.label.artist);
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

  checkDragging(userX: number, userY: number) {
    let mouse = mouseToWorld({ x: userX, y: userY }, this.p5, GlobalConfig);
    // console.log(mx, my, userX, userY, this.x, this.y);
    if (this.checkOver(mouse.x, mouse.y)) {
      // console.log("over toolbar");
      // this.draggingOn(mx, my);
      this.dragCount = this.p5.frameCount;
      this.dragging = true;
      this.startDrag.x = this.p5.mouseX;
      this.startDrag.y = this.p5.mouseY;
      this.startDragCoords.x = this.x;
      this.startDragCoords.y = this.y;
      return true;
    }
    return false;
  }

  endFloppyDrag(p5: p5Types) {
    super.endDrag();
    // if (this.p5.frameCount - this.dragCount < 10) {
    //     this.newPage();
    // }
    let d = this.p5.dist(
      this.startDrag.x,
      this.startDrag.y,
      p5.mouseX,
      p5.mouseY
    );
    if (d < 2) {
      // this.newPage();
      return this.link;
    }
    return null;
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

    // let xLab = this.x + this.w / 2 - this.tw / 2;
    // if (mx > xLab && mx < xLab + this.tw && my > this.y + this.h + 14 && my < this.y + this.h + 14 * 2)
    //     return true;
    return false;
  };

  checkOverMobileButton = (mx: number, my: number) => {
    let mouse = this.getMouseButtons(mx, my);

    if (this.mobileButton.mouseOver(mouse.x, mouse.y)) {
      return true;
    }
    return false;
  };

  checkDoubleClicked = (userX: number, userY: number) => {
    let mouse = mouseToWorld({ x: userX, y: userY }, this.p5, GlobalConfig);
    if (this.checkOver(mouse.x, mouse.y)) {
      // this.newPage();
      return true;
    }
    return false;
  };

  checkDoubleClickedAlert = (userX: number, userY: number) => {
    let mouse = mouseToWorld({ x: userX, y: userY }, this.p5, GlobalConfig);
    // console.log(mx, my, userX, userY, this.x, this.y);
    if (this.checkOver(mouse.x, mouse.y)) {
      // alert("Don't dig through the trash. You're in a gallery. Geez.")
      return true;
    }
    return false;
  };

  newPage = () => {
    if (window.confirm("Open work in a new tab?")) {
      this.openInNewTab(this.link);
    }
  };

  openInNewTab = (url: string) => {
    var win = window.open(url, "_blank");
    if (win) win.focus();
  };
}
