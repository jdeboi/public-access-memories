import { GlobalConfig } from "../../../../data/Shows/Residency/GlobalConfig";
import {
  artists,
  rooms,
  roomConfig,
} from "../../../../data/Shows/Residency/RoomConfig";
import { p5ToUserCoords } from "../../../../helpers/coordinates";
import Room from "../../components/p5/Room";

export default class ResidencyRoom extends Room {
  constructor(p5, door, i) {
    super(p5, door, i, GlobalConfig, artists, rooms, roomConfig);
    this.room = rooms[i];
    this.artist = artists[this.room.artistID];
  }

  displayRoomTexture(roomTexture) {
    const sc = this.GlobalConfig.scaler;
    const x = (-this.w / 2) * sc;
    const y = (-this.h / 2) * sc;
    const w = this.w * sc;
    const h = this.h * sc;

    this.p5.push();
    this.translateToRoomCenter();
    this.p5.push();
    this.p5.image(roomTexture, x, y, w, h);

    this.p5.pop();
    this.p5.pop();
  }

  displayRoomToolbarFrame(isOnline, icon) {
    const barH = 26;
    const cornerRadius = 10;
    const sc = this.GlobalConfig.scaler;
    const x = (-this.w / 2) * sc;
    const y = (-this.h / 2) * sc;
    const w = this.w * sc;
    const h = this.h * sc;
    this.p5.push();
    this.translateToRoomCenter();

    // toolbar
    this.p5.push();
    this.p5.fill(0);
    this.p5.stroke(0); //s0, 55, 10);
    this.p5.strokeWeight(2); // 64, 71, 50
    this.p5.translate(0, -barH);
    this.p5.rect(x + 1, y, w - 2, barH, cornerRadius, cornerRadius, 0, 0);

    // frame outline
    this.p5.noFill();
    this.p5.rect(x + 1, y + barH, w - 2, h);

    this.p5.translate(-w / 2, -h / 2);
    this.displayArtistStatus(isOnline, icon);

    this.p5.pop();
    this.p5.pop();
  }

  displayArtistStatus(isOnline, icon) {
    // here / away icon
    this.p5.translate(10, 7);
    this.p5.image(icon, 0, 0, 12, 12);

    // name text
    this.p5.translate(10 + 12, 10);
    this.p5.fill(255);
    this.p5.noStroke();
    this.p5.textAlign(this.p5.LEFT);
    const txt = this.artist.name.toUpperCase();
    this.p5.text(txt, 0, 0);

    // online / away text
    const txtWidth = this.p5.textWidth(txt);
    this.p5.translate(txtWidth + 10, 0);
    this.p5.fill(150);
    this.p5.text(isOnline ? "[in studio]" : "[away]", 0, 0);
  }

  displayHostBotRoom(roomTextures, onIcon) {
    this.displayRoomTexture(roomTextures[4]);
    this.displayRoomToolbarFrame(true, onIcon);
  }

  displayArtistInRoom(user, roomTextures, onIcon, roomUserName = "") {
    const isDoorOpen = this.getIsDoorOpen(user);
    if (roomUserName === "moneymachine69") {
      this.displayEmrysRoom(roomTextures, isDoorOpen);
    } else if (roomUserName === "Chelsea") {
      this.displayChelseasRoom(roomTextures, isDoorOpen, true);
    } else if (isDoorOpen) {
      this.displayRoomTexture(roomTextures[0]);
    } else {
      this.displayRoomTexture(roomTextures[1]);
    }
    this.displayRoomToolbarFrame(true, onIcon);
  }

  displayEmrysRoom(roomTextures, isDoorOpen) {
    if (isDoorOpen) {
      this.displayRoomTexture(roomTextures[5]);
    } else {
      this.displayRoomTexture(roomTextures[6]);
    }
  }

  displayChelseasRoom(roomTextures, isDoorOpen, isArtistHere) {
    if (isArtistHere) {
      if (isDoorOpen) {
        this.displayRoomTexture(roomTextures[7]);
      } else {
        this.displayRoomTexture(roomTextures[8]);
      }
    } else {
      if (isDoorOpen) {
        this.displayRoomTexture(roomTextures[9]);
      } else {
        this.displayRoomTexture(roomTextures[10]);
      }
    }
  }

  displayArtistNotInRoom(user, roomTextures, offIcon, roomUserName = "") {
    const isDoorOpen = this.getIsDoorOpen(user);
    if (roomUserName === "Chelsea") {
      this.displayChelseasRoom(roomTextures, isDoorOpen, false);
    } else if (isDoorOpen) {
      this.displayRoomTexture(roomTextures[2]);
    } else {
      this.displayRoomTexture(roomTextures[3]);
    }
    this.displayRoomToolbarFrame(false, offIcon);
  }

  displayRoomLines() {
    this.displayOutline();
    this.drawRoomDoorBoundary();
    this.drawRoomDoorEntryCrossing();
    this.drawRoomDoorCrossing();
  }

  getIsDoorOpen(user) {
    const sc = this.GlobalConfig.scaler;
    const doorW = 2 * sc;
    const doorH = 2 * sc;

    if (!user || !user.x) {
      return false;
    }
    const pt = p5ToUserCoords(
      this.x + this.w / 2,
      this.y + this.h,
      this.GlobalConfig
    );
    return (
      user.x >= pt.x - doorW / 2 &&
      user.x <= pt.x + doorW / 2 &&
      user.y >= pt.y - doorH / 2 &&
      user.y <= pt.y + doorH / 2
    );
  }
}
