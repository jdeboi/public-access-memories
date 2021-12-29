
import { roundToMult } from './round';
import { GlobalConfig, limits } from '../../../../data/GlobalConfig';
import { danceFloor } from '../../../../data/BotConfig';

export const drawAllFloors = (floorTex, p5) => {

    // big floor
    p5.strokeWeight(2);
    p5.stroke(255, 200);
    drawFloor(limits[0].x, limits[0].y, limits[2].x - limits[0].x, limits[2].y - limits[0].y, false, false, GlobalConfig.scaler * 5, p5); // big floor
    drawDanceFloor(p5);

    ////// not these
    // drawSpaceFloor(20, 12, 12, 10, p5); // left
    // drawSpaceFloor(5, 27, 20, 8, p5); // bottom
    // drawSpaceFloor(24, 22, 4, 8, p5); // bottom to left
    ////////

    // top row
    p5.strokeWeight(2);
    p5.stroke(255, 200);
    drawFloor(limits[0].x + 10, limits[0].y, 20, 3, false, false, GlobalConfig.scaler, p5);
    // right alley
    drawFloor(32, 5, 3, 14, false, false, GlobalConfig.scaler, p5);


    // stairsOG
    drawFloor(-10, 12, 5, 10, false, false, GlobalConfig.scaler, p5);
    drawFloor(-5, 17, 5, 10, false, false, GlobalConfig.scaler, p5); // left column
    drawFloor(0, 22, 5, 10, false, false, GlobalConfig.scaler, p5);
    drawFloor(5, 27, 5, 10, false, false, GlobalConfig.scaler, p5);



    // stairsBig
    // drawFloor(pools[0].x, pools[0].y, 5, 5, false, false, GlobalConfig.scaler * 5, p5);
    // drawFloor(pools[1].x, pools[1].y, 5, 5, false, false, GlobalConfig.scaler * 5, p5);
    // drawFloor(pools[2].x, pools[2].y, 5, 5, false, false, GlobalConfig.scaler * 5, p5);
    // drawFloor(pools[2].x+5, pools[2].y+5, 5, 5, false, false, GlobalConfig.scaler * 5, p5);
    p5.noStroke();


    // top left
    p5.noStroke();
    drawSpaceFloor(limits[0].x, -3, 10, 15, p5);
    // behind dance
    drawSpaceFloor(20, limits[0].y, 15, 8, p5);


    // drawFloor(0, 22, 28, 18, false, false, GlobalConfig.scaler, p5);

    // drawFloor(0, 0, 30, 30, false, false, p5);
    // drawSpaceFloorTriangle(5 - 15, 27 - 15, 5 + 9, 27 + 9, p5);
    // drawSpaceFloorTriangle(15, 27 + 9, 15 + 9, 27, p5);
    let startX = 10;
    let startY = 39;
    let dx = 21;
    let h = 14;
    let w = 15;
    drawSpaceFloorLine(startX, startY, startX + dx, startY - dx, h, p5);
    // drawSpaceFloor(20, 15, 1, 1, p5);

    // drawPlants(p5);




    drawGalleryGround(floorTex, p5);
    // drawGalleryGrid(p5);
    drawGalleryRects(p5);
    // drawBorderPlants(p5);

}


const drawGrid = (p5) => {
    let spacing = GlobalConfig.scaler;
    p5.stroke(255, 100);
    p5.strokeWeight(2);
    let sc = GlobalConfig.scaler;
    for (let x = limits[0].x * sc; x <= limits[1].x * sc; x += spacing) {
        p5.line(x, limits[0].y * sc, x, limits[2].y * sc);
    }

    for (let y = limits[0].y * sc; y <= limits[2].y * sc; y += spacing) {
        p5.line(limits[0].x * sc, y, limits[1].x * sc, y);
    }
}

