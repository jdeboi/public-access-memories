// src/content/exhibitions/residency2025.data.tsx
import React from "react";
import { artists as residencyArtists } from "../../../../data/Shows/Residency/RoomConfig";
import { PastExhibitionDataInterface } from "./_PastExhibitionDataType";

const filteredArtists = residencyArtists.filter((a) => a.name !== "hostBot");

export const residency2025Data: PastExhibitionDataInterface = {
  pageLink: "/pastexhibitions/residency2025",
  awsLink: "residency",
  title: "Residency 2025",
  year: 2025,
  exhibitionType: "Residency",
  videoLink: "https://www.youtube.com/embed/syVPp78A1iA?si=74usAd5uR9Lo53M7",
  artists: filteredArtists,
  // imgs: [...optional image URLs here],
  thumbnail:
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/residency/thumbs/residency_studios.jpg",
  shortDescription:
    "Public Access Memories was excited to offer two month-long online residency programs in the summer of 2025.",
  statement: (
    <p>
      Public Access Memories was excited to offer two month-long online
      residency programs in the summer of 2025. Net artists met weekly to
      participate in studio visits and critiques, and discuss works in progress.
      The residency concluded with a virtual exhibition.
    </p>
  ),
};
