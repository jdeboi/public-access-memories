import {
  GlobalConfig,
  limits,
} from "../../../../data/Shows/Residency2026/GlobalConfig";
import Wall from "../../components/p5/Wall";
import p5Types from "p5";
import { IUser } from "../../../../interfaces";
import ResidencyRoom from "../../Gallery0Residency/components/ResidencyRoom";

export const initOuterWalls = (p5: p5Types, walls: Wall[]) => {
  walls.push(new Wall(p5, limits, GlobalConfig));
};

// World-unit positions for structural columns — centered on the image
const COLUMN_POSITIONS = [
  { x: 3.8, y: -0.5 },
  { x: 7.8, y: -0.5 },
  { x: 3.8, y: 3.8 },
  { x: 7.8, y: 3.8 },
  { x: 3.8, y: 7.5 },
  { x: 7.8, y: 7.5 },
  { x: 3.8, y: 11.8 },
  { x: 7.8, y: 11.8 },
];

export const drawColumns = (columnImg: p5Types.Image, p5: p5Types) => {
  if (!columnImg) return;
  const sc = GlobalConfig.scaler;
  const colW = 80;
  const colH = 280;
  p5.push();
  p5.imageMode(p5.CENTER);
  for (const { x, y } of COLUMN_POSITIONS) {
    p5.image(columnImg, x * sc, y * sc, colW, colH);
  }
  p5.imageMode(p5.CORNER);
  p5.pop();
};

export const drawGalleryGround = (
  floorTex0: p5Types.Image,
  floorTex1: p5Types.Image,
  p5: p5Types,
) => {
  if (!floorTex0 || !floorTex1) return;
  const sc = GlobalConfig.scaler;
  const tileSize = 5; // world units per tile

  for (let x = -5; x < 28; x += tileSize) {
    for (let y = -3; y < 23; y += tileSize) {
      // deterministic pseudo-random per tile — stable across frames
      const hash = ((x * 2654435761 + y * 1013904223) >>> 0) % 2;
      const tex = hash === 0 ? floorTex0 : floorTex1;
      // +1 overlap prevents sub-pixel gaps when canvas is at fractional translate
      p5.image(tex, x * sc, y * sc, sc * tileSize + 1, sc * tileSize + 1);
    }
  }
};

export const drawWalls = (walls: Wall[], p5: p5Types) => {
  for (const wall of walls) wall.display(p5);
};

export const drawRooms = (
  rooms: ResidencyRoom[],
  roomTextures: p5Types.Image[],
  otherImgs: p5Types.Image[],
  users: IUser[],
  user: IUser,
  p5: p5Types,
) => {
  if (!rooms) return;
  for (const room of rooms) {
    if (room.userName === "hostBot") {
      room.displayHostBotRoom(roomTextures, otherImgs[1]);
      continue;
    }
    const artist = users.find((u) => u.userName === room.userName);
    if (artist) {
      room.displayArtistInRoom(
        user,
        roomTextures,
        otherImgs[1],
        room.userName || undefined,
      );
    } else {
      room.displayArtistNotInRoom(
        user,
        roomTextures,
        otherImgs[0],
        room.userName || undefined,
      );
    }
  }
};
