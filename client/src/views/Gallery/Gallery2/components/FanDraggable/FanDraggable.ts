import { GlobalConfig } from '../../../../../data/AsIRecall/GlobalConfig';
import ShadowDraggable from '../../../components/p5/Draggable/ShadowDraggable';
import p5Types from 'p5';

export default class FanDraggable extends ShadowDraggable {

    fan: p5Types.Image;
    blades: p5Types.Image;

    constructor(id: number, x: number, y: number, w: number, h: number, p5: p5Types) {

        super(id, x, y, w, h, p5, null, GlobalConfig);
        this.fan = p5.loadImage("https://netscapes.s3.us-east-2.amazonaws.com/infrastructure/fan.png");
        this.blades = p5.loadImage("https://netscapes.s3.us-east-2.amazonaws.com/infrastructure/blades.png");
    }



    displayContent() {
        this.displayShadow();
        this.displaySolidBack(this.p5.color(0));
        this.p5.push();
        this.p5.translate(this.w / 2, this.h / 2);

        this.p5.translate(0, 25);
        this.p5.image(this.fan, -this.w / 2, -this.h / 2, this.w, this.h);

        this.p5.push();
        this.p5.rotate(this.p5.millis() / 300);
        this.p5.image(this.blades, -this.w / 2, -this.h / 2, this.w, this.h);
        this.p5.pop();

        this.p5.pop();
        this.displayFrame();
    }



}
