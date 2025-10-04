import { getLimits } from "../../../helpers/helpers";
import { initOuterWalls } from "../../Gallery/Gallery1/functions/building";
import { displayFolderDivs } from "../../Gallery/Gallery1/functions/divs";
import {
  GallerySketch1Props,
  GallerySketchTemplate1,
} from "../../Gallery/Gallery1/GallerySketchTemplate1";

import p5Types from "p5";
import Folder from "../../Gallery/components/p5/Folder";
import Postit from "../../Gallery/components/p5/Postit";
import { initTrashSinders } from "./functions";

interface GallerySindersSketchProps extends GallerySketch1Props {
  showSubmissionForm: () => void;
  submissions: any[];
}

export default class GallerySindersSketch extends GallerySketchTemplate1<GallerySindersSketchProps> {
  public postItImg: p5Types.Image | null = null;
  private p5Ref: p5Types | null = null;
  private lastSubsSig = "";

  constructor(props: GallerySindersSketchProps) {
    super(props);
    this.initWorld();
  }

  preloadContent = (p5: p5Types) => {
    this.postItImg = p5.loadImage(this.pamURL + "debox/sinders/postit1.webp");
  };

  initWorld = () => {
    this.galleryId = 7;
    const worldW = 20;
    const worldH = 20;
    this.GlobalConfig = { x: -5, y: -5, scaler: 70, worldW, worldH };
    this.limits = getLimits(0, worldW, 0, worldH);
  };

  initDivs = (p5: p5Types) => {
    if (!this.instaImg || !this.txtFile || !this.GlobalConfig) return;
    this.p5Ref = p5;
    this.initPostits(p5);
    this.lastSubsSig = this.submissionsSig(this.props.submissions);
  };

  componentDidUpdate(prevProps: GallerySindersSketchProps) {
    if (prevProps.submissions !== this.props.submissions) {
      const nextSig = this.submissionsSig(this.props.submissions);
      if (nextSig !== this.lastSubsSig && this.p5Ref) {
        this.initPostits(this.p5Ref);
        this.lastSubsSig = nextSig;
        // If draw loop is paused:
        // this.p5Ref.redraw();
      }
    }
  }

  private submissionsSig(subs: any[]) {
    const ids = subs.map((s) => s._id ?? s.id ?? s.title ?? "").join("|");
    return `${subs.length}#${ids}`;
  }

  initPostits = (p5: p5Types) => {
    this.divs.folders = [];
    for (let i = 0; i < this.props.submissions.length; i++) {
      const submission = this.props.submissions[i];
      const { x, y } = stableGridXY(submission); // replaces your i-based layout

      if (!this.postItImg || !this.GlobalConfig) continue;
      let postit = new Postit(
        i,
        x,
        y,
        submission,
        p5,
        this.postItImg,
        this.GlobalConfig
      );
      this.divs.folders.push(postit);
    }

    const submissionTxt = new Folder(
      p5,
      0,
      100,
      100,
      80,
      80,
      "Form",
      "",
      this.txtFile,
      this.GlobalConfig,
      this.props.showSubmissionForm
    );
    this.divs.folders.push(submissionTxt);
    initTrashSinders(
      p5,
      this.lightImgs,
      this.trashFiles[4],
      this.divs,
      this.GlobalConfig,
      () => {}
    );
  };

  initBuilding = (p5: p5Types) => {
    initOuterWalls(p5, this.walls, this.limits, this.GlobalConfig);
  };

  displayBackground = (p5: p5Types) => {
    // p5.background(255);
  };

  displayScene = (p5: p5Types) => {};

  displayDivs = (p5: p5Types) => {
    if (this.font) p5.textFont(this.font, 14);
    displayFolderDivs(this.divs);

    if (this.divs.trashFolders && this.divs.trashCans) {
      for (const folder of this.divs.trashFolders) {
        folder.display(this.userEase.x, this.userEase.y);
        folder.displayToolBar(this.userEase.x, this.userEase.y);
      }
      for (const trash of this.divs.trashCans) {
        trash.display(this.userEase.x, this.userEase.y);
      }
    }
  };
}

function hashFNV1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0; // unsigned
}

function stableGridXY(
  sub: any,
  gridCols = 3,
  gridRows = 3,
  cellW = 200,
  cellH = 200,
  marginX = 20,
  marginY = 20
) {
  const key =
    sub._id ??
    sub.createdAt ??
    `${sub.title ?? ""}|${sub.content?.slice(0, 32) ?? ""}`;
  const h = hashFNV1a(String(key));

  const col = h % gridCols;
  const row = (h >>> 8) % gridRows;

  const x = marginX + col * cellW;
  const y = marginY + row * cellH;

  return { x, y };
}
