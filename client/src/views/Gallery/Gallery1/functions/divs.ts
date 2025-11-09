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
import RoomLabel from "../../components/p5/RoomLabel";
// import Trash from '../components/Trash';
// import TrashFolder from '../components/TrashFolder';
import Swing from "../../components/p5/Swing";
import Table from "../../components/p5/Table";

import {
  GlobalConfig,
  outsideDoors,
} from "../../../../data/Shows/HomeBody/GlobalConfig";
import { numBarItems } from "../../../../data/Shows/HomeBody/BotConfig";
import {
  artists,
  roomConfig,
  rooms,
} from "../../../../data/Shows/HomeBody/RoomConfig";
import { domCoordsToP5World } from "../../../../helpers/coordinates";

import p5Types from "p5";

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

export const displayRoomLabelDivs = (
  font: p5Types.Font | null,
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
  p5: p5Types,
  gconfig: any = GlobalConfig
) => {
  divs.doors = [];
  let numDoors = 4;
  for (let i = 0; i < numDoors; i++) {
    let door = new Door(p5, i, doorImgs, outsideDoors, gconfig);
    doors.push(door);
    divs.doors.push(door);
  }
};

export const addLightDivs = (
  divs: any,
  lightImgs: p5Types.Image[],
  p5: p5Types,
  gconfig: any = GlobalConfig,
  lightsPos: { x: number; y: number; isFlipped: boolean }[] = [
    { x: 22.5, y: 7, isFlipped: false },
    { x: 8, y: 15, isFlipped: true },
    { x: 13, y: 20, isFlipped: false },
  ]
) => {
  divs.lights = [];

  for (let i = 0; i < lightsPos.length; i++) {
    const { x, y, isFlipped } = lightsPos[i];
    let light = new Light(i, x, y, isFlipped, lightImgs, p5, gconfig);
    // lights.push(light);
    divs.lights.push(light);
  }
};

const makePoints = () => {
  const pts = [];
  const gx = 16.5,
    gy = 34.5,
    dx = 140,
    dy = 140;
  for (let i = 0; i < 4; i++) pts.push({ x: gx + dx * i, y: gy - dy * i });
  pts.push({ x: 1.5, y: 22.5 });
  pts.push({ x: 3.5, y: 22.5 });
  pts.push({ x: -3.5, y: 17.5 });
  pts.push({ x: -1.5, y: 17.5 });
  return pts;
};

export const addColumnDivs = (
  divs: any,
  columnGif: p5Types.Image,
  p5: p5Types,
  points: { x: number; y: number }[] = [],
  factor = 1,
  gconfig: any = GlobalConfig
) => {
  const w = 80 * factor;
  const h = 280 * factor;

  if (!points.length) points = makePoints();

  divs.columns = points.map(
    ({ x, y }, i) =>
      new ShadowDraggable(
        i,
        x * gconfig.scaler,
        y * gconfig.scaler,
        w,
        h,
        p5,
        columnGif,
        gconfig
      )
  );
};

export const addTrashDivs = (divs: any, trashFiles: any, p5: p5Types) => {
  divs.trashCans = [];
  let sc = GlobalConfig.scaler;
  // let labels = [
  //     { x0: 9 * sc, y0: 13 * sc, x1: 10.5*sc, y1: 13*sc },
  //     { x0: 30 * sc, y0: 20.5 * sc, x1: sc*31.5, y1: 20.5 * sc},
  //     { x0: -8.5 * sc, y0: 1.5 * sc, x1: -8.5*sc, y1: 3*sc }
  // ];
  let labels = [
    { x0: 18 * sc, y0: 27.5 * sc },
    { x0: 30 * sc, y0: 22.5 * sc },
    { x0: -8 * sc, y0: 3 * sc },
  ];

  for (let i = 0; i < 3; i++) {
    const { x0, y0 } = labels[i];
    // p5, id, x, y, label, link, img
    // const tf = new TrashFolder(i, x0, y0, 422 * .5, 265 * .5, p5, trashFiles[i + 1], shadow, GlobalConfig)
    // const t = new Trash(p5, i * 2, x0, y0, "recycle bin", trashFiles[0], tf, GlobalConfig);

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
    // divs.trashFolders.push(tf);
    divs.trashCans.push(tf);
  }
};

export const addFolderDivs = (
  divs: any,
  instaImg: p5Types.Image,
  txtFile: p5Types.Image,
  p5: p5Types,
  gconfig: any = GlobalConfig,
  points: { x: number; y: number }[] = []
) => {
  divs.folders = [];
  // yeah, why are these in dom coords...
  let p0 = domCoordsToP5World(560, 0, gconfig);
  let p1 = domCoordsToP5World(620, 130, gconfig);
  let p2 = domCoordsToP5World(510, 230, gconfig);
  if (points.length === 3) {
    p0 = points[0];
    p1 = points[1];
    p2 = points[2];
  }

  let labels = [
    { x: p0.x, y: p0.y, label: "statement", link: "/statement" },
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
      gconfig
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
export const addBarDivs = (
  divs: any,
  lightImg: p5Types.Image,
  p5: p5Types,
  gconfig: any = GlobalConfig,
  galleryId: number = 1
) => {
  const barTypes = ["wine", "cocktail", "DJ", "cheese"];
  divs.bars = [];
  let i = 0;
  for (const barType of barTypes) {
    const bar = getBar(barType, galleryId);
    switch (barType) {
      case "wine":
        divs.bars.push(
          new WineBar(i, { ...bar }, lightImg, numBarItems, p5, gconfig)
        );
        break;
      case "cocktail":
        divs.bars.push(
          new CocktailBar(i, { ...bar }, lightImg, numBarItems, p5, gconfig)
        );
        break;
      case "DJ":
        divs.bars.push(
          new DJBar(i, { ...bar }, lightImg, numBarItems, p5, gconfig)
        );
        break;
      case "cheese":
        divs.bars.push(
          new CheeseBar(i, { ...bar }, lightImg, numBarItems, p5, gconfig)
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
  closedSign: p5Types.Image | null
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

  export const displayFolderDivs = (
    divs: any,
    userX?: number,
    userY?: number
  ) => {
    for (const folder of divs.folders) {
      folder.display(userX, userY);
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
    // check in reverse order to prioritize top-most divs
    const reversedDivs = [...divs[key]].reverse();
    for (const div of reversedDivs)
      if (checkDiv(userX, userY, div)) return true;
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
  if (divs.folders) {
    // check in reverse order to prioritize top-most divs
    const reversedDivs = [...divs.folders].reverse();
    for (const folder of reversedDivs) {
      const clicked = folder.checkDoubleClicked(userX, userY);
      if (clicked) return true;
    }
  }
  return false;
};

export const checkTrashDivsDouble = (
  userX: number,
  userY: number,
  divs: any
) => {
  if (divs.trashCans) {
    // check in reverse order to prioritize top-most divs
    const reversedDivs = [...divs.trashCans].reverse();
    for (const trash of reversedDivs) {
      // trash.checkDoubleClickedAlert(userX, userY);
      const clicked = trash.checkDoubleClicked(userX, userY);
      if (clicked) return true;
    }
  }
  return false;
};
