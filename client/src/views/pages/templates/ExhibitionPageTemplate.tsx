import { normalizeInsta } from "../../../helpers/helpers";
import ArtistsArchiveList from "../PastExhibitions/ArtistsArchiveList";
import { PastExhibitionDataInterface } from "../PastExhibitions/Data/_PastExhibitionDataType";
import ImageGrid from "../PastExhibitions/ImageGrid";
import PageTemplate from "./PageTemplate";
import SectionHeader from "./SectionHeader";
import CustomPill from "./CustomPill";
import WindowsHeaderBox from "./WindowsHeaderBox";
import { Link } from "react-router-dom";

const ExhibitionPageTemplate = ({
  title,
  year,
  shortDescription,
  exhibitionType,
  awsLink,
  statement,
  intro,
  videoLink,
  thumbnail,
  link,
  imgs,
  artists,
  children,
}: PastExhibitionDataInterface) => {
  const sortedArtists = artists
    ? [...artists].sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const ResponsiveVideo: React.FC<{ src: string; title: string }> = ({
    src,
    title,
  }) => (
    <div className="mt-4 rounded border border-white/20 bg-black/20">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full"
        style={{ aspectRatio: "16 / 9", display: "block" }}
      />
    </div>
  );

  // const WrongBiennaleLogos: React.FC = () => (
  //   <div className="flex flex-row gap-4">
  //     <img
  //       src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/PAM_logos/logo_black_lg.png"
  //       className="h-20 w-auto object-contain"
  //       alt="PAM logo"
  //     />
  //     <img
  //       src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/LOGO-BLACK_small.png"
  //       height={80}
  //       className="h-20 w-auto object-contain"
  //       alt="Wrong logo"
  //     />
  //   </div>
  // );

  return (
    <PageTemplate title={title}>
      <div>
        <Link to="/pastexhibitions" className="text-[cyan] hover:underline">
          &lt;-- Back to All Past Exhibitions
        </Link>
      </div>
      <WindowsHeaderBox title={title} thumbnail={thumbnail} className="my-6">
        <div className="flex items-center gap-3">
          <CustomPill text={exhibitionType} />

          <span className="inline-flex h-6 items-center text-slate-300 font-mono">
            {year}
          </span>
        </div>
        <p className="mt-2 text-slate-200 font-mono text-2xl">
          {shortDescription}
        </p>
        {sortedArtists && (
          <div className="mt-2">
            <span className="mr-2">🎨:</span>
            {sortedArtists.map((artist, i) => (
              <span key={artist.id}>
                <a
                  href={
                    artist.webLink || normalizeInsta(artist.instaLink) || "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  {artist.name}
                </a>
                {i < (sortedArtists?.length ?? 0) - 1 && ", "}
              </span>
            ))}
          </div>
        )}
      </WindowsHeaderBox>

      {intro && <>{intro}</>}

      {videoLink && (
        <div className="">
          <iframe
            src={videoLink}
            title={title + " video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full"
            style={{ aspectRatio: "16 / 9", display: "block" }}
          ></iframe>
        </div>
      )}
      {imgs && imgs.length > 0 && <ImageGrid images={imgs} />}

      {statement && (
        <>
          <SectionHeader title="STATEMENT" />
          <div className="font-mono mt-[-30px]">{statement}</div>
        </>
      )}

      {sortedArtists.length > 1 && (
        <>
          <SectionHeader title="ARTISTS" />
          <p className="font-mono mt-[-30px]">
            <ArtistsArchiveList awsLink={awsLink} artists={sortedArtists} />
          </p>
        </>
      )}
      {sortedArtists.length === 1 && (
        <>
          <SectionHeader title="ARTIST" />
          <p className="font-mono mt-[-30px]">{sortedArtists[0].bio}</p>
        </>
      )}
      {children && <div className="content">{children}</div>}
    </PageTemplate>
  );
};

export default ExhibitionPageTemplate;
