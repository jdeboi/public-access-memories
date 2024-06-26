import { GlobalConfig as GlobalConfigDave } from "../Shows/HomeOffices/GlobalConfig";
import { GlobalConfig as GlobalConfigHB } from "../Shows/HomeBody/GlobalConfig";
import { GlobalConfig as GlobalConfigAIR } from "../Shows/AsIRecall/GlobalConfig";
import { GlobalConfig as GlobalConfigFOV } from "../Shows/FieldsOfView/GlobalConfig";

export {
  GlobalConfig,
  limits,
  outsideDoors,
} from "../Shows/HomeOffices/GlobalConfig";

export const getCurrentPageGlobalConfig = (index: number) => {
  switch (index) {
    case 1:
      return GlobalConfigHB;
    case 2:
      return GlobalConfigAIR;
    case 3:
      return GlobalConfigFOV;
    case 4:
      return GlobalConfigDave;
    default:
      return GlobalConfigHB;
  }
};

export const audioRoom = "home";
