import { mouseToWorld, p5ToWorldCoords } from '../../../../../helpers/coordinates';
import { GlobalConfig } from '../../../../../data/GlobalConfig';

export default class TreeSlider {

    constructor(x, y, w) {
        let sc = GlobalConfig.scaler;
        let pt = p5ToWorldCoords(x, y);
        this.x = pt.x;
        this.y = pt.y;
        this.w = w*sc;

        this.sliderX = this.x + this.w;
        this.r = 20;

        this.dragging = false;
        this.startDrag = {x: this.sliderX, y: this.y};
        this.startDragCoords = {x: this.sliderX, y: this.y};
    }

    getValue(p5) {
        return p5.constrain(p5.map(this.sliderX, this.x, this.x+ this.w, 0, 1), .01, 1); 
    }

    display(p5) {
        let sw = 5;
       
        // p5.push();
        // p5.translate(this.x, this.y);

        p5.strokeWeight(sw);
        p5.stroke(255, 100);
        p5.line(this.x, this.y, this.x+this.w, this.y);

        p5.noStroke();
        p5.fill(255);


        p5.ellipse(this.sliderX, this.y, this.r);
        // p5.pop();
    }

    checkDragging(userX, userY, p5) {

        let mouse = mouseToWorld({ x: userX, y: userY }, p5);
        // console.log(mx, my, userX, userY, this.x, this.y);
        if (this.over(mouse.x, mouse.y, p5)) {
            // console.log("over toolbar");
            // this.draggingOn(mx, my);
            this.dragging = true;
            this.startDrag.x = p5.mouseX;
            // this.startDrag.y = p5.mouseY;
            this.startDragCoords.x = this.sliderX;
            // this.startDragCoords.y = this.y;
            return true;
        }
        return false;
    }

    endDrag() {
        this.dragging = false;
    }

    update(p5) {
        if (this.dragging) {
            this.offsetX = p5.mouseX - this.startDrag.x;
            // this.offsetY = p5.mouseY - this.startDrag.y;

            this.sliderX = this.startDragCoords.x + this.offsetX;
            this.sliderX = p5.constrain( this.sliderX, this.x, this.x + this.w);
           
        }
    }

    over(mx, my, p5) {
        let d = p5.dist(this.sliderX, this.y, mx, my);
        return d < this.r/2;
    }
}