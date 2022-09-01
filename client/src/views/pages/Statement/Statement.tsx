import React from 'react';
import '../Page.css';

export const Statement = () => {

    return (
        <div className="Statement  Page">
            <div className="container">

                {/* <h1>OPEN CALL</h1> */}
                <h1>Statement</h1>
                <br />
                <br />
                <br />
                <div className="windows">
                <h2 className="showTitle">as I recall</h2>
                {/* <h4>Deadline July 15, 2022</h4> */}
                {/* <h5>publicaccessmemories@gmail.com</h5> */}
                </div>
                <br />
                <br />

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
                <p>
                    Situating digital works within their native environment, Public Access Memories Gallery offers the HTML gallery as a canvas and accepts any digital media formats.
                </p>
                {/* <p>To submit work, email file(s), a brief statement, and bio to publicaccessmemories@gmail.com.</p> */}

                <p>
                    <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/as_i_recall.png" width="500px" />
                </p>
            </div>
        </div>
    )
};

export default Statement;