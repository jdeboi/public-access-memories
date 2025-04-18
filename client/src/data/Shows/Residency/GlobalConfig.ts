import { IGlobalConfig } from "../../../interfaces";

let xMin = -5;
let xMax = 27;
let yMin = -3;
let yMax = 7;

export const GlobalConfig: IGlobalConfig = {
  scaler: 70,
  x: 2,
  y: -2,
  worldW: xMax - xMin,
  worldH: yMax - yMin,
  isSnack: true,
  isBeer: true,
  isCoffee: true,
  isResidency: true,
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
