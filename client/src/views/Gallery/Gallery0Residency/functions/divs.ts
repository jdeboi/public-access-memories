import Folder from "../../components/p5/Folder";
import Draggable from "../../components/p5/Draggable/Draggable";
import ShadowDraggable from "../../components/p5/Draggable/ShadowDraggable";
import Door from "../../components/p5/Door";
import Light from "../../components/p5/Light";
import { getBar } from "../../../../data/CurrentShow/BotConfig";
import RoomLabel from "../../components/p5/RoomLabel";

import WaterCooler from "../../components/p5/WaterCooler";

import {
  GlobalConfig,
  outsideDoors,
} from "../../../../data/Shows/Residency/GlobalConfig";
import { numBarItems } from "../../../../data/Shows/Residency/BotConfig";
import {
  artists,
  roomConfig,
  rooms,
} from "../../../../data/Shows/Residency/RoomConfig";
import { domCoordsToP5World } from "../../../../helpers/coordinates";

import p5Types from "p5";
import CoffeeBar from "../../components/p5/Bars/CoffeeBar";

export const addRoomLabelDivs = (
  divs: any,
  eyeIcon: p5Types.Image,
  font: p5Types.Font,
  p5: p5Types
) => {
  divs.roomLabels = [];
  for (let i = 0; i < rooms.length; i++) {
    let roomL = new RoomLabel(
      p5,
      i,
      eyeIcon,
      font,
      GlobalConfig,
      artists,
      rooms,
      roomConfig
    );
    divs.roomLabels.push(roomL);
  }
};

export const addDoorDivs = (
  divs: any,
  doors: any,
  doorImgs: p5Types.Image[],
  p5: p5Types
) => {
  divs.doors = [];
  let numDoors = 4;
  for (let i = 0; i < numDoors; i++) {
    let door = new Door(p5, i, doorImgs, outsideDoors, GlobalConfig);
    doors.push(door);
    divs.doors.push(door);
  }
};

export const addLightDivs = (
  divs: any,
  lightImgs: p5Types.Image[],
  p5: p5Types
) => {
  divs.lights = [];
  let numLights = 1;
  const lightsP5 = [{ x: -3.4, y: -0.25, isFlipped: true }];

  for (let i = 0; i < numLights; i++) {
    let light = new Light(p5, i, lightImgs, lightsP5, GlobalConfig);
    // lights.push(light);
    divs.lights.push(light);
  }
};

export const addColumnDivs = (
  divs: any,
  columnGif: p5Types.Image,
  p5: p5Types,
  factor = 1
) => {
  divs.columns = [];
  let sc = GlobalConfig.scaler;
  let numCols = 0;

  for (let i = 0; i < numCols; i++) {
    let column = new ShadowDraggable(
      i,
      0,
      0,
      80 * factor,
      280 * factor,
      p5,
      columnGif,
      GlobalConfig
    );
    divs.columns.push(column);
  }
};

export const addTrashDivs = (divs: any, trashFiles: any, p5: p5Types) => {
  divs.trashCans = [];
  let sc = GlobalConfig.scaler;
  let labels = [{ x0: -8 * sc, y0: 3 * sc }];

  for (let i = 0; i < labels.length; i++) {
    const { x0, y0 } = labels[i];

    const tf = new Folder(
      p5,
      i,
      x0,
      y0,
      80,
      80,
      "recycle bin",
      "/trash",
      trashFiles[0],
      GlobalConfig
    );
    // divs.trashCans.push(tf);
  }
};

export const addFolderDivs = (
  divs: any,
  instaImg: p5Types.Image,
  txtFile: p5Types.Image,
  p5: p5Types
) => {
  divs.folders = [];
  // yeah, why are these in dom coords...
  const x = -365;
  let p0 = domCoordsToP5World(x, -150, GlobalConfig);
  let p1 = domCoordsToP5World(x, 0, GlobalConfig);
  let p2 = domCoordsToP5World(x, 150, GlobalConfig);
  let labels = [
    { x: p0.x, y: p0.y, label: "residency", link: "/residency" },
    { x: p1.x, y: p1.y, label: "about", link: "/about" },
    {
      x: p2.x,
      y: p2.y,
      label: "@public.access.memories",
      link: "https://www.instagram.com/public.access.memories/",
    },
  ];

  for (let i = 0; i < 3; i++) {
    const { x, y, label, link } = labels[i];
    const folder = new Folder(
      p5,
      i,
      x,
      y,
      80,
      80,
      label,
      link,
      i === 2 ? instaImg : txtFile,
      GlobalConfig
    );
    divs.folders.push(folder);
  }
};

