interface IShowConfig {
  isClosed: boolean;
  isOpenCallOpen: boolean;
  underConstruction: boolean;
  isResidency: boolean;
  isMenuOn: boolean;
  galleryTitle: string;
  showTitle: string;
  showDescription: string;
  googleMeet: {
    isLive: boolean;
    link: string;
    goLiveTime: Date;
    durationHours: number;
  } | null;
  showOpens: { date: string; time: string } | null;
  calendarLink: string | null;
  showCloses: { date: string; time: string } | null;
  link: string;
  awsLink: string;
}

export const ShowConfig: IShowConfig = {
  isClosed: true,
  isOpenCallOpen: false,
  underConstruction: true,
  isResidency: false,
  isMenuOn: false,
  galleryTitle: "Public Access Memories",
  showTitle: "Debox",
  showDescription: "a virtual net art exhibition",
  showOpens: null, //{ date: "November 9th, 2025", time: "11AM CST (GMT-6)" },
  // calendarLink: "https://calendar.app.google/8JMy8Tvt7k6jUagk8",
  calendarLink: "",
  // googleMeet: {
  //   isLive: true,
  //   link: "https://meet.google.com/anj-kqhd-doc",
  //   goLiveTime: new Date("2025-11-09T16:00:00Z"), // 11:00 AM CST in UTC,
  //   durationHours: 3,
  // },
  googleMeet: null,
  showCloses: null,
  link: "debox",
  awsLink: "debox",
};
