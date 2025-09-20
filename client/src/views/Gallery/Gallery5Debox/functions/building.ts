import p5 from "p5";
import Room from "../components/DeboxRoom";
import p5Types from "p5";
import { IUser } from "../../../../interfaces";
import {
  drawFloor,
  drawSpaceFloor,
  drawSpaceFloorLine,
} from "../../Gallery1/functions/floor";
import {
  limits,
  GlobalConfig,
} from "../../../../data/Shows/Debox/GlobalConfig";
import DeboxRoom from "../components/DeboxRoom";
import Light from "../../components/p5/Light";
import { blue } from "@mui/material/colors";

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
  const isFilled = false;
  p5.strokeWeight(2);
  // p5.stroke(10);
  // drawFloor(
  //   limits[0].x,
  //   limits[0].y,
  //   limits[2].x - limits[0].x,
  //   limits[2].y - limits[0].y,
  //   false,
  //   isFilled,
  //   GlobalConfig.scaler * 5,
  //   p5,
  //   p5.color(0, 10, 20, 100)
  // ); // big floor
  // // drawDanceFloor(p5);

  // // top row
  // p5.strokeWeight(2);
  // // p5.stroke(255, 100);
  // drawFloor(
  //   limits[0].x + 10,
  //   limits[0].y,
  //   20,
  //   3,
  //   false,
  //   isFilled,
  //   GlobalConfig.scaler,
  //   p5,
  //   p5.color(0, 10, 20, 100)
  // );
  // // right alley
  // drawFloor(32, 5, 3, 14, false, isFilled, GlobalConfig.scaler, p5);

  // // stairsOG
  // const col = p5.color(90, 90, 280, 70);
  const blueGray = p5.color(180, 200, 255);
  let dim = 8;
  const maxX = GlobalConfig.worldW;
  const maxY = GlobalConfig.worldH;
  // corners
  drawSpaceFloor(0, 0, dim, dim, p5, GlobalConfig, blueGray);
  drawSpaceFloor(maxX - dim, 0, dim, dim, p5, GlobalConfig, blueGray);
  drawSpaceFloor(0, maxY - dim, dim, dim, p5, GlobalConfig, blueGray);

  for (let i = 1; i < 5; i++) {
    const sp = 4;
    let d = i * sp;
    p5.noStroke();
    drawSpaceFloor(20 + d, maxY - d, sp, d, p5, GlobalConfig, blueGray);

    p5.stroke(blueGray);
    p5.strokeWeight(2);
    p5.line(
      (20 + d) * GlobalConfig.scaler,
      (maxY - d) * GlobalConfig.scaler,
      (20 + d + sp) * GlobalConfig.scaler,
      (maxY - d) * GlobalConfig.scaler
    );
    p5.line(
      (20 + d) * GlobalConfig.scaler,
      (maxY - d) * GlobalConfig.scaler,
      (20 + d) * GlobalConfig.scaler,
      (maxY - d + sp) * GlobalConfig.scaler
    );
  }

  p5.stroke(blueGray);
  p5.strokeWeight(2);
  p5.noFill();
  p5.rect(0, 0, 8 * GlobalConfig.scaler, 8 * GlobalConfig.scaler);
  p5.rect(
    0,
    32 * GlobalConfig.scaler,
    8 * GlobalConfig.scaler,
    8 * GlobalConfig.scaler
  );
  p5.rect(
    32 * GlobalConfig.scaler,
    0,
    8 * GlobalConfig.scaler,
    8 * GlobalConfig.scaler
  );

  const floorD = 3;
  // middle
  drawFloor(
    dim,
    0,
    maxX - 2 * dim,
    floorD,
    false,
    false,
    GlobalConfig.scaler,
    p5,
    p5.color(100, 120, 150, 100)
  );
  drawFloor(
    dim,
    maxY - floorD,
    16,
    floorD,
    false,
    false,
    GlobalConfig.scaler,
    p5,
    p5.color(100, 120, 150, 100)
  );
  drawFloor(
    0,
    dim,
    floorD,
    40 - 16,
    false,
    false,
    GlobalConfig.scaler,
    p5,
    p5.color(100, 120, 150, 100)
  );
  drawFloor(
    maxX - floorD,
    dim,
    floorD,
    16,
    false,
    false,
    GlobalConfig.scaler,
    p5,
    p5.color(100, 120, 150, 100)
  );
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
  dh = 5,
  strokeW = 1
) => {
  p5.push();

  p5.stroke(strokeColor);
  p5.fill(fillColor);
  p5.strokeWeight(strokeW);
  p5.strokeJoin(p5.ROUND);

  // back
  p5.push();
  p5.translate(-dw, -dh);
  p5.rect(0, 0, w, h);
  p5.pop();

  // sides
  p5.quad(0, 0, w, 0, w - dw, -dh, -dw, -dh);
  p5.quad(0, h, w, h, w - dw, h - dh, -dw, h - dh);
  p5.quad(0, 0, 0, h, -dw, h - dh, -dw, -dh);
  p5.quad(w, 0, w, h, w - dw, h - dh, w - dw, -dh);

  // front
  p5.rect(0, 0, w, h);

  p5.pop();
};

