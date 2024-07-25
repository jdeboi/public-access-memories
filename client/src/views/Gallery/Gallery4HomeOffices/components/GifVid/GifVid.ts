import p5Types from "p5";
import ShadowDraggable from "../../../components/p5/Draggable/ShadowDraggable";
import { GlobalConfig } from "../../../../../data/Shows/HomeOffices/GlobalConfig";

export default class GifVidDraggable extends ShadowDraggable {
  private GifVid: p5Types.MediaElement;
  private displayBack: boolean;
  private name: string;

  constructor(
    name: string,
    x: number,
    y: number,
    w: number,
    h: number,

    p5: p5Types,
    displayBack: boolean = true
  ) {
    super(0, x, y, w, h, p5, null, GlobalConfig);

    let url =
      "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/gifs/";
    this.GifVid = p5.createVideo(url + name + ".webm");

    this.name = name;
    this.GifVid.size(w, h);
    this.GifVid.volume(0);
    this.GifVid.loop();
    this.GifVid.hide();

    this.displayBack = displayBack;
  }

  displayContent(userX: number, userY: number) {
    this.p5.push();

    if (this.name == "popstar") {
      this.displayShadow();
    } else {
      if (this.displayBack) {
        this.displayShadow();
        this.displaySolidBack(this.p5.color(255));
      }
    }
    this.p5.translate(0, this.barH);
    this.p5.image(this.GifVid, 0, 0, this.w, this.h);
    this.p5.pop();

    if (this.name != "popstar") {
      this.displayFrame();
    }
  }
}
