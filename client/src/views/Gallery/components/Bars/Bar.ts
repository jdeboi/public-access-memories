import p5Types from "p5"; //Import this for typechecking and intellisense

export default class Bar {

    w: number;
    h: number;
    type: string;
    x: number;
    y: number;
    p5: p5Types;

    constructor({ x, y, w, h, type }: { x: number, y: number, w: number, h: number, type: string}, p5: p5Types) {
        this.w = w;
        this.h = h;
        this.type = type;
        this.x = x;
        this.y = y;
        this.p5 = p5;
    }

    display() {
        this.p5.stroke(255);
        this.p5.fill(255);
        this.p5.rect(this.x, this.y, this.w, this.h);
    }
}

