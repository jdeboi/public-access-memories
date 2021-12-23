export default class ButtonTog {

    constructor(x, y, w, h, p5) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.p5 = p5;
        this.r = this.h/2;
    }

    display(isChecked, mx, my) {
        this.p5.push();
        this.p5.translate(this.x, this.y);
        this.p5.noFill();


        if (isChecked) {
            this.p5.strokeWeight(2);
            this.p5.stroke(255);
            this.p5.fill('#026ef0');
            this.p5.rect(0, 0, this.w, this.h, this.r, this.r);


            this.p5.fill(255);
            this.p5.ellipse(this.w - this.r, this.h / 2, this.r * 2);

        }
        else {
            this.p5.strokeWeight(2);
            this.p5.stroke(255);

            // if (this.mouseOver(mx, my))
            //     this.p5.fill(100);
            // else
                this.p5.fill(0); 

            this.p5.rect(0, 0, this.w, this.h, this.r, this.r);


            this.p5.fill(255);
            this.p5.ellipse(this.r, this.h / 2, this.r * 2);
        }

        this.p5.pop();
    }

    mouseOver(mx, my) {
        if (this.mouseOverEdge(mx, my, this.x + this.r, this.y + this.r, this.r))
            return true;
        if (this.mouseOverEdge(mx, my, this.x + this.w - this.r, this.y + this.r, this.r))
            return true;
        return (mx > this.x + this.r && mx < this.x + this.w - 2 * this.r && my > this.y && my < this.y + this.h);
    }

    mouseOverEdge(mx, my, x, y, r) {
        let d = this.p5.dist(mx, my, x, y);
        return d < r;
    }

}

