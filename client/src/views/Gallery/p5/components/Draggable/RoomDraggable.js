import ShadowDraggable from './ShadowDraggable';

export default class RoomDraggable extends ShadowDraggable {

    constructor(id, x, y, w, h, p5, content, shadow) {
        super(id, x, y, w, h, p5, content, shadow);
    }

    getMouse(userX, userY) {
        return { x: this.p5.mouseX, y: this.p5.mouseY }
      }

    getMouseCoords(userX, userY) {
        return  { x: this.p5.mouseX-this.x, y: this.p5.mouseY-this.y }
    }

    getMouseButtons(userX, userY) {
        return { x: this.p5.mouseX-this.x, y: this.p5.mouseY-this.y }
    }

    displayFrame() {
        this.p5.noFill();
        this.p5.stroke(0);
        this.p5.strokeWeight(2);
        this.p5.rect(0, this.barH, this.w, this.h, 0);
      }

}