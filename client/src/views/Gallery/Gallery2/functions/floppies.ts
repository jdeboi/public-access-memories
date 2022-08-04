import Floppy from "../components/Floppy/Floppy";
import p5Types from 'p5';
import { artists, rooms } from "../../../../data/RoomConfig";
import { p5ToWorldCoords } from "../../../../helpers/coordinates";
import { is } from "immer/dist/internal";


const connections = [
    [0, 5],
    [5, 10],
    [10, 20],
    [20, 30],
    [5, 20],
    [15, 11],
    [0, 5],
    [5, 10],
    [10, 20],
    [20, 30],
    [5, 20],
    [15, 11],
    [5, 20],
    [15, 11],
]

export const addFloppyDivs = (floppies: Floppy[], eyeIcon: p5Types.Image, floppyImg: p5Types.Image,slider: p5Types.Image, font: p5Types.Font, p5: p5Types) => {
    for (let i = 0; i < rooms.length; i++) {
        const { x, y, link } = rooms[i];
        let coord = p5ToWorldCoords(x, y);
        let connection = p5ToWorldCoords(connections[i][0], connections[i][1]);
        const floppy = new Floppy(p5, i, coord.x, coord.y,  link, eyeIcon, floppyImg, slider, font, connection);
        floppies.push(floppy);
    }
}

export const displayFloppyDivs = (x: number, y: number, roomCount: any, isMobile: boolean, floppies: Floppy[]) => {
    for (const floppy of floppies) {
        floppy.displayWithLabel(x, y, roomCount);
        // if (isMobile) {
            // floppy.displayMobileButton(x, y);
        // }
    }
}

export const updateFloppyDivs = (userEase: {x: number, y: number}, users: any, floppies: Floppy[]) => {
    for (const floppy of floppies) {
        floppy.update();
        floppy.openDoor(userEase, users);
    }
}

export const endFloppyDivDrag = (floppies: Floppy[]) => {
    for (const floppy of floppies) {
        if (floppy)
            floppy.endDrag();
    }
}

export const checkFloppyDivsDouble = (userX: number, userY: number, floppies: Floppy[]) => {
    for (const floppy of floppies) {
        floppy.checkDoubleClicked(userX, userY);
    }
}

export const checkFloppyDivs = (userX: number, userY: number, floppies: Floppy[]) => {
    for (const floppy of floppies) {
        if (floppy.checkDragging(userX, userY)) {
            return true;
        }
    }
    return false;
}