import p5Types from 'p5';
import { GlobalConfig } from "../../../../data/CurrentShow/GlobalConfig";
import { danceFloor } from "../../../../data/CurrentShow/BotConfig";
import { displayPopOut } from '../../Gallery1/functions/boxes';
import { displayWall } from "../../Gallery1/functions/ground";




export default class DanceFloor {
    p5: p5Types;

    constructor(p5: p5Types) {
        this.p5 = p5;
    }

    display() {
        const { x, y } = danceFloor;
        this.p5.push();
        this.p5.translate(x, y);
        this.displayDanceFloor();
        this.displayWalls();
        this.p5.pop();
    }

    displayStage() {
        const sc = GlobalConfig.scaler;
        displayPopOut(1 * sc, 1 * sc, 3 * sc, 3 * sc, this.p5.color(255), this.p5);
    }

    displayWalls() {
        const { w, h } = danceFloor;
        displayWall({ x: 0, y: 0 }, { x: w, y: 0 }, this.p5);
        displayWall({ x: w, y: 0 }, { x: w, y: h }, this.p5);
        displayWall({ x: w, y: h }, { x: 0, y: h }, this.p5);
        displayWall({ x: 0, y: h }, { x: 0, y: 0 }, this.p5);
    }

    displayGround() {
        const { w, h } = danceFloor;
        this.p5.fill(0, 100);
        this.p5.noStroke();
        this.p5.rect(0, 0, w, h);
    }


    displayDanceFloor = () => {
        let sc = GlobalConfig.scaler;
        let spacing = GlobalConfig.scaler;
        let w = danceFloor.w - GlobalConfig.scaler*2;
        let h = danceFloor.h - GlobalConfig.scaler*2;

        this.p5.push();
        this.p5.translate(GlobalConfig.scaler, GlobalConfig.scaler);
        this.p5.noStroke();
        let alpha = this.p5.map(Math.sin(this.p5.frameCount / 20), -1, 1, 150, 255);
        this.p5.fill(255, alpha);
        for (let x = 0; x < w; x += spacing) {
            for (let y = 0; y < h; y += spacing) {
                const rw = GlobalConfig.scaler -20;
                this.p5.rect(x+20, y+20, rw, rw);
            }
        }
        this.p5.pop();
    }

}