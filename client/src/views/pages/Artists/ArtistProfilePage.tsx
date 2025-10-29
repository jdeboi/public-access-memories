// pages/Artist/Artist.tsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import PageTemplate from "../templates/PageTemplate"; // <- your existing template

import { getArtistFromNameLink } from "../../../helpers/helpers";
import { artists, rooms } from "../../../data/CurrentShow/RoomConfig";
import ArtistProfileContent from "./ArtistProfileContent";

export const ArtistProfilePage: React.FC = React.memo(function Artist() {
  const { name } = useParams();
  const artist = useMemo(() => getArtistFromNameLink(name, artists), [name]);

  if (!artist) {
    return (
      <PageTemplate title="Artist not found">
        <Link to="/artists" className="text-[cyan] hover:underline">
          &lt;-- Back to All Artists
        </Link>
        <p className="text-white/90">We couldn’t locate that profile.</p>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate title={artist.name}>
      <Link to="/artists" className="text-[cyan] hover:underline mb-4">
        &lt;-- Back to All Artists
      </Link>
      <ArtistProfileContent artist={artist} rooms={rooms} />
    </PageTemplate>
  );
});

export default ArtistProfilePage;
