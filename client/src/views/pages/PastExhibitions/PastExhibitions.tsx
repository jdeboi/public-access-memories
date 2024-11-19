import React from "react";
import "../Page.css";
import "../Artists/Artists.css";

// Define the type for an exhibition
interface Exhibition {
  link: string;
  imgSrc: string;
  title: string;
  subtitle: string;
}

// Reusable component for an artist's exhibition box
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
    <div className="artist-box windows">
      <a href={link}>
        <img className="thumb" src={imgSrc} alt={title} />
      </a>
      <div className="artist-name">
        <div style={{ fontSize: "1.1em" }}>
          <a href={link}>{title}</a>
        </div>
        <div style={{ fontSize: "0.8em" }}>{subtitle}</div>
      </div>
    </div>
  );
};

export const PastExhibitions: React.FC = () => {
  // Array of exhibitions with typed structure
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
  ];

  return (
    <div className="Artists Statement Page">
      <div className="container">
        <h1>Past Exhibitions</h1>
        <br />
        <br />
        <div className="artists-list">
          {exhibitions.map((exhibition, index) => (
            <ArtistBox
              key={index}
              link={exhibition.link}
              imgSrc={exhibition.imgSrc}
              title={exhibition.title}
              subtitle={exhibition.subtitle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastExhibitions;