const drawSpaceFloorTriangle = (x0, y0, x1, y1, p5) => {
    let sc = GlobalConfig.scaler;
    let spacing = GlobalConfig.scaler;
    x0 = roundToMult(x0 * sc, spacing);
    y0 = roundToMult(y0 * sc, spacing);
    x1 = roundToMult(x1 * sc, spacing);
    y1 = roundToMult(y1 * sc, spacing);

    let yOffset = new Date() / 2000;

    let slope = (y1 - y0) / (x1 - x0);
    let b = y0 - slope * x0;

    p5.stroke(255, 150);
    p5.noStroke();
    p5.strokeWeight(2);
    if (slope >= 0) {
        for (let x = x0; x <= x1; x += spacing) {
            let yVal = slope * x + b;
            let yValRounded = roundToMult(yVal, spacing);
            for (let y = y0; y <= yValRounded; y += spacing) {
                let n = p5.noise(x * .005, y * .005 + yOffset);
                let alpha = p5.map(n, 0, 1, 0, 150);
                p5.fill(255, alpha);
                p5.rect(x, y, spacing, spacing);
            }

        }
    }
    else {
        let index = 0;
        // let yVal = y0;
        // let yValRounded = roundToMult(yVal, spacing);
        for (let x = x0; x <= x1; x += spacing) {
            let yVal = slope * x + b;
            let yValRounded = roundToMult(yVal, spacing);
            for (let y = y1; y <= yValRounded; y += spacing) {
                let n = p5.noise(x * .005, y * .005 + yOffset);
                let alpha = p5.map(n, 0, 1, 0, 150);
                p5.fill(255, alpha);
                p5.rect(x, y, spacing, spacing);
            }
            // console.log(index++, yVal/spacing, yValRounded/spacing);

        }
    }
}

const drawSpaceFloorLine = (x0, y0, x1, y1, w, p5) => {
    let sc = GlobalConfig.scaler;
    let spacing = GlobalConfig.scaler;
    x0 = roundToMult(x0 * sc, spacing);
    y0 = roundToMult(y0 * sc, spacing);
    x1 = roundToMult(x1 * sc, spacing);
    y1 = roundToMult(y1 * sc, spacing);
    w = roundToMult(w * sc, spacing);
    let yOffset = new Date() / 2000;

    let slope = (y1 - y0) / (x1 - x0);
    let b = y0 - slope * x0;

    p5.stroke(0, 150);
    p5.noStroke();
    p5.strokeWeight(2);
    if (slope >= 0) {
        for (let x = x0; x <= x1; x += spacing) {
            let yVal = slope * x + b;
            let yValRounded = roundToMult(yVal, spacing);
            let yValStart = yValRounded - w;
            for (let y = yValStart; y <= yValRounded; y += spacing) {
                let n = p5.noise(x * .005, y * .005 + yOffset);
                let alpha = p5.map(n, 0, 1, 0, 150);
                p5.fill(255, alpha);
                p5.rect(x, y, spacing, spacing);
            }

        }
    }
    else {
        let index = 0;
        // let yVal = y0;
        // let yValRounded = roundToMult(yVal, spacing);
        for (let x = x0; x <= x1; x += spacing) {
            let yVal = slope * x + b;
            let yValRounded = roundToMult(yVal, spacing);
            let yValStart = yValRounded - w;
            for (let y = yValStart; y <= yValRounded; y += spacing) {
                let n = p5.noise(x * .005, y * .005 + yOffset);
                let alpha = p5.map(n, 0, 1, 0, 150);
                p5.fill(255, alpha);
                p5.rect(x, y, spacing, spacing);
            }
            // console.log(index++, yVal/spacing, yValRounded/spacing);

        }
    }
}

// p5.fill(255, 50);
// p5.rect(-12*sc, -10*sc, (38+12)*sc, (40+10)*sc);


const drawSpaceFloor = (x0, y0, w, h, p5) => {
    let spacing = GlobalConfig.scaler;
    let yOffset = new Date() / 2000;
    // let bound = 5000;

    let sc = GlobalConfig.scaler;
    for (let x = x0 * sc; x < (x0 + w) * sc; x += spacing) {
        for (let y = y0 * sc; y < (y0 + h) * sc; y += spacing) {
            let n = p5.noise(x * .005, y * .005 + yOffset);
            let alpha = p5.map(n, 0, 1, 0, 150);
            p5.fill(255, alpha);
            p5.rect(x, y, spacing, spacing);
        }
    }

    // p5.fill(255, 50);
    // p5.rect(-12*sc, -10*sc, (38+12)*sc, (40+10)*sc);

}