export const addFurnitureDivs = (
  divs: any,
  imgs: p5Types.Image[],
  p5: p5Types
) => {
  let sc = GlobalConfig.scaler;
  divs.furniture = [];

  const furniturePositions = [
    { x: 420 - 250, y: 0, w: 100, h: 50 },
    { x: 550 - 250, y: 250 - 130, w: 100, h: 50 },
    { x: 0, y: 220 - 130, w: 100, h: 50 },
  ];

  if (p5.width < 800) {
    return;
  }
  for (let i = 0; i < furniturePositions.length; i++) {
    const { x, y, w, h } = furniturePositions[i];
    let draggableFurniture = new Draggable(
      i,
      x + p5.width - 730,
      y + p5.height - 500,
      imgs[i].width * 0.5,
      imgs[i].height * 0.5,
      p5,
      imgs[i],
      GlobalConfig
    );
    divs.furniture.push(draggableFurniture);
  }
};

export const addWaterCoolerDivs = (
  divs: any,
  img: p5Types.Image,
  p5: p5Types
) => {
  let sc = GlobalConfig.scaler;
  divs.waterCooler = [];

  let cooler = new WaterCooler(0, 1, 5.5, p5, img, GlobalConfig);
  divs.waterCooler.push(cooler);
};

//////////////////////////////////////////////////
export const addBarDivs = (divs: any, lightImg: p5Types.Image, p5: p5Types) => {
  const barTypes = ["coffee"]; //"DJ", "snack"
  divs.bars = [];
  let i = 0;
  for (const barType of barTypes) {
    const bar = getBar(barType, 0);
    switch (barType) {
      case "coffee":
        divs.bars.push(
          new CoffeeBar(i, { ...bar }, lightImg, numBarItems, p5, GlobalConfig)
        );
        break;
    }
    i++;
  }
};

export const displayDoorDivs = (
  userX: number,
  userY: number,
  divs: any,
  isClosed: boolean,
  closedSign: p5Types.Image
) => {
  for (const door of divs.doors) {
    door.display(userX, userY, isClosed, closedSign);
    door.displayToolBar(userX, userY);
  }
};

export const displayRoomLabelDivs = (
  font: p5Types.Font,
  roomCount: any,
  divs: any
) => {
  for (const rl of divs.roomLabels) {
    // rl.display(font, roomCount);
    rl.displayWithCount(roomCount);
    rl.displayToolBar();
  }
};

export const displayAllDivs = (userX: number, userY: number, divs: any) => {
  for (const bar of divs.bars) {
    bar.display(userX, userY);
    bar.displayToolBar(userX, userY);
  }
  for (const light of divs.lights) {
    light.display(userX, userY);
    light.displayToolBar(userX, userY);
  }
  for (const folder of divs.folders) {
    folder.display();
  }
  for (const trash of divs.trashCans) {
    trash.display();
  }
  for (const col of divs.columns) {
    col.display(userX, userY);
    col.displayToolBar(userX, userY);
  }
  // for (const waterCooler of divs.waterCooler) {
  //   waterCooler.display(userX, userY);
  // }
};

export const displayAllDivsHostRoom = (
  userX: number,
  userY: number,
  divs: any
) => {
  for (const waterCooler of divs.waterCooler) {
    waterCooler.display(userX, userY);
  }
  for (const furniture of divs.furniture) {
    furniture.display(userX, userY);
    furniture.displayToolBarNormal(userX, userY);
  }
};

export function endDivDrag(divs: any) {
  let keys = Object.keys(divs);
  for (const key of keys) {
    for (const div of divs[key]) div.endDrag();
  }
}

export function updateDivs(
  userEase: { x: number; y: number },
  users: any,
  divs: any,
  isPanGallery = false
) {
  if (divs.doors) {
    for (const door of divs.doors) {
      door.openDoor(userEase, users, isPanGallery);
    }
  }
  let keys = Object.keys(divs);
  for (const key of keys) {
    for (const div of divs[key]) div.update();
  }
}

export const checkDivPress = (userX: number, userY: number, divs: any) => {
  let keys = Object.keys(divs);
  for (const key of keys) {
    for (const div of divs[key]) if (checkDiv(userX, userY, div)) return true;
  }
  return false;
};

const checkDiv = (userX: number, userY: number, div: any) => {
  if (div.checkButtons(userX, userY)) {
    return true;
  } else if (div.checkDragging(userX, userY)) {
    return true;
  }
  return false;
};

export const checkFolderDivsDouble = (
  userX: number,
  userY: number,
  divs: any
) => {
  for (const folder of divs.folders) {
    folder.checkDoubleClicked(userX, userY);
  }
};

export const checkTrashDivsDouble = (
  userX: number,
  userY: number,
  divs: any
) => {
  for (const trash of divs.trashCans) {
    trash.checkDoubleClickedAlert(userX, userY);
  }
};
