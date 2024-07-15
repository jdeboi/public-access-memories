class RectFrame {
  constructor(x, y, w, h, imgIndex) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imgIndex = imgIndex;
    this.count = 0;
  }

  // displayMask(alpha, pg) {
  //   pg.fill(alpha);
  //   pg.rect(this.x, this.y, this.w, this.h);
  // }

  displayFrame(p5) {
    p5.noFill();
    p5.strokeWeight(10);
    p5.stroke(0, 0, 0, 20);
    p5.rect(this.x, this.y, this.w, this.h);
  }

  displayImg(pg, imgs, bg) {
    const img = imgs[this.imgIndex];
    if (!img || img.width === 0) {
      return;
    }

    const { x, y, w, h } = bg;
    let scaleFactor = w / 1920;
    let dy = pg.height - h;
    let destinationX = this.x;
    let destinationY = this.y;
    let destinationW = this.w;
    let destinationH = this.h;
    let sourceX = (this.x - x) / scaleFactor; //this.x / scaleFactor - x / scaleFactor;
    let sourceY = (this.y - y) / scaleFactor; //(this.y - y) / scaleFactor;
    let sourceW = this.w / scaleFactor;
    let sourceH = this.h / scaleFactor;

    pg.image(
      img,
      destinationX,
      destinationY,
      destinationW,
      destinationH,
      sourceX,
      sourceY,
      sourceW,
      sourceH
    ); // Copy a portion of the image
  }

  isOver(p5) {
    return (
      p5.mouseX > this.x &&
      p5.mouseX < this.x + this.w &&
      p5.mouseY > this.y &&
      p5.mouseY < this.y + this.h
    );
  }

  incrementCount() {
    this.count++;
    if (this.count > 3) this.count = 3;
  }

  displayCount(pg) {
    let offset = 20;
    for (let i = 0; this.count; i++) {
      this.displayImg(pg, offset * i, offset * i);
    }
  }
}

export default RectFrame;
