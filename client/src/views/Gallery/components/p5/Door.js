import Draggable from './Draggable/Draggable';
import { doorLineCrossing } from './Boundaries';

import { domCoordsToP5World } from '../../../../helpers/coordinates';
// import { GlobalConfig, outsideDoors } from '../../../../../data/HomeBody/GlobalConfig';

function getCoord(id, outsideDoors, GlobalConfig) {
  let isFlipped = id === 1;
  let x = outsideDoors[id].x0 * GlobalConfig.scaler;
  let y = outsideDoors[id].y0 * GlobalConfig.scaler;
  let w = 0;
  let h = 0;


  let scaler = GlobalConfig.scaler / 100;
  if (isFlipped) {
    w = 180;
    h = 500;
  }
  else {
    w = 500;
    h = 180;
  }
  w *= scaler;
  h *= scaler;


  if (id === 2) {
    x -= 150 * scaler;
    y -= h + 24;
  }
  else if (!isFlipped) {
    x -= 180 * scaler;
    y -= h + 24;

  }
  else {
    x -= 2;
    y -= w + 34;
  }

  return {x, y, w, h};
}
export default class Door extends Draggable {

  constructor(p5, id, imgs, outsideDoors, GlobalConfig) {
    super(id, getCoord(id, outsideDoors, GlobalConfig).x, getCoord(id, outsideDoors, GlobalConfig).y, getCoord(id,outsideDoors, GlobalConfig).w, getCoord(id, outsideDoors, GlobalConfig).h, p5, null, GlobalConfig);
    this.isFlipped = this.id === 1;
    this.point = outsideDoors[id];
    this.scaler = GlobalConfig.scaler / 100;
    this.config = GlobalConfig;
    this.imgs = imgs;
    this.isOpen = true;
    this.openAmt = 0;
  }

  checkOpen(user, users) {

    // if (!this.isFlipped) {
    let coord = domCoordsToP5World(user.x, user.y, this.GlobalConfig);
    if (this.p5.dist(coord.x, coord.y, this.x + this.w / 2, this.y + this.h / 2) < 250) {
      return true;
    }
    for (const usr of users) {
      let coord = domCoordsToP5World(usr.x, usr.y, this.GlobalConfig);
      if (this.p5.dist(coord.x, coord.y, this.x + this.w / 2, this.y + this.h / 2) < 250) {

        return true;
      }
    }
    return false;
    // }
  }

  openDoor(user, users, isPanGallery) {
    let maxOpen = 124 * this.scaler;
    
    if (isPanGallery) {
      this.openAmt = maxOpen;
    }
    else {
      this.isOpen = this.checkOpen(user, users);
      
      let speed = 10;
      if (this.isOpen) {
        this.openAmt += speed;
        if (this.openAmt > maxOpen)
          this.openAmt = maxOpen;
      }
      else {
        this.openAmt -= speed;
        if (this.openAmt < 0)
          this.openAmt = 0;
      }
    }

  }

  display(userX, userY, isClosed, closedSign) {
    this.p5.push();
    this.p5.translate(this.x, this.y);
    if (!this.closed) {
      if (!this.minimized)
        this.displayContent(userX, userY, isClosed, closedSign);
    }
    this.displayLine();
    this.p5.pop();
  }

  displayContent(userX, userY, isClosed, closedSign) {

    let dAmt = this.openAmt;
    if (isClosed)
      dAmt = 0;
    let w = this.w;
    let h = this.h;
    if (this.isFlipped) {
      w = this.h;
      h = this.w;
    }

    this.p5.push();
    if (this.isFlipped) {
      this.p5.rotate(Math.PI / 2);
      this.p5.translate(26, -h);
    }
    else this.p5.translate(0, 26);
    this.p5.image(this.imgs[0], 0, 0, w, h);
    this.p5.image(this.imgs[1], -dAmt, 0, w, h);
    this.p5.push();
    this.p5.scale(-1, 1);
    this.p5.image(this.imgs[1], -dAmt - w, 0, w, h);
    this.p5.pop();

    if (isClosed) {
      let sW = closedSign.width * .4;
      let sH = closedSign.height * .4;
      this.p5.image(closedSign, (w - sW) / 2, (h - sH) / 2, sW, sH)
    }
    this.p5.pop();
  }

  displayLine(p5 = this.p5, scaler = this.config.scaler) {
    p5.line(this.point.x0 * scaler, this.point.y0 * scaler, this.point.x1 * scaler, this.point.y1 * scaler);
  }

  doorCrossing(prevStop, userStep) {
    return doorLineCrossing(prevStop, userStep, this.point, this.config);
  }
}
