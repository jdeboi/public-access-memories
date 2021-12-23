export default class Button {

    constructor(x, y, p5) {
        this.r = 10;
        this.x = x;
        this.y = y;
        this.p5 = p5;
    }

    display(mx, my) {
        this.p5.stroke(255);
        this.p5.strokeWeight(2);
        this.p5.noFill();

        if (this.mouseOver(mx, my)) {
            this.p5.fill(255);
        }
        this.p5.ellipse(this.x, this.y, this.r);
    }

    mouseOver(mx, my) {
        let d = this.p5.dist(mx, my, this.x, this.y);
        return d < this.r/2;
    }


}

