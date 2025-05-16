export default class HitBox {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
  }

  draw(p, x, y, img) {
    if (this.isUserOver(x, y)) {
      p.image(this.img, this.x, this.y, this.width, this.height); // txt img drawn
    }
  }

  isUserOver(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }

  isMouseOver(p) {
    return (
      p.mouseX > this.x &&
      p.mouseX < this.x + this.width &&
      p.mouseY > this.y &&
      p.mouseY < this.y + this.height
    );
  }
}
