import Draggable from './Draggable/Draggable';

export default class Tree extends Draggable {

    constructor(id, x, y, w, h, p5, content) {
        super(id, x, y, w, h, p5, content);
    }


    display(userX, userY, sz) {
        this.p5.push();
        this.p5.translate(this.x, this.y);
        if (!this.closed) {
          if (!this.minimized) this.displayContent(userX, userY, sz);
        }
        this.p5.pop();
      }

    displayContent(userX, userY, sz) {
        // this.p5.fill(255);
        this.p5.push();

        this.p5.translate(0, this.barH);

        let w = this.w*sz;
        let h = this.h*sz;
        this.p5.image(this.content, (this.w - w)/2, this.h - h, w, h);
        this.p5.pop();
        this.displayFrame();
    }


}
