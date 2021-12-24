import Bar from './Bar';

export default class DJBar extends Bar {

    constructor(id, { x, y, w, h, type }, shadow, p5) {
        super(id, { x, y, w, h, type }, shadow, p5);
        this.img0 = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/knobs.png");
        this.img1 = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/microphone.png");
        this.img2 = p5.loadImage("https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/speaker.png");
    }

    displaySpecificBar() {
         // let emojis = "🎛️🎛️🎚️🎚️🎤🔈";
        // this.p5.text(emojis, 0, 0);
        let y = -this.sz+1;
        let xsp = this.sz;
        this.p5.image(this.img2, 0, y, this.sz, this.sz);
        this.p5.image(this.img0, xsp, y, this.sz, this.sz);
        this.p5.image(this.img0, xsp*2, y, this.sz, this.sz);
        this.p5.image(this.img0, xsp*3, y, this.sz, this.sz);
        this.p5.image(this.img1, xsp * 4, y, this.sz, this.sz);
        this.p5.image(this.img2, xsp * 5, y, this.sz, this.sz);
    }



}
