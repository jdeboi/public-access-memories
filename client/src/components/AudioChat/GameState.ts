import { useState } from "react";
import { Player, Vector2, JukeBoxState, Inputs } from "../../interfaces";


export const useGameState = () => {
  const [inputs, setInputs] = useState<Inputs>({ direction: { x: 0, y: 0 } });
  // const [myPlayer, setMyPlayer] = useState<Player | null>(null);
  const [remotePlayers, setRemotePlayers] = useState<Player[]>([]);
  const [networkPositions, setNetworkPositions] = useState<
    Map<string, Vector2>
  >(new Map());
  
  const [cameraOffset, setCameraOffset] = useState<Vector2>({ x: 0, y: 0 });
  const [jukeBoxPosition, setJukeBoxPosition] = useState<Vector2>({
    x: 0,
    y: -200,
  });
  const [jukeBoxState, setJukeBoxState] = useState<JukeBoxState>({
    type: "off",
  });

  return {
    inputs,
    remotePlayers,
    networkPositions,
    worldBoundaries: { minX: -775, maxX: 780, minY: -790, maxY: 770 },
    cameraOffset,
    backgroundZIndex: -100000,
    earshotRadius: 300,
    playerSpeed: 6,
    jukeBoxPosition,
    jukeBoxState,

    setInputs,
    setRemotePlayers,
    setNetworkPositions,
    setCameraOffset,
    setJukeBoxPosition,
    setJukeBoxState,
  };
};
