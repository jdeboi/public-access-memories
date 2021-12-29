import Folder from '../components/Folder';
import Draggable from '../components/Draggable/Draggable';
import ShadowDraggable from '../components/Draggable/ShadowDraggable';
import Door from "../components/Door";
import Light from '../components/Light';
import { getBar } from '../../../../data/BotConfig';
import CheeseBar from '../components/Bars/CheeseBar';
import CocktailBar from '../components/Bars/CocktailBar';
import WineBar from '../components/Bars/WineBar';
import DJBar from '../components/Bars/DJBar';

import Tree from '../components/Tree';
import RoomLabel from '../components/RoomLabel';
// import Trash from '../components/Trash';
// import TrashFolder from '../components/TrashFolder';
import Swing from '../components/Swing';
import Table from '../components/Table';

import { GlobalConfig } from '../../../../data/GlobalConfig';
import { rooms } from '../../../../data/RoomConfig';
import { domCoordsToP5World } from '../../../../helpers/coordinates';


export const addRoomLabelDivs = (divs, eyeIcon, p5) => {
    divs.roomLabels = [];
    for (let i = 0; i < rooms.length; i++) {
        let roomL = new RoomLabel(p5, i, eyeIcon);
        divs.roomLabels.push(roomL);
    }
}

export const displayRoomLabelDivs = (font, roomCount, divs) => {
    for (const rl of divs.roomLabels) {
        rl.display(font, roomCount);
        rl.displayToolBar();
    }
}


export const addDoorDivs = (divs, doors, doorImgs, p5) => {
    divs.doors = [];
    let numDoors = 4;
    for (let i = 0; i < numDoors; i++) {
        let door = new Door(p5, i, doorImgs);
        doors.push(door);
        divs.doors.push(door);
    }
}

export const addLightDivs = (divs, lightImgs, p5) => {
    divs.lights = [];
    let numLights = 3;
    for (let i = 0; i < numLights; i++) {
        let light = new Light(p5, i, lightImgs);
        // lights.push(light);
        divs.lights.push(light);
    }
}

export const addColumnDivs = (divs, columnGif, shadow, p5) => {
    divs.columns = [];
    let sc = GlobalConfig.scaler;
    let numCols = 4;
    const dy = 140;
    const dx = 140;
    let gx = 16.5 * sc
    let gy = 34.5 * sc
    for (let i = 0; i < numCols; i++) {
        let column = new ShadowDraggable(i, gx + dx * i, gy - dy * i, 80, 280, p5, columnGif, shadow)
        // columns.push(column)
        // column.initMask();
        divs.columns.push(column)
    }

    let x = 1.5 * sc;
    let y = 22.5 * sc;
    divs.columns.push(new ShadowDraggable(numCols, x, y, 80, 280, p5, columnGif, shadow))
    divs.columns.push(new ShadowDraggable(numCols + 1, x + sc * 2, y, 80, 280, p5, columnGif, shadow))

    x = -3.5 * sc;
    y = 17.5 * sc;
    divs.columns.push(new ShadowDraggable(numCols + 2, x, y, 80, 280, p5, columnGif, shadow))
    divs.columns.push(new ShadowDraggable(numCols + 3, x + sc * 2, y, 80, 280, p5, columnGif, shadow))
}

export const addTrashDivs = (divs, trashFiles, shadow, p5) => {
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
        { x0: -8 * sc, y0: 3 * sc }
    ];

    for (let i = 0; i < 3; i++) {
        const { x0, y0 } = labels[i];
        // p5, id, x, y, label, link, img
        // const tf = new TrashFolder(i, x0, y0, 422 * .5, 265 * .5, p5, trashFiles[i + 1], shadow)
        // const t = new Trash(p5, i * 2, x0, y0, "recycle bin", trashFiles[0], tf);

        const tf = new Folder(p5, i, x0, y0, "recycle bin", "/trash", trashFiles[0]);
        // divs.trashFolders.push(tf);
        divs.trashCans.push(tf);
    }
}


export const addFolderDivs = (divs, instaImg, txtFile, p5) => {
    divs.folders = [];
    // yeah, why are these in dom coords...
    let p0 = domCoordsToP5World(560, 0);
    let p1 = domCoordsToP5World(620, 130);
    let p2 = domCoordsToP5World(510, 230);
    let labels = [
        { x: p0.x, y: p0.y, label: "show statement", link: "https://publicaccessmemories.com/exhibition" },
        { x: p1.x, y: p1.y, label: "about gallery", link: "https://publicaccessmemories.com/about" },
        { x: p2.x, y: p2.y, label: "@public.access.memories", link: "https://www.instagram.com/public.access.memories/" }
    ];

    for (let i = 0; i < 3; i++) {
        const { x, y, label, link } = labels[i];
        const folder = new Folder(p5, i, x, y, label, link, (i === 2 ? instaImg : txtFile));
        divs.folders.push(folder);
    }
}

export const addOakDivs = (divs, oakImg, p5) => {
    let sc = GlobalConfig.scaler;
    divs.oaks = [];

    for (let i = 0; i < 1; i++) {
        let oak = new Draggable(i, sc * -7.5, sc * 34, 500, 400, p5, oakImg);
        divs.oaks.push(oak);
    }
}

export const addSwingDivs = (divs, baby, chain, p5) => {
    divs.swings = [];
    divs.swings.push(new Swing(0, -4.1, 36.8, 100, 190, p5, baby, chain));
}

