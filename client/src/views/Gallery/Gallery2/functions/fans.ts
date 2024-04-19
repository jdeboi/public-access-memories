import FanDraggable from "../components/FanDraggable/FanDraggable";
import p5Types from "p5";
import { GlobalConfig } from "../../../../data/Shows/AsIRecall/GlobalConfig";
import HardDrive from "../components/FanDraggable/HardDrive";

export const addFanDivs = (fans: FanDraggable[], p5: p5Types) => {
  let fanLocs = [
    [10, 3.5],
    [34, 11],
    [18, 31.5],
  ];
  const { scaler } = GlobalConfig;
  for (let i = 0; i < fanLocs.length; i++) {
    fans.push(
      new FanDraggable(
        i,
        fanLocs[i][0] * scaler,
        fanLocs[i][1] * scaler,
        4 * scaler,
        4 * scaler,
        p5
      )
    );
  }
};

export const checkFanDivs = (
  x: number,
  y: number,
  fans: FanDraggable[],
  hardDrive: HardDrive
) => {
  for (const fan of fans) {
    if (fan.checkButtons(x, y)) {
      return true;
    } else if (fan.checkDragging(x, y)) {
      return true;
    }
  }

  if (hardDrive.checkButtons(x, y)) {
    return true;
  } else if (hardDrive.checkDragging(x, y)) {
    return true;
  }
  return false;
};

export const endFanDivDrag = (fans: FanDraggable[], hardDrive: HardDrive) => {
  for (const fan of fans) {
    if (fan) fan.endDrag();
  }
  hardDrive.endDrag();
};

export const displayFans = (
  x: number,
  y: number,
  fans: FanDraggable[],
  hardDrive: HardDrive
) => {
  for (const fan of fans) {
    fan.display(x, y);
    fan.displayToolBar(x, y);
  }

  hardDrive.display(x, y);
  hardDrive.displayToolBar(x, y);
};

export const updateFanDivs = (fans: FanDraggable[], hardDrive: HardDrive) => {
  for (const fan of fans) {
    fan.update();
  }

  hardDrive.update();
};
