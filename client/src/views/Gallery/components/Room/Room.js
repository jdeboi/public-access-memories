


import { RoomConfig } from '../../../../data/RoomConfig';
import { doorLineCrossing, boundaryLineCrossing } from './Boundaries';


export default class Room {


  constructor(p5, i) {
    const room = RoomConfig[i];

    this.p5 = p5;
    this.x = room.x;
    this.y = room.y;
    this.rot = room.rot;
    this.dir = room.dir;
    this.link = room.link;
    this.title = room.title;

    this.w = 5;
    this.h = 5;
    this.start = 0;
    this.end = .2;
  }


  display(roomTextures, eyeIcon, roomCount) {

    this.p5.push();

    var x = (this.x + this.w / 2) * globalConfig.scaler;
    var y = (this.y + this.h / 2) * globalConfig.scaler;
    this.p5.translate(x, y);



    this.p5.push();

    x = -this.w / 2 * globalConfig.scaler;
    y = -this.h / 2 * globalConfig.scaler;
    var w = this.w * globalConfig.scaler;
    var h = this.h * globalConfig.scaler;

    if (roomTextures[0] && this.dir === "bottom") this.p5.image(roomTextures[0], x, y, w, h);
    else if (roomTextures[1] && this.dir === "right") this.p5.image(roomTextures[1], x, y, w, h);
    else if (roomTextures[2]) this.p5.image(roomTextures[2], x, y, w, h);

   
    // var count = 0;
    // if (roomCount) count = roomCount[this.title];
    // this.drawEye(eyeIcon, count);

    // this.drawTitle();


    this.p5.pop();

    // p5.textSize(50);
    // p5.fill(0, 255, 0);
    // if (count) p5.text(count, 0, 0)


    this.p5.pop();

    // this.drawRoomDoorEntryCrossing();
    // this.drawRoomDoorCrossing();
    // this.drawRoomDoorBoundary();

    // if (this.closeToDoor()) {
    //   this.p5.noFill();
    //   for (let i = 4 ; i > 0; i--) {
    //     this.p5.strokeWeight(i*4);
    //     this.p5.stroke(255, this.p5.map(i, 4, 1, 10, 140));
    //     this.displayOutline();
    //   }
    // }

  }

  drawTitle() {
    // var w = this.w * globalConfig.scaler;
    // var h = this.h * globalConfig.scaler;

    // this.p5.push();
    // this.p5.translate(-w / 2, -h / 2 - 30);
   
    // this.p5.pop();
  }

  drawEye(eyeIcon, rc) {
    var count = 0;
    if (rc) count = rc;
    if (eyeIcon) {
      // const w = (this.p5.textWidth(count) + 50);
      // const h = 30;
      this.p5.push();
      // this.p5.translate(-w / 2, -h / 2);
      this.p5.fill(255, 100);
      this.p5.stroke(255);
      this.p5.strokeWeight(2);
      // this.p5.rect(0, 0, w, h, 10, 10);
      // let rw = 200;
      // this.p5.rect(-rw/2, 0, rw, 50, 10, 10);

      this.p5.image(eyeIcon, 10, 5, 20, 20);

      this.p5.fill(0);
      this.p5.noStroke();
      this.p5.textSize(14);
      this.p5.text(count, 35, 20);

       // draw title
      this.p5.fill(0);
      this.p5.noStroke();
      
      if (this.title === "hard drives on seashores") {
        let br = this.title.substring(9, this.title.length).indexOf(" ") + 9;
        let t1 = this.title.substring(0, br);
        let t2 = this.title.substring(br, this.title.length);
        this.p5.text(t1, -this.p5.textWidth(t1) / 2, 0);
        this.p5.text(t2, -this.p5.textWidth(t2) / 2, 17);
      }
      else if (this.title.length > 12) {
        let br = this.title.indexOf(" ");
        let t1 = this.title.substring(0, br);
        let t2 = this.title.substring(br, this.title.length);
        this.p5.text(t1, -this.p5.textWidth(t1) / 2, 0);
        this.p5.text(t2, -this.p5.textWidth(t2) / 2, 17);
      } 
      else 
        this.p5.text(this.title, -this.p5.textWidth(this.title) / 2, 0);
      this.p5.pop();
     
      
    }
  }

