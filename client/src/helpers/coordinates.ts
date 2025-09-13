// P5 Coords = block units (1, 4, ... ~40)

// World Coords = the (arbitrary) origin is in the top left of sketch world
// so world coords are block units * scaler relative to origin (0, 0)

// Dom Coords = like world coords but we have to add the starting x & y ?

// import { GlobalConfig } from "../data/GlobalConfig";
import p5Types from "p5";

export const p5ToWorldCoords = (x: number, y: number, GlobalConfig: any) => {
  let xx = x * GlobalConfig.scaler;
  let yy = y * GlobalConfig.scaler;
  return { x: xx, y: yy };
};

export const p5ToDomCoords = (x: number, y: number, GlobalConfig: any) => {
  let xx = (x + GlobalConfig.x) * GlobalConfig.scaler;
  let yy = (y + GlobalConfig.y) * GlobalConfig.scaler;

  return { x: xx, y: yy };
};

export const mouseToWorld = (
  userEase: { x: number; y: number },
  p5: p5Types,
  GlobalConfig: any
) => {
  let x = p5.mouseX - p5.windowWidth / 2;
  let y = p5.mouseY - p5.windowHeight / 2;

  const worldUser = domCoordsToP5World(userEase.x, userEase.y, GlobalConfig);
  x += worldUser.x;
  y += worldUser.y;
  return { x, y };
};

export const domCoordsToP5 = (x: number, y: number, GlobalConfig: any) => {
  let xx = x / GlobalConfig.scaler - GlobalConfig.x;
  let yy = y / GlobalConfig.scaler - GlobalConfig.y;
  return { x: xx, y: yy };
};

export const domCoordsToP5World = (x: number, y: number, GlobalConfig: any) => {
  let p = domCoordsToP5(x, y, GlobalConfig);
  let xx = p.x * GlobalConfig.scaler;
  let yy = p.y * GlobalConfig.scaler;
  return { x: xx, y: yy };
};

export const p5ToUserCoords = (x: number, y: number, GlobalConfig: any) => {
  // + GlobalConfig.scaler/2 to get middle of square issue
  let xx = (x + GlobalConfig.x) * GlobalConfig.scaler + GlobalConfig.scaler / 2;
  let yy = (y + GlobalConfig.y) * GlobalConfig.scaler + GlobalConfig.scaler / 2;
  return { x: xx, y: yy };
};

export const p5ToUserCoordsNoMiddleSquare = (
  x: number,
  y: number,
  GlobalConfig: any
) => {
  // + GlobalConfig.scaler/2 to get middle of square issue
  let xx = (x + GlobalConfig.x) * GlobalConfig.scaler;
  let yy = (y + GlobalConfig.y) * GlobalConfig.scaler;
  return { x: xx, y: yy };
};

export const userToWorldCoords = (
  userX: number,
  userY: number,
  GlobalConfig: any
) => {
  const { scaler, x, y } = GlobalConfig;
  let xx = userX - scaler / 2 - scaler * x;
  let yy = userY - scaler / 2 - scaler * y;
  return { x: xx, y: yy };
};
