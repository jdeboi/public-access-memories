import { Player } from "../../interfaces";

import { Participant } from "livekit-client";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  localParticipant: Participant | null;
  myPlayer: Player | null;
  setMyPlayer: Dispatch<SetStateAction<Player | null>>;
};

export function MyPlayerSpawnController({
  setMyPlayer,
  myPlayer,
  localParticipant,
}: Props) {
  useEffect(() => {
    if (myPlayer === null && localParticipant?.identity) {
      setMyPlayer({
        username: localParticipant.identity,
        position: { x: 10, y: 0 },
      });
    }
  }, [localParticipant, myPlayer, setMyPlayer]);
  return null;
}
