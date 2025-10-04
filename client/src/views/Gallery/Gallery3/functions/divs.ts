import Folder from "../../components/p5/Folder";
import Draggable from "../../components/p5/Draggable/Draggable";
import ShadowDraggable from "../../components/p5/Draggable/ShadowDraggable";
import Door from "../../components/p5/Door";
import Light from "../../components/p5/Light";
import { getBar } from "../../../../data/CurrentShow/BotConfig";
import CheeseBar from "../../components/p5/Bars/CheeseBar";
import CocktailBar from "../../components/p5/Bars/CocktailBar";
import WineBar from "../../components/p5/Bars/WineBar";
import DJBar from "../../components/p5/Bars/DJBar";

import Tree from "../../components/p5/Tree";
import FOVRoomLabel from "../components/FOVRoomLabel";
// import Trash from '../components/Trash';
// import TrashFolder from '../components/TrashFolder';
import Swing from "../../components/p5/Swing";
import Table from "../../components/p5/Table";

import {
  GlobalConfig,
  outsideDoors,
} from "../../../../data/Shows/FieldsOfView/GlobalConfig";
import { numBarItems } from "../../../../data/Shows/FieldsOfView/BotConfig";
import {
  artists,
  roomConfig,
  rooms,
} from "../../../../data/Shows/FieldsOfView/RoomConfig";
import { domCoordsToP5World } from "../../../../helpers/coordinates";

import p5Types from "p5";
import { ShowConfig } from "../../../../data/CurrentShow/ShowConfig";

