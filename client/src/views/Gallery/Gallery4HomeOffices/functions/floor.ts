import p5Types from "p5";
// import { drawSpaceFloor } from '../../Gallery1/functions/floor';
import { GlobalConfig } from "../../../../data/Shows/FieldsOfView/GlobalConfig";
import {
  rooms,
  roomConfig,
} from "../../../../data/Shows/FieldsOfView/RoomConfig";
import { IRoom } from "../../../../interfaces";
import { roundToMult } from "../../../../helpers/helpers";
// import { drawSpaceFloorLine } from '../../Gallery1/functions/floor';

export const drawAllFloors = (p5: p5Types) => {
  // drawSpaceFloor(-3, -3, 10, 15, p5);
  // drawTraces(p5);
};

export const displayDanceFloor = (
  x: number,
  y: number,
  w: number,
  h: number,
  p5: p5Types
) => {
  let alpha = 50 + 50 * p5.sin(p5.millis() / 500);
  p5.fill(255, alpha);
  p5.rect(x, y, w, h);
};

export const drawTraces = (p5: p5Types) => {
  const lines = [
    [
      [getDoorX(rooms[0]), getDoorY(rooms[0])],
      [getDoorX(rooms[0]), getDoorY(rooms[0]) + 100],
      [getDoorX(rooms[1]), getDoorY(rooms[0]) + 100],
      [getDoorX(rooms[1]), getDoorY(rooms[1])],
    ],
    [
      [getDoorX(rooms[0]), getDoorY(rooms[0]) + 100],
      [getDoorX(rooms[0]), getDoorY(rooms[0]) + 230],
      [
        getDoorX(rooms[0]) + 180 + 380,
        getDoorY(rooms[0]) + 230 + 105 + 100 + 320,
      ],
      [
        getDoorX(rooms[0]) + 180 + 680,
        getDoorY(rooms[0]) + 230 + 105 + 100 + 320,
      ],
    ],
  ];

  const lines2 = [[]];

  setTraceStroke(p5, 150, 10);
  displayMultipleTraces(p5, lines2);
  displayMultipleTraces(p5, lines);

  setTraceStroke(p5, 150, 5);
  displayMultipleTraces(p5, lines2);
  displayMultipleTraces(p5, lines);

  setTraceStroke(p5, 150, 2, "white");
  displayMultipleTraces(p5, lines2);
  displayMultipleTraces(p5, lines);
};

const getDoorX = (room: IRoom) => {
  return (room.x + roomConfig.w / 2) * GlobalConfig.scaler;
};

const getDoorY = (room: IRoom) => {
  return (room.y + roomConfig.h) * GlobalConfig.scaler;
};

const displayMultipleTraces = (p5: p5Types, lines: any) => {
  displayTraceLines(p5, lines);
  // displayTraceLines(p5, lines.map((points: any) => points.map((point: any) => [point[0]-15, point[1]-15])));
  // displayTraceLines(p5, lines.map((points: any) => points.map((point: any) => [point[0]+20, point[1]+20])));
};

export const setTraceStroke = (
  p5: p5Types,
  alpha = 150,
  sw = 10,
  col = "#4bdb88"
) => {
  let col2 = p5.color(col);
  col2.setAlpha(alpha);
  p5.strokeWeight(sw);
  p5.stroke(col2);
};

