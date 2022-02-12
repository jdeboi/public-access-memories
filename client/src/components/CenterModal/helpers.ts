
import { IWindowUI } from '../../interfaces';

const padding = 15;
// const heading = 60; // top header
// const barBot = 60; // mobile footer / landscape menu

const borderW = 2;
const buffer = 40;

export function getCenterModalDim(windowUI: IWindowUI, isRelative: boolean, minW=540, minH=400) {


    if (getWidthTooSmall(windowUI, minW, minH) || getHeightTooSmall(windowUI, minW, minH)) {
        if (windowUI.orientation === "portrait")
            return getPortraitSmall(windowUI, isRelative);
        return getLandscapeSmall(windowUI, isRelative);
    }

    else {
        const { contentW, contentH, toolbarH, headerH } = windowUI;

        let w = minW;
        let h = minH;
        let y = (contentH - h - toolbarH) / 2;
        if (!isRelative)
            y += headerH;

        let x = (contentW - w) / 2 - borderW;
        return { w, h, x, y };
    }
}


function getWidthTooSmall(windowUI: IWindowUI, minW: number, minH: number) {
    const { contentW } = windowUI;
    return contentW < minW + padding * 2 + buffer;
}

function getHeightTooSmall(windowUI: IWindowUI, minW: number, minH: number) {
    const { toolbarH, contentH } = windowUI;
    return contentH < minH + padding * 2 + toolbarH + buffer;
}


function getLandscapeSmall(windowUI: IWindowUI, isRelative: boolean) {
    const { toolbarH, contentW, contentH, headerH } = windowUI;
    const w = contentW - padding * 2; // 60 = width of menu on left
    const h = contentH - padding - toolbarH;
    // const x = barBot + padding;
    const x = padding;
    let y = padding / 2;
    if (!isRelative)
        y += headerH;
    return { w, h, x, y };
    // console.log(x, y, x, h);
    // return {w: 200, h: 100, x: 300, y: 300};
}

function getPortraitSmall(windowUI: IWindowUI, isRelative: boolean) {
    const { toolbarH, contentW, contentH, headerH } = windowUI;
    const w = contentW - padding * 2; // 60 = width of menu on left
    const h = contentH - padding * 2 - toolbarH;
    const x = padding - borderW;
    let y = padding; // + heading;
    if (!isRelative)
        y += headerH;
    return { w, h, x, y };
    // return {w: 200, h: 100, x: 300, y: 300};
}