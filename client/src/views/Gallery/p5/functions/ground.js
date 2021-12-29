import { GlobalConfig } from "../../../../data/GlobalConfig";
import { roomConfig } from "../../../../data/RoomConfig";
import { displayPopOut } from "./boxes";

export const displayCheckers = (numW, numH, w, h, p5) => {
    const alpha = 125;
    p5.stroke(0);
    p5.strokeWeight(1);
    for (let x = 0; x < numW; x++) {
        for (let y = 0; y < numH; y++) {
            if ((x % 2) === (y % 2)) {
                p5.fill(200, alpha);
            }
            else {
                p5.fill(255, alpha);
            }
            p5.rect(x * w, y * h, w, h);
        }
    }
}

export const diagonalCheckers = (p5) => {
    // p5.push();
    // // for (let i = 1; i < 8; i++) {
    //     p5.translate(GlobalConfig.scaler*roomConfig.w, GlobalConfig.scaler*roomConfig.w);
    //     displayCheckers(81, 81, GlobalConfig.scaler/3, GlobalConfig.scaler/3, p5);
    // // }
    // p5.pop();
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            let w = GlobalConfig.scaler * roomConfig.w;
            if (x % 2 === y % 2)
                p5.fill(0, 0, 255, 100);
            else
                p5.fill(0, 0, 255, 150);
            p5.stroke(0);
            p5.strokeWeight(1);
            p5.rect(x * w, y * w, w);
        }
    }
}

export function displayWall(p0, p1, p5) {
    const x0 = p0.x; 
    const y0 = p0.y; 
    const x1 = p1.x; 
    const y1 = p1.y;    
    let dx = x1 - x0;
    let dy = y1 - y0;
    p5.strokeWeight(1);
    const alpha = 255;
    let dl = 3;
    const numLines = 6;
    let w = dl * (numLines - 1);
    if (p5.abs(dx) > 0) {
        p5.fill(255, alpha);
        p5.noStroke();

        p5.rect(x0, y0, dx, w);
        displayPopOut(x0, y0, dx, w, p5.color(255), p5);
        p5.stroke(100);
        for (let j = 0; j < numLines; j++) {
            p5.line(x0, y0 + j * dl, x1, y1 + j * dl)
        }
        // p5.stroke(0);
        p5.fill(200);
        p5.rect(x0, y0, w, w);
        p5.rect(x1, y1, w, w);
    }
    else {
        p5.fill(255, alpha);
        p5.noStroke();
        p5.rect(x0, y0, w, dy);
        displayPopOut(x0, y0, w, dy, p5.color(255), p5);
        p5.stroke(100);

        for (let j = 0; j < numLines; j++) {
            p5.line(x0 + j * dl, y0, x1 + j * dl, y1)
        }
        // p5.stroke(0);
        p5.fill(200);
        p5.rect(x0, y0, w, w);
        p5.rect(x1, y1, w, w);
    }


    
}

export function displayCocktailFloor(p5) {
    let pts = [[6,8],[7,7],[8,6],[8,7], [8,8],[7,8]]
    p5.fill(255, 180);
    p5.stroke(0);
    const sc = roomConfig.w*GlobalConfig.scaler;
    for (const pt of pts) {
        p5.rect(pt[0]*sc, pt[1]*sc, sc, sc);
    }
    
}