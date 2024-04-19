import {
  GlobalConfig,
  limits,
} from "../../../../data/Shows/FieldsOfView/GlobalConfig";
import Wall from "../../components/p5/Wall";
import p5Types from "p5";
import Room from "../components/FOVRoom";

export const initOuterFOVWalls = (p5: p5Types, walls: Wall[]) => {
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
    p5.push();
    p5.translate(rooms[i].x * scaler, rooms[i].y * scaler);
    p5.translate(w / 2, h / 2);
    p5.rotate((rooms[i].rot / 180) * Math.PI);
    p5.line(-w * 0.25, h / 2, w * 0.25, h / 2);
    p5.pop();
  }
};

export const drawRooms = (rooms: Room[], img: p5Types.Graphics) => {
  if (rooms) {
    for (const room of rooms) {
      room.displayAnaglyph(img);
      // room.drawDoor();
    }
  }
};
