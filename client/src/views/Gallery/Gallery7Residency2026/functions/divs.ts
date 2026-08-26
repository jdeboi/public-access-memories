import Light from "../../components/p5/Light";
import Door from "../../components/p5/Door";
import CoffeeBar from "../../components/p5/Bars/CoffeeBar";
import Table2026 from "../components/Table2026";
import Easel2026 from "../components/Easel2026";
import FlatFile2026 from "../components/FlatFile2026";
import p5Types from "p5";

import {
  GlobalConfig,
  outsideDoors,
} from "../../../../data/Shows/Residency2026/GlobalConfig";
import {
  rooms,
  roomConfig,
} from "../../../../data/Shows/Residency2026/RoomConfig";
import { numBarItems } from "../../../../data/Shows/Residency2026/BotConfig";
import { getBar } from "../../../../data/CurrentShow/BotConfig";
import { RESIDENCY2026_ID } from "../../../../data/CurrentShow/GalleryConfig";

const sc = GlobalConfig.scaler;

const HALF_LIGHT_W = 150 / sc;

const LIGHT_POSITIONS = rooms
  .filter((r) => r.id < 6)
  .map((r) => ({
    x: r.x + roomConfig.w / 2 - HALF_LIGHT_W + 0.3,
    y: r.y - 2,
    isFlipped: false,
  }));

export const addLightDivs = (
  divs: any,
  lightImgs: p5Types.Image[],
  p5: p5Types,
) => {
  divs.lights = [];
  LIGHT_POSITIONS.forEach(({ x, y, isFlipped }, i) => {
    divs.lights.push(
      new Light(i, x, y, isFlipped, lightImgs, p5, GlobalConfig, true),
    );
  });
};

// export const addDoorDivs = (
//   divs: any,
//   doors: any,
//   doorImgs: p5Types.Image[],
//   p5: p5Types,
// ) => {
//   divs.doors = [];
//   for (let i = 0; i < 4; i++) {
//     const door = new Door(p5, i, doorImgs, outsideDoors, GlobalConfig);
//     doors.push(door);
//     divs.doors.push(door);
//   }
// };

export const addTableDiv = (
  divs: any,
  tableImg: p5Types.Image,
  stoolImg: p5Types.Image,
  p5: p5Types,
) => {
  divs.table2026 = [
    new Table2026(4, 7.5, tableImg, stoolImg, p5, GlobalConfig, 6),
  ];
};

export const addEaselDiv = (
  divs: any,
  easelImg: p5Types.Image,
  p5: p5Types,
) => {
  divs.easel2026 = [new Easel2026(15, 7, easelImg, p5, GlobalConfig)];
};

export const addFlatFileDiv = (
  divs: any,
  closedImg: p5Types.Image,
  openImg: p5Types.Image,
  p5: p5Types,
) => {
  divs.flatFiles = [
    new FlatFile2026(21.5, 0, closedImg, openImg, p5, GlobalConfig),
  ];
};

export const addBarDivs = (divs: any, lightImg: p5Types.Image, p5: p5Types) => {
  divs.bars = [];
  const bar = getBar("wine", RESIDENCY2026_ID);
  divs.bars.push(
    new CoffeeBar(0, { ...bar }, lightImg, numBarItems, p5, GlobalConfig),
  );
};

export const displayAllDivs = (userX: number, userY: number, divs: any) => {
  // table2026 is rendered in displayScene (before the user emoji) — not here
  if (divs.bars) {
    for (const bar of divs.bars) {
      bar.display(userX, userY);
      bar.displayToolBar(userX, userY);
    }
  }
  if (divs.lights) {
    for (const light of divs.lights) {
      light.display(userX, userY);
      light.displayToolBar(userX, userY);
    }
  }
  if (divs.folders) {
    for (const folder of divs.folders) folder.display();
  }
};
