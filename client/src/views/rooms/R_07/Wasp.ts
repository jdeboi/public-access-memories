import p5Types from 'p5';

class Wasp {

    x: number;
    y: number;
    img: p5Types.Image;
    p5: p5Types;
    rot: number;
    factor = 1;
    rotFactor : number;

    constructor(img: p5Types.Image, p5: p5Types) {
        this.x = p5.random(0, p5.width);
        this.y = p5.random(0, p5.height);
        this.img = img;
        this.p5 = p5;

        this.rot = p5.random(2 * 3.14);
        this.factor = p5.random(.5, 1);
        this.rotFactor = p5.random(-.01, .01);
    }

    display() {
        this.update();

        this.p5.push();
        this.p5.translate(this.x, this.y);
        this.p5.rotate(this.rot);
        // 100 * this.p5.sin(this.p5.millis() / (1000*this.factor))
        this.p5.image(this.img, 0, 0, this.img.width*this.factor, this.img.height*this.factor);
        this.p5.pop();
    }

    update() {
        this.rot += this.rotFactor;

        this.x = this.p5.map(this.p5.noise(this.factor*100, this.p5.millis()/(8000*this.factor)), 0, 1, -this.p5.width*.2, this.p5.width*1.2);
        this.y = this.p5.map(this.p5.noise(this.factor*400, this.p5.millis()/(5000*this.factor)), 0, 1, -this.p5.height*.2, this.p5.height*1.2);

    }


}

export default Wasp;