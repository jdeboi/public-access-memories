import { artists } from "../../../../data/Shows/Residency/RoomConfig";
import ExhibitionPageTemplate from "../../templates/ExhibitionPageTemplate";

export const Residency2025 = () => {
  const sortedArtists = [...artists];

  //   remove hostbot from artists
  const filteredArtists = sortedArtists.filter(
    (artist) => artist.name !== "hostBot"
  );

  return (
    <ExhibitionPageTemplate
      title="Residency 2025"
      year="2025"
      awsLink="residency"
      artists={filteredArtists}
      videoLink="https://www.youtube.com/embed/syVPp78A1iA?si=74usAd5uR9Lo53M7"
      // imgs={imgNames}
      exhibitionType="Residency"
      statement={
        <>
          <p>
            Public Access Memories was excited to offer two month-long online
            residency programs in the summer of 2025. Net artists met weekly to
            participate in studio visits and critiques, and discuss works in
            progress. The residency concluded with a virtual exhibition.
          </p>
        </>
      }
    />
  );
};

export default Residency2025;