export const drawSpaceFloorLine = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  w: number,
  p5: p5Types
) => {
  let sc = GlobalConfig.scaler;
  let spacing = GlobalConfig.scaler;
  // x0 = roundToMult(x0 * sc, spacing);
  // y0 = roundToMult(y0 * sc, spacing);
  // x1 = roundToMult(x1 * sc, spacing);
  // y1 = roundToMult(y1 * sc, spacing);
  // w = roundToMult(w * sc, spacing);
  let yOffset = p5.millis() / 2000;

  let slope = (y1 - y0) / (x1 - x0);
  let b = y0 - slope * x0;

  p5.stroke(0, 150);
  p5.noStroke();
  p5.strokeWeight(2);
  if (slope >= 0) {
    for (let x = x0; x <= x1; x += spacing) {
      let yVal = slope * x + b;
      let yValRounded = roundToMult(yVal, spacing);
      let yValStart = yValRounded - w;
      for (let y = yValStart; y <= yValRounded; y += spacing) {
        let n = p5.noise(x * 0.005, y * 0.005 + yOffset);
        let alpha = p5.map(n, 0, 1, 0, 50);
        p5.fill(0, alpha);
        p5.rect(x, y, spacing, spacing);
      }
    }
  } else {
    let index = 0;
    // let yVal = y0;
    // let yValRounded = roundToMult(yVal, spacing);
    for (let x = x0; x <= x1; x += spacing) {
      let yVal = slope * x + b;
      let yValRounded = roundToMult(yVal, spacing);
      let yValStart = yValRounded - w;
      for (let y = yValStart; y <= yValRounded; y += spacing) {
        let n = p5.noise(x * 0.005, y * 0.005 + yOffset);
        let alpha = p5.map(n, 0, 1, 0, 50);
        p5.fill(0, alpha);
        p5.rect(x, y, spacing, spacing);
      }
      // console.log(index++, yVal/spacing, yValRounded/spacing);
    }
  }
};

export const drawGoPatches = (p5: p5Types) => {
  for (let i = 0; i < rooms.length; i++) {
    const x = getDoorX(rooms[i]) - 25;
    const y = getDoorY(rooms[i]);
    drawGoPatch(x, y, 50, 100, 0, p5);
    // drawArrow(getDoorX(rooms[i]), getDoorY(rooms[i]), p5)
  }

  // drawPatchDouble(0, 0, 50, 100, 0, p5);
  // drawGoPatch(0, 0, 50, 100, -Math.PI/4, p5)
};

const drawArrow = (x: number, y: number, p5: p5Types) => {
  p5.strokeWeight(5);
  p5.stroke(0);
  p5.line(x, y, x, y + 50);

  let da = 10;
  p5.line(x, y, x - da, y + da);
  p5.line(x, y, x + da, y + da);
};
const drawPatchDouble = (
  x0: number,
  y0: number,
  w: number,
  h: number,
  rot: number,
  p5: p5Types
) => {
  drawGoPatch(x0, y0, w, h, rot, p5);
  drawGoPatch(x0 + w, y0 + h + 20, w, h, rot + Math.PI, p5);
};

const drawGoPatch = (
  x0: number,
  y0: number,
  w: number,
  h: number,
  rot: number,
  p5: p5Types
) => {
  p5.push();
  p5.translate(x0, y0);
  p5.rotate(rot);
  p5.strokeWeight(5);
  let num = h / 20;
  for (let i = 0; i < num; i++) {
    let maxA = 150;
    let alpha =
      (maxA / 2) * p5.sin(p5.millis() / 200 + (i / 10) * 2 * p5.PI) + maxA / 2;
    // if (dir == -1)
    //     alpha = 255 - alpha;
    let ww = p5.map(alpha, 30, 200, 1, 6);
    // p5.strokeWeight(ww);
    let c1 = p5.color(40, 200, 150, alpha);
    let c2 = p5.color(100, 200, 230, alpha);
    let c = p5.lerpColor(c1, c2, i / num);
    p5.stroke(0, 0, 0, alpha);
    // p5.stroke(60, 0, 80, alpha)
    p5.line(i * 4, i * 10, w - i * 4, i * 10);
  }

  p5.pop();
};

const displayTraceLines = (p5: p5Types, lines: any) => {
  for (let j = 0; j < lines.length; j++) {
    let points = lines[j];
    for (let i = 0; i < points.length - 1; i++) {
      // drawSpaceFloorLine(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], 50, p5)
      p5.line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]);
      // p5.rect()
    }
  }
};
