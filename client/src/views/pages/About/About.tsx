import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import SubscribeSendInBlue from "../SubscribeForm/SubscribeSendInBlue";

export const About = () => {
  return (
    <div className="bg-gradient-to-b text-white from-[#5b43cd] to-[#0da6ff] min-h-screen overflow-y-auto flex flex-col items-center px-4 py-12">
      <div className="max-w-4xl w-full mb-10">
        <h1 className="text-4xl font-bold mb-6">About</h1>

        <p className="mb-6 leading-relaxed">
          Public Access Memories (PAM) is a virtual net art gallery that
          situates digital works within their native environment. The gallery
          hosts exhibitions (solo and group), artist talks, and more. An
          evolving canvas, PAM invites collaborative brainstorming and critical
          reflection on the nature of the white cube online.
        </p>

        <h3 className="text-2xl font-semibold mt-10 mb-2">Creators</h3>
        <p className="mb-6 leading-relaxed">
          &gt;{" "}
          <a
            href="https://instagram.com/jdeboi"
            className="text-blue-400 hover:underline"
          >
            Jenna deBoisblanc
          </a>{" "}
          is the founder and chief developer of PAM. A net artist from New
          Orleans, she considers how the internet mediates the human experience.
          <br />
          <br />
          &gt;{" "}
          <a
            href="https://www.matthisgrunsky.ca/"
            className="text-blue-400 hover:underline"
          >
            Matthis Grunsky
          </a>{" "}
          is an artist and educator based out of Winnipeg, Manitoba. He is
          interested in the aesthetic potential of computation both on the
          computer screen and in physical media.
        </p>

        <h3 className="text-2xl font-semibold mt-10 mb-2">Guest Curators</h3>
        <p className="mb-6 leading-relaxed">
          &gt;{" "}
          <a
            href="https://instagram.com/jon.cham.bers"
            className="text-blue-400 hover:underline"
          >
            Jon Chambers
          </a>{" "}
          is an artist and educator based in New Orleans, teaching interactive
          media and games at Tulane University. His work spans digital
          interfaces, games, code, and installation, exploring themes of
          consumerism, surveillance, play, and speculative futures, often using
          imperfect 3D body scans as metaphors for fractured life in a
          technological world.
        </p>

        <h3 className="text-2xl font-semibold mt-10 mb-2">Get Involved</h3>
        <p className="mb-10 leading-relaxed">
          To suggest a curatorial project, collaborate on a gallery feature,
          and/or submit work, please feel free to reach out to{" "}
          <a
            href="mailto:publicaccessmemories@gmail.com"
            className="text-blue-400 hover:underline"
          >
            publicaccessmemories@gmail.com
          </a>
          . For developers, you can check out the{" "}
          <a
            href="https://github.com/jdeboi/public-access-memories"
            className="text-blue-400 hover:underline"
          >
            github repo
          </a>
          .
        </p>

        <div className="border-t border-white/20 pt-10 mt-10 flex flex-col items-center gap-6">
          <img
            className="h-16"
            src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/PAM_logos/logo_white_lg.png"
            alt="PAM Logo"
          />

          <div className="flex items-center gap-4 text-2xl">
            <a
              href="https://www.instagram.com/public.access.memories/"
              className="hover:text-blue-400"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="https://github.com/jdeboi/public-access-memories"
              className="hover:text-blue-400"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>

          <Link
            to="/newsletter"
            className="text-blue-400 hover:underline text-sm"
          >
            Join the newsletter!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
