import { IGlobalConfig } from "../../../interfaces";

let xMin = -10;
let xMax = 35;
let yMin = -3;
let yMax = 42;

export const GlobalConfig: IGlobalConfig = {
  scaler: 70,
  x: -15,
  y: -35,
  worldW: xMax - xMin,
  worldH: yMax - yMin,
};

export const limits = [
  { x: xMin, y: yMin }, // outer limit
  { x: xMax, y: yMin },
  { x: xMax, y: yMax },
  { x: xMin, y: yMax },
  { x: xMin, y: yMin },
];

export const outsideDoors = [
  { x0: 22.5, y0: 5.2, x1: 24, y1: 5.2, to: "outside" }, // top
  { x0: 0, y0: 8.5, x1: 0, y1: 10, to: "outside" }, // left
  { x0: 14, y0: 27.2, x1: 16, y1: 27.2, to: "outside" }, // bottom
  { x0: 22.5, y0: 15.2, x1: 24, y1: 15.2, to: "outside" }, // right
];

// pools
let startX = limits[0].x;
let startY = 22;
export const pools = [
  { x: startX, y: startY },
  { x: startX + 5, y: startY + 5 },
  { x: startX + 10, y: startY + 10 },
];
export const poolSpace = 1; //.5;