const drawFloor = (x0, y0, w, h, isDark, isFilled, spacing, p5) => {
    // let spacing = GlobalConfig.scaler;
    let yOffset = new Date() / 2000;
    // let bound = 5000;
    if (isFilled) p5.fill(255, 150);
    else p5.fill(0, 100);
    // p5.stroke(255, 200);
    // if (isDark) p5.stroke(0, 255);
    if (isDark) p5.fill(255, 30);
    let sc = GlobalConfig.scaler;
    let xInd = 0;
    let yInd = 0;
    for (let x = x0 * sc; x < (x0 + w) * sc; x += spacing) {
        for (let y = y0 * sc; y < (y0 + h) * sc; y += spacing) {
            let alpha = 255;
            if (isFilled) {
                // if (isCheckered) alpha = ((xInd + yInd) % 2 == 0) ? 200 : 50;
                alpha = p5.map(Math.sin(new Date() / 1000 + x / 100 + y / 200), -1, 1, 0, 110);
                p5.fill(255, alpha);
            } else {
                // alpha = p5.map(Math.sin(new Date()/1000 + x/100 + y/200), -1, 1, 0, 180);
                // p5.stroke(255, alpha);
            }
            // if (isDark) {
            //   p5.fill(0, 150);
            // }
            p5.rect(x, y, spacing, spacing);
            yInd++;
        }
        xInd++;
    }

    // p5.fill(255, 50);
    // p5.rect(-12*sc, -10*sc, (38+12)*sc, (40+10)*sc);

}


const drawDanceFloor = (p5) => {
    let sc = GlobalConfig.scaler;
    let spacing = 60;
    let w = 10 * 70;
    let h = 5 * 70;

    p5.noStroke();
    let alpha = p5.map(Math.sin(new Date() / 500), -1, 1, 150, 255);
    p5.fill(255, alpha);
    for (let x = danceFloor.x; x < (danceFloor.x + w); x += spacing) {
        for (let y = danceFloor.y; y < (danceFloor.y + h); y += spacing) {

            // p5.line(, y, bound, y);
            p5.rect(x, y, 50, 50);
        }
    }
}

const drawGalleryGround = (floorTex, p5) => {
    if (floorTex) {
        // 1st
        const w = 5 * GlobalConfig.scaler;
        const h = 5 * GlobalConfig.scaler;
        // for (let x = 0; x < 15; x += 5) {

        //     const ix = x * GlobalConfig.scaler;
        //     const iy = 2 * GlobalConfig.scaler;
        //     p5.image(floorTex, 20 * GlobalConfig.scaler, 2 * GlobalConfig.scaler, w, h);
        // }

        // 2nd
        for (let x = 0; x < 25; x += 5) {
            const ix = x * GlobalConfig.scaler;
            const iy = 5 * GlobalConfig.scaler;
            p5.image(floorTex, ix, iy, w, h);
        }

        /////////////
        // added when deleted rooms
        let ix = 22 * GlobalConfig.scaler;
        let iy = 5 * GlobalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
        iy = 10 * GlobalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);
        /////////////


        // 3rd
        for (let x = 0; x < 25; x += 5) {
            const ix = x * GlobalConfig.scaler;
            const iy = 10 * GlobalConfig.scaler;
            p5.image(floorTex, ix, iy, w, h);
        }
        // 4th row
        for (let x = 0; x < 15; x += 5) {
            const ix = x * GlobalConfig.scaler;
            const iy = 12 * GlobalConfig.scaler;
            p5.image(floorTex, ix, iy, w, h);
        }
        ix = 15 * GlobalConfig.scaler;
        iy = 12 * GlobalConfig.scaler;
        p5.image(floorTex, ix, iy, w, h);

        // 4th row
        for (let x = 5; x < 20; x += 5) {
            const ix = x * GlobalConfig.scaler;
            const iy = 17 * GlobalConfig.scaler;
            p5.image(floorTex, ix, iy, w, h);
        }
        for (let x = 10; x < 20; x += 5) {
            const ix = x * GlobalConfig.scaler;
            const iy = 22 * GlobalConfig.scaler;
            p5.image(floorTex, ix, iy, w, h);
        }

    }
}

