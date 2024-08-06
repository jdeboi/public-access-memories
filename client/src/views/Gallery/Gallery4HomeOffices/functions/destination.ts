import { GlobalConfig } from "../../../../data/Shows/HomeOffices/GlobalConfig";

export const reachedDestination = (
  stepTo: { x: number; y: number },
  destination: { x: number; y: number }
) => {
  let dx = destination.x - stepTo.x;
  let dy = destination.y - stepTo.y;
  let d = Math.sqrt(dx * dx + dy * dy);
  return d <= 5;
};

export const closeToDestination = (
  stepTo: { x: number; y: number },
  destination: { x: number; y: number }
) => {
  let dx = destination.x - stepTo.x;
  let dy = destination.y - stepTo.y;
  let d = Math.sqrt(dx * dx + dy * dy);
  return d <= GlobalConfig.scaler;
};

const getCloseSteps = (
  stepTo: { x: number; y: number },
  destination: { x: number; y: number }
) => {
  let stepX = (destination.x - stepTo.x) / GlobalConfig.scaler;
  let stepY = (destination.y - stepTo.y) / GlobalConfig.scaler;
  return [stepX, stepY];
};

export const getNextStep = (
  stepTo: { x: number; y: number },
  destination: { x: number; y: number },
  isClicked: boolean = false
) => {
  if (closeToDestination(stepTo, destination)) {
    return getCloseSteps(stepTo, destination);
  }
  const steps = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let min = 1000000;
  let index = 0;
  let i = 0;
  for (const step of steps) {
    let stepDis = getStepDist(stepTo, destination, step);
    if (stepDis < min) {
      min = stepDis;
      index = i;
    }
    i++;
  }
  return steps[index];
};

export const getStepDist = (
  stepTo: { x: number; y: number },
  destination: { x: number; y: number },
  step: number[]
) => {
  const space = GlobalConfig.scaler;
  const dx = destination.x - (stepTo.x + step[0] * space);
  const dy = destination.y - (stepTo.y + step[1] * space);
  return Math.sqrt(dx * dx + dy * dy);
};
