import UnderConstructionRoom from "../Templates/UnderConstructionRoom";

const Room = () => {
  return (
    <div
      className="Room Sketch"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      }}
    >
      <iframe
        src="https://cthompto.github.io/consensus-sensing/"
        width="100%"
        height="100%"
        title="Consensus Sensing by Chelsea Thompson"
      ></iframe>
    </div>
  );
};

export default Room;
