import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";
// import SubscribeForm from '../SubscribeForm/SubscribeForm';
import SubscribeSendInBlue from "../SubscribeForm/SubscribeSendInBlue";

import "../Page.css";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="About Page">
      <div className="container">
        <h1 className="">About </h1>
        <br />
        <div className="">
          <p>
            Public Access Memories (PAM) is a virtual net art gallery that
            situates digital works within their native environment. The gallery
            hosts exhibitions (solo and group), artist talks, and more. An
            evolving canvas, PAM invites collaborative brainstorming and
            critical reflection on the nature of the white cube online.
          </p>
          <br />
          <h3>Creators</h3>
          <p>
            &gt;<a href="https://instagram.com/jdeboi">Jenna deBoisblanc</a> is
            the founder and chief developer of PAM. A net artist from New
            Orleans, she considers how the internet mediates the human
            experience.
            <br />
            <br />
            &gt; <a href="https://www.matthisgrunsky.ca/">Matthis Grunsky</a> is
            an artist and educator based out of Winnipeg, Manitoba. He is
            interested in the aesthetic potential of computation both on the
            computer screen and in physical media.
          </p>

          <br />
          <br />
          <h3>Get Involved</h3>
          <p>
            To suggest a curatorial project, collaborate on a gallery feature,
            and/or submit work, please feel free to reach out to{" "}
            <a href="mailto:publicaccessmemories@gmail.compublicaccessmemories@gmail.com">
              publicaccessmemories@gmail.com
            </a>
            . For developers, you can check out the{" "}
            <a href="https://github.com/jdeboi/public-access-memories">
              github repo
            </a>
            .
          </p>
        </div>
        <br />
        <br />
        <br />
        <div className="footer">
          <div>
            <img
              className="logo"
              src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/PAM_logos/logo_white_lg.png"
            />
          </div>
          <div className="socials">
            <a href="https://www.instagram.com/public.access.memories/">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <span style={{ paddingRight: 10 }}></span>
            <a href="https://github.com/jdeboi/public-access-memories">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <div>
            <Link to="/newsletter">Join the newsletter!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
