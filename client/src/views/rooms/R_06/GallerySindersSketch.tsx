import { getLimits } from "../../../helpers/helpers";
import { initOuterWalls } from "../../Gallery/Gallery1/functions/building";

import {
  GallerySketch1Props,
  GallerySketchTemplate1,
} from "../../Gallery/Gallery1/GallerySketchTemplate1";

import p5Types from "p5";
import Folder from "../../Gallery/components/p5/Folder";
import Postit from "../../Gallery/components/p5/Postit";
import { displayFolderDivs } from "../../Gallery/Gallery1/functions/divs";

interface GallerySindersSketchProps extends GallerySketch1Props {
  showSubmissionForm: () => void;
  showReadme: () => void;
  submissions: any[];
  setPostOpen: (sub: null | any) => void;
}

export default class GallerySindersSketch extends GallerySketchTemplate1<GallerySindersSketchProps> {
  public postItImgs: p5Types.Image[] = [];
  private p5Ref: p5Types | null = null;
  private lastSubsSig = "";

  constructor(props: GallerySindersSketchProps) {
    super(props);
    this.initWorld();
  }

  preloadContent = (p5: p5Types) => {
    for (let i = 0; i <= 4; i++) {
      this.postItImgs[i] = p5.loadImage(`${this.pamURL}debox/sinders/${i}.png`);
    }
  };

  initWorld = () => {
    this.galleryId = 7;
    const worldW = 20;
    const worldH = 20;
    this.GlobalConfig = { x: -1, y: -3, scaler: 70, worldW, worldH };
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
        this.updatePostits(this.p5Ref);
        this.lastSubsSig = nextSig;
        // If draw loop is paused:
        // this.p5Ref.redraw();
      }
    }
  }

  private submissionsSig(subs: any[]) {
    const ids = subs
      .map((s) => s._id ?? s.id ?? s.title ?? s.isHidden ?? "")
      .join("|");
    return `${subs.length}#${ids}`;
  }

  initPostits = (p5: p5Types) => {
    this.divs.folders = [];
    if (this.fontGeo && this.font) Postit.setFonts(this.fontGeo, this.font);

    for (let i = 0; i < this.props.submissions.length; i++) {
      const submission = this.props.submissions[i];

      if (!this.postItImgs.length || !this.GlobalConfig) continue;
      let postit = new Postit(
        0,
        submission.x,
        submission.y,
        submission,
        p5,
        this.postItImgs[3],
        this.GlobalConfig,
        this.props.setPostOpen
      );
      this.divs.folders.push(postit);
    }

    const submissionTxt = new Folder(
      p5,
      0,
      100,
      100,
      80,
      60,
      "Form",
      "",
      this.trashFiles[4],
      this.GlobalConfig,
      this.props.showSubmissionForm
    );
    this.divs.folders.push(submissionTxt);

    const readme = new Folder(
      p5,
      0,
      250,
      140,
      80,
      80,
      "README.txt",
      "",
      this.txtFile,
      this.GlobalConfig,
      this.props.showReadme
    );
    this.divs.folders.push(readme);

    // initTrashSinders(
    //   p5,
    //   this.lightImgs,
    //   this.trashFiles[4],
    //   this.divs,
    //   this.GlobalConfig,
    //   () => {}
    // );
  };

  updatePostits = (p5: p5Types) => {
    console.log("updating postits...");

    // for props.submissions, check if there's a matching postit, if not add it
    const existingIds = new Set(
      this.divs.folders.map((f: any) => (f instanceof Postit ? f._id : null))
    );
    for (let i = 0; i < this.props.submissions.length; i++) {
      const submission = this.props.submissions[i];
      const id = submission._id ?? String(i);

      // Add new postit if not existing
      if (!existingIds.has(id)) {
        if (!this.postItImgs.length || !this.GlobalConfig) continue;
        let postit = new Postit(
          0,
          submission.x,
          submission.y,
          submission,
          p5,
          this.postItImgs[3],
          this.GlobalConfig,
          this.props.setPostOpen
        );
        postit.closed = false;
        this.divs.folders.push(postit);
      }
      // Update existing postit
      else {
        const postit = this.divs.folders.find(
          (f: any) => f instanceof Postit && f._id === id
        );
        if (postit) {
          postit.closed = false;
        }
      }
    }
    // Hide postits that are no longer in props.submissions
    const currentIds = new Set(
      this.props.submissions.map((s) => s._id ?? String(s.id ?? s.title ?? ""))
    );
    for (let folder of this.divs.folders) {
      if (folder instanceof Postit) {
        if (!currentIds.has(folder._id)) {
          folder.closed = true;
        }
      }
    }
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
    displayFolderDivs(this.divs, this.userEase.x, this.userEase.y);

    // if (this.divs.trashFolders && this.divs.trashCans) {
    //   for (const folder of this.divs.trashFolders) {
    //     folder.display(this.userEase.x, this.userEase.y);
    //     folder.displayToolBar(this.userEase.x, this.userEase.y);
    //   }
    //   for (const trash of this.divs.trashCans) {
    //     trash.display(this.userEase.x, this.userEase.y);
    //   }
    // }
  };
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
  const h = 100; //hashFNV1a(String(key));

  const col = h % gridCols;
  const row = (h >>> 8) % gridRows;

  const x = marginX + col * cellW;
  const y = marginY + row * cellH;

  return { x, y };
}
