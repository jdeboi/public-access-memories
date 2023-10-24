import React, { useState, useEffect, useCallback } from 'react';
// import TwilioAudioComponent from './TwilioAudioComponent';
import { Room as RoomTwilio, TrackPublication, connect, createLocalAudioTrack } from 'twilio-video';

import Video from 'twilio-video';
import { IUser, IUsers } from '../../interfaces';
import TwilioAudio2 from './TwilioAudio2';
// import { audioRoom } from '../../data/CurrentShow/GlobalConfig';


interface TwilioChatProps {
    user: IUser;
    users: IUsers;
}

const TwilioChat: React.FC<TwilioChatProps> = ({ user, users }) => {
    const [token, setToken] = useState('');
    const [connecting, setConnecting] = useState(false);
    const [room, setRoom] = useState<RoomTwilio | null>(null);

    useEffect(() => {
        // Fetch token from backend based on identity (use a form or similar)
        const url = process.env.NODE_ENV !== "production" ? "http://localhost:3001" : "";

        const fetchToken = async () => {
            try {
                const response = await fetch(`${url}/api/get-twilio-token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({ identity: user.id })  // Change this as required
                })

                const data = await response.json();

                if (data.entered) {
                    const connectOptions: Video.ConnectOptions = {
                        name: "audio-broadcast-room",
                        audio: true, //role === 'broadcaster',
                        video: false
                    };
    
                    Video.connect(data.token, connectOptions)
                        .then((joinedRoom) => {
                            setConnecting(false);
                            setRoom(joinedRoom);
                        })
                        .catch((err) => {
                            console.error(err);
                            setConnecting(false);
                        });
                    setToken(data.token);
                }
                else {
                    alert("Apologies! There are too many users to connect your audio...");
                }

            } catch (error) {
                console.error(error, "Error getting twilio audio token...");
            }
        }

        if (user.id !== "0" && user.userName && !token) {
            fetchToken();
        }
        // Cleanup: Disconnect from the room when the component unmounts
        return () => {
            if (room) {
                room.disconnect();
                setRoom(null);
                setToken('');
            }
        };

    }, [user.userName, user.id]);


    return (
        <div style={{ color: "white" }}>
            {
                token && room &&
                <TwilioAudio2
                    user={user}
                    users={users}
                    room={room}
                    token={token}
                    role="broadcaster"
                />
            }

        </div>
    );
}

export default TwilioChat;



