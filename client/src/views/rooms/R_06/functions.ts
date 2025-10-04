import Trash from "../../Gallery/components/p5/Trash";
import TrashFolder from "../../Gallery/components/p5/TrashFolder";
import p5Types from "p5";

export const initTrashSinders = (
  p5: p5Types,
  lightImgs: p5Types.Image[],
  img: p5Types.Image | null,
  divs: any,
  GlobalConfig: any,
  callback: () => void
) => {
  const x = 1000;
  const y = 1000;
  const tf = new TrashFolder(
    0,
    x - 200,
    y - 200,
    300,
    200,
    p5,
    lightImgs[2],
    GlobalConfig
  );
  const t = new Trash(
    p5,
    0,
    x,
    y,
    "submissions",
    img,
    tf,
    GlobalConfig,
    callback
  );
  divs.trashCans = [];
  divs.trashCans.push(t);

  divs.trashFolders = [];
  divs.trashFolders.push(tf);
};
