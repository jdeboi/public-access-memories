import { bars as barsHB } from "../Shows/HomeBody/BotConfig";
import { bars as barsAIR } from "../Shows/AsIRecall/BotConfig";
import { bars as barsFOV } from "../Shows/FieldsOfView/BotConfig";
import { bars as barsDave } from "../Shows/HomeOffices/BotConfig";
import { bars as barsResidency } from "../Shows/Residency/BotConfig";

import { barTenders as barTendersHB } from "../Shows/HomeBody/BotConfig";
import { barTenders as barTendersAIR } from "../Shows/AsIRecall/BotConfig";
import { barTenders as barTendersFOV } from "../Shows/FieldsOfView/BotConfig";
import { barTenders as barTendersDave } from "../Shows/HomeOffices/BotConfig";
import { barTenders as barTendersResidency } from "../Shows/Residency/BotConfig";
import { IBar, IUser } from "../../interfaces";
import {
  ASIRECALL_ID,
  FIELDSOFVIEW_ID,
  HOMEBODY_ID,
  HOMEOFFICES_ID,
  RESIDENCY_ID,
} from "./GalleryConfig";

export {
  danceFloor,
  numBarItems,
  barTenders,
  bars,
} from "../Shows/Residency/BotConfig";

export const getGalleryBars = (galleryId: number) => {
  switch (galleryId) {
    case RESIDENCY_ID:
      return barsResidency;
    case HOMEBODY_ID:
      return barsHB;
    case ASIRECALL_ID:
      return barsAIR;
    case FIELDSOFVIEW_ID:
      return barsFOV;
    case HOMEOFFICES_ID:
      return barsDave;
    default:
      return barsHB;
  }
};

export const getGalleryBarTenders = (galleryId: number) => {
  switch (galleryId) {
    case RESIDENCY_ID:
      return barTendersResidency;
    case HOMEBODY_ID:
      return barTendersHB;
    case ASIRECALL_ID:
      return barTendersAIR;
    case FIELDSOFVIEW_ID:
      return barTendersFOV;
    case HOMEOFFICES_ID:
      return barTendersDave;
    default:
      return barTendersHB;
  }
};

export const getBar = (type: string, galleryId: number): IBar => {
  const bars = getGalleryBars(galleryId);
  const bar = bars.filter((bar) => bar.type === type)[0];

  if (bar) {
    return bar;
  }
  return bars[0];
};

export const getBarTender = (type: string, galleryId: number): IUser => {
  const barTenders = getGalleryBarTenders(galleryId);
  const bars = getGalleryBars(galleryId);
  let u = bars.filter((bar) => bar.type === type)[0].tender;
  if (u) {
    return u;
  }
  return barTenders[0];
};
