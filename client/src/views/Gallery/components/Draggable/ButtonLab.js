export default class ButtonLab {

    constructor(x, y, w, h, lab, p5) {
        this.r = 8;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.p5 = p5;
        this.lab = lab;
    }

    display(mx, my) {
        let xLab = this.x + this.w/2 - this.p5.textWidth(this.lab)/2;
        let yLab = this.y+14;
        if (this.mouseOver(mx, my)) {
            this.p5.stroke(0);
            this.p5.strokeWeight(2);
            this.p5.fill(255);
            this.p5.rect(this.x, this.y, this.w, this.h, this.r, this.r);
           
            this.p5.noStroke();
            this.p5.fill(0);
            this.p5.text(this.lab, xLab, yLab);
        }
        
        else {
            this.p5.stroke(0);
            this.p5.strokeWeight(2);
            this.p5.fill(0);
            this.p5.rect(this.x, this.y, this.w, this.h, this.r, this.r);
           
            this.p5.noStroke();
            this.p5.fill(255);
            this.p5.text(this.lab, xLab, yLab);
        }
        

    }

    mouseOver(mx, my) {
        return (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h)
    }


}

