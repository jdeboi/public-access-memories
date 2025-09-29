import { artists } from "../../../../data/Shows/HomeBody/RoomConfig";
import ExhibitionPageTemplate from "../../templates/ExhibitionPageTemplate";

export const HomeBody = () => {
  return (
    <ExhibitionPageTemplate
      title="home &lt;/body&gt;"
      year="2022"
      awsLink="home_body"
      artists={artists}
      shortDescription="“home &lt;/body&gt;” considers the spaces, experiences, and ephemera of digital homemaking."
      videoLink="https://www.youtube.com/embed/o-Zw43PhvR8"
      // imgs={imgNames}
      exhibitionType="Wrong Biennale Pavilion"
      statement={
        <>
          <p>
            <strong>home &lt;/body&gt;</strong> considers the spaces,
            experiences, and ephemera of digital homemaking. From housekeeping
            chores (decluttering desktops and inboxes) to nesting rituals
            (websurfing for superlative sourdough starter), the meaning of home
            is rapidly evolving.
          </p>
          <p>
            In addition to a new visual language, the exhibition seeks to
            uncover tensions of digital denizenship, for example, the nature of
            home as a &ldquo;safe haven&rdquo; in an age of surveillance
            capitalism, fake news, and internet trolls. Particularly in the
            context of a global pandemic, the paradox of home as both sanctuary
            and asylum, as both a confined and liberated space, offers ample
            opportunity for reflection.
          </p>
          <p>
            Situating digital works within their native environment, public
            access memories Gallery offers the HTML gallery as a canvas. Artists
            in this pavilion use various digital media formats as they probe the
            new meaning of home.
          </p>
        </>
      }
    />
  );
};

export default HomeBody;
