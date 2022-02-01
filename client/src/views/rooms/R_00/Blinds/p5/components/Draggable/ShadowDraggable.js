import Draggable from './Draggable';

export default class ShadowDraggable extends Draggable {

    constructor(id, x, y, w, h, p5, content, shadow) {
        super(id, x, y, w, h, p5, content);
        this.shadow = shadow;
    }



    displayContent(col) {
        this.displayShadow();
        super.displayContent(col);
    }

    displayShadow() {

        var backW = this.w * 1.25;
        var backH = this.h * 1.2;

        var backY = 0;

        this.p5.push();
        this.p5.translate(0, this.barH);
        this.p5.image(this.shadow, 0, backY, backW, backH);
        this.p5.pop();
    }

}
