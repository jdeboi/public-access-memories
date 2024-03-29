


// import { artists, rooms, roomConfig } from '../../../../../data/HomeBody/RoomConfig';
import { doorLineCrossing, boundaryLineCrossing } from './Boundaries';
// import { GlobalConfig as this.GlobalConfig } from '../../../../../data/HomeBody/GlobalConfig';
// import { displayCheckers, displayWall } from '../functions/ground';

export default class Room {


  constructor(p5, door, i, GlobalConfig, artists, rooms, roomConfig) {
    this.GlobalConfig = GlobalConfig;
    this.id = i;
    const room = rooms[i];
    this.p5 = p5;
    this.x = room.x;
    this.y = room.y;
    this.dir = room.dir;
    this.link = room.link;
    this.title = artists[room.artistID];

    this.w = roomConfig.w;
    this.h = roomConfig.w;
    this.start = 0;
    this.end = 1;
    this.door = door;
  }


  display(roomTextures) {

    this.p5.push();

    var x = (this.x + this.w / 2) * this.GlobalConfig.scaler;
    var y = (this.y + this.h / 2) * this.GlobalConfig.scaler;
    this.p5.translate(x, y);



    this.p5.push();

    x = -this.w / 2 * this.GlobalConfig.scaler;
    y = -this.h / 2 * this.GlobalConfig.scaler;
    var w = this.w * this.GlobalConfig.scaler;
    var h = this.h * this.GlobalConfig.scaler;

    this.p5.fill(200);
  


    if (roomTextures[0] && this.dir === "bottom")
      this.p5.image(roomTextures[0], x, y, w, h);
    else if (roomTextures[1] && this.dir === "right")
      this.p5.image(roomTextures[1], x, y, w, h);
    else if (roomTextures[2])
      this.p5.image(roomTextures[2], x, y, w, h);

    this.p5.pop();


    this.p5.pop();


  }

  displayTxt() {
    this.p5.fill("#e3a587");
    this.p5.noStroke();
    this.p5.rect(0, 0, this.p5.textWidth(this.title) / 2, -30);

    this.p5.fill(255);
    this.p5.noStroke();
  }

  displayOutline(p5 = this.p5, scaler = this.GlobalConfig.scaler) {
    var w = this.w * scaler;
    var h = this.h * scaler;
    p5.push();
    p5.translate(this.x * scaler, this.y * scaler);
    p5.rect(0, 0, w, h);
    p5.pop();
  }

  /////////////////////////////////////////////////////
  // time to go to a new room; this is 90deg from entrance
  drawRoomDoorCrossing(p5 = this.p5) {
    var x0, x1, y0, y1;
    let sc = this.GlobalConfig.scaler;
    if (this.dir === "bottom") {
      x0 = this.x + 1;
      x1 = this.x + 1;
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.end;
    }
    else if (this.dir === "left") {
      y0 = this.y + 1;
      y1 = this.y + 1
      x0 = this.x;
      x1 = this.x + 1;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h - 1;
      y1 = this.y + this.h - 1;
      x0 = this.x + this.w - 1;
      x1 = this.x + this.w;
    }
    p5.stroke(255, 0, 0);
    p5.strokeWeight(10);

    p5.line(x0 * sc, y0 * sc, x1 * sc, y1 * sc);
  }



  roomDoorCrossing(prevStep, userStep, id = 0) {
    var x0, x1, y0, y1;
    if (this.dir === "bottom") {
      x0 = this.x + 1;
      x1 = this.x + 1;
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.end;
    }
    else if (this.dir === "left") {
      y0 = this.y + 1;
      y1 = this.y + 1
      x0 = this.x;
      x1 = this.x + 1;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h - 1;
      y1 = this.y + this.h - 1;
      x0 = this.x + this.w - 1;
      x1 = this.x + this.w;
    }
    const doorC = { x0: x0, y0: y0, x1: x1, y1: y1, to: this.link };
    // return doorCrossing(userStep, doorC, GlobalConfig);
    return doorLineCrossing(prevStep, userStep, doorC, this.GlobalConfig);
  }

