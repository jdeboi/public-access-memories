import Table from "./Table";

export default class WaterCooler extends Table {
  constructor(id, x, y, p5, img, GlobalConfig) {
    super(id, x, y, 180 / 3, 750 / 3, p5, img, null, GlobalConfig);
  }

  displayContent(userX, userY) {
    this.p5.push();
    // this.p5.translate(this.origin.x, this.origin.y);
    this.p5.translate(0, this.barH);

    this.p5.image(this.content, 0, 0, this.w, this.h);

    if (this.button.isOn) {
      this.p5.push();
      this.p5.translate(37, 128);
      this.p5.strokeWeight(5);
      for (let i = 0; i < 8; i++) {
        const alphaVal = this.p5.map(i, 0, 7, 70, 0);
        this.p5.fill(0, 5, 255, alphaVal);
        this.p5.noStroke();
        // this.p5.stroke(0, 100, 255, 120);

        this.p5.rect(0, 0, 2, 3);
        this.p5.translate(0, 3);
      }
      this.p5.pop();
    }

    this.p5.pop();
    this.displayButton(userX, userY);
  }

  // userIsNearby(userX, userY) {
  //   const distance = this.p5.dist(userX, userY, this.origin.x, this.origin.y);
  //   return distance < this.w / 2;
  // }
}
