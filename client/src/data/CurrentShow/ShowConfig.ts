export const ShowStatus = {
  CLOSED_NO_PLANS: "closed-no-plans",
  CLOSED_OPEN_CALL: "open-call",
  CLOSED_PRE_SHOW: "pre-show",
  OPEN: "open",
} as const;
type ShowStatus = (typeof ShowStatus)[keyof typeof ShowStatus];

export const ShowType = {
  GROUP_SHOW: "group-show",
  SOLO_SHOW: "solo-show",
  RESIDENCY: "residency",
  WRONG_PAVILION: "wrong-pavilion",
} as const;
type ShowType = (typeof ShowType)[keyof typeof ShowType];

interface IGoogleMeet {
  isLive: boolean;
  link: string;
  goLiveTime: Date;
  durationHours: number;
}

// ── Change these to switch gallery state ─────────────────────────────────────
const STATUS: ShowStatus = ShowStatus.CLOSED_NO_PLANS;
const SHOW_TYPE: ShowType = ShowType.GROUP_SHOW;
// ─────────────────────────────────────────────────────────────────────────────

function deriveState(status: ShowStatus, type: ShowType) {
  return {
    isClosed: status !== ShowStatus.OPEN,
    isMenuOn: false,
    isOpenCallTime: status === ShowStatus.CLOSED_OPEN_CALL,
    showPlanned: status !== ShowStatus.CLOSED_NO_PLANS,
    artistsPageOn: status === ShowStatus.OPEN,
    isResidency: type === ShowType.RESIDENCY,
    isWrongPavilion: type === ShowType.WRONG_PAVILION,
  };
}

export const ShowConfig = {
  status: STATUS,

  site: {
    title: "Public Access Memories",
  },

  show: {
    type: SHOW_TYPE,
    title: "Show TBA",
    description: "Upcoming show details TBA",
    slug: "debox", // drives URL routing: /<slug>/rooms/:id
    awsSlug: "debox", // drives asset paths (may differ from slug)
  },

  dates: {
    opens: null as { date: string; time: string } | null,
    closes: null as { date: string; time: string } | null,
    calendarLink: null as string | null,
    googleMeet: null as IGoogleMeet | null,
  },

  ...deriveState(STATUS, SHOW_TYPE),
};

export const DevMatchProd = true;