export const addRoomLabelDivs = (
  divs: any,
  eyeIcon: p5Types.Image,
  font: p5Types.Font,
  p5: p5Types
) => {
  divs.roomLabels = [];
  for (let i = 0; i < rooms.length; i++) {
    let roomL = new FOVRoomLabel(p5, i, eyeIcon, font);
    divs.roomLabels.push(roomL);
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
  const lightsP5 = [
    { x: 13.5, y: 1.5, isFlipped: false },
    { x: 18, y: 3.5, isFlipped: true },
    { x: 31, y: 26.5, isFlipped: true },
    { x: 13.5, y: 24.5, isFlipped: false },
    { x: 13.5, y: 37.5, isFlipped: false },
    // { x: 16, y: 7, isFlipped: false },
    // { x: 20, y: 14, isFlipped: true },
    // { x: 2.5, y: 20, isFlipped: true },
    // { x: 25, y: 25, isFlipped: false }
  ];
  for (let i = 0; i < lightsP5.length; i++) {
    const { x, y, isFlipped } = lightsP5[i];
    let light = new Light(i, x, y, isFlipped, lightImgs, p5, GlobalConfig);
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
  let numCols = 4;
  let dy = 50;
  let dx = 100;
  let gx = 11 * sc;
  let gy = 14 * sc;
  for (let i = 0; i < numCols; i++) {
    let column = new ShadowDraggable(
      i,
      gx + dx * i,
      gy + dy * i,
      80 * factor,
      280 * factor,
      p5,
      columnGif,
      GlobalConfig
    );
    divs.columns.push(column);
  }

  gx = 27 * sc;
  gy = 31 * sc;
  for (let i = 0; i < numCols; i++) {
    let column = new ShadowDraggable(
      i,
      gx - dx * i,
      gy + dy * i,
      80 * factor,
      280 * factor,
      p5,
      columnGif,
      GlobalConfig
    );
    divs.columns.push(column);
  }

  gx = 31 * sc;
  gy = 11 * sc;
  for (let i = 0; i < numCols; i++) {
    let column = new ShadowDraggable(
      i,
      gx + dx * i,
      gy + dy * i,
      80 * factor,
      280 * factor,
      p5,
      columnGif,
      GlobalConfig
    );
    divs.columns.push(column);
  }

  // let column = new ShadowDraggable(numCols*2, sc*26, sc*14, 80 * factor, 280 * factor, p5, columnGif, GlobalConfig)
  // divs.columns.push(column)
  // column = new ShadowDraggable(numCols*2+1, sc*31, sc*14, 80 * factor, 280 * factor, p5, columnGif, GlobalConfig)
  // divs.columns.push(column)
};

export const addTrashDivs = (divs: any, trashFiles: any, p5: p5Types) => {
  divs.trashCans = [];
  let sc = GlobalConfig.scaler;

  let labels = [
    { x0: 42.5 * sc, y0: 17 * sc },
    { x0: 42.5 * sc, y0: 37 * sc },
  ];

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
    divs.trashCans.push(tf);
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
  let sc = GlobalConfig.scaler;
  let p0 = { x: 19.5, y: 18.5 };
  let p1 = { x: 22, y: 19.5 };
  let p2 = { x: 20, y: 21 };
  let labels = [
    {
      x: p0.x * sc,
      y: p0.y * sc,
      label: "statement",
      link: "https://publicaccessmemories.com/statement",
    },
    {
      x: p1.x * sc,
      y: p1.y * sc,
      label: "about",
      link: "https://publicaccessmemories.com/about",
    },
    {
      x: p2.x * sc,
      y: p2.y * sc,
      label: "@public.access.memories",
      link: "https://www.instagram.com/public.access.memories/",
    },
  ];

  if (ShowConfig.isOpenCallOpen) {
    labels[0].label = "open call";
    labels[0].link = "https://publicaccessmemories.com/opencall";
  }

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

export const addOakDivs = (divs: any, oakImg: p5Types.Image, p5: p5Types) => {
  let sc = GlobalConfig.scaler;
  divs.oaks = [];

  for (let i = 0; i < 1; i++) {
    let oak = new Draggable(
      i,
      sc * -7.5,
      sc * 34,
      500,
      400,
      p5,
      oakImg,
      GlobalConfig
    );
    divs.oaks.push(oak);
  }
};

export const addSwingDivs = (
  divs: any,
  baby: p5Types.Image,
  chain: p5Types.Image | null,
  p5: p5Types
) => {
  divs.swings = [];
  divs.swings.push(
    new Swing(0, -4.1, 36.8, 100, 190, p5, baby, chain, GlobalConfig)
  );
};

export const addTableDivs = (
  divs: any,
  tableImgs: p5Types.Image[],
  p5: p5Types
) => {
  let sc = GlobalConfig.scaler;
  divs.tables = [];
  let tables = [
    { x: -9, y: -2.25 },
    { x: -4, y: -2.25 },
    { x: -4, y: 2.75 },
  ];
  for (let i = 0; i < 3; i++) {
    let { x, y } = tables[i];
    let table = new Table(
      i,
      x,
      y,
      sc * 3,
      sc * 3,
      p5,
      tableImgs[0],
      tableImgs[1],
      GlobalConfig
    );
    divs.tables.push(table);
  }
};

//////////////////////////////////////////////////
export const addBarDivs = (divs: any, lightImg: p5Types.Image, p5: p5Types) => {
  const barTypes = ["wine", "cocktail", "DJ", "cheese"];
  divs.bars = [];
  let i = 0;
  for (const barType of barTypes) {
    const bar = getBar(barType, 3);
    switch (barType) {
      case "wine":
        divs.bars.push(
          new WineBar(i, { ...bar }, lightImg, numBarItems, p5, GlobalConfig)
        );
        break;
      case "cocktail":
        divs.bars.push(
          new CocktailBar(
            i,
            { ...bar },
            lightImg,
            numBarItems,
            p5,
            GlobalConfig
          )
        );
        break;
      case "DJ":
        divs.bars.push(
          new DJBar(i, { ...bar }, lightImg, numBarItems, p5, GlobalConfig)
        );
        break;
      case "cheese":
        divs.bars.push(
          new CheeseBar(i, { ...bar }, lightImg, numBarItems, p5, GlobalConfig)
        );
        break;
    }
    i++;
  }
};

export const addTreeDivs = (divs: any, tree: p5Types.Image, p5: p5Types) => {
  // let inc = 10;
  divs.trees = [];
  let numTrees = 10;
  let sc = GlobalConfig.scaler;
  let w = sc * 5;
  let h = w - 26;
  for (let i = 0; i < numTrees; i++) {
    // let x = p5.windowWidth/2+i*inc;
    // let y = 60+i*inc;
    let sp = 60;
    let startX = 29 * sc;
    let startY = 27 * sc;
    let dir = -1;
    let x = i * sp * dir + startX;
    let y = i * sp + startY;
    if (i > numTrees / 2) {
      x = ((sp * numTrees) / 2) * dir + startX - (i - numTrees / 2) * sp * dir;
    }
    divs.trees.push(new Tree(i, x, y, w, h, p5, tree, GlobalConfig));
  }

  // let x = sc * -8;
  // let y = 30 * sc;
  // let sp = 60;
  // divs.trees.push(new Draggable(numTrees + 1, -8.5 * sc, 32 * sc, w, h, p5, tree));
  // divs.trees.push(new Draggable(numTrees, -9.5 * sc, 33 * sc, w, h, p5, tree));

  // let x = sc * -5;
  // divs.trees.push(new Draggable(numTrees + 2, sc * -.5, 35.5 * sc, w, h, p5, tree));
  // divs.trees.push(new Draggable(numTrees + 3, sc * -1.5, 36.5 * sc, w, h, p5, tree));
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
  // for(let i = 0; i < 4; i++) {
  //   divs[i].display(user.x, user.y);
  //   divs[i].displayToolBar(user.x, user.y);
  // }
};

export const displayLightDivs = (userX: number, userY: number, divs: any) => {
  for (const light of divs.lights) {
    light.display(userX, userY);
    light.displayToolBar(userX, userY);
  }
};

export const displayFolderDivs = (divs: any) => {
  for (const folder of divs.folders) {
    folder.display();
  }
};

export const displayTrashDivs = (userX: number, userY: number, divs: any) => {
  for (const trash of divs.trashCans) {
    trash.display();
  }
};

export const displayColumnDivs = (userX: number, userY: number, divs: any) => {
  for (const col of divs.columns) {
    col.display(userX, userY);
    col.displayToolBar(userX, userY);
  }
};

export const displayBarDivs = (userX: number, userY: number, divs: any) => {
  for (const bar of divs.bars) {
    bar.display(userX, userY);
    bar.displayToolBar(userX, userY);
  }
};

export const displayOakDivs = (userX: number, userY: number, divs: any) => {
  for (const oak of divs.oaks) {
    oak.display(userX, userY);
    oak.displayToolBar(userX, userY);
  }
};

export const displayTableDivs = (userX: number, userY: number, divs: any) => {
  for (const table of divs.tables) {
    table.display(userX, userY);
    table.displayToolBar(userX, userY);
  }
};

export const displaySwingDivs = (userX: number, userY: number, divs: any) => {
  for (const swing of divs.swings) {
    swing.display(userX, userY);
    swing.displayToolBar(userX, userY);
  }
};

export const displayTreeDivs = (
  userX: number,
  userY: number,
  sz: number,
  divs: any
) => {
  for (const tree of divs.trees) {
    tree.display(userX, userY, sz);
    tree.displayToolBar(userX, userY);
  }
};

// export function displayDivs(userX: number, userY: number, divs: any) {
//     let keys = Object.keys(divs: any);
//     for (const key of keys) {
//         if (key !== "") {
//             for (const div of divs[key]) {
//                 // div.display(userX, userY);
//             }
//         }
//     }

// }

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
