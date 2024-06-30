import Folder from "../../components/p5/Folder";
import ShadowDraggable from "../../components/p5/Draggable/ShadowDraggable";
import Light from "../../components/p5/Light";
import { getBar } from "../../../../data/CurrentShow/BotConfig";
import CheeseBar from "../../components/p5/Bars/CheeseBar";
import CocktailBar from "../../components/p5/Bars/CocktailBar";
import WineBar from "../../components/p5/Bars/WineBar";
import DJBar from "../../components/p5/Bars/DJBar";

import { GlobalConfig } from "../../../../data/Shows/HomeOffices/GlobalConfig";
import { numBarItems } from "../../../../data/Shows/HomeOffices/BotConfig";

import p5Types from "p5";
import { ShowConfig } from "../../../../data/CurrentShow/ShowConfig";

export const addLightDivs = (
  divs: any,
  lightImgs: p5Types.Image[],
  p5: p5Types
) => {
  divs.lights = [];
  const lightsP5 = [
    { x: 100, y: 100, isFlipped: false, room: "0" },
    { x: 120, y: 120, isFlipped: true, room: "8" },
  ];
  for (let i = 0; i < lightsP5.length; i++) {
    let light = new Light(p5, i, lightImgs, lightsP5, GlobalConfig);
    const { x, y, room } = lightsP5[i];
    light.setNormal(x, y, room);
    divs.lights.push(light);
  }
};

export const addColumnDivs = (
  divs: any,
  columnGif: p5Types.Image,
  p5: p5Types
) => {
  divs.columns = [];

  for (let i = 0; i < 3; i++) {
    let column = new ShadowDraggable(
      i,
      0,
      0,
      80,
      280,
      p5,
      columnGif,
      GlobalConfig
    );
    column.setNormal(300 + i * 20, 200 + i * 20, i + 1 + "");
    divs.columns.push(column);
  }
};

export const addTrashDivs = (divs: any, trashFiles: any, p5: p5Types) => {
  divs.trashCans = [];

  let labels = [
    { x0: 300, y0: 300, room: "10" },
    { x0: 300, y0: 300, room: "4" },
    { x0: 300, y0: 300, room: "5" },
  ];

  for (let i = 0; i < labels.length; i++) {
    const { x0, y0, room } = labels[i];
    const tf = new Folder(
      p5,
      i,
      x0,
      y0,
      "recycle bin",
      "/trash",
      trashFiles[0],
      GlobalConfig
    );
    tf.setNormal(x0, y0, room);
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

  let labels = [
    {
      x: 400,
      y: 400,
      label: "statement",
      link: "https://publicaccessmemories.com/statement",
      room: "0",
    },
    {
      x: 200,
      y: 200,
      label: "about",
      link: "https://publicaccessmemories.com/about",
      room: "0",
    },
    {
      x: 600,
      y: 300,
      label: "@public.access.memories",
      link: "https://www.instagram.com/public.access.memories/",
      room: "0",
    },
  ];

  if (ShowConfig.isOpenCallOpen) {
    labels[0].label = "open call";
    labels[0].link = "https://publicaccessmemories.com/opencall";
  }

  for (let i = 0; i < labels.length; i++) {
    const { x, y, label, link, room } = labels[i];
    const folder = new Folder(
      p5,
      i,
      x,
      y,
      label,
      link,
      i === 2 ? instaImg : txtFile,
      GlobalConfig
    );
    folder.setNormal(x, y, room);
    divs.folders.push(folder);
  }
};

//////////////////////////////////////////////////
export const addBarDivs = (divs: any, lightImg: p5Types.Image, p5: p5Types) => {
  const barTypes = ["wine", "cocktail", "DJ", "cheese"];
  divs.bars = [];
  let i = 0;
  for (const barType of barTypes) {
    const bar = getBar(barType, 4);
    switch (barType) {
      case "wine":
        let wineBar = new WineBar(
          i,
          { ...bar },
          lightImg,
          numBarItems,
          p5,
          GlobalConfig
        );
        divs.bars.push(wineBar);
        wineBar.setNormal(200, 200, "4");
        break;
      case "cocktail":
        let cocktailBar = new CocktailBar(
          i,
          { ...bar },
          lightImg,
          numBarItems,
          p5,
          GlobalConfig
        );
        cocktailBar.setNormal(200, 200, "2");
        divs.bars.push(cocktailBar);
        break;
      case "DJ":
        let djBar = new DJBar(
          i,
          { ...bar },
          lightImg,
          numBarItems,
          p5,
          GlobalConfig
        );
        djBar.setNormal(200, 200, "9");
        divs.bars.push(djBar);
        break;
      case "cheese":
        let cheeseBar = new CheeseBar(
          i,
          { ...bar },
          lightImg,
          numBarItems,
          p5,
          GlobalConfig
        );
        cheeseBar.setNormal(200, 200, "2");
        divs.bars.push(cheeseBar);
        break;
    }
    i++;
  }
};

export const displayLightDivs = (room: string, divs: any) => {
  for (const light of divs.lights) {
    if (light.roomToDisplay == room) {
      light.display(0, 0);
      light.displayToolBarNormal();
    }
  }
};

export const displayFolderDivs = (room: string, divs: any) => {
  for (const folder of divs.folders) {
    folder.displayInRoom(room);
  }
};

export const displayTrashDivs = (room: string, divs: any) => {
  for (const trash of divs.trashCans) {
    trash.displayInRoom(room);
  }
};

export const displayColumnDivs = (room: string, divs: any) => {
  for (const col of divs.columns) {
    if (col.roomToDisplay == room) {
      col.display(0, 0);
      col.displayToolBarNormal();
    }
  }
};

export const displayBarDivs = (room: string, divs: any) => {
  for (const bar of divs.bars) {
    if (bar.roomToDisplay == room) {
      bar.display(0, 0);
      bar.displayToolBarNormal();
    }
  }
};

export function endDivDrag(divs: any) {
  let keys = Object.keys(divs);
  for (const key of keys) {
    for (const div of divs[key]) div.endDrag();
  }
}

export function updateDivs(room: string, divs: any) {
  let keys = Object.keys(divs);
  for (const key of keys) {
    for (const div of divs[key]) div.updateInRoom(room);
  }
}

export const checkDivPress = (room: string, divs: any) => {
  let keys = Object.keys(divs);
  for (const key of keys) {
    for (const div of divs[key]) if (checkDiv(room, div)) return true;
  }
  return false;
};

const checkDiv = (room: string, div: any) => {
  if (div.checkButtonsNormal()) {
    return true;
  } else if (div.checkDraggingNormal(room)) {
    return true;
  }
  return false;
};

export const checkFolderDivsDouble = (room: string, divs: any) => {
  for (const folder of divs.folders) {
    folder.checkDoubleClickedNormal(room);
  }
};

export const checkTrashDivsDouble = (room: string, divs: any) => {
  for (const trash of divs.trashCans) {
    trash.checkDoubleClickedAlertNormal(room);
  }
};
