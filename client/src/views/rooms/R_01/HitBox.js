export default class HitBox {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(p5, x, y) {
    if (this.isUserOver(x, y)) {
      p5.fill(255, 0, 0, 100); // Red with transparency
    } else {
      p5.fill(0, 255, 0, 100); // Green with transparency
    }
    p5.rect(this.x, this.y, this.width, this.height);
  }

  isUserOver(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }

  isMouseOver(p5) {
    return (
      p5.mouseX > this.x &&
      p5.mouseX < this.x + this.width &&
      p5.mouseY > this.y &&
      p5.mouseY < this.y + this.height
    );
  }
}
