import { IGlobalConfig } from "../../../../interfaces";
import p5Types from "p5";
import Folder from "./Folder";
import { SindersSubmissionType } from "../../../rooms/R_06/GallerySinders";

export default class Postit extends Folder {
  public submission: SindersSubmissionType | null = null;

  constructor(
    id: number,
    x: number,
    y: number,
    submission: SindersSubmissionType,
    p5: p5Types,
    content: p5Types.Image | null,
    GlobalConfig: IGlobalConfig
    // callback?: () => void
  ) {
    super(p5, id, x, y, 200, 200, "", "", content, GlobalConfig);
    this.submission = submission;
  }

  displayOverImage() {
    if (!this.submission) return;
    const sp = 15;
    const txtW = this.w - 2 * sp;

    const { title, content } = this.submission;

    this.p5.push();
    this.p5.translate(sp, sp + 40);

    this.p5.noStroke();

    // title
    this.p5.fill(255);
    this.p5.textSize(20);
    this.p5.text(title, sp, 0, txtW, this.h - 2 * sp);
    this.p5.translate(0, 30);

    // content
    this.p5.fill(0);
    this.p5.textSize(12);
    this.p5.text(content, sp, 0, txtW, this.h - 2 * sp - 40);
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
    this.p5.pop();
  }
}
