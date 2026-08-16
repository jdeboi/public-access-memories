import { GlobalConfig as GlobalConfigDave } from "../Shows/HomeOffices/GlobalConfig";
import { GlobalConfig as GlobalConfigHB } from "../Shows/HomeBody/GlobalConfig";
import { GlobalConfig as GlobalConfigAIR } from "../Shows/AsIRecall/GlobalConfig";
import { GlobalConfig as GlobalConfigFOV } from "../Shows/FieldsOfView/GlobalConfig";
import { GlobalConfig as GlobalConfigResidency } from "../Shows/Residency/GlobalConfig";
import { GlobalConfig as GlobalConfigDebox } from "../Shows/Debox/GlobalConfig";
import { GlobalConfig as GlobalConfigBlankSpace } from "../Shows/BlankSpace/GlobalConfig";
import { GlobalConfig as GlobalConfigResidency2026 } from "../Shows/Residency2026/GlobalConfig";
import {
  ASIRECALL_ID,
  BLANK_SPACE_ID,
  DEBOX_ID,
  FIELDSOFVIEW_ID,
  HOMEBODY_ID,
  HOMEOFFICES_ID,
  RESIDENCY_ID,
  RESIDENCY2026_ID,
} from "./GalleryConfig";

export {
  GlobalConfig,
  limits,
  outsideDoors,
} from "../Shows/Debox/GlobalConfig";

export const getCurrentPageGlobalConfig = (index: number) => {
  switch (index) {
    case RESIDENCY_ID:
      return GlobalConfigResidency;
    case HOMEBODY_ID:
      return GlobalConfigHB;
    case ASIRECALL_ID:
      return GlobalConfigAIR;
    case FIELDSOFVIEW_ID:
      return GlobalConfigFOV;
    case HOMEOFFICES_ID:
      return GlobalConfigDave;
    case DEBOX_ID:
      return GlobalConfigDebox;
    case BLANK_SPACE_ID:
      return GlobalConfigBlankSpace;
    case RESIDENCY2026_ID:
      return GlobalConfigResidency2026;
    default:
      return GlobalConfigHB;
  }
};

export const audioRoom = "home";
