import Bar from "./Bar";

export default class SnackBar extends Bar {
  constructor(id, { x, y, w, h, type }, shadow, numBarItems, p5, GlobalConfig) {
    super(id, { x, y, w, h, type }, shadow, numBarItems, p5, GlobalConfig);

    this.img0 = p5.loadImage(
      "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/cookie.png"
    );
    this.img1 = p5.loadImage(
      "https://lmd-bucket.s3.us-east-2.amazonaws.com/sketches/gallery/emojis/popcorn.png"
    );
  }
}
