import React, { useEffect, useState } from 'react';
import { IUser, Player } from '../../interfaces';
import { NetcodeController } from "./NetcodeController";
// import { MyPlayerSpawnController } from "./MyPlayerSpawnController";
import { SpatialAudioController } from "./SpatialAudioController";
import { RemotePlayersController } from "./RemotePlayersController";
import { useGameState } from './GameState';
import { useTrackPositions } from "./useTrackPositions";
import { JukeBoxProvider } from './JukeBoxProvider';
import { useDispatch } from 'react-redux';

import {
    useIsSpeaking,
    useLocalParticipant,
    useParticipantInfo,
    useSpeakingParticipants,
} from "@livekit/components-react";
import { setIsMuted, setIsSpeaking } from '../../store/user';

// import { JukeBox } from "./JukeBox";
// import { JukeBoxModal } from "./JukeBoxModal";
// import { JukeBoxProvider } from "./JukeBoxProvider";
// import { JukeBox } from './JukeBox';
// import WineBar from '../../views/Gallery/components/p5/Bars/WineBar';
// import { DJBotUserCoords } from '../../data/FieldsOfView/BotConfig';


interface AudioChatProps {
    user: IUser;
}

const AudioChat: React.FC<AudioChatProps> = ({ user }) => {
    
    const {
        remotePlayers,
        networkPositions,
        earshotRadius,
        jukeBoxPosition,
        setNetworkPositions,
        setRemotePlayers,
    } = useGameState();
    const trackPositions = useTrackPositions({ remotePlayers, jukeBoxPosition });
    const { isMicrophoneEnabled, localParticipant } = useLocalParticipant();
    const localSpeaking = useIsSpeaking(localParticipant);
    const dispatch = useDispatch();
    
    const [myPlayer, setMyPlayer] = useState<Player | null>(null);

    useEffect(() => {
        if (!user || !user.userName) return;
        let newPosition = {
            x: user.x,
            y: user.y,
        };
        let userN = user.userName;
        setMyPlayer({ position: newPosition, username: userN });
    }, [user.x, user.y, user.userName])

   
    useEffect(() => {
        dispatch(setIsSpeaking({isSpeaking: localSpeaking}))
    }, [localSpeaking])

    useEffect(() => {
        dispatch(setIsMuted({isMuted: !isMicrophoneEnabled}))
    }, [isMicrophoneEnabled])

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
                {/* {myPlayer && (<JukeBox
                    backgroundZIndex={0}
                    position={DJBotUserCoords}
                />)} */}
            </JukeBoxProvider>
        </React.Fragment>
    );
};

export default AudioChat;