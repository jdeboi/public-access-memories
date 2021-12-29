import ShadowDraggable from './Draggable/ShadowDraggable';
import { mouseToWorld } from '../../../helpers/coordinates';

export default class TrashFolder extends ShadowDraggable {

    constructor(id, x, y, w, h, p5, content, shadow, txt) {
        super(id, x, y, w, h, p5, content, shadow);
        this.txt = txt;
    }

    displayContent() {
        this.displayShadow();
        this.displaySolidBack(this.p5.color(255));
        this.p5.push();

        this.p5.translate(0, this.barH);
        if (this.content) {
            this.p5.image(this.content, 0, 0, this.w, this.h);
        }
        this.displayLabels();
        this.p5.pop();
        this.displayFrame();
    }

    // displayLabels() {
    //     this.p5.textSize(12);
    //     this.p5.fill(0);
    //     this.p5.noStroke();
    //     this.p5.push();
    //     this.p5.translate(54, 38);
    //     let dy = 40;
    //     this.p5.text(this.txt, 10, 10, this.w - 20, this.h - 20);

    //     this.p5.pop();
    // }

    checkContentsClicked = (userX, userY) => {
        if (this.closed)
            return false;
        let mouse = mouseToWorld({ x: userX, y: userY }, this.p5);
        // if (this.checkBox(mouse.x, mouse.y)) {
        //     alert("Don't dig through the trash. You're in a gallery. Geez.");
        //     return true;
        // }
        return false;
    }

    checkBox = (mx, my) => {
        return (mx > this.x && mx < this.x + this.w && my > this.y + this.barH && my < this.y + this.barH + this.h);
    }

}
