import { ShowConfig } from "./ShowConfig";

interface IPageConfig {
  link: string;
  title: string;
}

const OpenCallPage: IPageConfig = {
  link: "/opencall",
  title: "open call",
};

const StatementPage: IPageConfig = {
  link: "/statement",
  title: "statement",
};

const ShowPage: IPageConfig | null = ShowConfig.showPlanned
  ? ShowConfig.isOpenCallTime
    ? OpenCallPage
    : StatementPage
  : null;

const ArtistsPage: IPageConfig = {
  link: "/artists",
  title: "artists",
};

export const PageConfig: IPageConfig[] = [
  ...(ShowPage ? [ShowPage] : []),
  // {
  //   link: "/artists",
  //   title: "artists",
  // },
  ...(ShowConfig.artistsPageOn ? [ArtistsPage] : []),
  {
    link: "/about",
    title: "about",
  },
  {
    link: "https://publicaccessmemories.substack.com/welcome",
    title: "newsletter",
  },
  {
    link: "/pastexhibitions",
    title: "past exhibitions",
  },
];
