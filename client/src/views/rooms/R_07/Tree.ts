import p5Types from 'p5';

class Tree {

    p5: p5Types;
    angle = 0;
    x: number;
    y: number;

    constructor(x: number, y: number, p5: p5Types) {
        this.x = x;
        this.y = y;
        this.p5 = p5;
    }

    display(factor: number) {
        this.angle = this.p5.map(this.p5.mouseY, 0, this.p5.height, 0, this.p5.PI/8);
        
        this.p5.push();
        this.p5.translate(this.x*factor, this.y*factor);
        this.p5.stroke(120, 120, 150, 150);
        this.p5.strokeWeight(1);
        this.branch(80*factor);
        this.p5.pop();
        
    }



    branch(len: number) {
        this.p5.line(0, 0, 0, -len);
        this.p5.translate(0, -len);
        if (len > 10) {
            this.p5.push();
            this.p5.rotate(this.angle);
            this.branch(len * 0.75)
            this.p5.pop();
            this.p5.push();
            this.p5.rotate(-this.angle);
            this.branch(len * 0.75)
            this.p5.pop();
        }

    }
}

export default Tree;