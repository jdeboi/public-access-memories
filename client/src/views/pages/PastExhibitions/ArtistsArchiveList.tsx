import { IArtist } from "../../../interfaces";
import "../Artists/Artists.css";

interface Props {
  artists: IArtist[];
  awsLink: string;
}
const ArtistsArchiveList = (props: Props) => {
  const getThumbs = () => {
    return (
      <div className="artists-list">
        {props.artists.map((artist, i) => getArtistArchiveListing(artist, i))}
      </div>
    );
  };

  const getFileName = (thumb: string) =>
    thumb.match(/\.[^/.]+$/) ? thumb : `${thumb}.png`;

  const getArtistArchiveListing = (artist: IArtist, index: number) => {
    const url = artist.webLink ? artist.webLink : artist.instaLink;

    return (
      <div key={index} className="artist-box windows">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            alt={artist.name}
            className="thumb"
            src={`https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/${
              props.awsLink
            }/thumbs/${getFileName(artist.thumb)}`}
          />
        </a>
        <div className="artist-name">
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={url}
              className="text-[cyan] hover:underline font-['consoleFont']"
            >
              {artist.name}
            </a>
          </div>
        </div>
      </div>
    );
  };

  return <div className="Artists">{getThumbs()}</div>;
};

export default ArtistsArchiveList;
