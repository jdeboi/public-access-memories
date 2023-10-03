import React, { useEffect, useState } from 'react';
import { IUser, Player } from '../../interfaces';
import { NetcodeController } from "./NetcodeController";
// import { MyPlayerSpawnController } from "./MyPlayerSpawnController";
import { SpatialAudioController } from "./SpatialAudioController";
import { RemotePlayersController } from "./RemotePlayersController";
import { useGameState } from './GameState';
import { useTrackPositions } from "./useTrackPositions";

import {
    useIsSpeaking,
    useLocalParticipant,
    useParticipantInfo,
    useSpeakingParticipants,
} from "@livekit/components-react";

// import { JukeBox } from "./JukeBox";
// import { JukeBoxModal } from "./JukeBoxModal";
import { JukeBoxProvider } from "./JukeBoxProvider";
import { BottomBar } from './SelectMicrophone/BottomBar';

interface AudioChatProps {
    user: IUser;
}

const AudioChat: React.FC<AudioChatProps> = ({ user }) => {

    const {
        inputs,
        remotePlayers,
        networkPositions,
        earshotRadius,
        backgroundZIndex,
        playerSpeed,
        jukeBoxPosition,
        setInputs,
        setNetworkPositions,
        setRemotePlayers,
    } = useGameState();
    const trackPositions = useTrackPositions({ remotePlayers, jukeBoxPosition });
    const { localParticipant } = useLocalParticipant();
    const { metadata: localMetadata } = useParticipantInfo({
        participant: localParticipant,
    });

    const [myPlayer, setMyPlayer] = useState<Player | null>(null);

    const [pos, setPos] = useState({ x: user.x, y: user.y })
    // const localSpeaking = useIsSpeaking(localParticipant);
    // const speakingParticipants = useSpeakingParticipants();
    // const speakingLookup = useMemo(() => {
    //     const lookup = new Set<string>();
    //     for (const p of speakingParticipants) {
    //         lookup.add(p.identity);
    //     }
    //     return lookup;
    // }, [speakingParticipants]);


    useEffect(() => {
        if (!user || !user.userName) return;
        let newPosition = {
            x: user.x,
            y: user.y,
        };
        let userN = user.userName;
        setMyPlayer({ position: newPosition, username: userN });
    }, [user.x, user.y, user.userName])


    return (
        <React.Fragment>
            <JukeBoxProvider>
                {myPlayer && (
                    <SpatialAudioController
                        myPosition={myPlayer.position}
                        trackPositions={trackPositions}
                        maxHearableDistance={earshotRadius}
                    />
                )}
                {myPlayer && (
                    <NetcodeController
                        setNetworkPositions={setNetworkPositions}
                        myPlayer={myPlayer}
                    />
                )}
                <RemotePlayersController
                    networkPositions={networkPositions}
                    setRemotePlayers={setRemotePlayers}
                />
                {/* <InputController mobileInputs={mobileInputs} setInputs={setInputs} /> */}
                {/* <MyPlayerSpawnController
                myPlayer={myPlayer}
                setMyPlayer={setMyPlayer}
                localParticipant={localParticipant}
            /> */}
            </JukeBoxProvider>
            <BottomBar />
        </React.Fragment>
    );
};

export default AudioChat;