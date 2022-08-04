import ShadowDraggable from '../../../Gallery1/p5/components/Draggable/ShadowDraggable';
import p5Types from 'p5';
import { factory } from 'typescript';

export default class HardDrive extends ShadowDraggable {

    drive: p5Types.Image;
    needle: p5Types.Image;
    // hub: p5Types.Image;

    constructor(id: number, x: number, y: number, w: number, h: number, p5: p5Types) {

        super(id, x, y, w, h, p5, null);
        this.drive = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/gallery/drive.png");
        this.needle = p5.loadImage("https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/gallery/needle.png");
    }



    displayContent() {
        this.displayShadow();
        this.displaySolidBack(this.p5.color(0));
        this.p5.push();
        this.p5.translate(this.w / 2, this.h / 2);

        this.p5.translate(0, 15);
        this.p5.image(this.drive, -this.w / 2, -this.h / 2, this.w, this.h);

        this.p5.push();
        this.p5.translate(0, -28);
        
        const factor = .5;
        const whub = 70; //this.hub.width*factor;
        // const hhub = this.hub.height*factor;
        // this.p5.image(this.hub, -whub/2, -hhub/2, whub, hhub);

        this.p5.strokeWeight(1);
        this.p5.noFill();
        this.p5.stroke(100);
        this.p5.ellipse(0, 0, whub);

        this.p5.rotate(this.p5.millis() / 50);
        for (let i = 0; i < 4; i++) {
            this.p5.rotate(this.p5.radians(90));
            this.p5.fill(100);
            this.p5.noStroke();
            this.p5.ellipse(0, whub/4, 8);
        }
        this.p5.pop();

        this.p5.push();
        this.p5.translate(-45, 90);
        this.p5.rotate(.06+.2*this.p5.sin(this.p5.millis() / 200));
        const wn = this.needle.width*factor;
        const hn = this.needle.height*factor;
        this.p5.image(this.needle, -wn*.3, -hn*.8, wn, hn);
        this.p5.pop();

        this.p5.pop();
        this.displayFrame();
    }



}
