import { getLimits } from "../../../helpers/helpers";
import { IGlobalConfig } from "../../../interfaces";

const xMin = 0;
const xMax = 30;
const yMin = 0;
const yMax = 30;

export const GlobalConfig: IGlobalConfig = {
  scaler: 70,
  x: -14,
  y: -14,
  worldW: xMax - xMin,
  worldH: yMax - yMin,
};

export const limits = getLimits(xMin, xMax, yMin, yMax);
