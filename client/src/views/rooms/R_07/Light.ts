import p5Types from 'p5';

class Light {

    x: number;
    y: number;
    img: p5Types.Image;
    p5: p5Types;
    factor = 1;
    startC: number;

    constructor(x: number, y: number, img: p5Types.Image, p5: p5Types) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.p5 = p5;
        this.startC = p5.floor(p5.random(0, 60*4));
    }

    display(factor: number) {
        // this.update();

        this.p5.push();
        this.p5.translate(this.x*factor, this.y*factor);
        if ((this.p5.frameCount + this.startC) % (60*4) < 60*2) {
            this.p5.image(this.img, 0, 0, this.img.width, this.img.height);

        }
        this.p5.pop();
    }

    update() {

    }


}

export default Light;