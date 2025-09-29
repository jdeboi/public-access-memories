import React from "react";
import "../Page.css"; // keep if you still need global styles
import PageTemplate from "../templates/PageTemplate";

interface Exhibition {
  link: string;
  imgSrc: string;
  title: string;
  subtitle: string;
}

interface ArtistBoxProps {
  link: string;
  imgSrc: string;
  title: string;
  subtitle: string;
}

const ArtistBox: React.FC<ArtistBoxProps> = ({
  link,
  imgSrc,
  title,
  subtitle,
}) => {
  return (
    <div className="windows p-0.5 text-center max-w-[200px]">
      <a href={link}>
        <img
          className="block w-[200px] h-[200px] object-cover"
          src={imgSrc}
          alt={title}
        />
      </a>
      <div className="mt-2">
        <div className="text-[1.1em]">
          <a className="underline hover:no-underline" href={link}>
            {title}
          </a>
        </div>
        <div className="text-[0.8em] opacity-80">{subtitle}</div>
      </div>
    </div>
  );
};

export const PastExhibitions: React.FC = () => {
  const exhibitions: Exhibition[] = [
    {
      link: "/pastexhibitions/homeoffices",
      imgSrc:
        "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/homeoffices.jpg",
      title: "HomeOffices",
      subtitle: "solo show",
    },
    {
      link: "/pastexhibitions/fieldsofview",
      imgSrc:
        "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/fieldsofview.jpg",
      title: "Fields of View",
      subtitle: "wrong 2023",
    },
    {
      link: "/pastexhibitions/asirecall",
      imgSrc:
        "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/thumbs/gallery_thumb.jpg",
      title: "As I Recall",
      subtitle: "group show",
    },
    {
      link: "/pastexhibitions/homebody",
      imgSrc:
        "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/home_body/gallery_HB_thumb.png",
      title: "home </body>",
      subtitle: "wrong 2022",
    },
    {
      link: "/pastexhibitions/residency2025",
      imgSrc:
        "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/residency/thumbs/residency_studios.jpg",
      title: "Residency Exhibition",
      subtitle: "summer 2025",
    },
  ];

  return (
    <PageTemplate title="Past Exhibitions" className="Artists">
      <div className="flex flex-row flex-wrap gap-5">
        {exhibitions.map((exhibition, index) => (
          <ArtistBox key={index} {...exhibition} />
        ))}
      </div>
    </PageTemplate>
  );
};

export default PastExhibitions;
