import { IArtist } from "../../../../interfaces";

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
    | "Wrong Biennale Pavilion";
  imgs?: string[];
  artists?: IArtist[];
  thumbnail?: string;
  videoLink?: string;
  statement?: React.ReactNode;
  intro?: React.ReactNode;
  link?: React.ReactNode;
  children?: React.ReactNode;
}
