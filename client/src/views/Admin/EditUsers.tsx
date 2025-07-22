import { ChangeEvent, useState } from "react";
import { IUser, IUsers } from "../../interfaces";
import "./EditUsers.css";

// import { useLiveKitRoom } from '@livekit/components-react';
// import { RemoteParticipant } from 'livekit-client';
// import { useDispatch } from 'react-redux';
// import { setIsGlobalMuted } from '../../store/user';
import socket from "../../helpers/Socket";
import { filterEditUsers } from "../../helpers/helpers";

interface EditProps {
  user: IUser;
  users: IUsers;
}

const EditUsers: React.FC<EditProps> = ({ user, users }) => {
  const [password, setPassword] = useState("");

  const filteredUsers = filterEditUsers(user, users);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, user: IUser) => {
    socket.emit("toggleGlobalUserMute", user.id);
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await fetch("/api/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }), // send the password to the server
      });

      const data = await response.json();

      if (data.isValid) {
        localStorage.setItem("userToken", data.token);
      } else {
        console.log("Incorrect password. Try again.");
        // Inform the user about the incorrect password
      }
    } catch (error) {
      console.error("Error verifying password:", error);
    }
  };

  const token = localStorage.getItem("userToken");

  return (
    <div className="EditUsers">
      <div className="containerOG">
        <h1>Edit Users</h1>
        <br />
        <br />
        {token ? (
          <div className="usersTable">
            <div className="usersRow header">
              <div>avatar</div>
              <div>username</div>
              <div>status</div>
              <div>global mute?</div>
            </div>
            {filteredUsers.map((usr: IUser) => {
              return (
                <div className="usersRow" key={usr.userName}>
                  <div>{usr.avatar}</div>
                  <div>{usr.userName}</div>
                  <div>
                    {usr.isMuted || usr.isGlobalMuted ? (
                      <div className="isMuted"></div>
                    ) : (
                      <div className="isLive"></div>
                    )}
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={usr.isGlobalMuted}
                        onChange={(evt) => handleChange(evt, usr)}
                      />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <form onSubmit={(event) => handlePasswordSubmit()}>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditUsers;
