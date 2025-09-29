import { HomeBodyData } from "./HomeBodyData";
import { HomeOfficesData } from "./HomeOfficesData";
import { AsIRecallData } from "./AsIRecallData";
import { residency2025Data } from "./Residency2025Data";
import { fieldsOfViewData } from "./FieldsOfViewData";

const data = [
  AsIRecallData,
  HomeBodyData,
  HomeOfficesData,
  fieldsOfViewData,
  residency2025Data,
];

// Sort by year in descending order
export const AllPastExhibitionsData = data.sort((a, b) => b.year - a.year);

export default AllPastExhibitionsData;
