import {
  GlobalConfig,
  limits,
} from "../../../../data/Shows/Residency2026/GlobalConfig";
import {
  rooms,
  roomConfig,
} from "../../../../data/Shows/Residency2026/RoomConfig";
import Wall from "../../components/p5/Wall";
import p5Types from "p5";
import { IUser } from "../../../../interfaces";
import ResidencyRoom from "../../Gallery0Residency/components/ResidencyRoom";

export const initOuterWalls = (p5: p5Types, walls: Wall[]) => {
  walls.push(new Wall(p5, limits, GlobalConfig));
};

// World-unit positions for structural columns — derived from room right edges
const COLUMN_POSITIONS = rooms
  .filter((r) => r.id < 6)
  .flatMap((r) => [{ x: r.x + roomConfig.w + 1.44, y: r.y + 1.3 }]);

export const drawColumns = (columnImg: p5Types.Image, p5: p5Types) => {
  if (!columnImg) return;
  const sc = GlobalConfig.scaler;
  const colW = 190;
  const colH = colW * 3;
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

  const ctx = (p5 as any).drawingContext as CanvasRenderingContext2D;
  ctx.save();
  ctx.beginPath();
  ctx.rect(
    -5 * sc,
    -3 * sc,
    GlobalConfig.worldW * sc,
    GlobalConfig.worldH * sc,
  );
  ctx.clip();

  for (let x = -5; x < 28; x += tileSize) {
    for (let y = -3; y < 23; y += tileSize) {
      // deterministic pseudo-random per tile — stable across frames
      const hash = ((x * 2654435761 + y * 1013904223) >>> 0) % 2;
      const tex = hash === 0 ? floorTex0 : floorTex1;
      // +1 overlap prevents sub-pixel gaps when canvas is at fractional translate
      p5.image(tex, x * sc, y * sc, sc * tileSize + 1, sc * tileSize + 1);
    }
  }

  ctx.restore();
};

// Concrete tile square centered behind each of the 6 artist rooms
export const drawRoomBackgrounds = (tileTex: p5Types.Image, p5: p5Types) => {
  if (!tileTex) return;
  const sc = GlobalConfig.scaler;
  const pad = 1; // world-unit border around each room
  const bgW = (roomConfig.w + pad * 2) * sc;
  const bgH = (roomConfig.h + pad * 2) * sc;
  for (const room of rooms.filter((r) => r.id < 7)) {
    const cx = (room.x + roomConfig.w / 2) * sc;
    const cy = (room.y + roomConfig.h / 2) * sc;
    p5.image(tileTex, cx - bgW / 2, cy - bgH / 2, bgW, bgH);
  }
};

// Mini-tile walkway running horizontally under each room row
export const drawRoomWalkways = (tileTex: p5Types.Image, p5: p5Types) => {
  if (!tileTex) return;
  const sc = GlobalConfig.scaler;
  const pad = 2; // must match drawRoomBackgrounds pad
  const tileSize = 2; // world units — "mini" tile
  const tilePx = tileSize * sc;

  const xStart = (-3 - pad) * sc; // left edge of room 0 background
  const xEnd = (19 + roomConfig.w + pad) * sc; // right edge of room 2 background

  for (const rowY of [-2, 12]) {
    const y = (rowY + roomConfig.h + pad) * sc; // bottom of room background row
    for (let x = xStart; x < xEnd; x += tilePx) {
      p5.image(tileTex, x, y, tilePx * 2 + 1, tilePx + 1);
    }
  }
  // vertical
  const yStart = (-1 + roomConfig.h + pad) * sc;
  const yEnd = (13 + roomConfig.h + pad) * sc;
  const xStart2 = (14 + roomConfig.w + pad) * sc; // right edge of room 2 background

  for (let y = yStart; y < yEnd; y += tilePx) {
    p5.image(tileTex, xStart2, y, tilePx * 2 + 1, tilePx + 1);
  }
};

// Vertical strip of concrete_tiles1 at the horizontal midpoint (x = 11)
export const drawConcreteTileLine = (tileTex: p5Types.Image, p5: p5Types) => {
  if (!tileTex) return;
  const sc = GlobalConfig.scaler;
  const tileSize = 5;
  const midX = 11; // (-5 + 27) / 2

  for (let y = -3; y < 23; y += tileSize) {
    p5.image(tileTex, midX * sc, y * sc, tileSize * sc + 1, tileSize * sc + 1);
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
