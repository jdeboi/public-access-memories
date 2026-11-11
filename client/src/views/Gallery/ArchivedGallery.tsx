import { useParams } from "react-router-dom";
import Gallery from "./Gallery";
import NotFound from "../pages/NotFound/NotFound";
import { ARCHIVED_GALLERIES } from "../../data/CurrentShow/GalleryConfig";
import { IUsers } from "../../interfaces";

interface IArchivedGallery {
  users: IUsers;
  showWelcome: boolean;
}

const ArchivedGallery = ({ users, showWelcome }: IArchivedGallery) => {
  const { name = "" } = useParams();
  const id = ARCHIVED_GALLERIES[name.toLowerCase()];

  if (id === undefined) return <NotFound />;

  // archived shows are always open, whatever the current show's status
  return (
    <Gallery
      key={id}
      id={id}
      users={users}
      isClosed={false}
      showWelcome={showWelcome}
    />
  );
};

export default ArchivedGallery;
