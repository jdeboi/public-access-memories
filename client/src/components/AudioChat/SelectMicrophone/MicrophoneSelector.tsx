import {
  useMediaDeviceSelect,
  useRoomContext,
} from "@livekit/components-react";

const wrapperStyle = {
  width: "20px",
  display: "inline-block",
  overflow: "hidden"
}


export function MicrophoneSelector() {
  // TODO remove roomContext, this is only needed because of a bug in `useMediaDeviceSelect`
  const roomContext = useRoomContext();
  const { devices, activeDeviceId, setActiveMediaDevice } =
    useMediaDeviceSelect({ kind: "audioinput", room: roomContext });

  return (
    <select
      onChange={(e) => {
        setActiveMediaDevice(e.currentTarget.value);
      }}
      value={activeDeviceId}
      style={{ width: "20px" }}
      className="select select-sm w-full sm:max-w-[200px] max-w-[100px] m-2 select-none"
    >
      <option value={-1} disabled>
        Choose your microphone
      </option>
      {devices.map((m) => (
        <option value={m.deviceId} key={m.deviceId}>
          {m.label}
        </option>
      ))}
    </select>
  );
}
