const development = process.env.NODE_ENV === "development";
// isClosed: !development,
// underConstruction: !development,

export const ShowConfig = {
  isClosed: true,
  isOpenCallOpen: false,
  underConstruction: true,
  isMenuOn: false,
  galleryTitle: "Public Access Memories",
  showTitle: "TBA",
  showDescription: "",
  showOpens: { date: "May 1st 2024", time: "5PM PST (GMT-7)" },
  showCloses: "",
  link: "fields-of-view",
  awsLink: "fields_of_view",
};
