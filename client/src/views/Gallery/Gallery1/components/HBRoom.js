import { GlobalConfig } from "../../../../data/Shows/HomeBody/GlobalConfig";
import {
  artists,
  rooms,
  roomConfig,
} from "../../../../data/Shows/HomeBody/RoomConfig";
import p5Room from "../../components/p5/p5Room";

export default class HBRoom extends p5Room {
  constructor(p5, door, i) {
    super(p5, door, i, GlobalConfig, artists, rooms, roomConfig);
  }
}
