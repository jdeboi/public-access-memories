import p5Types from "p5";
import { GlobalConfig } from "../../../../../data/Shows/HomeOffices/GlobalConfig";
import GifVidDraggable from "./GifVid";

export default class Candle extends GifVidDraggable {
  static candleImg: p5Types.MediaElement;
  static isGlobalPlaying: boolean;
  private userX: number;
  private userY: number;

  constructor(
    id: number,
    x: number,
    y: number,
    w: number,
    h: number,

    p5: p5Types
  ) {
    super("", x, y, w, h, p5);
    this.id = id;
    if (Candle.candleImg == null) {
      const url =
        "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/gifs/candlelit.webm";

      Candle.candleImg = p5.createVideo(url);
      Candle.candleImg.size(w, h);
      Candle.candleImg.volume(0);
      Candle.candleImg.hide();
      Candle.isGlobalPlaying = false;
    }
    this.GifVid = Candle.candleImg;
    this.userX = 0;
    this.userY = 0;
  }

  getIsPlaying() {
    if (this.id != 0) {
      return false;
    }
    let video = Candle.candleImg.elt;
    let isPlaying =
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > video.HAVE_CURRENT_DATA;

    return isPlaying;
  }

  setVideoPlay(userRoom: number) {
    if (this.id != 0) {
      return;
    }

    if (userRoom == this.roomToDisplay) {
      if (!this.getIsPlaying() && !Candle.isGlobalPlaying) {
        Candle.isGlobalPlaying = true;
        Candle.candleImg.play();
        Candle.candleImg.loop();
        // console.log("playing video");
      }
      // else if (this.getIsPlaying() && Candle.isGlobalPlaying) {
      //   if (!this.isNearUser()) {
      //     if (Candle.candleImg)
      //   }
      //   else {

      //   }
      // }
    } else {
      if (this.getIsPlaying() && this.isPlaying) {
        this.isPlaying = false;
        Candle.candleImg.pause();
        // console.log("pausing video");
      }
    }
  }

  isNearUser() {
    let dist = this.p5.dist(this.userX, this.userY, this.x, this.y);
    if (dist < 200) {
      return true;
    } else {
      return false;
    }
  }

  displayContent(userX: number, userY: number) {
    this.userX = userX;
    this.userY = userY;

    this.p5.push();

    this.displaySolidBack(this.p5.color(0));
    this.displayShadow();

    this.p5.translate(0, this.barH);
    this.p5.image(Candle.candleImg, 0, 0, this.w, this.h - 5);
    this.p5.pop();

    this.displayFrame();
  }
}
