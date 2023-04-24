import React from 'react';
import '../../Page.css';

export const AsIRecall = () => {

    return (
        <div className="Statement  Page">
            <div className="container">
                <h1>As I Recall</h1>
                {/* <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/as_i_recall.png" width="500px" /> */}

                <br />
                <iframe width="560" height="315" src="https://www.youtube.com/embed/E0_eOfj5XDs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                <hr />
                <h3>Statement</h3>

                <blockquote className="quoteC" cite="https://doi.org/10.3389/fpsyg.2012.00257">
                    “If anything has been learned about memory, it is that it is fragile and error prone...
                    Although often associated with negative consequences there is growing evidence to suggest
                    that memory's imperfections may also be a virtue. The reconstructive nature of memory is
                    believed to provide greater cognitive flexibility...and support the construction and
                    maintenance of self-identity and life-stories” (<a href="https://doi.org/10.3389/fpsyg.2012.00257">citation</a>)
                </blockquote>
                <br />
                <p>
                    "As I Recall" reflects upon the implications of digital memory-making.
                    For example, how do social media stories form or infiltrate our personal narratives, and to what extent have we maintained control over our memories as tech companies mine and monetize our digital histories?
                    How does the persistence and fixed-nature of our data (e.g. decades-old content preserved on Myspace) disrupt or augment the ability to reshape visions of the past?
                    On the other hand, does the continual copy / paste / transfer of internet imagery slowly degrade visual memories until low res web junk is all that remains?
                    These are just a few questions that seek to probe the evolving nature of memory—one that is simultaneously
                    analog and digital, permanent and pliable.
                </p>
                <br />
                <hr />
                <h3>Artists</h3>
                <p>Vidya Giri, Matthis Grunsky, Christina Humphreys,  Ciara O'Kelly, angeline marie michael meitzler, Lizz Stringfield, Allison Tanenhaus, Thanos Tsiousis, Apostolos Zerdevas</p>

                <br />
                <hr />

                <div className="galleryImg">
                    <img src="https://publicaccessmemories.com/asirecall_bg.png" />
                    <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/as_i_recall.png" />
                </div>
            </div>
        </div>
    )
};

export default AsIRecall;