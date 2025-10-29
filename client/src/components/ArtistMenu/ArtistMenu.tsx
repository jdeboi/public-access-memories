import { normalizeBlueSky, normalizeInsta } from "../../helpers/helpers";
import { useState } from "react";
import { IArtist } from "../../interfaces";
import Frame from "../Frame/Frame";
import BrizModal from "../../views/rooms/R_01/BrizModal";
import { faFile, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ArtistProfileMenu from "./ArtistProfileMenu";
import IconLinkArtistMenu from "../../views/pages/Artists/IconLinkArtistMenu";
import {
  faBluesky,
  faInstagram,
  faInstagramSquare,
  faInternetExplorer,
} from "@fortawesome/free-brands-svg-icons";

export default function ArtistMenu({
  artist,
  variant = "dark",
}: {
  artist: IArtist | null;
  variant?: "dark" | "light";
}) {
  const [isHidden, setIsHidden] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [currentVisible, setCurrentVisible] = useState<number | null>(null);

  if (!artist) return null;

  const dragShieldStyle: React.CSSProperties = {
    position: "absolute",
    inset: 100,
    zIndex: 50 /* above the iframe, below your draggable if needed */,
    background: "transparent",
    pointerEvents: "auto",
    cursor: "grabbing",
  };

  const numberOfSocials =
    1 +
    (artist.instaLink ? 1 : 0) +
    (artist.blueSkyLink ? 1 : 0) +
    (artist.webLink ? 1 : 0) +
    (artist.essayLink ? 1 : 0);
  const heightFrame = numberOfSocials * 62;

  return (
    <>
      {dragging && <div style={dragShieldStyle} />}
      <Frame
        title=""
        isHidden={isHidden}
        unbounded={false}
        onHide={() => setIsHidden(true)}
        windowStyle={{
          background: variant === "light" ? "#ffffffaa" : "#000000aa",
        }}
        content={
          <div className="w-[60px] m-auto pointer-events-auto">
            <div className="flex flex-col gap-3 mt-2">
              {artist && (
                <IconLinkArtistMenu
                  icon={faInfoCircle}
                  label="Info"
                  onClick={() => setCurrentVisible(1)}
                />
              )}
              {artist?.essay && (
                <IconLinkArtistMenu
                  icon={faFile}
                  label="Essay"
                  onClick={() => setCurrentVisible(0)}
                />
              )}
              {artist?.essayLink && (
                <IconLinkArtistMenu
                  href={artist?.essayLink}
                  icon={faFile}
                  label="Essay"
                  className="text-white"
                />
              )}
              {artist?.instaLink && (
                <IconLinkArtistMenu
                  href={artist?.instaLink}
                  icon={faInstagramSquare}
                  label="Instagram"
                  className="text-white"
                />
              )}
              {artist?.blueSkyLink && (
                <IconLinkArtistMenu
                  href={artist?.blueSkyLink}
                  icon={faBluesky}
                  label="Bluesky"
                  className="text-white"
                />
              )}
              {artist?.webLink && (
                <IconLinkArtistMenu
                  href={artist?.webLink}
                  icon={faInternetExplorer}
                  label="Website"
                  className="text-white"
                />
              )}
            </div>
          </div>
        }
        width={70}
        height={heightFrame}
        onStart={() => setDragging(true)}
        onStop={() => setDragging(false)}
        x={20}
        y={130}
        z={400}
      />
      <BrizModal
        visible={currentVisible === 0}
        content={<div>{artist?.essay}</div>}
        onClose={() => setCurrentVisible(null)}
      />
      <BrizModal
        visible={currentVisible === 1}
        content={<ArtistProfileMenu artist={artist} />}
        onClose={() => setCurrentVisible(null)}
      />
    </>
  );
}
