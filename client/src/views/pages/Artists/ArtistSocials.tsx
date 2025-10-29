import { IArtist } from "../../../interfaces";
import { normalizeBlueSky, normalizeInsta } from "../../../helpers/helpers";
import {
  faInstagram,
  faBluesky,
  faInternetExplorer,
} from "@fortawesome/free-brands-svg-icons";
import IconLink from "./IconLink";
import { faFile } from "@fortawesome/free-solid-svg-icons";

export default function ArtistSocials({ artist }: { artist: IArtist }) {
  const socials = {
    instagram: normalizeInsta(artist.instaLink),
    bluesky: normalizeBlueSky(artist.blueSkyLink),
    website: artist.webLink || null,
    essayLink: artist.essayLink || null,
  };

  return (
    <div className="mt-6 ">
      <IconLink
        href={socials.instagram ?? undefined}
        icon={faInstagram}
        label="Instagram"
      />
      <IconLink
        href={socials.bluesky ?? undefined}
        icon={faBluesky}
        label="Bluesky"
      />
      <IconLink
        href={socials.website ?? undefined}
        icon={faInternetExplorer}
        label="Website"
      />
      <IconLink
        href={socials.essayLink ?? undefined}
        icon={faFile}
        label="Essay"
      />
    </div>
  );
}
