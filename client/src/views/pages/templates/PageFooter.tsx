// PAMPageTemplate.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";

const PageFooter = ({ className = "" }) => {
  const newsletterPath = "https://publicaccessmemories.substack.com/welcome";
  const logoSrc =
    "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/PAM_logos/logo_white_lg.png";

  const social = {
    instagram: "https://www.instagram.com/public.access.memories/",
    github: "https://github.com/jdeboi/public-access-memories",
  };

  return (
    <footer className=" pt-10 mt-10 flex flex-col items-center gap-6 w-[80%] mb-5">
      <div>---</div>
      <img className="h-16" src={logoSrc} alt="PAM Logo" />

      {(social?.instagram || social?.github) && (
        <div className="flex items-center gap-4 text-2xl">
          {social.instagram && (
            <a
              href={social.instagram}
              className="hover:text-blue-200 focus:outline-none focus:ring focus:ring-white/40 rounded-sm"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          )}
          {social.github && (
            <a
              href={social.github}
              className="hover:text-blue-200 focus:outline-none focus:ring focus:ring-white/40 rounded-sm"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          )}
        </div>
      )}

      {newsletterPath && (
        <a
          href={newsletterPath}
          className="text-[cyan] hover:underline text-md focus:outline-none"
          aria-label="Join the newsletter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the newsletter!
        </a>
      )}
    </footer>
  );
};

export default PageFooter;