  /////////////////////////////////////////////////////
  // stop our forward progress
  // step from door entrance
  roomDoorBoundary(prevStep, userStep) {
    var x0, x1, y0, y1;
    if (this.dir === "bottom") {
      x0 = this.x + this.start;
      x1 = this.x + this.end;
      y0 = this.y + this.h - 1;
      y1 = this.y + this.h - 1;
    }
    else if (this.dir === "left") {
      y0 = this.y;
      y1 = this.y + 1
      x0 = this.x + 1;
      x1 = this.x + 1;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.end;
      x0 = this.x + this.w - 1;
      x1 = this.x + this.w - 1;
    }
    const doorC = { x0: x0, y0: y0, x1: x1, y1: y1, to: this.title };
    return doorLineCrossing(prevStep, userStep, doorC, this.GlobalConfig);
  }

  drawRoomDoorBoundary(p5 = this.p5) {
    var x0, x1, y0, y1;
    let sc = this.GlobalConfig.scaler;
    if (this.dir === "bottom") {
      x0 = this.x + this.start;
      x1 = this.x + this.end;
      y0 = this.y + this.h - 1;
      y1 = this.y + this.h - 1;
    }
    else if (this.dir === "left") {
      y0 = this.y;
      y1 = this.y + 1
      x0 = this.x + 1;
      x1 = this.x + 1;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.end;
      x0 = this.x + this.w - 1;
      x1 = this.x + this.w - 1;
    }
    const doorC = { x0: x0, y0: y0, x1: x1, y1: y1, to: this.title };
    p5.stroke(255, 0, 255);
    p5.strokeWeight(10);
    p5.line(x0 * sc, y0 * sc, x1 * sc, y1 * sc);
  }

  /////////////////////////////////////////////////////
  // we have entered the room, but not yet loading new room
  roomDoorEntryCrossing(prevStep, userStep) {
    var x0, x1, y0, y1;
    if (this.dir === "bottom") {
      x0 = Math.floor(this.x + this.start);
      x1 = Math.floor(this.x + this.end);
      y0 = Math.floor(this.y + this.h);
      y1 = Math.floor(this.y + this.h);
    }
    else if (this.dir === "left") {
      y0 = this.y + this.start;
      y1 = this.y + this.end;
      x0 = this.x;
      x1 = this.x;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.end;
      x0 = this.x + this.w;
      x1 = this.x + this.w;
    }
    const doorC = { x0: x0, y0: y0, x1: x1, y1: y1, to: this.title };
    return doorLineCrossing(prevStep, userStep, doorC, this.GlobalConfig);
  }

  drawRoomDoorEntryCrossing(p5 = this.p5) {
    var x0, x1, y0, y1;
    if (this.dir === "bottom") {
      x0 = this.x + this.start;
      x1 = this.x + this.end;
      y0 = this.y + this.h;
      y1 = this.y + this.h;
    }
    else if (this.dir === "left") {
      y0 = this.y + this.start;
      y1 = this.y + this.end;
      x0 = this.x;
      x1 = this.x;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.end;
      x0 = this.x + this.w;
      x1 = this.x + this.w;
    }
    p5.stroke(0, 255, 0);
    p5.strokeWeight(10);
    let sc = this.GlobalConfig.scaler;
    p5.line(x0 * sc, y0 * sc, x1 * sc, y1 * sc);
  }

  roomBoundaryCrossing(prevStep, userStep) {
    const roomWalls = [
      { x: (this.x), y: this.y },
      { x: (this.x + this.w), y: this.y },
      { x: (this.x + this.w), y: (this.y + this.h) },
      { x: (this.x), y: (this.y + this.h) },
      { x: (this.x), y: this.y }
    ];
    return boundaryLineCrossing(prevStep, userStep, roomWalls, this.GlobalConfig);
  }
}
