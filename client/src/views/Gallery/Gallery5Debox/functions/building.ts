import p5 from "p5";
import Room from "../components/DeboxRoom";
import p5Types from "p5";
import { IUser } from "../../../../interfaces";
import { drawFloor } from "../../Gallery1/functions/floor";
import {
  limits,
  GlobalConfig,
} from "../../../../data/Shows/Debox/GlobalConfig";
import DeboxRoom from "../components/DeboxRoom";

export const roomDoorEntry = (
  rooms: DeboxRoom[],
  userStep: { x: number; y: number }
) => {
  for (const room of rooms) {
    const distance = room.getUserDistance(userStep);
    const distanceDot = room.getUserDistanceDot(userStep);
    if (distance < room.actualW / 2 || distanceDot < 20) {
      return room.room;
    }
  }
  return null;
};

export const drawAllFloors = (p5: p5Types) => {
  // big floor
  p5.strokeWeight(2);
  p5.stroke(50);
  drawFloor(
    limits[0].x,
    limits[0].y,
    limits[2].x - limits[0].x,
    limits[2].y - limits[0].y,
    false,
    false,
    GlobalConfig.scaler * 5,
    p5
  ); // big floor
  // drawDanceFloor(p5);

  // top row
  p5.strokeWeight(2);
  // p5.stroke(255, 100);
  drawFloor(
    limits[0].x + 10,
    limits[0].y,
    20,
    3,
    false,
    false,
    GlobalConfig.scaler,
    p5
  );
  // right alley
  drawFloor(32, 5, 3, 14, false, false, GlobalConfig.scaler, p5);

  // stairsOG
  drawFloor(-10, 12, 5, 10, false, false, GlobalConfig.scaler, p5);
  drawFloor(-5, 17, 5, 10, false, false, GlobalConfig.scaler, p5); // left column
  drawFloor(0, 22, 5, 10, false, false, GlobalConfig.scaler, p5);
  drawFloor(5, 27, 5, 10, false, false, GlobalConfig.scaler, p5);
};

export const drawRooms = (
  rooms: Room[],
  user: IUser | null,
  userEase: { x: number; y: number }
) => {
  if (rooms) {
    for (const room of rooms) {
      room.displayConnections();
    }
    for (const room of rooms) {
      room.displayRoom(user, userEase);
    }
  }
};

export const draw3D2DBox = (
  p5: p5Types,
  w: number,
  h: number,
  fillColor: p5Types.Color = p5.color(0, 0),
  strokeColor: p5Types.Color = p5.color(255, 255, 255),
  dw = 8,
  dh = 5
) => {
  p5.push();
  p5.fill(fillColor);
  p5.stroke(strokeColor);
  p5.strokeWeight(1);
  // front
  p5.rect(0, 0, w, h);
  // back
  p5.push();
  p5.translate(-dw, -dh);
  p5.rect(0, 0, w, h);
  p5.pop();
  // sides
  p5.line(0, 0, -dw, -dh);
  p5.line(w, 0, w - dw, -dh);
  p5.line(w, h, w - dw, h - dh);
  p5.line(0, h, -dw, h - dh);
  p5.pop();
};
