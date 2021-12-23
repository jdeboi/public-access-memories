export default class ButtonSq {

    constructor(x, y, r, p5) {
        this.r = r;
        this.x = x;
        this.y = y;
        this.p5 = p5;
    }

    display(isChecked, mx, my) {
        this.p5.push();
        this.p5.translate(this.x, this.y);
        this.p5.noFill();

        // if (this.mouseOver(mx, my)) {
        //     this.p5.fill(255, 0, 0);
        // }
        // else 
        if (isChecked) {
            this.p5.noStroke();
            this.p5.fill('#026ef0');
        }
        else {
            this.p5.stroke(0, 100);
            this.p5.strokeWeight(1);
            this.p5.fill(255);
        }

        this.p5.rect(0, 0, this.r, this.r, 2, 2);

        // check
        if (isChecked) {
            this.p5.stroke(255);
            this.p5.strokeWeight(2.5);
            let x0 = 4.5;
            let y0 = this.r - 6.5;
            let x1 = x0 + 2;
            let y1 = y0 + 2.5;
            let x2 = x1 + 4.5;
            let y2 = y1 - 7;
            this.p5.line(x0, y0, x1, y1);
            this.p5.line(x1, y1, x2, y2);
        }
        this.p5.pop();
    }

    mouseOver(mx, my) {
        return (mx > this.x && mx < this.x + this.r && my > this.y && my < this.y + this.r)
    }


}

