
export const GlobalConfig = {
    scaler: 70,
    minX: 0,
    maxX: 27,
    minY: 5,
    maxY: 27,
    x: -15,
    y: -35,
}

let xMin = -10;
let xMax = 35;
let yMin = -3;
let yMax = 42;
export const limits = [
    { x: xMin, y: yMin }, // outer limit
    { x: xMax, y: yMin },
    { x: xMax, y: yMax },
    { x: xMin, y: yMax },
    { x: xMin, y: yMin }
];
// export const limits = [
//     { x: GlobalConfig.minX, y: GlobalConfig.minY }, // outer limit
//     { x: GlobalConfig.maxX, y: GlobalConfig.minY },
//     { x: GlobalConfig.maxX, y: GlobalConfig.maxY },
//     { x: GlobalConfig.minX, y: GlobalConfig.maxY },
//     { x: GlobalConfig.minX, y: GlobalConfig.minY }
// ];

///// doors
export const outsideDoors = [
    { x0: 22.5, y0: 5.2, x1: 24, y1: 5.2, to: "outside" }, // top
    { x0: 0, y0: 8.5, x1: 0, y1: 10, to: "outside" }, // left
    { x0: 14, y0: 27.2, x1: 16, y1: 27.2, to: "outside" }, // bottom
    { x0: 22.5, y0: 15.2, x1: 24, y1: 15.2, to: "outside" }, // right
];


///// lights

// export const lightsP5 = [
//     { x: 6 * roomConfig.w+1, y: 5 * roomConfig.w+1 },
//     { x: 5 * roomConfig.w, y: 2 * roomConfig.w },
//     { x: 2 * roomConfig.w-1, y: 3 * roomConfig.w-.5 },
//     { x: 3 * roomConfig.w, y: 7 * roomConfig.w }
// ]
export const lightsP5 = [
    { x: 22.5, y: 7 },
    { x: 8, y: 15 },
    { x: 13, y: 20 }
];



// pools
let startX = limits[0].x;
let startY = 22;
export const pools = [
    { x: startX, y: startY },
    { x: startX + 5, y: startY + 5 },
    { x: startX + 10, y: startY + 10 },
];
export const poolSpace = 1;//.5;
