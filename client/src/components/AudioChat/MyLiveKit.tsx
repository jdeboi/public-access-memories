import { useEffect, useState } from 'react';
import '@livekit/components-styles';
import AudioChat from './AudioChat';
import { WebAudioContext } from "../../providers/audio/webAudio";

import {
    LiveKitRoom
} from '@livekit/components-react';

// import { Track } from 'livekit-client';
import { IUser } from '../../interfaces';

const serverUrl = 'wss://pam-lx6e6nu8.livekit.cloud';

interface MyLiveKitProps {
    user: IUser;
}

const MyLiveKit: React.FC<MyLiveKitProps> = ({ user }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!user || !user.userName) return;
        async function fetchToken() {
            try {
                const identity = user.userName;  // You can dynamically set this based on your application's context
                const roomName = 'home';  // user.roomURL

                const response = await fetch(`http://localhost:3001/gettoken?identity=${identity}&roomName=${roomName}`);
                const data = await response.json();

                setToken(data.token);
            } catch (error) {
                console.error("Error fetching the token:", error);
            }
        }

        fetchToken();
    }, [user]);

    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

    useEffect(() => {
        setAudioContext(new AudioContext());
        return () => {
            setAudioContext((prev) => {
                prev?.close();
                return null;
            });
        };
    }, []);

    if (!audioContext) {
        return null;
    }

    return (
        <div>
            {token ?

                <LiveKitRoom
                    // video={false}
                    // audio={true}
                    token={token}
                    connectOptions={{ autoSubscribe: false }}
                    serverUrl={serverUrl}
                    data-lk-theme="default" // Use the default LiveKit theme for nice styles.
                    options={{ expWebAudioMix: { audioContext } }}
                >
                    <WebAudioContext.Provider value={audioContext}>


                        {/* Your custom component with basic video conferencing functionality. */}
                        {/* <MyVideoConference /> */}
                        {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
                        {/* <StartAudio label="Click to allow audio playback" /> */}


                        {/* <RoomAudioRenderer />
                    <TrackToggle source={Track.Source.Microphone} /> */}
                        <AudioChat user={user} />
                    </WebAudioContext.Provider>
                </LiveKitRoom>
                :
                null
            }

        </div>
    );
}

export default MyLiveKit;
// function MyVideoConference() {
//     // `useTracks` returns all camera and screen share tracks. If a user
//     // joins without a published camera track, a placeholder track is returned.
//     const tracks = useTracks(
//         [
//             { source: Track.Source.Camera, withPlaceholder: true },
//             { source: Track.Source.ScreenShare, withPlaceholder: false },
//         ],
//         { onlySubscribed: false },
//     );
//     return (
//         <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
//             {/* The GridLayout accepts zero or one child. The child is used
//       as a template to render all passed in tracks. */}
//             <ParticipantTile />
//         </GridLayout>
//     );
// }