const drawGalleryGrid = (p5) => {
    // 1st
    p5.stroke(255, 100);
    p5.strokeWeight(2);
    let sc = GlobalConfig.scaler;
    let step = 1;
    for (let x = 0; x < 27; x += step) {
        const y0 = 5;
        const y1 = 15;
        p5.line(x * sc, y0 * sc, x * sc, y1 * sc);
    }
    for (let y = 5; y < 15; y += step) {
        const x0 = 0;
        const x1 = 27;
        p5.line(x0 * sc, y * sc, x1 * sc, y * sc);
    }
    // 2nd
    for (let x = 0; x < 20; x += step) {
        const y0 = 15;
        const y1 = 22;
        p5.line(x * sc, y0 * sc, x * sc, y1 * sc);
    }
    for (let y = 15; y < 22; y += step) {
        const x0 = 0;
        const x1 = 20;
        p5.line(x0 * sc, y * sc, x1 * sc, y * sc);
    }

    // 3rd
    for (let x = 10; x < 20; x += step) {
        const y0 = 22;
        const y1 = 27;
        p5.line(x * sc, y0 * sc, x * sc, y1 * sc);
    }
    for (let y = 22; y < 27; y += step) {
        const x0 = 10;
        const x1 = 20;
        p5.line(x0 * sc, y * sc, x1 * sc, y * sc);
    }

}

const drawGalleryRects = (p5) => {
    let yind = 0;
    let xind = 0;
    let cFilled = p5.color(255, 200);
    let cDark = p5.color(255, 50);

    p5.strokeWeight(2);
    p5.stroke(255, 150);
    let sc = GlobalConfig.scaler;
    let step = 1;
    for (let x = 0; x < 27; x += step) {
        for (let y = 5; y < 15; y += step) {
            if ((yind + xind) % 2 == 0) p5.fill(cDark);
            else p5.fill(cFilled);
            p5.rect(x * sc, y * sc, sc, sc);
            yind++;
        }
        xind++;
    }

    // 2nd
    for (let x = 0; x < 20; x += step) {
        for (let y = 15; y < 22; y += step) {
            if ((x + y + 1) % 2 == 0) p5.fill(cDark);
            else p5.fill(cFilled);
            p5.rect(x * sc, y * sc, sc, sc);
        }
    }



    // 3rd
    yind = 0;
    xind = 0;
    for (let x = 10; x < 20; x += step) {
        for (let y = 22; y < 27; y += step) {
            if ((x + y + 1) % 2 == 0) p5.fill(cDark);
            else p5.fill(cFilled);
            p5.rect(x * sc, y * sc, sc, sc);
        }
    }


}


// const rightPatio = (p5, sc = GlobalConfig.scaler) => {
//     const x = 21.5 * sc;
//     const y = 15.5 * sc;
//     const w = 5 * sc;
//     if (grasses[1]) p5.image(grasses[1], x, y, w, w);
// }


// const drawBorderPlants = (p5, sc = GlobalConfig.scaler) => {
//     if (horizPlant) {
//       var startY = -horizPlant.height;
//       for (let i = 0; i < 4; i++) {
//         p5.image(horizPlant, i * horizPlant.width, startY, horizPlant.width, horizPlant.height);
//       }
//       startY += 5 * sc;
//       p5.image(horizPlant, 27 * sc, startY);
//     }

//   }

//   const drawGrass = (p5, sc = GlobalConfig.scaler) => {
//     if (grasses[1]) {
//       // for (let x = -15*sc; x < -12*sc; x+= shrub.width) {
//       const w = 5;
//       const startX = -10;
//       const endX = 35;
//       const startY = -5;
//       const endY = 40;
//       for (let x = startX; x < endX; x += w) {
//         for (let y = startY; y < endY; y += w) {
//           if (y > 10) {
//             if (x == y);
//             else p5.image(grasses[1], (x - 1) * sc, y * sc, w * sc, w * sc);
//           }
//           else p5.image(grasses[1], x * sc, y * sc, w * sc, w * sc);
//         }
//       }
//     }
//   }

//   const drawOuterBoundary = (p5, sc = GlobalConfig.scaler) => {
//     const startX = limits[0].x * sc;
//     const endX = limits[1].x * sc;


