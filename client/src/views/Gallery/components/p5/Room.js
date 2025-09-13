// Room.js
// A refactored and cleaned up version of the Room class for better readability and modularity

import { p5ToUserCoords } from "../../../../helpers/coordinates";
import { doorLineCrossing, boundaryLineCrossing } from "./Boundaries";

export default class Room {
  constructor(p5, door, i, GlobalConfig, artists, rooms, roomConfig) {
    this.p5 = p5;
    this.GlobalConfig = GlobalConfig;
    this.id = i;

    const room = rooms[i];
    this.room = rooms[i];
    this.x = room.x;
    this.y = room.y;
    this.dir = room.dir;
    this.link = room.link;
    this.userName = room.userName;
    this.artist = artists[room.artistID];

    this.w = roomConfig.w;
    this.h = roomConfig.w;

    this.start = 0;
    this.end = 1;
    this.door = door;
  }

  translateToRoomCenter() {
    const sc = this.GlobalConfig.scaler;
    const x = (this.x + this.w / 2) * sc;
    const y = (this.y + this.h / 2) * sc;
    this.p5.translate(x, y);
  }

  translateToRoomCorner() {
    const sc = this.GlobalConfig.scaler;
    const x = this.x * sc;
    const y = this.y * sc;
    this.p5.translate(x, y);
  }

  drawRoomTexture(roomTextures) {
    const sc = this.GlobalConfig.scaler;
    const x = (-this.w / 2) * sc;
    const y = (-this.h / 2) * sc;
    const w = this.w * sc;
    const h = this.h * sc;

    if (
      (roomTextures[0] && this.dir == "bottom") ||
      this.dir == "centerBottom"
    ) {
      this.p5.image(roomTextures[0], x, y, w, h);
    } else if (roomTextures[1] && this.dir === "right")
      this.p5.image(roomTextures[1], x, y, w, h);
    else if (roomTextures[2]) this.p5.image(roomTextures[2], x, y, w, h);
  }

  display(roomTextures) {
    this.p5.push();
    this.translateToRoomCenter();
    this.p5.push();
    this.drawRoomTexture(roomTextures);
    this.p5.pop();
    this.p5.pop();
  }

  displayTxt() {
    this.p5.fill("#e3a587");
    this.p5.noStroke();
    this.p5.rect(0, 0, this.p5.textWidth(this.artist) / 2, -30);
    this.p5.fill(255);
  }

  displayOutline(p5 = this.p5, scaler = this.GlobalConfig.scaler) {
    const w = this.w * scaler;
    const h = this.h * scaler;
    p5.push();
    p5.translate(this.x * scaler, this.y * scaler);
    p5.noFill();
    p5.stroke("red");
    p5.strokeWeight(10);
    p5.rect(0, 0, w, h);
    p5.pop();
  }

  drawLine(p5, sc, coords, strokeColor) {
    p5.stroke(...strokeColor);
    p5.strokeWeight(10);
    p5.line(coords.x0 * sc, coords.y0 * sc, coords.x1 * sc, coords.y1 * sc);
  }

  computeLineCoords(type) {
    let { x, y, w, h, dir, start, end } = this;
    if (type === "doorCrossing") {
      if (dir === "bottom")
        return { x0: x + 1, y0: y + h, x1: x + 1, y1: y + h - end };
      if (dir === "left") return { x0: x, y0: y + 1, x1: x + 1, y1: y + 1 };
      if (dir === "right")
        return { x0: x + w - 1, y0: y + h - 1, x1: x + w, y1: y + h - 1 };
      if (dir === "centerBottom") {
        const cx = x + w / 2;
        const doorW = 2;
        return {
          x0: cx - doorW / 2,
          y0: y + h,
          x1: cx + doorW / 2,
          y1: y + h,
        };
      }
    } else if (type === "doorBoundary") {
      if (dir === "bottom")
        return { x0: x + start, y0: y + h - 1, x1: x + end, y1: y + h - 1 };
      if (dir === "left") return { x0: x + 1, y0: y, x1: x + 1, y1: y + 1 };
      if (dir === "right")
        return { x0: x + w - 1, y0: y + h, x1: x + w - 1, y1: y + h - end };
      if (dir === "centerBottom") {
        const cx = x + w / 2;
        const doorW = 2;
        return { x0: cx - doorW / 2, y0: y + h, x1: cx + doorW / 2, y1: y + h };
      }
    } else if (type === "doorEntry") {
      if (dir === "bottom")
        return {
          x0: Math.floor(x + start),
          y0: Math.floor(y + h),
          x1: Math.floor(x + end),
          y1: Math.floor(y + h),
        };
      if (dir === "left") return { x0: x, y0: y + start, x1: x, y1: y + end };
      if (dir === "right")
        return { x0: x + w, y0: y + h, x1: x + w, y1: y + h - end };
      if (dir === "centerBottom") {
        const cx = x + w / 2;
        return { x0: cx - 0.5, y0: y + h, x1: cx + 0.5, y1: y + h };
      }
    }
    return {};
  }

  drawRoomDoorCrossing(p5 = this.p5) {
    this.drawLine(
      p5,
      this.GlobalConfig.scaler,
      this.computeLineCoords("doorCrossing"),
      [255, 0, 0]
    );
  }

  drawRoomDoorBoundary(p5 = this.p5) {
    this.drawLine(
      p5,
      this.GlobalConfig.scaler,
      this.computeLineCoords("doorBoundary"),
      [255, 0, 255]
    );
  }

  drawRoomDoorEntryCrossing(p5 = this.p5) {
    this.drawLine(
      p5,
      this.GlobalConfig.scaler,
      this.computeLineCoords("doorEntry"),
      [0, 255, 0]
    );
  }

  roomDoorCrossing(prevStep, userStep) {
    return doorLineCrossing(
      prevStep,
      userStep,
      {
        ...this.computeLineCoords("doorCrossing"),
        to: this.link,
      },
      this.GlobalConfig
    );
  }

  roomDoorBoundary(prevStep, userStep) {
    return doorLineCrossing(
      prevStep,
      userStep,
      {
        ...this.computeLineCoords("doorBoundary"),
        to: this.artist,
      },
      this.GlobalConfig
    );
  }

  roomDoorEntryCrossing(prevStep, userStep) {
    return doorLineCrossing(
      prevStep,
      userStep,
      {
        ...this.computeLineCoords("doorEntry"),
        to: this.artist,
      },
      this.GlobalConfig
    );
  }

  roomBoundaryCrossing(prevStep, userStep) {
    const roomWalls = [
      { x: this.x, y: this.y },
      { x: this.x + this.w, y: this.y },
      { x: this.x + this.w, y: this.y + this.h },
      { x: this.x, y: this.y + this.h },
      { x: this.x, y: this.y },
    ];
    return boundaryLineCrossing(
      prevStep,
      userStep,
      roomWalls,
      this.GlobalConfig
    );
  }

  getIsDoorOpen(user) {
    const sc = this.GlobalConfig.scaler;
    const doorW = 2 * sc;
    const doorH = 2 * sc;

    if (!user || !user.x) {
      return false;
    }
    const pt = p5ToUserCoords(
      this.x + this.w / 2,
      this.y + this.h,
      this.GlobalConfig
    );
    return (
      user.x >= pt.x - doorW / 2 &&
      user.x <= pt.x + doorW / 2 &&
      user.y >= pt.y - doorH / 2 &&
      user.y <= pt.y + doorH / 2
    );
  }
}
