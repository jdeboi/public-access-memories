import ShadowDraggable from './ShadowDraggable';
import p5Types from 'p5';

export default class RoomDraggable extends ShadowDraggable {


    constructor(id: number, x: number, y: number, w: number, h: number, p5: p5Types, content: p5Types.Image|null, GlobalConfig: any) {
        super(id, x, y, w, h, p5, content, GlobalConfig);
    }

    getMouse(userX: number, userY: number) {
        return { x: this.p5.mouseX, y: this.p5.mouseY }
      }

    getMouseCoords(userX: number, userY: number) {
        return  { x: this.p5.mouseX-this.x, y: this.p5.mouseY-this.y }
    }

    getMouseButtons(userX: number, userY: number) {
        return { x: this.p5.mouseX-this.x, y: this.p5.mouseY-this.y }
    }

    displayFrame() {
        this.p5.noFill();
        this.p5.stroke(0);
        this.p5.strokeWeight(2);
        this.p5.rect(0, this.barH, this.w, this.h, 0);
      }

}