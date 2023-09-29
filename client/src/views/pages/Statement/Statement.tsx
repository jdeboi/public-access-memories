import React from 'react';
import '../Page.css';
import { ShowConfig } from '../../../data/CurrentShow/ShowConfig';
import { Link } from 'react-router-dom';

export const Statement = () => {

    return (
        <div className="Statement  Page">
            <div className="container">

                <h1>Statement</h1>

                <br />
                <br />
                <br />

                {ShowConfig.isOpenCallOpen ?
                    <React.Fragment>
                        <h3>Check out the current <Link to="/opencall">open call</Link>.</h3>
                        <br />
                        <br />
                        <br />
                    </React.Fragment>
                    :

                    <React.Fragment>
                        <div className="windows">
                            <h2 className="showTitle">Fields of View</h2>
                            <h3>A <a href="https://thewrong.org/">wrong biennale</a> pavilion</h3>
                        </div>
                        <br />
                        <br />

                        <h3>Statement</h3>
                        <div className="twoCol">
                            <div>
                                <p>
                                    As part of <a href="https://thewrong.org/">The Wrong Biennale</a> 2023-24, Public Access Memories presents Fields of View, a virtual “pavilion” of 12 digital artists exploring new modes of representing, constructing, and traversing online space.
                                </p>

                                <p>
                                    The primary channel for communication in many aspects of our contemporary reality is the flatscreen computer monitor; however, our perceptions of this technology are often altered by illusions of space that betray the conditions of its surface. At the two-dimensional level, scrolling and hyperlinking operate as methods of expanding the spatial boundaries of the screen into a dense, multidimensional experience.
                                </p>
                                <p>
                                    Three-dimensional projections push this expansion further, but rarely deviate from conventional systems of linear perspective. Within such conventions exist assumptions about the relationship between ourselves and the environments we inhabit that limit our potential scope of experience.
                                </p>
                                <p>
                                    The artists in this exhibition approach the representation of space in ways that acknowledge the materiality of the screen. Whether through the presentation of alternative or extreme perspective projections, isometric diagrams, glitch landscapes, stereoscopic imagery, or simply the textual description of spatial experience, the work in this exhibition expands the space of the computer screen without attempting to erase our awareness of it.
                                </p>
                            </div>
                            <div>
                                <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/fields_of_view/announce.jpg" />
                                {/* <iframe id="p5Frame" src="https://www.publicaccessmemories.com/opencallp5"></iframe> */}
                            </div>
                        </div>



                        <br />
                        <br />

                        <p>
                            <img className="logo" src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/PAM_logos/logo_black_lg.png" height={80} />
                            <img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/LOGO-BLACK_small.png" height={80} />

                        </p>
                    </React.Fragment>
                }
            </div>
        </div>
    )
};

export default Statement;