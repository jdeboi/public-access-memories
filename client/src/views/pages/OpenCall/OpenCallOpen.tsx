import React from 'react';
import '../Page.css';

export const OpenCallOpen = () => {

    return (
        <React.Fragment>
            <div className="windows">
                <h2 className="showTitle">Fields of View</h2>
                <h3>A <a href="https://thewrong.org/">wrong biennale</a> pavilion</h3>
                <h4>Deadline July 1st, 2023</h4>
                <h5><a href="mailto:publicaccessmemories@gmail.com">publicaccessmemories@gmail.com</a></h5>
            </div>
            <br />
            <br />
            {/* <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/as_i_recall.png" width="500px" /> */}
            {/* <hr /> */}
            <h3>Statement</h3>
            <div className="twoCol">
                <div>
                    <p>As part of the 2023-24 <a href="https://thewrong.org/">wrong biennale</a>, Public Access Memories Gallery invites submissions for Fields of View, an exhibition that aims to reimagine the dimensionality of virtual space. Submissions will be accepted in any digital media format and will be exhibited within the HTML Gallery hosted by Public Access Memories.</p>

                    <p>The primary channel for communication in many aspects of our contemporary reality is the flatscreen computer monitor; however, our perceptions of this
                        technology are often altered by illusions of space that betray
                        the conditions of its surface. At the two-dimensional level,
                        scrolling and hyperlinking operate as methods of expanding the spatial
                        boundaries of the screen into a dense, multidimensional experience.
                        Three-dimensional projections push this expansion further,
                        but rarely deviate from conventional systems of linear perspective.
                        Within such conventions exist assumptions about the relationship
                        between ourselves and the environments we inhabit that limit our potential scope of
                        experience. Public Access Memories encourages submissions that break these
                        conventions of virtual space, exploring fresh, inventive, and critical
                        perspectives that open divergent fields of view.</p>
                </div>
                <div>
                    <iframe id="p5Frame" src="https://www.publicaccessmemories.com/opencallp5"></iframe>
                </div>
            </div>



            <br />
            <br />
          
            <h3>Submissions</h3>
            <p>To submit work, email <a href="mailto:publicaccessmemories@gmail.com">publicaccessmemories@gmail.com</a>:</p>
            <ul>
                <li>&#8627; file(s)</li>
                <li>&#8627; a brief statement</li>
                <li>&#8627; a brief bio</li>
            </ul>
            <h4>Deadline July 1st, 2023</h4>
            <br />
            <br />
            <br />
            <br />
            <p>
                <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/LOGO-BLACK_small.png" width={200} />
                {/* <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/as_i_recall/as_i_recall.png" width="500px" /> */}
            </p>
        </React.Fragment>
    )
};

export default OpenCallOpen;