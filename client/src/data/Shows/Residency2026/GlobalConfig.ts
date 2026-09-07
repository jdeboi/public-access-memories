import { getLimits } from "../../../helpers/helpers";
import { IGlobalConfig } from "../../../interfaces";

let xMin = -5;
let xMax = 27;
let yMin = -3;
let yMax = 21;

export const GlobalConfig: IGlobalConfig = {
  scaler: 70,
  x: -4,
  y: -4,
  worldW: xMax - xMin,
  worldH: yMax - yMin,
  isSnack: true,
  isBeer: true,
  isCoffee: true,
  isResidency: true,
};

export const limits = getLimits(xMin, xMax, yMin, yMax);

export const outsideDoors = [];
