import { artists } from "../../../../data/Shows/AsIRecall/RoomConfig";
import ExhibitionPageTemplate from "../../templates/ExhibitionPageTemplate";

export const AsIRecall = () => {
  return (
    <ExhibitionPageTemplate
      title="As I Recall"
      year="2022"
      awsLink="as_i_recall"
      artists={artists}
      exhibitionType="Group Show"
      shortDescription="“As I Recall” explores how digital platforms shape, fix, and monetize our memories—reframing personal narratives as data."
      videoLink="https://www.youtube.com/embed/E0_eOfj5XDs"
      imgs={[
        "https://publicaccessmemories.com/asirecall_bg.png",
        "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/as_i_recall.png",
      ]}
      statement={
        <>
          <blockquote
            className="quoteC"
            cite="https://doi.org/10.3389/fpsyg.2012.00257"
          >
            “If anything has been learned about memory, it is that it is fragile
            and error prone... Although often associated with negative
            consequences there is growing evidence to suggest that memory's
            imperfections may also be a virtue. The reconstructive nature of
            memory is believed to provide greater cognitive flexibility...and
            support the construction and maintenance of self-identity and
            life-stories” (
            <a href="https://doi.org/10.3389/fpsyg.2012.00257">citation</a>)
          </blockquote>

          <p>
            "As I Recall" reflects upon the implications of digital
            memory-making. For example, how do social media stories form or
            infiltrate our personal narratives, and to what extent have we
            maintained control over our memories as tech companies mine and
            monetize our digital histories? How does the persistence and
            fixed-nature of our data (e.g. decades-old content preserved on
            Myspace) disrupt or augment the ability to reshape visions of the
            past? On the other hand, does the continual copy / paste / transfer
            of internet imagery slowly degrade visual memories until low res web
            junk is all that remains? These are just a few questions that seek
            to probe the evolving nature of memory—one that is simultaneously
            analog and digital, permanent and pliable.
          </p>
        </>
      }
    />
  );
};

export default AsIRecall;
