// import p5 from "p5";

const sc = 70;
export const globalConfig = {
    scaler: sc,
    minX: 0,
    maxX: 27,
    minY: 5,
    maxY: 27,
    x: -15,
    y: -35,
    stepS: sc
}

export const roomConfig = {
    w: 5,
    h: 5,
    start: .1,
    end: .8
}
export const p5ToWorldCoords = (x, y) => {
    let xx = (x) * globalConfig.scaler;
    let yy = (y) * globalConfig.scaler;
    return { x: xx, y: yy }
}

export const p5ToDomCoords = (x, y) => {
    let xx = (x + globalConfig.x) * globalConfig.scaler;
    let yy = (y + globalConfig.y) * globalConfig.scaler;

    
    return { x: xx, y: yy }
}

export const mouseToWorld = (userEase, p5) => {
    let x = p5.mouseX - p5.windowWidth/2;
    let y = p5.mouseY - p5.windowHeight/2;

    const worldUser = domCoordsToP5World(userEase.x, userEase.y);
    x += worldUser.x;
    y += worldUser.y;
    return {x, y};
}

export const domCoordsToP5 = (x, y) => {
    let xx = x / globalConfig.scaler - globalConfig.x;
    let yy = y / globalConfig.scaler - globalConfig.y;
    return { x: xx, y: yy }
}

export const domCoordsToP5World = (x, y) => {
    let p = domCoordsToP5(x, y);
    let xx = p.x* globalConfig.scaler;
    let yy = p.y * globalConfig.scaler;
    return { x: xx, y: yy }
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

let startX = limits[0].x;
let startY = 22;
export const pools = [
    { x: startX, y: startY },
    { x: startX + 5, y: startY + 5 },
    { x: startX + 10, y: startY + 10 },
];
export const poolSpace = 1;//.5;

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
export const lightsOG = [
    {x: 22.5, y: 7},
    {x: 8, y: 15},
    {x: 13, y: 20}
]
export const lights = [
    p5ToDomCoords(lightsOG[0].x, lightsOG[0].y),
    p5ToDomCoords(lightsOG[1].x, lightsOG[1].y),
    p5ToDomCoords(lightsOG[2].x, lightsOG[2].y),
    p5ToDomCoords(13, 20),
    p5ToDomCoords(7, 13)
];


//// wine
const cheeseBot = p5ToDomCoords(-8, 5); // cheese
const wineBot1 = p5ToDomCoords(30, 19);
const cocktailBot = p5ToDomCoords(32, 0);
export const wineLocation = [{ x: cheeseBot.x, y: cheeseBot.y, w: 80, h: 250, flipped:true }, { x: wineBot1.x, y: wineBot1.y, w: 80, h: 150, flipped: false }, { x: cocktailBot.x, y: cocktailBot.y, w: 80, h: 150, flipped:false }];


//// dance dance dance
const danceFloorP5 = { x: 24-3, y: -1, w: 10, h: 5 };
export const danceFloor = { x: globalConfig.scaler * danceFloorP5.x, y: globalConfig.scaler * danceFloorP5.y, w: globalConfig.scaler * danceFloorP5.w, h: globalConfig.scaler * danceFloorP5.h };
export const djLocation = p5ToDomCoords(danceFloorP5.x + 3.5, danceFloorP5.y-1);
export const hostBotLocation = p5ToDomCoords(15, 20);

export const ok = {};