import p5Types from "p5";

export default class ButtonRect {
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  p5: p5Types;
  font: p5Types.Font | null = null;
  fontSize: number = 8;

  constructor(
    label: string,
    x: number,
    y: number,
    w: number,
    h: number,
    p5: p5Types,
    font: p5Types.Font | null = null,
    fontSize: number = 8,
  ) {
    this.label = label;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.p5 = p5;
    this.font = font;
    this.fontSize = fontSize;
  }

  displayAlpha(mx: number, my: number, alphaVal: number) {
    this.p5.stroke(255, alphaVal);
    this.p5.strokeWeight(1);
    this.p5.fill(255, alphaVal);
    this.p5.stroke(0, alphaVal);

    if (this.mouseOver(mx, my)) {
      this.p5.fill(0, alphaVal);
    }
    this.p5.rect(this.x, this.y, this.w, this.h, 4);

    this.p5.noStroke();
    this.p5.fill(0, alphaVal);
    if (this.mouseOver(mx, my)) {
      this.p5.fill(255, alphaVal);
    }
    if (this.font) this.p5.textFont(this.font, this.fontSize);
    else this.p5.textFont("Arial");
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    // this.p5.textSize(12);
    this.p5.text(this.label, this.x + this.w / 2, this.y + this.h / 2);
  }

  display(mx: number, my: number) {
    this.displayAlpha(mx, my, 255);
  }

  mouseOver(mx: number, my: number) {
    return (
      mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h
    );
  }
}