export const addTableDivs = (divs, tableImgs, p5) => {
    let sc = GlobalConfig.scaler;
    divs.tables = [];
    let tables = [
        { x: -9, y: -2.25 },
        { x: -4, y: -2.25 },
        { x: -4, y: 2.75 }
    ];
    for (let i = 0; i < 3; i++) {
        let { x, y } = tables[i];
        let table = new Table(i, x, y, sc * 3, sc * 3, p5, tableImgs[0], tableImgs[1]);
        divs.tables.push(table);
    }
}


//////////////////////////////////////////////////
export const addBarDivs = (divs, lightImg, p5) => {
    const barTypes = ["wine", "cocktail", "DJ", "cheese"];
    divs.bars = [];
    let i = 0;
    for (const barType of barTypes) {
        const bar = getBar(barType);
        switch (barType) {
            case "wine":
                divs.bars.push(new WineBar(i, { ...bar }, lightImg, p5));
                break;
            case "cocktail":
                divs.bars.push(new CocktailBar(i, { ...bar }, lightImg, p5));
                break;
            case "DJ":
                divs.bars.push(new DJBar(i, { ...bar }, lightImg, p5));
                break;
            case "cheese":
                divs.bars.push(new CheeseBar(i, { ...bar }, lightImg, p5));
                break;
        }
        i++;
    }
}

export const addTreeDivs = (divs, tree, p5) => {
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
        let y = i * sp + startY
        if (i > numTrees / 2) {
            x = sp * numTrees / 2 * dir + startX - (i - numTrees / 2) * sp * dir;
        }
        divs.trees.push(new Tree(i, x, y, w, h, p5, tree));
    }

    // let x = sc * -8;
    // let y = 30 * sc;
    // let sp = 60;
    // divs.trees.push(new Draggable(numTrees + 1, -8.5 * sc, 32 * sc, w, h, p5, tree));
    // divs.trees.push(new Draggable(numTrees, -9.5 * sc, 33 * sc, w, h, p5, tree));

    // let x = sc * -5;
    // divs.trees.push(new Draggable(numTrees + 2, sc * -.5, 35.5 * sc, w, h, p5, tree));
    // divs.trees.push(new Draggable(numTrees + 3, sc * -1.5, 36.5 * sc, w, h, p5, tree));
}

export const displayDoorDivs = (userX, userY, divs, isClosed, closedSign) => {

    for (const door of divs.doors) {
        door.display(userX, userY, isClosed, closedSign);
        door.displayToolBar(userX, userY);
    }
    // for(let i = 0; i < 4; i++) {
    //   divs[i].display(user.x, user.y);
    //   divs[i].displayToolBar(user.x, user.y);
    // }
}

export const displayLightDivs = (userX, userY, divs) => {
    for (const light of divs.lights) {
        light.display(userX, userY);
        light.displayToolBar(userX, userY);
    }
}

export const displayFolderDivs = (divs) => {
    for (const folder of divs.folders) {
        folder.display();
    }
}

export const displayTrashDivs = (userX, userY, divs) => {
    for (const trash of divs.trashCans) {
        trash.display();
    }
}

export const displayColumnDivs = (userX, userY, divs) => {
    for (const col of divs.columns) {
        col.display(userX, userY);
        col.displayToolBar(userX, userY);
    }
}

export const displayBarDivs = (userX, userY, divs) => {
    for (const bar of divs.bars) {
        bar.display(userX, userY);
        bar.displayToolBar(userX, userY);
    }
}

export const displayOakDivs = (userX, userY, divs) => {
    for (const oak of divs.oaks) {
        oak.display(userX, userY);
        oak.displayToolBar(userX, userY);
    }
}

export const displayTableDivs = (userX, userY, divs) => {
    for (const table of divs.tables) {
        table.display(userX, userY);
        table.displayToolBar(userX, userY);
    }
}

export const displaySwingDivs = (userX, userY, divs) => {
    for (const swing of divs.swings) {
        swing.display(userX, userY);
        swing.displayToolBar(userX, userY);
    }
}

export const displayTreeDivs = (userX, userY, sz, divs) => {
    for (const tree of divs.trees) {
        tree.display(userX, userY, sz);
        tree.displayToolBar(userX, userY);
    }
}


// export function displayDivs(userX, userY, divs) {
//     let keys = Object.keys(divs);
//     for (const key of keys) {
//         if (key !== "") {
//             for (const div of divs[key]) {
//                 // div.display(userX, userY);
//             }
//         }
//     }

// }

export function endDivDrag(divs) {
    let keys = Object.keys(divs);
    for (const key of keys) {
        for (const div of divs[key])
            div.endDrag();
    }
}

export function updateDivs(userEase, users, doors, divs, isPanGallery = false) {

    for (const door of divs.doors) {
        door.openDoor(userEase, users, isPanGallery);
    }

    let keys = Object.keys(divs);
    for (const key of keys) {

        for (const div of divs[key])
            div.update();


    }

}


export const checkDivPress = (userX, userY, divs) => {
    let keys = Object.keys(divs);
    for (const key of keys) {
        for (const div of divs[key])
            if (checkDiv(userX, userY, div))
                return true;
    }
    return false;
}

const checkDiv = (userX, userY, div) => {
    if (div.checkButtons(userX, userY)) {
        return true;
    }
    else if (div.checkDragging(userX, userY)) {
        return true;
    }
    return false;
}

export const checkFolderDivsDouble = (userX, userY, divs) => {
    for (const folder of divs.folders) {
        folder.checkDoubleClicked(userX, userY);
    }
}

export const checkTrashDivsDouble = (userX, userY, divs) => {
    for (const trash of divs.trashCans) {
        trash.checkDoubleClickedAlert(userX, userY);
    }
}