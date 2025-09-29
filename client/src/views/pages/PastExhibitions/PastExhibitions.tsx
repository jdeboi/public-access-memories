import React from "react";
import "../Page.css"; // keep if you still need global styles
import PageTemplate from "../templates/PageTemplate";
import { AllPastExhibitionsData } from "./Data/AllPastExhibitionsData";

export const PastExhibitions: React.FC = () => {
  return (
    // 1) Clamp overall width
    <PageTemplate title="Past Exhibitions" className="Artists">
      <div className="mx-auto max-w-3xl px-4 my-10 text-sm text-slate-400">
        {AllPastExhibitionsData.map((exhibition, index) => (
          <article
            key={`${exhibition.year}-${index}`}
            className="group rounded-2xl border border-slate-800/60 bg-slate-900/30 backdrop-blur windows transition-shadow hover:shadow-lg mb-6"
          >
            {/* 2) Use a grid with a fixed thumbnail column */}
            <a
              href={exhibition.pageLink}
              className="flex gap-5 p-5 items-start rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              {/* LEFT: fixed thumbnail column */}
              <div className="shrink-0 w-[150px] min-w-[150px]">
                <div className="w-[150px] h-[100px] overflow-hidden rounded bg-slate-800/50 ring-1 ring-slate-700/40">
                  <img
                    src={exhibition.thumbnail ?? exhibition.imgs?.[0] ?? ""}
                    alt={exhibition.title}
                    loading="lazy"
                    className="block w-full h-full object-cover" // fills the box, no stretching
                    sizes="250px"
                  />
                </div>
              </div>

              {/* RIGHT: Body (flexes to fill) */}
              <div className="min-w-0 flex-1">
                <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">
                  {exhibition.exhibitionType}
                </div>
                <h3 className="text-xl font-semibold leading-snug">
                  <span className="underline-offset-4 group-hover:underline">
                    {exhibition.title}
                  </span>
                </h3>
                <p className="mt-2 text-slate-300">
                  {exhibition.shortDescription}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                  <span className="inline-flex items-center rounded-full border border-slate-700 px-2 py-0.5">
                    {exhibition.year}
                  </span>
                  {exhibition.videoLink && (
                    <span className="inline-flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M10 16.5v-9l6 4.5-6 4.5Z" />
                      </svg>
                      Video
                    </span>
                  )}
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </PageTemplate>
  );
};

export default PastExhibitions;
