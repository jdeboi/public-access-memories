import Bar from './Bar';

export default class CheeseBar extends Bar {

    constructor(id, { x, y, w, h, type }, shadow, p5) {
        super(id, { x, y, w, h, type }, shadow, p5);
        this.img0 = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/bread.png");
        this.img1 = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/cheese.png");
    }

    displaySpecificBar() {
        this.p5.textSize(this.sz);
        if (this.img0 && this.img1) {
            for (let i = 0; i < 6; i++) {
                this.p5.image(this.img0, 0, i * 40 - 30, this.sz, this.sz);
                this.p5.image(this.img1, 40, i * 40 - 30, this.sz, this.sz);
            }
        }
    }

}
