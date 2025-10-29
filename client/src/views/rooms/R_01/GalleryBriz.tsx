import React, { useCallback, useState } from "react";
import { GallerySketch1Props } from "../../Gallery/Gallery1/GallerySketchTemplate1";
import { BrizQuadType } from "./briz";
import GalleryBrizSketch from "./GalleryBrizSketch";
import BrizModal from "./BrizModal";
import BrizContent from "./BrizContent";

interface GalleryBrizProps extends GallerySketch1Props {}

const GalleryBriz = (props: GalleryBrizProps) => {
  const [content, setContent] = useState<BrizQuadType | null>(null);
  const [contentHidden, setContentHidden] = useState(true);

  const openContent = useCallback((c: BrizQuadType) => {
    setContent(c);
    setContentHidden(false);
  }, []);

  const close = useCallback(() => setContentHidden(true), []);

  return (
    <>
      <GalleryBrizSketch {...props} openContent={openContent} />
      <BrizModal
        visible={!contentHidden}
        content={<BrizContent content={content} />}
        onClose={close}
      />
    </>
  );
};

export default GalleryBriz;
