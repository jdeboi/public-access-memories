import p5Types from 'p5';
import { GlobalConfig } from "../../../data/GlobalConfig";
import { roomConfig } from "../../../data/RoomConfig";
import { displayPopOut } from '../p5/functions/boxes';
import { displayWall } from "../p5/functions/ground";




const x = -5 * GlobalConfig.scaler;
const y = -5 * GlobalConfig.scaler;
const w = 3 * roomConfig.w * GlobalConfig.scaler;
const h = 5 * roomConfig.w * GlobalConfig.scaler;

export default class Auditorium {
    p5: p5Types;

    constructor(p5: p5Types) {
        this.p5 = p5;
    }

    display() {
        this.p5.push();
        this.p5.translate(x, y);
        this.displayGround();
        this.displayWalls();
        this.p5.pop();
    }

    displayStage() {
        const sc = GlobalConfig.scaler;
        displayPopOut(1 * sc, 1 * sc, 3 * sc, 3 * sc, this.p5.color(255), this.p5);
    }

    displayWalls() {
        displayWall({ x: 0, y: 0 }, { x: w, y: 0 }, this.p5);
        displayWall({ x: w, y }, { x: w, y: h }, this.p5);
        displayWall({ x: w, y: h }, { x, y: h }, this.p5);
        displayWall({ x: 0, y: h }, { x: 0, y: 0 }, this.p5);
    }

    displayGround() {
        this.p5.fill(0, 100);
        this.p5.noStroke();
        this.p5.rect(0, 0, w, h);
    }
}