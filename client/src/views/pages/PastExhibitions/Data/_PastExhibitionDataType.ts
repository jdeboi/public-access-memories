import { IArtist } from "../../../../interfaces";

export type PastExhibitionImage = string | { src: string; caption?: string };

export interface PastExhibitionDataInterface {
  pageLink: string;
  awsLink: string;
  title: string;
  year: number;
  shortDescription?: string;
  exhibitionType:
    | "Solo Show"
    | "Group Show"
    | "Residency"
    | "The Wrong Biennale";
  imgs?: PastExhibitionImage[];
  artists?: IArtist[];
  thumbnail?: string;
  videoLink?: string;
  statement?: React.ReactNode;
  intro?: React.ReactNode;
  link?: React.ReactNode;
  children?: React.ReactNode;
}
