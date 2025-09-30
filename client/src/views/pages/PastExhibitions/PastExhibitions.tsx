import React from "react";
import "../Page.css"; // keep if you still need global styles
import PageTemplate from "../templates/PageTemplate";
import { AllPastExhibitionsData } from "./Data/AllPastExhibitionsData";
import { normalizeInsta } from "../../../helpers/helpers";
import { Link } from "react-router-dom";
import WindowsHeaderBox from "../templates/WindowsHeaderBox";
import SlatePill from "../templates/SlatePill";

export const PastExhibitions: React.FC = () => {
  return (
    // 1) Clamp overall width
    <PageTemplate title="Past Exhibitions" className="Artists">
      <div className="my-10 text-sm text-slate-400">
        {AllPastExhibitionsData.map((exhibition, index) => {
          const sortedArtists = exhibition.artists?.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          return (
            <article
              key={`${exhibition.year}-${index}`}
              // className="windows transition-shadow hover:shadow-lg mb-6"
            >
              <WindowsHeaderBox
                title={exhibition.title}
                subtitle={exhibition.shortDescription}
                thumbnail={exhibition.thumbnail ?? exhibition.imgs?.[0] ?? ""}
                link={exhibition.pageLink}
              >
                <div className="flex items-center gap-3">
                  <SlatePill text={exhibition.exhibitionType} />

                  <span className="inline-flex h-6 items-center text-slate-300">
                    {exhibition.year}
                  </span>
                </div>

                <Link to={exhibition.pageLink} className="hover:underline">
                  <h3 className="text-xl  leading-snug">
                    <span className="underline-offset-4 group-hover:underline">
                      {exhibition.title}
                    </span>
                  </h3>
                </Link>
                <p className="mt-2 text-slate-200">
                  {exhibition.shortDescription}
                </p>
                {sortedArtists && (
                  <div className="mt-2">
                    <span className="mr-2">🎨:</span>
                    {sortedArtists.map((artist, i) => (
                      <React.Fragment key={artist.id}>
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
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </WindowsHeaderBox>
            </article>
          );
        })}
      </div>
    </PageTemplate>
  );
};

export default PastExhibitions;
