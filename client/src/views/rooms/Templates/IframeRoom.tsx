// Generic full-room iframe. For Google Docs, prefer a /preview or
// /pub?embedded=true URL over /edit (the editor UI frames poorly).
const IframeRoom = ({ src, title }: { src: string; title: string }) => {
  return (
    <div
      className="Room Sketch"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: "none", display: "block" }}
        allow="autoplay; fullscreen"
        allowFullScreen
        title={title}
      ></iframe>
    </div>
  );
};

export default IframeRoom;
