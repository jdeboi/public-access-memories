import p5Types from "p5";
import ShadowDraggable from "../../../components/p5/Draggable/ShadowDraggable";
import { GlobalConfig } from "../../../../../data/Shows/HomeOffices/GlobalConfig";

export default class GifVidDraggable extends ShadowDraggable {
  public GifVid: p5Types.MediaElement | null;
  private displayBack: boolean;
  private name: string;
  public isPlaying: boolean;

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
    this.name = name;
    if (this.name != "") {
      let url =
        "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/gifs/";
      this.GifVid = p5.createVideo(url + name + ".webm");

      this.name = name;
      this.GifVid.size(w, h);
      this.GifVid.volume(0);

      this.GifVid.hide();
    } else {
      this.GifVid = null;
    }

    this.displayBack = displayBack;
    this.isPlaying = false;
    this.hasVideo = true;
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
    if (this.GifVid) {
      this.p5.image(this.GifVid, 0, 0, this.w, this.h);
    }
    this.p5.pop();

    if (this.name != "popstar") {
      this.displayFrame();
    }
  }

  getIsPlaying() {
    if (this.GifVid == null) {
      return;
    }
    let video = this.GifVid.elt;
    let isPlaying =
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > video.HAVE_CURRENT_DATA;

    return isPlaying;
  }

  setVideoPlay(userRoom: number) {
    if (this.GifVid == null) {
      return;
    }
    if (userRoom == this.roomToDisplay) {
      if (!this.getIsPlaying() && !this.isPlaying) {
        this.isPlaying = true;
        this.GifVid.play();
        this.GifVid.loop();
        // console.log("playing video");
      }
    } else {
      if (this.getIsPlaying() && this.isPlaying) {
        this.isPlaying = false;
        this.GifVid.pause();
        // console.log("pausing video");
      }
    }
  }
}
