import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
// import SubscribeForm from '../SubscribeForm/SubscribeForm';
import SubscribeSendInBlue from '../SubscribeForm/SubscribeSendInBlue';

import '../Page.css';
import { Link } from 'react-router-dom';

export const About = () => {

    return (
        <div className="About Page">
            <div className="container">
                <h1 className="">About </h1>
                <br />
                <div className="">
                    <p>
                        Public Access Memories is a virtual art gallery that originally began as an MFA thesis exhibition. Created by Jenna deBoisblanc
                        (<a href="https://instagram.com/jdeboi">@jdeboi</a>), the online space invites collaborative
                        brainstorming and critical reflection on the the nature of the white cube online. An evolving canvas, the
                        gallery seeks to host exhibitions (solo and group), artist
                        talks, and more.
                    </p>
                    {/* <p>
                    What is the nature of the white cube online? Ostensibly
                    cyberspace creates the opportunity for radical,
                    limitless reinvention. To what extent are we leveraging
                    this creative flexibility to deconstruct social and
                    economic barriers (for example, systemic racism) that
                    prevent access to the art world? How do the digital spaces
                    we code facilitate or detract from the process of viewing,
                    analyzing, sharing, and enjoying art?
                </p> */}
                    <p>
                        To suggest a curatorial project, collaborate on a gallery
                        feature, and/or submit work, please feel free to reach out
                        to <a href="mailto:publicaccessmemories@gmail.compublicaccessmemories@gmail.com">publicaccessmemories@gmail.com</a>. For developers, you can
                        check out the <a href="https://github.com/jdeboi/public-access-memories">github repo</a>.
                    </p>
                </div>
                <br />
                <div className="">
                    <h3>
                        <a href="https://www.instagram.com/public.access.memories/"><FontAwesomeIcon icon={faInstagram} /></a>
                        <span style={{ paddingRight: 10 }}></span>
                        <a href="https://github.com/jdeboi/public-access-memories"><FontAwesomeIcon icon={faGithub} /></a>
                    </h3>
                </div>
                <div>
                    <p><Link to="/newsletter">Join the newsletter!</Link></p>
                </div>
                {/* <SubscribeForm /> */}
                {/* <SubscribeSendInBlue /> */}
            </div >
        </div>
    )
};

export default About;