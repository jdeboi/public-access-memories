import Draggable from "../../../components/p5/Draggable/Draggable";
import { GlobalConfig } from "../../../../../data/Shows/HomeOffices/GlobalConfig";
import Folder from "../../../components/p5/Folder";
import p5Types from "p5";

export default class JulyFolder extends Folder {
  static julyImgs: p5Types.Image[] = [];

  constructor(
    p5: p5Types,
    id: number,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    link: string
  ) {
    super(p5, id, x, y, w, h, label, link, null, GlobalConfig);

    if (JulyFolder.julyImgs.length == 0) {
      const url =
        "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/gifs/calendar/";

      JulyFolder.julyImgs = [];
      JulyFolder.julyImgs[0] = p5.loadImage(url + "0.jpg");
      JulyFolder.julyImgs[1] = p5.loadImage(url + "1.jpg");
      JulyFolder.julyImgs[2] = p5.loadImage(url + "2.jpg");
      JulyFolder.julyImgs[3] = p5.loadImage(url + "3.jpg");
    }
  }

  display() {
    let currentIndex = Math.floor(this.p5.millis() / 8000) % 4;
    if (JulyFolder.julyImgs && JulyFolder.julyImgs[currentIndex]) {
      const currentImg = JulyFolder.julyImgs[currentIndex];
      this.p5.push();
      this.p5.translate(this.x, this.y);
      this.p5.image(currentImg, 0, 0, this.w, this.h);
      this.drawLabel();
      this.p5.pop();
    }
  }
}
