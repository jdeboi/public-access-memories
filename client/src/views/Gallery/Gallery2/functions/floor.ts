// import { roundToMult } from '../../Gallery1/p5/functions/round';
import {
  GlobalConfig,
  limits,
} from "../../../../data/Shows/AsIRecall/GlobalConfig";
import { danceFloor } from "../../../../data/Shows/AsIRecall/BotConfig";
import p5Types from "p5";
import Floppy from "../components/Floppy/Floppy";

export const drawAllFloors = (floppies: Floppy[], p5: p5Types) => {
  // big floor
  // drawFloor(limits[0].x, limits[0].y, limits[2].x - limits[0].x, limits[2].y - limits[0].y, false, true, GlobalConfig.scaler * 5, p5); // big floor
  drawSpaceFloor(0, 0, 40, 40, 4, p5, true);

  // behind dance
  drawSpaceFloor(24, 0, 16, 10, 1, p5, false);
  // behind wine
  drawSpaceFloor(30, 25, 10, 10, 1, p5, false);

  // dance to wine
  // drawSpaceFloor(36, 9, 4, 16, 1, p5, false);

  p5.stroke("white");
  p5.strokeWeight(1);
  let x = 0;
  let y = 10;
  let w = 6;
  // drawFloor(0, y, 5, 10, false, false, GlobalConfig.scaler, p5);
  drawFloor(x, y, w, 10, false, false, GlobalConfig.scaler, p5);
  drawFloor(x + w, y + 5, w, 10, false, false, GlobalConfig.scaler, p5); // left column
  drawFloor(x + w * 2, y + 10, w, 10, false, false, GlobalConfig.scaler, p5);
  drawFloor(x + w * 3, y + 15, w, 10, false, false, GlobalConfig.scaler, p5);
  drawFloor(x + w * 4, y + 20, w, 5, false, false, GlobalConfig.scaler, p5);

  drawDanceFloor(p5);
  drawTraces(floppies, p5);
};

const drawSpaceFloor = (
  x0: number,
  y0: number,
  w: number,
  h: number,
  div: number,
  p5: p5Types,
  isDark = false
) => {
  let spacing = GlobalConfig.scaler * div;
  let d = new Date();
  let yOffset = d.getTime() / 2000;
  // let bound = 5000;

  let sc = GlobalConfig.scaler;
  for (let x = x0 * sc; x < (x0 + w) * sc; x += spacing) {
    for (let y = y0 * sc; y < (y0 + h) * sc; y += spacing) {
      let n = p5.noise(x * 0.005, y * 0.005 + yOffset);
      let alpha = p5.map(n, 0, 1, 0, 150);
      if (isDark) p5.fill(0, alpha);
      else p5.fill(255, alpha);
      p5.strokeWeight(2);
      p5.stroke(0);
      p5.rect(x, y, spacing, spacing);
    }
  }
};