export const addLightDivs = (
  divs: any,
  lightImgs: p5Types.Image[],
  p5: p5Types,
  gconfig: any = GlobalConfig
) => {
  divs.lights = [];
  let numLights = 3;
  const lightsP5 = [
    { x: 24.5, y: 4, isFlipped: false },
    { x: 9, y: 13, isFlipped: true },
    { x: 14, y: 24.5, isFlipped: false },
  ];

  for (let i = 0; i < numLights; i++) {
    let light = new Light(p5, i, lightImgs, lightsP5, gconfig);
    divs.lights.push(light);
  }
};

export const displayBarDivs = (userX: number, userY: number, divs: any) => {
  for (const bar of divs.bars) {
    bar.displayDebox(userX, userY);
  }
};

export const display2D3DGridPlanes = (
  p5: p5Types,
  s: number,
  NX = 14,
  NY = 10,
  NZ = 10
) => {
  p5.strokeCap(p5.SQUARE);

  // --- projection / layout ---
  const O = p5.createVector(190, 360); // shared corner
  const ex = p5.createVector(1, 0).mult(s);
  const ey = p5.createVector(0.55, -0.38).mult(s);
  const ez = p5.createVector(0, -0.75).mult(s);

  const blueGray = p5.color(0, 255, 0, 50);

  // Helpers to avoid mutation
  const vadd = (a: p5Types.Vector, b: p5Types.Vector) => a.copy().add(b);
  const vmul = (a: p5Types.Vector, k: number) => a.copy().mult(k);

  // --- draw order: BACK -> RIGHT -> MID (fill + grid) -> FLOOR ---
  fillPlaneQuad(p5, O, ey, ez, NY, NZ, p5.color(0, 0, 0, 100));
  drawPlane(p5, O, ey, ez, NY, NZ, blueGray, { hideBase: true }); // BACK

  const ORight = vadd(O, vmul(ey, NY));
  fillPlaneQuad(p5, ORight, ex, ez, NX, NY, p5.color(0, 0, 0, 100));
  drawPlane(p5, ORight, ex, ez, NX, NY, blueGray, { hideBase: true }); // RIGHT

  const ZMID = Math.floor(NZ * 0.45);
  const OMid = vadd(O, vmul(ez, ZMID));

  // FLOOR last so it occludes bases
  // semi-transparent fill under mid grid
  fillPlaneQuad(p5, O, ex, ey, NX, NY, p5.color(0, 0, 0, 200));
  drawPlane(p5, O, ex, ey, NX, NY, blueGray, { hideBase: false });

  // mid grid on top
  // drawPlane(p5, OMid, ex, ey, NX, NY, blueGray, { hideBase: false });
};

// Draw a u×v grid plane. If hideBase, skip the base line at v=0.
function drawPlane(
  p5: p5Types,
  o: p5Types.Vector,
  u: p5Types.Vector,
  v: p5Types.Vector,
  nu: number,
  nv: number,
  col: p5Types.Color,
  { hideBase = false } = {}
) {
  const vadd = (a: p5Types.Vector, b: p5Types.Vector) => a.copy().add(b);
  const vmul = (a: p5Types.Vector, k: number) => a.copy().mult(k);

  p5.push();
  p5.stroke(col);
  p5.strokeWeight(1);

  const startJ = hideBase ? 1 : 0;

  // lines parallel to u
  for (let j = startJ; j <= nv; j++) {
    const a = vadd(o, vmul(v, j));
    const b = vadd(a, vmul(u, nu));
    p5.line(a.x, a.y, b.x, b.y);
  }
  // lines parallel to v
  for (let i = 0; i <= nu; i++) {
    const a = vadd(o, vmul(u, i));
    const b = vadd(a, vmul(v, nv));
    p5.line(a.x, a.y, b.x, b.y);
  }

  // outline
  p5.stroke(p5.red(col), p5.green(col), p5.blue(col), 230);
  p5.strokeWeight(2);
  const o_u = vadd(o, vmul(u, nu));
  const o_v = vadd(o, vmul(v, nv));
  const o_uv = vadd(o_u, vmul(v, nv));
  if (!hideBase) p5.line(o.x, o.y, o_u.x, o_u.y);
  p5.line(o.x, o.y, o_v.x, o_v.y);
  p5.line(o_u.x, o_u.y, o_uv.x, o_uv.y);
  p5.line(o_v.x, o_v.y, o_uv.x, o_uv.y);
  p5.pop();
}

function fillPlaneQuad(
  p5: p5Types,
  o: p5Types.Vector,
  u: p5Types.Vector,
  v: p5Types.Vector,
  nu: number,
  nv: number,
  col: p5Types.Color
) {
  const vadd = (a: p5Types.Vector, b: p5Types.Vector) => a.copy().add(b);
  const vmul = (a: p5Types.Vector, k: number) => a.copy().mult(k);

  const p0 = o.copy();
  const p1 = vadd(o, vmul(u, nu));
  const p2 = vadd(p1, vmul(v, nv));
  const p3 = vadd(o, vmul(v, nv));

  p5.push();
  p5.noStroke();
  p5.fill(col);
  p5.quad(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
  p5.pop();
}
