class RectFrame {
  constructor(x, y, w, h, imgIndex) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imgIndex = imgIndex;
    this.count = 0;
  }

  displayMask(alpha, pg) {
    pg.fill(alpha);
    pg.rect(this.x, this.y, this.w, this.h);
  }

  displayFrame(p5, alphaV = 0, offsetX = 0, offsetY = 0) {
    p5.noFill();
    p5.strokeWeight(10);
    p5.stroke(0, 0, 0, 20);

    p5.rect(this.x + offsetX, this.y + offsetY, this.w, this.h);
  }

  // displayFrame(pg, offsetX = 0, offsetY = 0) {
  //   pg.noFill();
  //   pg.strokeWeight(2);
  //   pg.stroke(0);
  //   pg.rect(this.x + offsetX, this.y + offsetY, this.w, this.h);
  // }

  displayImg(pg, imgs, bg) {
    const { x, y, w, h } = bg;
    let scaleFactor = w / 1920;
    let offsetX = -x;
    let offsetY = -y;
    let newW = this.w * scaleFactor;
    let newH = this.h * scaleFactor;
    // console.log(x, y, newW, newH);

    const img = imgs[this.imgIndex];
    if (!img || img.width === 0) {
      return;
    }
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
