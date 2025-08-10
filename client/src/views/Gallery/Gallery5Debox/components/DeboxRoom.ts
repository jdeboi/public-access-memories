import p5Types from "p5";
import Room from "../../components/p5/Room";
import { GlobalConfig } from "../../../../data/Shows/Debox/GlobalConfig";
import {
  artists,
  rooms,
  roomConfig,
} from "../../../../data/Shows/Debox/RoomConfig";
import { displayWall } from "../../Gallery1/functions/ground";
import {
  boundaryLineCrossing,
  doorLineCrossing,
} from "../../components/p5/Boundaries";

class DeboxRoom extends Room {
  // doorImg: p5Types.Image;

  constructor(p5: p5Types, i: number) {
    super(p5, null, i, GlobalConfig, artists, rooms, roomConfig);
    console.log("room", roomConfig);
    // this.doorImg = door;
  }

  display(roomTextures: p5Types.Image[]) {
    this.p5.push();
    this.translateToRoomCenter();
    this.p5.push();
    // this.drawRoomTexture(roomTextures);

    this.p5.noFill();
    this.p5.stroke(155);
    this.p5.strokeWeight(10);

    const sc = this.GlobalConfig.scaler;
    const w = this.w * sc;
    const h = this.h * sc;

    const x1 = -w / 4;
    const y1 = -h / 4;

    this.p5.rect(x1, y1, w, h);
    this.p5.line(x1 + w, y1, w, 0);
    this.p5.line(x1 + w, h + y1, w, h);

    this.p5.stroke(255);
    this.p5.rect(0, 0, w, h);
    this.p5.line(x1, y1, 0, 0);
    this.p5.line(x1, h + y1, 0, h);

    this.p5.pop();
    this.p5.pop();
  }
}

export default DeboxRoom;
