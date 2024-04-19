import { GlobalConfig } from "../../../../data/Shows/HomeBody/GlobalConfig";
import {
  artists,
  rooms,
  roomConfig,
} from "../../../../data/Shows/HomeBody/RoomConfig";
import Room from "../../components/p5/Room";

export default class HBRoom extends Room {
  constructor(p5, door, i) {
    super(p5, door, i, GlobalConfig, artists, rooms, roomConfig);
  }
}
