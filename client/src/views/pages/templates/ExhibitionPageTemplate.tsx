import ArtistsArchiveList from "../PastExhibitions/ArtistsArchiveList";
import { PastExhibitionDataInterface } from "../PastExhibitions/Data/_PastExhibitionDataType";
import ImageGrid from "../PastExhibitions/ImageGrid";
import PageTemplate from "./PageTemplate";

const ExhibitionPageTemplate = ({
  title,
  year,
  shortDescription,
  exhibitionType,
  awsLink,
  statement,
  intro,
  videoLink,
  link,
  imgs,
  artists,
  children,
}: PastExhibitionDataInterface) => {
  const sortedArtists = artists
    ? [...artists].sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const isWrongBiennale = exhibitionType === "Wrong Biennale Pavilion";

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

  const SectionHeader: React.FC<{ text: string }> = ({ text }) => (
    <>
      <h3>{text}</h3>
      <div className="mt-[-34px]">---</div>
    </>
  );

  return (
    <PageTemplate title={title}>
      <dl
        className="windows p-5 text-lg grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 items-start"
        style={{ gridTemplateColumns: "8rem 1fr" }} // ← adjust to taste
      >
        {/* Exhibition Type */}
        <dt className="uppercase text-sm text-slate-300 md:self-start">
          Exhibition Type
        </dt>
        <dd className="md:col-start-2">
          {isWrongBiennale ? (
            <a
              href="https://thewrong.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Wrong Biennale Pavilion
            </a>
          ) : (
            exhibitionType
          )}
        </dd>

        {/* Year */}
        <dt className="uppercase text-sm text-slate-300 md:self-start">Year</dt>
        <dd className="md:col-start-2">{year}</dd>

        {/* Overview */}
        <dt className="uppercase text-sm text-slate-300 md:self-start">
          Overview
        </dt>
        <dd className="md:col-start-2 break-words">{shortDescription}</dd>

        {/* Artists */}
        {sortedArtists.length > 0 && (
          <>
            <dt className="uppercase text-sm text-slate-300 md:self-start">
              {sortedArtists.length < 2 ? "Artist" : "Artists"}
            </dt>
            <dd className="md:col-start-2 flex flex-wrap gap-x-2">
              {sortedArtists.map((artist, i) => (
                <span key={artist.id}>
                  <a
                    href={artist.webLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:no-underline"
                  >
                    {artist.name}
                  </a>
                  {i < sortedArtists.length - 1 ? ", " : ""}
                </span>
              ))}
            </dd>
          </>
        )}

        {link && (
          <>
            <dt className="uppercase text-sm text-slate-300 md:self-start">
              Link
            </dt>
            <dd className="md:col-start-2">{link}</dd>
          </>
        )}
      </dl>

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
          <SectionHeader text="STATEMENT" />
          {statement}
        </>
      )}

      {sortedArtists.length > 1 && (
        <>
          <SectionHeader text="ARTISTS" />
          <p>
            <ArtistsArchiveList awsLink={awsLink} artists={sortedArtists} />
          </p>
        </>
      )}
      {sortedArtists.length === 1 && (
        <>
          <SectionHeader text="ARTIST" />
          <p>{sortedArtists[0].bio}</p>
        </>
      )}
      {children && <div className="content">{children}</div>}
    </PageTemplate>
  );
};

export default ExhibitionPageTemplate;
