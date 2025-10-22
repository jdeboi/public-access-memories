// This component isn't being used in place of the Gallery Sketch
const Room = () => {
  return (
    <div
      className="Room Sketch"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "black",
      }}
    >
      <div className="w-full h-full max-w-[1920px] max-h-[1080px] m-auto">
        <iframe
          src="https://player.vimeo.com/video/1089821997?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          width="100%"
          height="100%"
          title="Rodell Warner - Artificial Archive: SCRYING INTIMACIES, Hallucination 1, 2024 - Single-channel video, with sound - 1920x1080"
        ></iframe>
      </div>
    </div>
  );
};

export default Room;
