
import Light from '../components/Light';
import { getBar } from '../../../data/BotConfig';

import WineBar from '../components/Bars/WineBar';
import CheeseBar from '../components/Bars/CheeseBar';
import CocktailBar from '../components/Bars/CocktailBar';
import DJBar from '../components/Bars/DJBar';

import RoomLabel from '../components/Room/RoomLabel';
import { rooms } from '../../../data/RoomConfig';

//////////////////////////////////////////////////
export const addRoomLabelDivs = (divs, eyeIcon, p5) => {
    divs.roomLabels = [];
    for (let i = 0; i < rooms.length; i++) {
        let roomL = new RoomLabel(p5, i, eyeIcon);
        divs.roomLabels.push(roomL);
    }
}

export const displayRoomLabelDivs = (font, roomCount, userX, userY, divs) => {
    for (const rl of divs.roomLabels) {
        rl.display(font, roomCount);
        rl.displayToolBar(userX, userY);
    }
}

//////////////////////////////////////////////////
export const addLightDivs = (divs, lightImgs, p5) => {
    divs.lights = [];
    let numLights = 3;
    for (let i = 0; i < numLights; i++) {
        let light = new Light(p5, i, lightImgs);
        divs.lights.push(light);
    }
}

export const displayLightDivs = (userX, userY, divs) => {
    for (const light of divs.lights) {
        light.display(userX, userY);
        light.displayToolBar(userX, userY);
    }
}

//////////////////////////////////////////////////
export const addBarDivs = (divs, lightImg, p5) => {
    const barTypes = ["wine", "cocktail", "DJ", "cheese"];
    divs.bars = [];
    let i = 0;
    for (const barType of barTypes) {
        const { x, y, w, h, type } = getBar(barType);
        switch (barType) {
            case "wine":
                divs.bars.push(new WineBar(i, { x, y, w, h, type }, lightImg, p5));
                break;
            case "cocktail":
                divs.bars.push(new CocktailBar(i, { x, y, w, h, type }, lightImg, p5));
                break;
            case "DJ":
                divs.bars.push(new DJBar(i, { x, y, w, h, type }, lightImg, p5));
                break;
            case "cheese":
                divs.bars.push(new CheeseBar(i, { x, y, w, h, type }, lightImg, p5));
                break;
        }
        i++;
    }
}


export const displayBarDivs = (userX, userY, divs) => {
    for (const bar of divs.bars) {
        bar.display(userX, userY);
        bar.displayToolBar(userX, userY);
    }
}


//////////////////////////////////////////////////

export function endDivDrag(divs) {
    let keys = Object.keys(divs);
    for (const key of keys) {
        for (const div of divs[key])
            div.endDrag();
    }
}

export function updateDivs(userEase, users, divs) {

    // for (const door of divs.doors) {
    //     door.openDoor(userEase, users);
    // }

    let keys = Object.keys(divs);
    for (const key of keys) {

        for (const div of divs[key])
            div.update();


    }

}


export const checkDivPress = (userX, userY, divs) => {
    let keys = Object.keys(divs);
    for (const key of keys) {
        if (key !== "trashCans") {
            if (key === "trashFolders") {
                for (const div of divs.trashFolders) {
                    if (checkDiv(userX, userY, div))
                        return true;
                    // else if (checkTrashDiv(userX, userY, div)) {
                    //     return true;
                    // }
                }
                for (const div of divs.trashCans) {
                    if (checkDiv(userX, userY, div))
                        return true;
                }
            }
            else
                for (const div of divs[key])
                    if (checkDiv(userX, userY, div))
                        return true;
        }
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