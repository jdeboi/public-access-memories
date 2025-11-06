import React from "react";

export default function SindersReadme() {
  const toolkitUrl = "https://carolinesinders.com/feminist-data-set/";
  const projectUrl = "https://carolinesinders.com";

  return (
    <section className="">
      <p>
        <strong>Feminist Data Set</strong> is a participatory data archive and
        long-term art project by{" "}
        <a
          href={projectUrl}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:opacity-90 text-blue-600"
        >
          Caroline Sinders
        </a>{" "}
        that examines every step of the machine-learning pipeline—data
        collection, labeling, training, model design, and deployment—through a{" "}
        <em>feminist and intersectional lens</em>. The project invites the
        public to help create a feminist data set for ethical, transparent, and
        inclusive AI systems.
      </p>

      <h4 className="text-lg font-semibold mt-8">What You Can Submit</h4>
      <ol className="list-decimal list-outside ml-10 space-y-2">
        <li>
          <span className="font-medium">An existing feminist data source</span>{" "}
          — share a work (media, artwork, text, etc.) that belongs in this
          archive.
        </li>
        <li>
          <em>Original</em> writing or materials (reflections, documentation of
          practice, etc.) created for this dataset.
        </li>
      </ol>

      <h4 className="text-lg font-semibold mt-8">Guidelines</h4>
      <ul className="list-disc list-outside ml-6 space-y-2">
        <li>
          Include a brief description explaining your submission and its
          relevance to feminist, queer, or activist values.
        </li>
        <li>
          <strong>This is a trans-inclusive dataset.</strong> We will reject
          anything non-intersectional.
        </li>
        <li>
          Approved submissions are typically reviewed within{" "}
          <strong>24 hours</strong>.
        </li>
      </ul>

      <p className="mt-8">
        Explore resources & download the open-source toolkit:{" "}
        <a
          href={toolkitUrl}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:opacity-90 text-blue-600"
        >
          Feminist Data Set Toolkit
        </a>
        .
      </p>
    </section>
  );
}
