import React from "react";
import PageTemplate from "../templates/PageTemplate";

export const OpenCallOpen = ({
  title = "Open Call",
  headline,
  subtitle,
  deadline,
  headlineBodyText,
  applyNowLink,
  visuals,
  highlightColor = "text-[cyan]",
  bodyText,
}: {
  title?: string;
  headline?: React.ReactNode;
  subtitle?: string;
  deadline?: Date;
  headlineBodyText?: React.ReactNode;
  applyNowLink?: string;
  visuals?: React.ReactNode;
  bodyText?: React.ReactNode;
  highlightColor?: string;
}) => {
  return (
    <PageTemplate title={title} subtitle={subtitle}>
      <div className="windows p-8 mb-6">
        {headline && headline}
        {deadline && (
          <h4 className={`mb-6 ${highlightColor} font-mono`}>
            DEADLINE TO APPLY: {/* include day of week in string */}
            {deadline.toLocaleString("en-US", {
              timeZone: "UTC",
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h4>
        )}

        {headlineBodyText && (
          <div className="mb-6 text-md font-mono">{headlineBodyText}</div>
        )}

        {applyNowLink && (
          <div className="text-lg">
            <a
              href={applyNowLink}
              target="_blank"
              rel="noopener noreferrer"
              className="standardButton primary"
            >
              APPLY NOW
            </a>
          </div>
        )}
      </div>
      {visuals && visuals}
      {bodyText && bodyText}
    </PageTemplate>
  );
};

export default OpenCallOpen;
