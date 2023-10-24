// import React, { useState, useEffect, useCallback } from 'react';
import { Room as RoomTwilio, TrackPublication, connect, createLocalAudioTrack } from 'twilio-video';
import { IUser, IUsers } from '../../interfaces';
import MicrophoneBar from './MicrophoneBar/MicrophoneBar';
// import { ParticipantAudioTracks } from './components/ParticipantAudioTracks';
// import Video from 'twilio-video';

// https://github.com/philnash/twilio-video-react-hooks/tree/master/src

interface AudioProps {
    user: IUser;
    users: IUsers;
    token: string;
    role: 'broadcaster' | 'listener';
    room: RoomTwilio;
}

function TwilioAudio2({ room, user, users }: AudioProps) {

    return (
        <>
            {room &&
                <MicrophoneBar
                    user={user}
                    room={room}
                    users={users}
                />}
        </>

    )
}

export default TwilioAudio2;