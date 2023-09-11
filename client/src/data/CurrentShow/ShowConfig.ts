const development = (process.env.NODE_ENV === "development");
// isClosed: !development,
// underConstruction: !development,

export const ShowConfig = {
    isClosed: true,
    isOpenCallOpen: false,
    underConstruction: false,
    isMenuOn: false,
    galleryTitle: "public access memories",
    showTitle: "Fields of View",
    showDescription: "",
    showOpens: { date: "November 1st 2023", time: "5PM PST (GMT-7)" },
    showCloses: "",
    link: "fields-of-view",
    awsLink: "fields_of_view"
}
