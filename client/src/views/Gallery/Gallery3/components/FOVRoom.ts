import p5Types from "p5";
import p5Room from "../../components/p5/p5Room";
import { GlobalConfig } from "../../../../data/Shows/FieldsOfView/GlobalConfig";
import {
  artists,
  rooms,
  roomConfig,
} from "../../../../data/Shows/FieldsOfView/RoomConfig";
import { displayWall } from "../../Gallery1/functions/ground";
import {
  boundaryLineCrossing,
  doorLineCrossing,
} from "../../components/p5/Boundaries";

class FOVRoom extends p5Room {
  doorImg: p5Types.Image;

  constructor(p5: p5Types, i: number, door: p5Types.Image) {
    super(p5, null, i, GlobalConfig, artists, rooms, roomConfig);

    this.doorImg = door;
  }

  displayAnaglyph(img: p5Types.Graphics) {
    this.p5.push();

    var x = (this.x + this.w / 2) * this.GlobalConfig.scaler;
    var y = (this.y + this.h / 2) * this.GlobalConfig.scaler;
    var w = this.w * this.GlobalConfig.scaler;
    var h = this.h * this.GlobalConfig.scaler;

    this.p5.translate(x, y);

    this.p5.push();

    let dx = -w / 2;
    let dy = -h / 2;

    this.p5.image(img, dx, dy, w, h);

    // this.p5.fill("red")
    // this.p5.textSize(100);
    // this.p5.text(this.id, 0, 0);

    dx -= 8;
    dy -= 8;
    displayWall({ x: dx, y: dy }, { x: dx + w, y: dy }, this.p5);
    displayWall({ x: dx + w, y: dy }, { x: dx + w, y: dy + h }, this.p5);

    displayWall({ x: dx, y: dy + h }, { x: dx, y: dy }, this.p5);

    displayWall({ x: dx, y: dy + h }, { x: dx + w * 0.3, y: dy + h }, this.p5);
    displayWall(
      { x: dx + w * 0.7, y: dy + h },
      { x: dx + w, y: dy + h },
      this.p5
    );

    this.p5.pop();

    this.p5.pop();
    // this.drawRoomDoorCrossing();
  }

  roomBoundaryCrossing(
    prevStep: { x: number; y: number },
    userStep: { x: number; y: number }
  ) {
    // TODO
    // not intuitive that this one takes a different set of coordinates...
    // my coordinate system is a little effed

    let w = this.w; //this.w * this.GlobalConfig.scaler;
    let h = this.h; // this.h * this.GlobalConfig.scaler;
    let x = this.x; //(this.x) * this.GlobalConfig.scaler;
    let y = this.y; //(this.y) * this.GlobalConfig.scaler;

    const roomWalls = [
      { x, y },
      { x: x + w, y },
      { x: x + w, y: y + h },
      { x, y: y + h },
      { x, y },
    ];
    return boundaryLineCrossing(
      prevStep,
      userStep,
      roomWalls,
      this.GlobalConfig
    );
  }

  /////////////////////////////////////////////////////
  // time to go to a new room; this is 90deg from entrance
  drawRoomDoorCrossing(p5 = this.p5) {
    const { x0, x1, y0, y1 } = this.getDoor();
    let sc = this.GlobalConfig.scaler;

    p5.stroke(255, 0, 0);
    p5.strokeWeight(10);

    p5.line(x0 * sc, y0 * sc, x1 * sc, y1 * sc);
  }

  roomDoorCrossing(
    prevStep: { x: number; y: number },
    userStep: { x: number; y: number },
    id = 0
  ) {
    const doorC = this.getDoor();
    // return doorCrossing(userStep, doorC, GlobalConfig);
    return doorLineCrossing(prevStep, userStep, doorC, this.GlobalConfig);
  }

  getDoor(p5 = this.p5) {
    var x0, x1, y0, y1;
    x0 = this.x + 2;
    x1 = this.x + 3;
    y0 = this.y + this.h;
    y1 = this.y + this.h;
    return { x0: x0, y0: y0, x1: x1, y1: y1, to: this.link };
  }

  drawRoomDoorBoundary(p5 = this.p5) {
    let sc = this.GlobalConfig.scaler;
    const { x0, y0, x1, y1 } = this.getDoor();
    p5.stroke(255, 0, 255);
    p5.strokeWeight(10);
    p5.line(x0 * sc, y0 * sc, x1 * sc, y1 * sc);
  }

  drawDoor() {
    let sc = this.GlobalConfig.scaler;
    const { x0, y0 } = this.getDoor();

    this.p5.push();
    this.p5.translate(x0 * sc, y0 * sc);
    // this.p5.strokeWeight(5);
    // let numL = 8;
    // let sp = 1;
    // for (let i = 0; i < numL; i++) {
    //     this.p5.stroke(0, 200, 155, this.p5.map(i, 0, numL-1, 255, 50));
    //     this.p5.line(i*2, i*10, 50-i*2, i*10);
    //     sp++;
    // }
    if (this.doorImg)
      this.p5.image(
        this.doorImg,
        (-this.w / 2) * GlobalConfig.scaler + 20,
        -this.doorImg.height
      );
    this.p5.pop();
  }
}

export default FOVRoom;
