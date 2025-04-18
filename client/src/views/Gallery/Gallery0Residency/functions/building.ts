import {
  GlobalConfig,
  limits,
} from "../../../../data/Shows/Residency/GlobalConfig";
import Wall from "../../components/p5/Wall";
import p5Types from "p5";
// import { wall14 } from "../../../../data/Shows/HomeBody/WallConfig";
import Door from "../../components/p5/Door";
import { IUser } from "../../../../interfaces";
import ResidencyRoom from "../components/ResidencyRoom";

export const initOuterWalls = (p5: p5Types, walls: Wall[]) => {
  walls.push(new Wall(p5, limits, GlobalConfig));
};

///////////////////////////////////////////////////
// need to be cleaned up... ?
const outlineRooms = (
  p5: p5Types,
  rooms: any,
  scaler = GlobalConfig.scaler
) => {
  for (let i = 0; i < rooms.length; i++) {
    var w = 5 * scaler;
    var h = 5 * scaler;
    // if (rooms[i].id === "B") h = 7*scaler;
    p5.push();
    p5.translate(rooms[i].x * scaler, rooms[i].y * scaler);
    p5.rect(0, 0, w, h);

    // label
    // p5.strokeWeight(1);
    // p5.fill(255, 0, 255);
    // p5.text(rooms[i].id, 10, 0)
    p5.pop();
  }
};

const drawRoomDoors = (
  p5: p5Types,
  rooms: any,
  scaler = GlobalConfig.scaler
) => {
  for (let i = 0; i < rooms.length; i++) {
    var w = 5 * scaler;
    var h = 5 * scaler;
    // if (rooms[i].id === "B") h = 7*scaler;
    p5.push();
    p5.translate(rooms[i].x * scaler, rooms[i].y * scaler);
    p5.translate(w / 2, h / 2);
    p5.rotate((rooms[i].rot / 180) * Math.PI);
    // p5.translate(-w/2, -h/2);
    // if (rooms[i].id ==="B") p5.line(-h*.25, w/2, h*.25, w/2);
    // else
    p5.line(-w * 0.25, h / 2, w * 0.25, h / 2);
    p5.pop();
  }
};

export const drawWalls = (walls: Wall[], p5: p5Types) => {
  for (const wall of walls) {
    wall.display(p5);
  }
};

export const drawWallsOG = (walls: Wall[], p5: p5Types) => {
  p5.stroke(255);
  p5.strokeWeight(2);
  if (walls) {
    let i = 0;
    for (const wall of walls) {
      if (i == 0) {
        wall.display(p5);
        i++;
      }
      // p5.noFill();
      // p5.strokeWeight(10);
      // p5.stroke(0);
      // wall.displayOutline();
    }
  }
};

export const drawDoors = (doors: Door[], p5: p5Types) => {
  p5.strokeWeight(4);
  p5.fill(0);
  p5.stroke(80);
  if (doors) {
    for (const door of doors) {
      door.display(p5);
    }
  }
};

export const drawRooms = (
  rooms: ResidencyRoom[],
  roomTextures: p5Types.Image[],
  otherImgs: p5Types.Image[],
  users: IUser[],
  user: IUser,
  p5: p5Types
) => {
  if (rooms) {
    for (const room of rooms) {
      // room.display(roomTextures);
      // if room.userName is in users, draw art emojii

      if (room.userName === "hostBot") {
        room.displayHostBotRoom(roomTextures, otherImgs[1]);
        continue;
      }

      const artist = users.find((user) => user.userName === room.userName);
      if (artist) {
        room.displayArtistInRoom(user, roomTextures, otherImgs[1]);
      } else {
        room.displayArtistNotInRoom(user, roomTextures, otherImgs[0]);
      }
    }
  }
};

export const drawGalleryGround = (floorTex: p5Types.Image, p5: p5Types) => {
  if (floorTex) {
    // 1st
    const w = 5 * GlobalConfig.scaler;
    const h = 5 * GlobalConfig.scaler;

    for (let x = -25; x < 35; x += 5) {
      for (let y = -25; y < 35; y += 5) {
        const ix = x * GlobalConfig.scaler;
        const iy = y * GlobalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
      }
    }
  }

  let yind = 0;
  let xind = 0;
  let cFilled = p5.color(64, 71, 50, 200);
  let cDark = p5.color(64, 71, 50, 190);

  p5.strokeWeight(1);
  p5.stroke(0, 10);
  let sc = GlobalConfig.scaler;
  let step = 5;

  for (let x = -25; x < 35; x += step) {
    for (let y = -23; y < 35; y += step) {
      if ((yind + xind) % 2 == 0) p5.fill(cDark);
      else p5.fill(cFilled);
      p5.rect(x * sc, y * sc, sc * 5, sc * 5);
      yind++;
    }
    xind++;
  }
};
