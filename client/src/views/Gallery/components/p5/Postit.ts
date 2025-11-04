import { IGlobalConfig } from "../../../../interfaces";
import p5Types from "p5";
import Folder from "./Folder";
import { SindersSubmissionType } from "../../../rooms/R_06/GallerySinders";
import { mouseToWorld } from "../../../../helpers/coordinates";
import { getTagColor } from "../../../rooms/R_06/postPositionHelper";

export default class Postit extends Folder {
  public submission: SindersSubmissionType | null = null;
  public setPostOpen: (sub: null | any) => void;

  public _id: string;

  constructor(
    id: number,
    x: number,
    y: number,
    submission: SindersSubmissionType,
    p5: p5Types,
    content: p5Types.Image | null,
    GlobalConfig: IGlobalConfig,
    setPostOpen: (sub: null | any) => void
  ) {
    super(p5, id, x, y, 200, 200, "", "", content, GlobalConfig);
    this.submission = submission;
    this._id = submission._id;
    this.setPostOpen = setPostOpen;
    this.callback = () => {
      this.setPostOpen(this.submission);
    };
  }

  displayOverImage(userX?: number, userY?: number) {
    if (this.closed) return;
    if (!this.submission) return;
    const sp = 12;
    const imgSides = 20;
    const txtW = this.w - 2 * sp - imgSides;

    const { title, content, artist, tags } = this.submission;

    this.p5.push();
    //tags
    this.p5.push();
    this.p5.translate(sp + 8, -5);
    if (tags && tags.length > 0) {
      let tagY = 0;
      let tagX = 0;
      for (let i = 0; i < tags.length; i++) {
        this.displayTagLabel(tagX, tagY, tags[i]);
        tagX += this.p5.textWidth(tags[i]) + 5;
      }
    }
    this.p5.pop();

    this.p5.translate(sp, sp + 34);

    this.p5.noStroke();

    // title
    if (title) {
      const titleLen = 30;
      const choppedTitle =
        title.length > titleLen ? title.slice(0, titleLen) + "..." : title;
      this.p5.fill(0);
      this.p5.textSize(15);
      this.p5.text(choppedTitle, sp, 0, txtW, this.h - 2 * sp);
      this.p5.translate(0, 24);

      if (choppedTitle.length > 20) {
        this.p5.translate(0, 24);
      }
    }

    // artist
    if (artist) {
      this.p5.fill(0, 0, 255);
      // this.p5.textStyle(this.p5.NORMAL);

      this.p5.textSize(12);
      let maxChars = 20;
      let choppedContent =
        artist.length > maxChars ? artist.slice(0, maxChars) + "..." : artist;
      this.p5.text(choppedContent, sp, 0, txtW, this.h - 2 * sp);
      this.p5.translate(0, 24);
    }

    // content
    this.p5.fill(0);
    this.p5.textSize(10);
    const maxChars = 100;
    const choppedContent =
      content.length > maxChars ? content.slice(0, maxChars) + "..." : content;
    this.p5.text(choppedContent, sp, 0, txtW, this.h - 2 * sp - 40);
    this.p5.pop();

    // timestamp at the bottom right
    const date = new Date(this.submission.createdAt ?? 0);
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date
      .getFullYear()
      .toString()
      .slice(-2)}`;

    this.p5.push();
    this.p5.translate(this.w - sp - 50, this.h - sp - 20);
    this.p5.fill(100);
    this.p5.textSize(10);
    this.p5.textAlign(this.p5.RIGHT, this.p5.BOTTOM);
    this.p5.text(dateStr, 0, 0, 40, 10);

    let mouse = mouseToWorld(
      { x: userX || 0, y: userY || 0 },
      this.p5,
      this.GlobalConfig
    );
    if (this.checkOver(mouse.x, mouse.y)) {
      this.p5.textSize(12);
      this.p5.text("double click to open", 0, 28);

      if (this.p5.keyIsDown(this.p5.SHIFT)) {
        this.p5.text(
          `${this.p5.round(this.x)}, ${this.p5.round(this.y)}`,
          0,
          38
        );
      }
    }
    this.p5.pop();
  }

  displayTagLabel(x: number, y: number, label: string) {
    this.p5.push();
    this.p5.translate(x, y);
    this.p5.fill(getTagColor(label));
    this.p5.stroke(0);
    this.p5.strokeWeight(1);

    this.p5.textSize(10);
    const tw = this.p5.textWidth(label);
    const sp = 3;
    this.p5.rect(0, 0, tw + sp * 2, 16, 4); // background for readability
    this.p5.fill(0);

    this.p5.noStroke();
    this.p5.textAlign(this.p5.CENTER, this.p5.CENTER);
    this.p5.text(label, (tw + 7) / 2, 7);
    this.p5.pop();
  }
}
