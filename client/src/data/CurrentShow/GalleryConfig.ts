export const RESIDENCY_ID = 0,
  HOMEBODY_ID = 1,
  ASIRECALL_ID = 2,
  FIELDSOFVIEW_ID = 3,
  HOMEOFFICES_ID = 4,
  DEBOX_ID = 5,
  BLANK_SPACE_ID = 6,
  RESIDENCY2026_ID = 7;

// Past galleries reachable at /galleries/<name>
export const ARCHIVED_GALLERIES: Record<string, number> = {
  homebody: HOMEBODY_ID,
  asirecall: ASIRECALL_ID,
  fieldsofview: FIELDSOFVIEW_ID,
  homeoffices: HOMEOFFICES_ID,
  debox: DEBOX_ID,
};
