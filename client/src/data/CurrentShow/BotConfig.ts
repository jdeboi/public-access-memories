import { bars as barsHB } from "../Shows/HomeBody/BotConfig";
import { bars as barsAIR } from "../Shows/AsIRecall/BotConfig";
import { bars as barsFOV } from "../Shows/FieldsOfView/BotConfig";
import { bars as barsDave } from "../Shows/HomeOffices/BotConfig";
import { barTenders as barTendersHB } from "../Shows/HomeBody/BotConfig";
import { barTenders as barTendersAIR } from "../Shows/AsIRecall/BotConfig";
import { barTenders as barTendersFOV } from "../Shows/FieldsOfView/BotConfig";
import { barTenders as barTendersDave } from "../Shows/HomeOffices/BotConfig";
import { IBar, IUser } from "../../interfaces";

export {
  danceFloor,
  numBarItems,
  barTenders,
  bars,
  DJBotDomCoords,
} from "../Shows/HomeOffices/BotConfig";

export const getGalleryBars = (galleryId: number) => {
  switch (galleryId) {
    case 1:
      return barsHB;
    case 2:
      return barsAIR;
    case 3:
      return barsFOV;
    case 4:
      return barsDave;
    default:
      return barsHB;
  }
};

export const getGalleryBarTenders = (galleryId: number) => {
  switch (galleryId) {
    case 1:
      return barTendersHB;
    case 2:
      return barTendersAIR;
    case 3:
      return barTendersFOV;
    case 4:
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
