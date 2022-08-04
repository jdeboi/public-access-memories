import p5Types from 'p5';

export default class FloppyButton {

    w: number;
    h: number;
    x: number;
    y: number;
    r: number;
    p5: p5Types;

    constructor(x: number, y: number, w: number, h: number, p5: p5Types) {
        this.w = w;
        this.h = h;
        this.r = 5;
        this.x = x;
        this.y = y;
        this.p5 = p5;
    }

    display(mx: number, my: number) {

        this.p5.stroke(0);
        this.p5.strokeWeight(2);
        this.p5.fill(0);

        if (this.mouseOver(mx, my)) {
            this.p5.fill(255, 50);
        }
       
        this.p5.rect(this.x, this.y, this.w, this.h, this.r);

        this.p5.fill(255);
        this.p5.noStroke();
        let t = "GO to room";
        this.p5.text(t, (this.w-this.p5.textWidth(t))/2, this.y+20);
    }

    mouseOver(mx: number, my: number) {
        if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h)
            return true;
    }


}