  displayOutline(p5 = this.p5, scaler = globalConfig.scaler) {
    var w = this.w * scaler;
    var h = this.h * scaler;
    // if (rooms[i].id === "B") h = 7*scaler;
    p5.push();
    p5.translate(this.x * scaler, this.y * scaler);
    p5.rect(0, 0, w, h);

    // label
    // p5.strokeWeight(1);
    // p5.fill(255, 0, 255);
    // p5.text(rooms[i].id, 10, 0)
    p5.pop();
  }

  /////////////////////////////////////////////////////
  // time to go to a new room; this is 90deg from entrance
  drawRoomDoorCrossing(p5 = this.p5) {
    var x0, x1, y0, y1;
    let sc = globalConfig.scaler;
    if (this.dir === "bottom") {
      x0 = this.x + 1;
      x1 = this.x + 1;
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.h * this.end;
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
    // let sc = globalConfig.scaler;
    if (this.dir === "bottom") {
      x0 = this.x + 1;
      x1 = this.x + 1;
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.h * this.end;
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
    // return doorCrossing(userStep, doorC, globalConfig);
    return doorLineCrossing(prevStep, userStep, doorC, globalConfig);
  }

  /////////////////////////////////////////////////////
  // stop our forward progress
  // step from door entrance
  roomDoorBoundary(prevStep, userStep) {
    var x0, x1, y0, y1;
    // let st = globalConfig.stepS;
    // let sc = globalConfig.scaler;
    if (this.dir === "bottom") {
      x0 = this.x + this.w * this.start;
      x1 = this.x + this.w * this.end;
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
      y1 = this.y + this.h - this.h * this.end;
      x0 = this.x + this.w - 1;
      x1 = this.x + this.w - 1;
    }
    const doorC = { x0: x0, y0: y0, x1: x1, y1: y1, to: this.title };
    // return doorCrossing(userStep, doorC, globalConfig);
    return doorLineCrossing(prevStep, userStep, doorC, globalConfig);
  }

  drawRoomDoorBoundary(p5 = this.p5) {
    var x0, x1, y0, y1;
    // let st = globalConfig.stepS;
    let sc = globalConfig.scaler;
    if (this.dir === "bottom") {
      x0 = this.x + this.w * this.start;
      x1 = this.x + this.w * this.end;
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
      y1 = this.y + this.h - this.h * this.end;
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
      x0 = Math.floor(this.x + this.w * this.start);
      x1 = Math.floor(this.x + this.w * this.end);
      y0 = Math.floor(this.y + this.h);
      y1 = Math.floor(this.y + this.h);
    }
    else if (this.dir === "left") {
      y0 = this.y + this.h * this.start;
      y1 = this.y + this.h * this.end;
      x0 = this.x;
      x1 = this.x;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.h * this.end;
      x0 = this.x + this.w;
      x1 = this.x + this.w;
    }
    const doorC = { x0: x0, y0: y0, x1: x1, y1: y1, to: this.title };
    // return doorCrossing(userStep, doorC, globalConfig);
    return doorLineCrossing(prevStep, userStep, doorC, globalConfig);
  }

  drawRoomDoorEntryCrossing(p5 = this.p5) {
    var x0, x1, y0, y1;
    if (this.dir === "bottom") {
      x0 = this.x + this.w * this.start;
      x1 = this.x + this.w * this.end;
      y0 = this.y + this.h;
      y1 = this.y + this.h;
    }
    else if (this.dir === "left") {
      y0 = this.y + this.h * this.start;
      y1 = this.y + this.h * this.end;
      x0 = this.x;
      x1 = this.x;
    }
    else if (this.dir === "right") {
      y0 = this.y + this.h;
      y1 = this.y + this.h - this.h * this.end;
      x0 = this.x + this.w;
      x1 = this.x + this.w;
    }
    p5.stroke(0, 255, 0);
    p5.strokeWeight(10);
    let sc = globalConfig.scaler;
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
    return boundaryLineCrossing(prevStep, userStep, roomWalls, globalConfig);
    // return boundaryCrossing(userStep, roomWalls, globalConfig);
  }
}
