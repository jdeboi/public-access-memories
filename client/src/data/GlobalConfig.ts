import { p5ToDomCoords } from '../helpers/coordinates';
import { roomConfig } from './RoomConfig';

export const GlobalConfig = {
    scaler: 70,
    minX: 0,
    maxX: 9*roomConfig.w,
    minY: 0,
    maxY: 9*roomConfig.w,
    x: -4.5*roomConfig.w,
    y: -4.5*roomConfig.w
}

export const limits = [
    { x: GlobalConfig.minX, y: GlobalConfig.minY }, // outer limit
    { x: GlobalConfig.maxX, y: GlobalConfig.minY },
    { x: GlobalConfig.maxX, y: GlobalConfig.maxY },
    { x: GlobalConfig.minX, y: GlobalConfig.maxY },
    { x: GlobalConfig.minX, y: GlobalConfig.minY }
];


export const limitsDiv = [
    p5ToDomCoords(limits[0].x, limits[0].y),
    p5ToDomCoords(limits[1].x, limits[1].y),
    p5ToDomCoords(limits[2].x, limits[2].y)
];


///// doors
export const outsideDoors = [
    { x0: 22.5, y0: 5, x1: 24, y1: 5, to: "outside" }, // top
    { x0: 0, y0: 8.5, x1: 0, y1: 10, to: "outside" }, // left
    { x0: 14, y0: 27, x1: 16, y1: 27, to: "outside" }, // bottom
    { x0: 22.5, y0: 15, x1: 24, y1: 15, to: "outside" }, // right
];

const outsideDoorFramesInit = [];
for (const door of outsideDoors) {
    outsideDoorFramesInit.push(p5ToDomCoords((door.x0 + door.x1) / 2, (door.y0 + door.y1) / 2));
}
export const outsideDoorFrames = outsideDoorFramesInit;


///// lights
export const lightsP5 = [
    { x: 5, y: 2 },
    { x: 3, y: 5 },
    { x: -3, y: 7 },
    { x: -6, y: 8 }
]
export const lights = [
    p5ToDomCoords(lightsP5[0].x, lightsP5[0].y),
    p5ToDomCoords(lightsP5[1].x, lightsP5[1].y),
    p5ToDomCoords(lightsP5[2].x, lightsP5[2].y),
    p5ToDomCoords(lightsP5[3].x, lightsP5[3].y)
];

