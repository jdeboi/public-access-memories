import {
  faInstagram,
  faBluesky,
  faInternetExplorer,
} from "@fortawesome/free-brands-svg-icons";
import { normalizeBlueSky, normalizeInsta } from "../../helpers/helpers";
import { useState } from "react";
import { IArtist } from "../../interfaces";
import Frame from "../Frame/Frame";
import IconLink from "../../views/pages/Artists/IconLink";

export default function ArtistMenu({ artist }: { artist: IArtist | null }) {
  const [isHidden, setIsHidden] = useState(false);

  if (!artist) return null;

  const socials = {
    instagram: normalizeInsta(artist.instaLink),
    bluesky: normalizeBlueSky(artist.blueSkyLink),
    website: artist.webLink || null,
  };
  return (
    <Frame
      title=""
      isHidden={isHidden}
      unbounded={false}
      onHide={() => setIsHidden(true)}
      windowStyle={{ background: "white" }}
      content={
        <div className="w-[60px] m-auto">
          <div className="flex flex-col gap-3">
            {artist?.bio && (
              <div className="windows p-2 text-center w-full m-auto">
                <IconLink
                  href={`/artist/${artist?.nameLink}`}
                  icon={faInternetExplorer}
                  label="Artist Statement"
                />
              </div>
            )}
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
          </div>
        </div>
      }
      width={70}
      height={200}
      x={100}
      y={100}
      z={100}
    />
  );
}
