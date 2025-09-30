import { normalizeInsta } from "../../../helpers/helpers";
import ArtistsArchiveList from "../PastExhibitions/ArtistsArchiveList";
import { PastExhibitionDataInterface } from "../PastExhibitions/Data/_PastExhibitionDataType";
import ImageGrid from "../PastExhibitions/ImageGrid";
import PageTemplate from "./PageTemplate";
import SectionHeader from "./SectionHeader";

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
      <div className="windows transition-shadow hover:shadow-lg mb-6">
        <div className="flex gap-5 p-5 items-start bg-slate-900/30  focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
          {/* LEFT: fixed thumbnail column */}
          <div className="shrink-0 w-[250px] min-w-[250px]">
            <div className="w-[250px] h-[250px] overflow-hidden rounded">
              <img
                src={thumbnail ?? imgs?.[0] ?? ""}
                alt={title}
                loading="lazy"
                className="block w-full h-full object-cover" // fills the box, no stretching
                sizes="250px"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-sm uppercase tracking-wide leading-none rounded-lg border border-slate-700 bg-black text-white px-2 py-0.5">
                {exhibitionType}
              </span>

              <span className="inline-flex h-6 items-center text-slate-300">
                {year}
              </span>
            </div>

            <p className="mt-2 text-slate-200">{shortDescription}</p>
            {sortedArtists && (
              <div className="mt-2">
                <span className="mr-2">🎨:</span>
                {sortedArtists.map((artist, i) => (
                  <span key={artist.id}>
                    <a
                      href={
                        artist.webLink ||
                        normalizeInsta(artist.instaLink) ||
                        "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono"
                    >
                      {artist.name}
                    </a>
                    {i < (sortedArtists?.length ?? 0) - 1 && ", "}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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
