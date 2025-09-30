// About.jsx
import React from "react";
import PageTemplate from "../templates/PageTemplate";
import SectionHeader from "../templates/SectionHeader";

const About = () => {
  return (
    <PageTemplate title="About">
      <div className="windows p-8">
        <div className="mb-4">
          Public Access Memories (PAM) is a virtual net art gallery that
          situates digital works within their native environment. The gallery
          hosts exhibitions (solo and group), artist talks, and more. An
          evolving canvas, PAM invites collaborative brainstorming and critical
          reflection on the nature of the white cube online.
        </div>
        <div className="flex flex-row gap-4">
          <img
            src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/PAM_logos/logo_black_lg.png"
            className="h-20 w-auto object-contain"
            alt="PAM logo"
          />
          <img
            src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/assets/LOGO-BLACK_small.png"
            height={80}
            className="h-20 w-auto object-contain"
            alt="Wrong logo"
          />
        </div>
      </div>
      {/* Child content slots into the template here */}
      <section className="font-mono">
        <SectionHeader title="Creators" />
        <p className="leading-relaxed">
          &gt;{" "}
          <a
            href="https://instagram.com/jdeboi"
            className="text-blue-200 hover:underline"
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
            className="text-blue-200 hover:underline"
          >
            Matthis Grunsky
          </a>{" "}
          is an artist and educator based out of Winnipeg, Manitoba. He is
          interested in the aesthetic potential of computation both on the
          computer screen and in physical media.
        </p>
      </section>

      <section className="font-mono">
        <SectionHeader title="Guest Curators" />
        <p className="leading-relaxed">
          &gt;{" "}
          <a
            href="https://instagram.com/jon.cham.bers"
            className="text-blue-200 hover:underline"
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
      </section>

      <section className="font-mono">
        <SectionHeader title="Get Involved" />
        <p className="leading-relaxed">
          To suggest a curatorial project, collaborate on a gallery feature,
          and/or submit work, please reach out to{" "}
          <a
            href="mailto:publicaccessmemories@gmail.com"
            className="text-blue-200 hover:underline"
          >
            publicaccessmemories@gmail.com
          </a>
          . For developers, you can check out the{" "}
          <a
            href="https://github.com/jdeboi/public-access-memories"
            className="text-blue-200 hover:underline"
          >
            github repo
          </a>
          .
        </p>
      </section>
    </PageTemplate>
  );
};

export default About;
