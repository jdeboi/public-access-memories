import p5Types from "p5";
import {
  GallerySketchTemplate1,
  GallerySketch1Props,
} from "../Gallery1/GallerySketchTemplate1";

import { GlobalConfig } from "../../../data/Shows/Debox/GlobalConfig";
import { barTenders } from "../../../data/Shows/Debox/BotConfig";
import { drawRooms } from "../Gallery1/functions/building";
import DeboxRoom from "./components/DeboxRoom";

export default class Gallery5DeboxSketch extends GallerySketchTemplate1 {
  constructor(props: GallerySketch1Props) {
    super(props);
    this.GlobalConfig = GlobalConfig;
    this.barTenders = barTenders;
  }

  initBuilding = (p5: p5Types) => {
    //   initOuterWalls(p5, this.walls);
    //   initHomeBodyWalls(p5, this.walls);
    for (let i = 0; i < this.globalRooms.length; i++) {
      this.rooms.push(new DeboxRoom(p5, i));
    }
  };

  displayBackground = (p5: p5Types) => {
    // override this function

    //////////////
    // building
    drawRooms(this.rooms, this.roomTextures);
    // drawWalls(this.walls, p5);
    // if (!this.isClosed) displayRoomLabelDivs(this.font, 0, this.divs);

    //////////////
    // emojis
    // displayDancers(dancers);
  };
}
