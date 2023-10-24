import React, { useEffect, useState } from "react";
import Participant from "../Participant";
import { Room as RoomTwilio, Participant as ParticipantTwilio } from "twilio-video";
import { IUser, IUsers } from "../../../interfaces";
import { useDispatch } from "react-redux";
import { setIsMuted } from "../../../store/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import './MicrophoneBar.css';

type RoomProps = {
    room: RoomTwilio,
    user: IUser;
    users: IUsers;
}

const MicrophoneBar = ({ user, users, room }: RoomProps) => {
    const [participants, setParticipants] = useState<Array<any>>([]);
    const dispatch = useDispatch();

    const toggleMute = () => {
        dispatch(setIsMuted({ isMuted: !user.isMuted }))
    }

    useEffect(() => {

        const participantConnected = (participant: ParticipantTwilio) => {
            // const remoteUser = users.find((usr) => usr.id == participant.identity);

            if (!participants.map((part) => part.identity).includes(participant.identity))
                setParticipants((prevParticipants) => [...prevParticipants, participant]);

        };

        const participantDisconnected = (participant: ParticipantTwilio) => {
            setParticipants((prevParticipants) =>
                prevParticipants.filter((p) => p !== participant)
            );
        };


        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);

        room.participants.forEach(participantConnected);

        return () => {
            room.off("participantConnected", participantConnected);
            room.off("participantDisconnected", participantDisconnected);
        };
    }, [room]);

    const adjustVolumeByDistance = (otherUser: IUser) => {
        const MAX_DISTANCE = 300;
        const distance = Math.sqrt(Math.pow(user.x - otherUser.x, 2) + Math.pow(user.y - otherUser.y, 2));

        if (distance < MAX_DISTANCE) {
            const volume = 1 - (distance / MAX_DISTANCE);
            return volume;
        }
        return 0;
    };

    const remoteParticipants = participants.map((participant) => {
        const remoteUser = users.find((usr) => usr.id == participant.identity);
        if (!remoteUser) return;


        return (
            <Participant
                key={participant.sid}
                participant={participant}
                user={remoteUser}
                volume={adjustVolumeByDistance(remoteUser)}
            />
        )
    });

    return (
        <>
            <div className="MicrophoneBar">
                <div className="barItem">
                    <button onClick={toggleMute}>{user.isMuted ? <FontAwesomeIcon icon={faMicrophoneSlash} /> : <FontAwesomeIcon icon={faMicrophone} />}</button>
                </div>

            </div>
            <div className="participants">
                <div className="local-participant">
                    {room ? (
                        <Participant
                            key={room.localParticipant.sid}
                            participant={room.localParticipant}
                            user={user}
                            volume={1}
                        />
                    ) : (
                        ""
                    )}
                </div>
                <div className="remote-participants">{remoteParticipants}</div>
            </div>
        </>
    );
};

export default MicrophoneBar;