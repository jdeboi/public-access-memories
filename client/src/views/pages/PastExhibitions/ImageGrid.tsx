interface Props {
  images: string[];
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
      {props.images.map((imgPath, i) => (
        <img src={imgPath} key={i} style={thumbnailStyle} />
      ))}
    </div>
  );
};

export default ImageGrid;
