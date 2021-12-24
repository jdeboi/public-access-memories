import { GlobalConfig } from "../data/GlobalConfig";
import p5Types from 'p5';

export const p5ToWorldCoords = (x: number, y: number) => {
    let xx = (x) * GlobalConfig.scaler;
    let yy = (y) * GlobalConfig.scaler;
    return { x: xx, y: yy }
}

export const p5ToDomCoords = (x: number, y: number) => {
    let xx = (x + GlobalConfig.x) * GlobalConfig.scaler;
    let yy = (y + GlobalConfig.y) * GlobalConfig.scaler;


    return { x: xx, y: yy }
}

export const mouseToWorld = (userEase: { x: number, y: number }, p5: p5Types) => {
    let x = p5.mouseX - p5.windowWidth / 2;
    let y = p5.mouseY - p5.windowHeight / 2;

    const worldUser = domCoordsToP5World(userEase.x, userEase.y);
    x += worldUser.x;
    y += worldUser.y;
    return { x, y };
}

export const domCoordsToP5 = (x: number, y: number) => {
    let xx = x / GlobalConfig.scaler - GlobalConfig.x;
    let yy = y / GlobalConfig.scaler - GlobalConfig.y;
    return { x: xx, y: yy }
}

export const domCoordsToP5World = (x: number, y: number) => {
    let p = domCoordsToP5(x, y);
    let xx = p.x * GlobalConfig.scaler;
    let yy = p.y * GlobalConfig.scaler;
    return { x: xx, y: yy }
}

