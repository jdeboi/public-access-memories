import p5Types from "p5";
import Room from "../../components/p5/Room";
import { GlobalConfig } from "../../../../data/Shows/Debox/GlobalConfig";
import {
  artists,
  rooms,
  roomConfig,
} from "../../../../data/Shows/Debox/RoomConfig";

import { draw3D2DBox } from "../functions/building";
import { IUser } from "../../../../interfaces";
import { p5ToUserCoordsNoMiddleSquare } from "../../../../helpers/coordinates";

class DeboxRoom extends Room {
  connections: Array<{ x: number; y: number }> = [];
  actualW: number = 0;
  actualH: number = 0;
  pointOffset: p5Types.Vector;

  constructor(p5: p5Types, i: number) {
    super(p5, null, i, GlobalConfig, artists, rooms, roomConfig);
    const sc = this.GlobalConfig.scaler;
    this.actualW = this.w * sc;
    this.actualH = this.h * sc;

    this.pointOffset = this.p5.createVector(
      this.actualW / 2,
      this.actualH + 30
    );
  }

  displayRoom(user: IUser | null, userEase: { x: number; y: number }) {
    // this.displayOutline();
    const distance = this.getUserDistance(userEase);

    this.p5.push();

    // this.p5.push();
    // this.translateToRoomCenter();
    // // // this.p5.stroke(0, 255, 0);
    // this.p5.noStroke();
    // this.p5.fill(0, 255, 0, this.p5.map(distance, 0, 400, 150, 0, true));
    // this.p5.ellipse(0, 0, this.actualW);
    // this.p5.pop();

    this.translateToRoomCorner(); // or this.p5.translate(this.x, this.y);
    this.p5.push();

    this.displayBox(distance);

    // this.displayBoxOG(distance);

    this.p5.push();
    this.p5.translate(this.pointOffset.x, this.pointOffset.y);
    this.displayDot(userEase);
    this.displayLabel();
    this.p5.pop();

    this.p5.pop();
    this.p5.pop();
  }

  displayDot(userEase: { x: number; y: number }) {
    const distance = this.getUserDistanceDot(userEase);
    const maxDotsFilled = this.p5.floor(
      this.p5.map(distance, 80, 300, 3, 0, true)
    );
    this.p5.noStroke();
    this.p5.fill(0, 255, 0);
    this.p5.ellipse(0, 0, 8);

    this.p5.stroke(0, 255, 0);
    this.p5.strokeWeight(1);
    this.p5.fill(0, 255, 0, 80);
    this.p5.ellipse(0, 0, 25);

    this.p5.noStroke();
    this.p5.fill(0, 255, 0, 80);
    this.p5.ellipse(0, 0, 40);

    this.p5.push();
    this.p5.stroke(0, 255, 0);
    this.p5.noFill();
    for (let i = 0; i < 3; i++) {
      this.p5.rotate(0.5);
      if (i < maxDotsFilled) this.p5.fill(0, 255, 0);
      else this.p5.noFill();
      this.p5.ellipse(25, 0, 5, 5);
    }
    this.p5.pop();
  }

  displayLabel() {
    this.p5.push();
    this.p5.translate(30, -10);
    this.p5.textSize(14);

    const boxH = 18;
    const numW = 38;
    const artistName = this.artist.name?.toLowerCase() || "Unknown";
    const artistW = this.p5.textWidth(artistName);
    const sp = 4;
    draw3D2DBox(this.p5, numW + artistW + sp * 2, boxH);
    // Room Number
    this.p5.fill(0);
    this.p5.stroke(255);
    this.p5.rect(0, 0, numW, boxH);

    this.p5.fill(255);
    this.p5.noStroke();
    // a hack to reverse the room order appearance
    const roomId = this.id + 1;
    const idNum = roomId < 10 ? `0${roomId}` : roomId;
    const idStr = `R${idNum}.`;
    this.p5.text(idStr, 4, 14);

    // Artist Name

    this.p5.translate(numW, 0);
    this.p5.fill(255);
    this.p5.stroke(255);

    this.p5.rect(0, 0, artistW + 2 * sp, boxH);

    this.p5.fill(0);
    this.p5.noStroke();
    this.p5.text(artistName, sp, 14);
    this.p5.pop();
  }

  displayBox(distance: number) {
    const shellAlpha = this.p5.map(distance, 180, 230, 255, 0, true);

    // background
    this.p5.fill(0, shellAlpha / 2, shellAlpha / 4, 200);
    this.p5.noStroke();
    this.p5.push();
    this.p5.rect(0, 10, this.actualW, this.actualH - 15);
    this.p5.translate(-35, -35);
    this.p5.rect(0, 0, this.actualW, this.actualH - 16);
    this.p5.push();
    this.p5.shearX(0.66);
    this.p5.rect(0, 0, this.actualW, this.actualH / 3);
    this.p5.pop();
    this.p5.translate(0, this.actualH - 17);
    this.p5.shearX(0.66);
    this.p5.rect(0, 0, this.actualW, this.actualH / 3);
    this.p5.pop();

    this.p5.push();
    this.p5.translate(-35, -35);
    const numBoxes = 8;
    for (let i = 0; i < numBoxes; i++) {
      let alphaVal = this.p5.sin(this.p5.frameCount * 0.1 + i) * 35 + 50;

      this.p5.push();
      this.p5.translate(0, (this.actualH / numBoxes) * i);
      this.p5.shearX(0.66);
      this.p5.noStroke();
      // this.p5.stroke(255, 255, 255, alphaVal * 3);
      // this.p5.strokeWeight(1);
      const col = this.p5.lerpColor(
        this.p5.color(180, 200, 255),
        this.p5.color(0, 10, 25),
        shellAlpha / 255
      );
      col.setAlpha(alphaVal);
      this.p5.fill(col);
      // this.p5.fill(255, alphaVal);

      this.p5.rect(0, 0, this.actualW, this.actualH / 3);
      this.p5.pop();
    }

    const newH = this.actualH - 17;
    this.drawBlackLine(0, 0, 35, 46, shellAlpha);
    this.drawBlackLine(this.actualW, 0, this.actualW + 35, 46, shellAlpha);
    this.drawBlackLine(0, newH, 35, newH + 46, shellAlpha);
    this.drawBlackLine(0, 0, 0, newH, shellAlpha);
    this.drawBlackLine(0, 0, this.actualW, 0, shellAlpha);

    this.p5.translate(35, 46);
    this.drawBlackLine(0, 0, this.actualW, 0, shellAlpha);
    this.drawBlackLine(0, newH, this.actualW, newH, shellAlpha);
    this.drawBlackLine(0, 0, 0, newH, shellAlpha);
    this.drawBlackLine(this.actualW, 0, this.actualW, newH, shellAlpha);

    this.p5.pop();
  }

  drawBlackLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    alphaVal = 255
  ) {
    const shellCol = this.p5.color(0, alphaVal);
    const shellCol2 = this.p5.color(0, 255, 0, alphaVal);
    this.p5.push();
    this.p5.stroke(shellCol);
    // extend the line a bit for a cool effect
    this.p5.strokeCap(this.p5.SQUARE);
    this.p5.strokeWeight(5);
    this.p5.line(x0, y0, x1, y1);
    this.p5.stroke(shellCol2);
    this.p5.strokeWeight(1);
    this.p5.strokeCap(this.p5.ROUND);
    this.p5.line(x0, y0, x1, y1);
    this.p5.pop();
  }

  displayBoxOG(distance: number) {
    const alphaVal = this.p5.map(distance, 100, 300, 255, 0, true);
    this.p5.noFill();
    this.p5.stroke(155, alphaVal);
    this.p5.strokeWeight(5);
    this.p5.strokeCap(this.p5.ROUND);

    const w = this.actualW;
    const h = this.actualH;
    const x1 = -w / 4;
    const y1 = -h / 4;

    this.p5.rect(x1, y1, w, h);
    this.p5.line(x1 + w, y1, w, 0);
    this.p5.line(x1 + w, h + y1, w, h);

    this.p5.stroke(255, alphaVal);
    this.p5.rect(0, 0, w, h);
    this.p5.line(x1, y1, 0, 0);
    this.p5.line(x1, h + y1, 0, h);
  }

  displayConnections() {
    this.p5.push();
    const greenCol = this.p5.color(0, 255, 0, 120);

    const sc = this.GlobalConfig.scaler;
    for (let i = 0; i < this.connections.length; i++) {
      const connection = this.connections[i];

      // optionally curve or straight line
      const startPos = this.p5.createVector(
        this.x * sc + this.pointOffset.x,
        this.y * sc + this.pointOffset.y
      );
      const endPos = this.p5.createVector(
        connection.x * sc + this.pointOffset.x,
        connection.y * sc + this.pointOffset.y
      );
      // create control points for a
      const cp1 = p5Types.Vector.lerp(startPos, endPos, 0.33);
      const cp2 = p5Types.Vector.lerp(startPos, endPos, 0.66);
      const t = this.p5.frameCount / 60;

      // gentle wiggle
      cp1.y +=
        40 * this.p5.sin(t + startPos.x * 0.01 + this.p5.frameCount * 0.01);
      cp2.y -= 40 * this.p5.sin(t + endPos.x * 0.01);

      this.p5.stroke(greenCol);
      this.p5.strokeWeight(2);
      this.p5.fill(0, 255, 0, 30);
      // Catmull-Rom style curve using curveVertex
      this.p5.beginShape();
      this.p5.curveVertex(startPos.x, startPos.y);
      this.p5.curveVertex(startPos.x, startPos.y);
      this.p5.curveVertex(cp1.x, cp1.y);
      this.p5.curveVertex(cp2.x, cp2.y);
      this.p5.curveVertex(endPos.x, endPos.y);
      this.p5.curveVertex(endPos.x, endPos.y);
      this.p5.endShape();
    }

    this.p5.pop();
  }

  getIsDoorOpen(user: IUser | null): boolean {
    const sc = this.GlobalConfig.scaler;
    const doorW = 2 * sc;
    const doorH = 2 * sc;

    if (!user || !user.x) {
      return false;
    }
    const pt = p5ToUserCoordsNoMiddleSquare(
      this.x + this.w / 2,
      this.y + this.h / 2,
      this.GlobalConfig
    );
    const d = this.p5.dist(user.x, user.y, pt.x, pt.y);
    return d < this.actualW;
  }

  getUserDistance(user: IUser | { x: number; y: number }): number {
    if (!user || !user.x) {
      return Infinity;
    }
    const pt = p5ToUserCoordsNoMiddleSquare(
      this.x + this.w / 2,
      this.y + this.h / 2,
      this.GlobalConfig
    );
    const d = this.p5.dist(user.x, user.y, pt.x, pt.y);
    return d;
  }

  getUserDistanceDot(user: IUser | { x: number; y: number }): number {
    if (!user || !user.x) {
      return Infinity;
    }
    const pt = p5ToUserCoordsNoMiddleSquare(
      this.x + this.pointOffset.x / this.GlobalConfig.scaler,
      this.y + this.pointOffset.y / this.GlobalConfig.scaler,
      this.GlobalConfig
    );
    const d = this.p5.dist(user.x, user.y, pt.x, pt.y);
    return d;
  }
}

export default DeboxRoom;
