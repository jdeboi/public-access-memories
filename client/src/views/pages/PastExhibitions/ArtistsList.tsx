import { IArtist } from "../../../interfaces";
import "../Artists/Artists.css";

interface Props {
  artists: IArtist[];
}
const ArtistsList = (props: Props) => {
  const getThumbs = () => {
    return (
      <div className="artists-list">
        {props.artists.map((artist, i) => getArtistArchiveListing(artist, i))}
      </div>
    );
  };
  const getArtistArchiveListing = (artist: IArtist, index: number) => {
    const url = artist.webLink ? artist.webLink : artist.instaLink;
    return (
      <div key={index} className="artist-box windows">
        <a href={url}>
          <img
            className="thumb"
            src={`https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/thumbs/${artist.thumb}.png`}
          />
        </a>
        <div className="artist-name">
          <div>
            <a href={url}>{artist.name}</a>
          </div>
        </div>
      </div>
    );
  };

  const basicList = () => {
    return (
      <>
        {props.artists.map((artist, i) => {
          const url = artist.instaLink ? artist.instaLink : artist.webLink;

          return (
            <span key={i}>
              <a href={url}>{artist.name}</a>
              {i != props.artists.length - 1 && <span>{", "}</span>}
            </span>
          );
        })}
      </>
    );
  };

  return <div className="Artists">{getThumbs()}</div>;
};

export default ArtistsList;
