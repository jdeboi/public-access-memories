// useSockets.ts
import React, { useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import socket from "../helpers/Socket";

// types
import { IUser, IUsers } from "../interfaces";
import { IMessage } from "../interfaces";
import { selectUser } from "../store/store";
import { setUserID, toggleIsGlobalMuted } from "../store/user";
import { addMessage, incremendNotifications } from "../store/messages";

interface ISockets {
  users: IUsers;
  setUsersData: (users: IUsers) => void;
}

// ---- shallow comparator to avoid no-op re-renders ----
function pickUser(u: IUser) {
  // adjust fields as needed for your app
  const anyU = u as any;
  return {
    id: anyU.id,
    userName: anyU.userName,
    roomUrl: anyU.roomUrl,
    x: anyU.x,
    y: anyU.y,
    avatar: anyU.avatar,
    muted: anyU.muted,
  };
}
function usersEqual(a: IUsers, b: IUsers) {
  if (a.length !== b.length) return false;
  const A = [...a]
    .map(pickUser)
    .sort((x, y) => String(x.id).localeCompare(String(y.id)));
  const B = [...b]
    .map(pickUser)
    .sort((x, y) => String(x.id).localeCompare(String(y.id)));
  for (let i = 0; i < A.length; i++) {
    const ua = A[i],
      ub = B[i];
    for (const k in ua) {
      if ((ua as any)[k] !== (ub as any)[k]) return false;
    }
  }
  return true;
}

export const useSockets = ({ users, setUsersData }: ISockets) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // keep the latest users without causing re-subscribes
  const usersRef = useRef<IUsers>(users);
  useEffect(() => {
    usersRef.current = users;
  }, [users]);

  // optional: throttle commits to React (uncomment to enable)
  // const lastCommitRef = useRef(0);

  const onConnect = useCallback(() => {
    dispatch(setUserID(socket.id));
    socket.emit("joinRoom", user.roomUrl);
  }, [dispatch, user.roomUrl]);

  const onUsersUpdate = useCallback(
    (data: IUsers) => {
      // // throttle example (150ms)
      // const now = performance.now();
      // if (now - lastCommitRef.current < 150) return;
      // lastCommitRef.current = now;

      if (usersEqual(usersRef.current, data)) return; // bail on no-op
      setUsersData(data);
    },
    [setUsersData]
  );

  const onMessageAll = useCallback(
    (data: IMessage) => {
      dispatch(addMessage({ ...data }));
      dispatch(incremendNotifications());
    },
    [dispatch]
  );

  const onMessageRoom = useCallback(
    (data: IMessage) => {
      const msg = { ...data };
      if (msg.to === "room" && msg.roomUrl === user.roomUrl) {
        dispatch(addMessage(msg));
        dispatch(incremendNotifications());
      }
    },
    [dispatch, user.roomUrl]
  );

  const onMessageUser = useCallback(
    (data: IMessage) => {
      dispatch(addMessage({ ...data }));
      dispatch(incremendNotifications());
    },
    [dispatch]
  );

  const onToggleGlobalUserMute = useCallback(() => {
    dispatch(toggleIsGlobalMuted());
    alert("FYI - you were muted by the admin");
  }, [dispatch]);

  // return a setup function (with cleanup) so the caller can control lifecycle
  const socketSetup = useCallback(() => {
    socket.on("connect", onConnect);
    socket.on("usersUpdate", onUsersUpdate);
    socket.on("messageAll", onMessageAll);
    socket.on("messageRoom", onMessageRoom);
    socket.on("messageUser", onMessageUser);
    socket.on("toggleGlobalUserMute", onToggleGlobalUserMute);

    // optional: handle disconnects/reconnects if useful
    // socket.on("disconnect", () => { /* ... */ });

    return () => {
      socket.off("connect", onConnect);
      socket.off("usersUpdate", onUsersUpdate);
      socket.off("messageAll", onMessageAll);
      socket.off("messageRoom", onMessageRoom);
      socket.off("messageUser", onMessageUser);
      socket.off("toggleGlobalUserMute", onToggleGlobalUserMute);
    };
  }, [
    onConnect,
    onUsersUpdate,
    onMessageAll,
    onMessageRoom,
    onMessageUser,
    onToggleGlobalUserMute,
  ]);

  return socketSetup;
};

// (unchanged) helper to add bots
export const addBots = (barTenders: IUser[]) => {
  for (const barTender of barTenders) {
    socket.emit("setBot", barTender);
  }
};