//     const startY = limits[0].y * sc;
//     const endY = limits[2].y * sc;

//     const barW = (endX - startX);
//     const barH = (endY - startY);

//     // p5.fill(0, 180);
//     // p5.noStroke();
//     p5.noFill();
//     p5.stroke(0);
//     p5.strokeWeight(2);
//     p5.rect(startX - barW, startY, barW, barH);
//     p5.rect(endX, startY, barW, barH);

//     p5.rect(startX - barW, startY - 2000, endX - startX + 2 * barW, 2000);
//     p5.rect(startX - barW, endY, endX - startX + 2 * barW, 2000);


//     // if (shrub) {
//     //   // vert
//     //   for (let y = startY; y < endY; y += shrub.height) {
//     //     p5.image(shrub, startX-shrub.width*2, y);
//     //     p5.image(shrub, startX-shrub.width, y);
//     //     p5.image(shrub, endX, y);
//     //     p5.image(shrub, endX + shrub.width, y);
//     //   }
//     //   for (let x = startX - shrub.width; x < endX+ shrub.width; x += shrub.width) {
//     //     p5.image(shrub, x, startY-2*shrub.height);
//     //     p5.image(shrub, x, startY - shrub.height);
//     //     p5.image(shrub, x, endY);
//     //     p5.image(shrub, x, endY + shrub.height);
//     //   }
//     // }

//   }


// const drawPlants = (p5) => {
//     let sc = GlobalConfig.scaler;
//     if (palm) p5.image(palm, 0, 30 * sc, 50 * 4, 50 * 4);
//     // const w = 2 * ;

//     // for (let x = 2; x < 14; x++) {
//     //   const dx = x * GlobalConfig.scaler;
//     //   const dy = 27 * GlobalConfig.scaler;
//     //   // if (x === 10 || x === 15) p5.image(palm, dx, dy, w, w);
//     //   // else if (x == 10)
//     //   // else if (x == 14|| x==16 || x);
//     //   // else
//     //   if (grasses[2]) p5.image(grasses[2], dx, dy, w / 2, w / 2);
//     // }

//   }

//   const drawPathFrontDoor = (p5) => {
//     let { scaler } = GlobalConfig;

//     // right
//     // let x0 = 15*scaler;
//     // let y0 = 25*scaler;
//     // let h = 400;
//     // let w = 120;
//     // for (let x = x0; x < x0+w; x+= 50) {
//     //   for (let y = y0; y < y0+h; y+= 50) {
//     //     p5.fill(255);
//     //     p5.rect(x, y, 50, 50);
//     //   }
//     // }

//     // // left
//     // x0 = 12.5*scaler;
//     // for (let x = x0; x < x0+w; x+= 50) {
//     //   for (let y = y0; y < y0+h; y+= 50) {
//     //     p5.fill(255, 0, 255);
//     //     p5.rect(x, y, 50, 50);
//     //   }
//     // }

//     const points = [

//       // left
//       { x: 15 * scaler, y: 28 * scaler },
//       { x: 15 * scaler, y: 32 * scaler },
//       { x: 6.5 * scaler, y: 32 * scaler },
//       { x: -7 * scaler, y: 17 * scaler },
//       // right
//       // 12.5 = left
//       // { x: 17.5 * scaler, y: 28 * scaler },
//       // { x: 17.5 * scaler, y: 32 * scaler },

//     ]

//     p5.stroke(255, 150);
//     p5.strokeWeight(300);
//     for (let i = 0; i < points.length - 1; i++) {
//       let p0 = points[i];
//       let p1 = points[i + 1];
//       p5.line(p0.x, p0.y, p1.x, p1.y);

//     }
//   }

//   const drawStairs = (p5) => {
//     const w = 8 * GlobalConfig.scaler;
//     const h = 3 * GlobalConfig.scaler;
//     if (stairs) p5.image(stairs, 21.5 * GlobalConfig.scaler, 15 * GlobalConfig.scaler, w * 2, w * 2);
//     if (stairsBig) p5.image(stairsBig, 11 * GlobalConfig.scaler, 27 * GlobalConfig.scaler, w, h);
//   }
