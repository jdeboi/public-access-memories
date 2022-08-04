import { GlobalConfig } from '../../../../../../data/GlobalConfig';
import Draggable from '../Draggable/Draggable';
import { numBarItems } from '../../../../../../data/BotConfig';

export default class Bar extends Draggable {

    constructor(id, {x, y, w, h, isFlipped, type}, shadow, p5) {
        super(id, x*GlobalConfig.scaler, y*GlobalConfig.scaler, w, h, p5, null);
        this.shadow = shadow;
        this.type = type;
        this.sz = 34;
        this.isFlipped = isFlipped;

        if (isFlipped) {
            let w = this.w;
            this.w = this.h;
            this.h = w;
        }
        this.img0 = null;
        this.img1 = null;
    }


    displayContent() {
        this.p5.push();


        // shadow / glow
        this.displayShadow();

        this.displaySolidBack(this.p5.color(255));
        this.p5.translate(0, this.barH);

        this.p5.push();
        // this.p5.scale(-1, 1);
        this.p5.translate(5, 40);
        this.displayBarContents();

        this.p5.pop();


        this.p5.pop();

        this.displayFrame();
    }

    displayShadow() {

        var backW = this.w * 1.25;
        var backH = this.h * 1.2;
        // if (this.isFlipped) {
        //     backW = this.w * 1.17;
        //     backH = this.h * 1.25;
        // }
        var backY = 0;

        this.p5.push();
        this.p5.translate(0, this.barH);
        this.p5.image(this.shadow, 0, backY, backW, backH);
        this.p5.pop();
    }

    displayBarContents() {
        this.p5.textFont('times');
        this.p5.textSize(34);
        this.displaySpecificBar();
    }

    displaySpecificBar() {
        this.p5.textSize(this.sz);
        if (this.img0 && this.img1) {
            if (this.isFlipped) {
                for (let i = 0; i < numBarItems; i++) {
                    this.p5.image(this.img0, i * 40 - 30, 0, this.sz, this.sz);
                    this.p5.image(this.img1, i * 40 - 30, 40, this.sz, this.sz);
                }
            }
            else {
                for (let i = 0; i < numBarItems; i++) {
                    this.p5.image(this.img0, 0, i * 40 - 30, this.sz, this.sz);
                    this.p5.image(this.img1, 40, i * 40 - 30, this.sz, this.sz);
                }
            }
        }
    }
}
