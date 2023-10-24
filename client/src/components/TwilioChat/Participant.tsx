import React, { useState, useEffect, useRef } from "react";
import { IUser } from "../../interfaces";

type ParticipantProps = {
    participant: any;
    user: IUser;
    volume: number;
}
const Participant = ({ volume, user, participant }: ParticipantProps) => {
    const [audioTracks, setAudioTracks] = useState<Array<any>>([]);
    const audioRef = useRef<HTMLAudioElement>(null);

    const trackpubsToTracks = (trackMap: Map<any, any>) =>
        Array.from(trackMap.values())
            .map((publication) => publication.track)
            .filter((track) => track !== null);


    useEffect(() => {
        setAudioTracks(trackpubsToTracks(participant.audioTracks));

        const trackSubscribed = (track: any) => {
            if (track.kind === "audio") {
                setAudioTracks((audioTracks) => [...audioTracks, track]);
            }
        };

        const trackUnsubscribed = (track: any) => {
            if (track.kind === "audio") {
                setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
            }
        };

        participant.on("trackSubscribed", trackSubscribed);
        participant.on("trackUnsubscribed", trackUnsubscribed);

        return () => {
            setAudioTracks([]);
            participant.removeAllListeners();
        };
    }, [participant]);

    useEffect(() => {
        const audioTrack = audioTracks[0];
        if (audioTrack) {
            audioTrack.attach(audioRef.current);
            return () => {
                audioTrack.detach();
            };
        }
    }, [audioTracks]);

    useEffect(() => {
        if (audioRef.current) {
            // Use type assertion (cast) to explicitly set the volume property
            (audioRef.current as HTMLAudioElement).volume = user.isMuted || user.isGlobalMuted ? 0 : volume;
          }
    }, [volume])
    

    return (
        <div className="participant">
            <div>{user.userName} - {participant.sid}</div>
            <audio
                ref={audioRef}
                autoPlay={true}
                muted={user.isMuted || user.isGlobalMuted}
            />
        </div>
    );
};

export default Participant;