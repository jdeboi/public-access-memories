import p5Types from 'p5';

class Light {

    id: number;
    x: number;
    y: number;
    img: p5Types.Image;
    p5: p5Types;
    factor = 1;
    startC: number;

    constructor(id: number, x: number, y: number, img: p5Types.Image, p5: p5Types) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.img = img;
        this.p5 = p5;
        this.startC = p5.floor(p5.random(0, 60 * 4));
    }

    display(factor: number) {
        // this.update();

        this.p5.push();
        this.p5.translate(this.x * factor, this.y * factor);
        // const ff = 1; //this.p5.map(factor, 0, 1, 0, 2);
        // if ((this.p5.frameCount + this.startC) % (60*4) < 60*2) {
        //     this.p5.image(this.img, 0, 0, this.img.width*ff, this.img.height*ff);

        // }
        this.blink(factor);
        this.p5.pop();
    }

    update() {

    }

    blink(factor: number) {
        let alpha = this.p5.map(this.p5.sin(this.p5.millis() / 600), -1, 1, 80, 205);
        alpha = this.p5.constrain(alpha, 0, 255);
        this.p5.noStroke();
        let numR = 5;
        for (let i = 0; i < numR; i++) {
            this.p5.fill(210, 210, 150 + 10 * i, i / (numR - 1) * alpha);
            if (this.id == 0)
                this.p5.arc(0, 0, (numR - i) / (numR) * 26 * factor, (numR - i) / (numR) * 20 * factor, -this.p5.PI / 2, this.p5.PI / 2);
            else
                this.p5.ellipse(0, 0, (numR - i) / (numR) * 26 * factor, (numR - i) / (numR) * 20 * factor);

        }
        // this.p5.erase(255);
        // this.p5.rect(0, 0, 10*factor, 20*factor);
        // this.p5.noErase();

    }


}

export default Light;