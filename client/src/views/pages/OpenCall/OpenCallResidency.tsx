import SectionHeader from "../templates/SectionHeader";
import { OpenCallOpen } from "./OpenCallOpen";

const deadline = new Date("2026-10-04T23:59:59Z");

export default function OpenCallResidency() {
  const highlightColor = "text-[cyan]";
  const headline = (
    <div className="text-2xl mb-4">
      Public Access Memories is inviting proposals for a month-long{" "}
      <strong className={highlightColor}>online residency</strong>, culminating
      in an online group exhibition.
    </div>
  );

  const bodyText = (
    <div className="space-y-4 font-mono">
      <SectionHeader title="Overview" />
      <p>
        Net artists are invited to apply for dedicated time and virtual space to
        develop works in progress, participate in studio visits and critiques,
        and share their practice with a broader community. The residency will
        culminate in an online exhibition hosted by Public Access Memories.
      </p>
      <p>
        Residents will receive feedback from peers and visiting artists,
        dedicated studio visit time, and support in developing work for the
        final online exhibition.
      </p>
      <p>
        Any artist working with digital media is encouraged to apply. We are
        especially excited about web-native works.
      </p>
      <SectionHeader title="Details" />

      <ul className="list-none space-y-1">
        <li>
          <span className={highlightColor}>DEADLINE TO APPLY: </span>
          {deadline.toLocaleString("en-US", {
            timeZone: "UTC",
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </li>
        <li>
          <span className={highlightColor}>Residency length:</span>{" "}
          Approximately 4 weeks
        </li>
        <li>
          <span className={highlightColor}>Time commitment:</span> Meetings 1–2
          times per week (~1 hour each), plus at least 6 hours per week of
          studio time
        </li>
        <li>
          <span className={highlightColor}>Questions:</span>{" "}
          <a
            href="mailto:publicaccessmemories@gmail.com"
            className="underline hover:opacity-70"
          >
            publicaccessmemories@gmail.com
          </a>
        </li>
      </ul>
      <div className="mt-6 pt-4 border-t border-current space-y-4">
        <a
          href="https://forms.gle/WU5zoHBii3jgM6fq9"
          target="_blank"
          rel="noopener noreferrer"
          className="standardButton primary inline-block"
        >
          APPLY NOW
        </a>
      </div>
    </div>
  );

  return (
    <OpenCallOpen
      title="Residency Open Call"
      headline={headline}
      deadline={deadline}
      bodyText={bodyText}
      applyNowLink="https://forms.gle/WU5zoHBii3jgM6fq9"
      visuals={
        <img
          src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/residency/assets/2026/studios_banner.jpg"
          alt="Residency studios"
          className="w-full object-cover border"
        />
      }
    />
  );
}
