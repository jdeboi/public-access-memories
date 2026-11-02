import { PastExhibitionImage } from "./Data/_PastExhibitionDataType";

interface Props {
  images: PastExhibitionImage[];
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "10px",
};

const thumbnailStyle = {
  width: "100%",
  height: "auto",
};

const ImageGrid = (props: Props) => {
  return (
    <div style={gridStyle}>
      {props.images.map((img, i) => {
        const src = typeof img === "string" ? img : img.src;
        const caption = typeof img === "string" ? undefined : img.caption;
        return (
          <figure key={i} className="m-0">
            <img src={src} alt={caption ?? ""} style={thumbnailStyle} />
            {caption && (
              <figcaption className="mt-1 text-sm font-mono text-slate-400">
                {caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
};

export default ImageGrid;
