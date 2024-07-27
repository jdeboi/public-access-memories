import p5Types from "p5";
import ShadowDraggable from "../../../components/p5/Draggable/ShadowDraggable";
import { GlobalConfig } from "../../../../../data/Shows/HomeOffices/GlobalConfig";

export default class Clock extends ShadowDraggable {
  private cx: number;
  private cy: number;
  private radius: number;
  private clockDiameter: number;
  private clockVid: p5Types.MediaElement;
  public isPlaying: boolean;

  constructor(x: number, y: number, radius: number, p5: p5Types) {
    super(0, x, y, radius * 2, radius * 2, p5, null, GlobalConfig);

    this.radius = radius;
    this.clockDiameter = radius * 1.8;

    this.cx = x + radius;
    this.cy = y + radius;

    this.isPlaying = false;

    this.clockVid = p5.createVideo(
      "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/gifs/clock.webm"
    );
    this.clockVid.size(250, 250);
    this.clockVid.volume(0);
    this.hasVideo = true;
    this.clockVid.hide();
  }

  drawClock() {
    this.p5.noFill();
    this.p5.strokeWeight(8);
    this.p5.ellipse(this.cx, this.cy, this.clockDiameter, this.clockDiameter);

    const s = this.p5.map(
      this.p5.millis() % 10000,
      0,
      10000,
      0,
      this.p5.TWO_PI
    );
    const m = this.p5.map(
      this.p5.millis() % (10 * 60 * 1000),
      0,
      10 * 60 * 1000,
      0,
      this.p5.TWO_PI
    );
    const h = this.p5.map(
      this.p5.millis() % (10 * 60 * 60 * 1000),
      0,
      10 * 60 * 60 * 1000,
      0,
      this.p5.TWO_PI
    );

    this.p5.strokeWeight(4);
    this.drawHand(s, this.clockDiameter / 2, this.p5.color(255, 0, 0));
    this.drawHand(m, this.clockDiameter / 3, this.p5.color(0, 255, 0));
    this.drawHand(h, this.clockDiameter / 4, this.p5.color(0, 0, 255));
  }

  private drawHand(angle: number, length: number, col: p5Types.Color) {
    // this.p5.stroke(col);
    this.p5.stroke(0);
    this.p5.line(
      this.cx,
      this.cy,
      this.cx + this.p5.cos(angle - this.p5.HALF_PI) * length,
      this.cy + this.p5.sin(angle - this.p5.HALF_PI) * length
    );
  }

  displayContent(userX: number, userY: number) {
    // this.p5.fill(255);
    this.displayShadow();
    this.displaySolidBack(this.p5.color(255));
    this.p5.push();
    this.p5.translate(0, this.barH);
    // this.drawClock();
    this.p5.image(this.clockVid, 0, 0, this.w, this.h);
    this.p5.pop();
    this.displayFrame();
  }

  getIsPlaying() {
    let video = this.clockVid.elt;
    let isPlaying =
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > video.HAVE_CURRENT_DATA;

    return isPlaying;
  }

  setVideoPlay(userRoom: number) {
    if (userRoom == this.roomToDisplay) {
      if (!this.getIsPlaying()) {
        this.isPlaying = true;
        this.clockVid.play();
        this.clockVid.loop();
        // console.log("playing video");
      }
    } else {
      if (this.getIsPlaying()) {
        this.isPlaying = false;
        this.clockVid.pause();
        // console.log("pausing video");
      }
    }
  }
}
