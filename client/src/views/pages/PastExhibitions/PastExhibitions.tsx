import React from "react";
import "../Page.css"; // keep if you still need global styles
import PageTemplate from "../templates/PageTemplate";
import { AllPastExhibitionsData } from "./Data/AllPastExhibitionsData";
import { normalizeInsta } from "../../../helpers/helpers";
import { Link } from "react-router-dom";

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
              className="windows transition-shadow hover:shadow-lg mb-6"
            >
              <div className="flex gap-5 p-5 items-start bg-slate-900/30  focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
                {/* LEFT: fixed thumbnail column */}
                <div className="shrink-0 w-[250px] min-w-[250px]">
                  <Link to={exhibition.pageLink} className="">
                    <div className="w-[250px] h-[250px] overflow-hidden rounded">
                      <img
                        src={exhibition.thumbnail ?? exhibition.imgs?.[0] ?? ""}
                        alt={exhibition.title}
                        loading="lazy"
                        className="block w-full h-full object-cover" // fills the box, no stretching
                        sizes="250px"
                      />
                    </div>
                  </Link>
                </div>

                {/* RIGHT: Body (flexes to fill) */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm uppercase tracking-wide leading-none rounded-lg border border-slate-700 bg-black text-white px-2 py-0.5">
                      {exhibition.exhibitionType}
                    </span>

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
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </PageTemplate>
  );
};

export default PastExhibitions;