const drawTraces = (floppies: Floppy[], p5: p5Types) => {
  const lines = [
    [
      [floppies[0].getTrace().startX, floppies[0].getTrace().endY],
      [24 * GlobalConfig.scaler, floppies[0].getTrace().endY],
      [30 * GlobalConfig.scaler, 15 * GlobalConfig.scaler],
      [30 * GlobalConfig.scaler, floppies[3].getTrace().endY],
      [floppies[3].getTrace().endX, floppies[3].getTrace().endY],
      [20 * GlobalConfig.scaler, 29 * GlobalConfig.scaler],
      [floppies[2].getTrace().endX, 29 * GlobalConfig.scaler],
      [floppies[2].getTrace().endX, floppies[2].getTrace().endY],
      [
        floppies[2].getTrace().endX + 4 * GlobalConfig.scaler,
        floppies[2].getTrace().endY,
      ],
      [
        floppies[2].getTrace().endX + 4 * GlobalConfig.scaler,
        floppies[0].getTrace().endY,
      ],
    ],
    [
      [7 * GlobalConfig.scaler, floppies[5].getTrace().endY],
      [floppies[5].getTrace().endX, floppies[5].getTrace().endY],
      [floppies[5].getTrace().endX, floppies[6].getTrace().endY],
      [floppies[6].getTrace().endX, floppies[6].getTrace().endY],
      [
        15 * GlobalConfig.scaler,
        (floppies[6].getTrace().endY + floppies[7].getTrace().endY) / 2,
      ],
      [15 * GlobalConfig.scaler, 29 * GlobalConfig.scaler],
    ],
    [
      [
        15 * GlobalConfig.scaler,
        (floppies[6].getTrace().endY + floppies[7].getTrace().endY) / 2,
      ],
      [floppies[7].getTrace().endX, floppies[7].getTrace().endY],
      [floppies[8].getTrace().endX, floppies[8].getTrace().endY],
    ],
    [
      [30 * GlobalConfig.scaler, floppies[3].getTrace().endY],
      [floppies[4].getTrace().endX, floppies[4].getTrace().endY],
    ],
  ];

  const barLines = [
    [34 * GlobalConfig.scaler, 8 * GlobalConfig.scaler],
    [7 * GlobalConfig.scaler, 15 * GlobalConfig.scaler],
    [33 * GlobalConfig.scaler, 28 * GlobalConfig.scaler],
  ];

  const lines2 = [
    // diagonal to dance floor
    // [
    //     [barLines[0][0], barLines[0][1]],
    //     [30 * GlobalConfig.scaler, 15 * GlobalConfig.scaler]
    // ],

    // to bottom bar
    // [
    //     [floppies[3].getTrace().endX, floppies[3].getTrace().endY],
    //     [barLines[2][0] - 3 * GlobalConfig.scaler, barLines[2][1]],
    //     [barLines[2][0], barLines[2][1]]
    // ],
    // [
    //     [barLines[2][0], barLines[2][1]],
    //     [barLines[2][0], barLines[2][1] + GlobalConfig.scaler * 4],
    //     [floppies[7].getTrace().endX, floppies[7].getTrace().endY]
    // ],

    // left top bar
    [
      [7 * GlobalConfig.scaler, floppies[0].getTrace().endY],
      [7 * GlobalConfig.scaler, floppies[5].getTrace().endY],
    ],
    [
      [7 * GlobalConfig.scaler, floppies[2].getTrace().endY],
      [floppies[2].getTrace().endX, floppies[2].getTrace().endY],
    ],
  ];

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

const drawLinePath = (p5: p5Types, lines: any) => {
  // for (let j = 0; j < lines.length; j++) {
  //     let points = lines[j];
  //     for (let i = 0; i < points.length - 1; i++) {
  //         let dis = points[i+1][1] - points[i][1];
  //         for (let j = 0; j < dis; j+= 20) {
  //             p5.line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]);
  //         }
  //     }
  // }
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

const displayTraceLines = (p5: p5Types, lines: any) => {
  for (let j = 0; j < lines.length; j++) {
    let points = lines[j];
    for (let i = 0; i < points.length - 1; i++) {
      p5.line(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1]);
    }
  }
};

const drawGrid = (p5: p5Types) => {
  let spacing = GlobalConfig.scaler;
  p5.stroke(255, 100);
  p5.strokeWeight(2);
  let sc = GlobalConfig.scaler;
  for (let x = limits[0].x * sc; x <= limits[1].x * sc; x += spacing) {
    p5.line(x, limits[0].y * sc, x, limits[2].y * sc);
  }

  for (let y = limits[0].y * sc; y <= limits[2].y * sc; y += spacing) {
    p5.line(limits[0].x * sc, y, limits[1].x * sc, y);
  }
};

const drawFloor = (
  x0: number,
  y0: number,
  w: number,
  h: number,
  isDark: boolean,
  isFilled: boolean,
  spacing: number,
  p5: p5Types
) => {
  // let spacing = GlobalConfig.scaler;
  let d = new Date();
  let yOffset = d.getTime() / 200;
  // let bound = 5000;
  if (isFilled) p5.fill(255, 150);
  else p5.fill(0, 100);
  // p5.stroke(255, 200);
  // if (isDark) p5.stroke(0, 255);
  if (isDark) p5.fill(255, 30);
  let sc = GlobalConfig.scaler;
  let xInd = 0;
  let yInd = 0;
  for (let x = x0 * sc; x < (x0 + w) * sc; x += spacing) {
    for (let y = y0 * sc; y < (y0 + h) * sc; y += spacing) {
      let alpha = 255;
      if (isFilled) {
        // if (isCheckered) alpha = ((xInd + yInd) % 2 == 0) ? 200 : 50;
        let d = new Date();
        alpha = p5.map(
          Math.sin(d.getTime() / 1000 + x / 100 + y / 200),
          -1,
          1,
          0,
          110
        );
        p5.fill(255, alpha);
      } else {
        // alpha = p5.map(Math.sin(new Date()/1000 + x/100 + y/200), -1, 1, 0, 180);
        // p5.stroke(255, alpha);
      }
      // if (isDark) {
      //   p5.fill(0, 150);
      // }
      p5.rect(x, y, spacing, spacing);
      yInd++;
    }
    xInd++;
  }

  // p5.fill(255, 50);
  // p5.rect(-12*sc, -10*sc, (38+12)*sc, (40+10)*sc);
};

const drawDanceFloor = (p5: p5Types) => {
  let sc = GlobalConfig.scaler;
  let spacing = 60;
  let w = danceFloor.w;
  let h = danceFloor.h;

  p5.noStroke();
  let d = new Date();
  let alpha = p5.map(Math.sin(d.getTime() / 500), -1, 1, 150, 255);
  p5.fill(255, alpha);
  for (let x = danceFloor.x; x < danceFloor.x + w; x += spacing) {
    for (let y = danceFloor.y; y < danceFloor.y + h; y += spacing) {
      // p5.line(, y, bound, y);
      p5.rect(x, y, 50, 50);
    }
  }
};
