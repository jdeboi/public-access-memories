import BlindsDraggable from './Draggable/BlindsDraggable';
import { mapVal, constrain } from '../../../../shared/Helpers/Helpers';

export const addMobilePortraitDivs = (ui, divs, blinds, shadow, p5) => {
    divs.windows = [];
    const bufferW = 50;
    // const bufferH = 50;
    const spacing = 20;

    const availW = ui.contentW - bufferW;
    const availH = (ui.contentH - ui.toolbarH * 2 - spacing * 3) / 2;
    const dim = Math.min(availW, availH);

    const startX = (ui.contentW - dim) / 2;
    const startY = (ui.contentH - 2 * dim - 2 * ui.toolbarH) / 3;

    divs.windows.push(new BlindsDraggable(0, startX, startY, dim, dim, blinds, shadow, p5));
    divs.windows.push(new BlindsDraggable(0, startX, startY * 2 + ui.toolbarH + dim, dim, dim, blinds, shadow, p5))
}

export const addMobileLandscapeDivs = (ui, divs, blinds, shadow, p5) => {
    divs.windows = [];
    // const bufferW = 50;
    const bufferH = 50;
    const spacing = 20;

    const availW = (ui.contentW - spacing * 3) / 2;
    const availH = (ui.contentH - ui.toolbarH - bufferH);
    const dim = Math.min(availW, availH);

    const startX = (ui.contentW - dim * 2) / 3;
    const startY = (ui.contentH - dim - ui.toolbarH) / 2;

    divs.windows.push(new BlindsDraggable(0, startX, startY, dim, dim, blinds, shadow, p5));
    divs.windows.push(new BlindsDraggable(0, startX * 2 + dim, startY, dim, dim, blinds, shadow, p5))
}

export const addDesktopDivs = (ui, divs, blinds, shadow, p5) => {
    divs.windows = [];

    const bufferX = 30; // buffer
    const bufferY = 30; // buffer
    const spacing = 30; // between elements
    const minW = 160;
    const maxW = 230;
    let w = mapVal(ui.contentW, 1440, 2560, minW, maxW);
    w = constrain(w, minW, maxW);
    const h = w;
    // const imgW = (w+spacing)*4;
    // const imgH = (h+24+spacing)*4;

    let numFramesW = Math.floor((ui.contentW - 2 * bufferX + spacing) / (w + spacing));
    let numFramesH = Math.floor((ui.contentH - 2 * bufferY + spacing) / (h + 24 + spacing));
    numFramesW = Math.min(numFramesW, 6);
    numFramesH = Math.min(numFramesH, 4);
    const startX = (ui.contentW - numFramesW * (w + spacing) + spacing) / 2;
    const startY = (ui.contentH - (h + ui.toolbarH + spacing) * numFramesH + spacing) / 2; //(window.innerHeight-this.numFramesH*(h+24+spacing)+spacing)/2;

    let i = 0;
    for (let x = 0; x < numFramesW; x++) {
        for (let y = 0; y < numFramesH; y++) {
            // const xx = i%2===0?x-spacing/2:x;
            const xx = startX + x * (w + spacing);
            const yy = startY + y * (h + spacing + 24);
            // const xx = Math.random()*(window.innerWidth-w);
            // const yy = Math.random()*(window.innerHeight-w-30)+30;
            divs.windows.push(new BlindsDraggable(i++, xx, yy, w, h, blinds, shadow, p5))
            // i++;
        }

    }
}


export const drawDivSquares = (divs, mask, color) => {
    for (const col of divs.windows) {
        col.displayMask(mask, color);
    }
}
export const displayDivs = (divs, toolC, frameC, buttonC) => {
    for (const col of divs.windows) {
        col.display(frameC);
        col.displayToolBar(toolC, frameC, buttonC);
    }
}


export function endDivDrag(divs) {
    let keys = Object.keys(divs);
    for (const key of keys) {
        for (const div of divs[key])
            div.endDrag();
    }
}

export function updateDivs(divs) {

    let keys = Object.keys(divs);
    for (const key of keys) {

        for (const div of divs[key])
            div.update();
    }

}


export const checkDivPress = (divs) => {
    let keys = Object.keys(divs);
    for (const key of keys) {
        for (const div of divs[key])
            if (checkDiv(div))
                return true;
    }
    return false;
}

const checkDiv = (div) => {
    if (div.checkButtons()) {
        return true;
    }
    else if (div.checkDragging()) {
        return true;
    }
    return false;
}
