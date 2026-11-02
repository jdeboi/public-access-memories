import PageTemplate from "../templates/PageTemplate";
import SectionHeader from "../templates/SectionHeader";
import { ShowConfig } from "../../../data/CurrentShow/ShowConfig";
import { residents } from "../../../data/Shows/Residency2026/Artists";

export default function Residency2026Statement() {
  const highlightColor = "text-[cyan]";

  return (
    <PageTemplate title={ShowConfig.show.title}>
      <div className="windows p-8 mb-6">
        <div className="text-2xl">
          Public Access Memories is hosting six artists for a month-long{" "}
          <strong className={highlightColor}>online residency</strong>,
          culminating in an online group exhibition.
        </div>
      </div>
      <div className="space-y-4 font-mono">
        <SectionHeader title="Overview" />
        <p>
          Residents have dedicated time and virtual space to develop works in
          progress, participate in studio visits and critiques, and share their
          practice with a broader community. The residency will culminate in an
          online exhibition hosted by Public Access Memories.
        </p>
        <p>
          Throughout the residency, artists will receive feedback from peers
          and visiting artists, dedicated studio visit time, and support in
          developing work for the final online exhibition.
        </p>

        <SectionHeader title="Residents" />
        <ul className="list-none space-y-1">
          {residents.map((artist) => (
            <li key={artist.id}>
              <span className={highlightColor}>{artist.name}</span>
            </li>
          ))}
        </ul>

        <SectionHeader title="Details" />
        <ul className="list-none space-y-1">
          {ShowConfig.dates.opens && (
            <li>
              <span className={highlightColor}>Residency begins:</span>{" "}
              {ShowConfig.dates.opens.date}
            </li>
          )}
          <li>
            <span className={highlightColor}>Residency length:</span>{" "}
            Approximately 4 weeks
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
      </div>
    </PageTemplate>
  );
}
