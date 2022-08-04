const development = (process.env.NODE_ENV === "development");

export const ShowConfig = {
    isClosed: !development,
    underConstruction: !development,
    isMenuOn: development,
    galleryTitle: "public access memories",
    showTitle: "as i recall",
    showDescription: "",
    showOpens: {date:"September 1st 2022", time: "5PM PST (GMT-7)"},
    showCloses: "",
    link: "as-i-recall"
}
