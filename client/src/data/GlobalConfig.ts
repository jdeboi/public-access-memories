

let xMin = 0;
let xMax = 8 * 5;
let yMin = 0;
let yMax = 8 * 5;

export const GlobalConfig = {
    scaler: 40,
    x: -3 * 5,
    y: -5 * 5,
    worldW: xMax - xMin,
    worldH: yMax - yMin
}

export const limits = [
    { x: xMin, y: yMin }, // outer limit
    { x: xMax, y: yMin },
    { x: xMax, y: yMax },
    { x: xMin, y: yMax },
    { x: xMin, y: yMin }
];

export const outsideDoors = [
    { x0: 22.5, y0: 5.2, x1: 24, y1: 5.2, to: "outside" }, // top
    { x0: 0, y0: 8.5, x1: 0, y1: 10, to: "outside" }, // left
    { x0: 14, y0: 27.2, x1: 16, y1: 27.2, to: "outside" }, // bottom
    { x0: 22.5, y0: 15.2, x1: 24, y1: 15.2, to: "outside" }, // right
];
export const lightsP5 = [
    { x: 22.5, y: 7 },
    { x: 8, y: 15 },
    { x: 13, y: 20 }
];

// export const getGlobalConfig = (show: string) => {
//     if (show == "homebody") {
//         return getHBGlobalConfig();
//     }
//     else
//         return getAIRGlobalConfig();
// }

// const getHBGlobalConfig = () => {
//     let xMin = -10;
//     let xMax = 35;
//     let yMin = -3;
//     let yMax = 42;
//     let startX = xMin;
//     let startY = 22;

//     const config = {
//         scaler: 70,
//         x: -15,
//         y: -35,
//         limits: [
//             { x: xMin, y: yMin }, // outer limit
//             { x: xMax, y: yMin },
//             { x: xMax, y: yMax },
//             { x: xMin, y: yMax },
//             { x: xMin, y: yMin }
//         ],
//         outsideDoors: [
//             { x0: 22.5, y0: 5.2, x1: 24, y1: 5.2, to: "outside" }, // top
//             { x0: 0, y0: 8.5, x1: 0, y1: 10, to: "outside" }, // left
//             { x0: 14, y0: 27.2, x1: 16, y1: 27.2, to: "outside" }, // bottom
//             { x0: 22.5, y0: 15.2, x1: 24, y1: 15.2, to: "outside" }, // right
//         ],
//         lightsP5: [
//             { x: 22.5, y: 7 },
//             { x: 8, y: 15 },
//             { x: 13, y: 20 }
//         ],
//         pools: [
//             { x: startX, y: startY },
//             { x: startX + 5, y: startY + 5 },
//             { x: startX + 10, y: startY + 10 },
//         ],
//         poolSpace: 1
//     };
//     return config;
// }

// const getAIRGlobalConfig = () => {
//     let xMin = 0;
//     let xMax = 8 * 5;
//     let yMin = 0;
//     let yMax = 8 * 5;

//     const config = {
//         scaler: 40,
//         x: -3 * 5,
//         y: -5 * 5,
//         limits: [
//             { x: xMin, y: yMin }, // outer limit
//             { x: xMax, y: yMin },
//             { x: xMax, y: yMax },
//             { x: xMin, y: yMax },
//             { x: xMin, y: yMin }
//         ]
//     };
//     return config;
// }

