
import React, { useState, useEffect } from 'react';

// interfaces
import { IUser, IUsers } from '../interfaces/index';

import { barTenders } from '../data/BotConfig';

// store
import { IMessage } from '../interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../store/store';
import { setUserID } from '../store/user';
import { addMessage, incremendNotifications } from '../store/messages';

// socket
import socket from "../helpers/Socket";

//            setRoomCount();
interface ISockets {
    users: IUsers,
    setUsersData: (users: IUsers) => void;
    // setUsersChange: (changed: boolean) => void;
}

export const useSockets = (props: ISockets) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const socketSetup = () => {
        socket.on('connect', () => {
            dispatch(setUserID(socket.id))
            socket.emit("joinRoom", user.roomUrl);
            addBots();
        });

        socket.on("usersUpdate", (data: IUsers) => {
            // var filteredArray = data.filter((usr: IUser) => {
            //     return usr.id !== user.id;
            // });
            props.setUsersData(data);
            // console.log(filteredArray, user.id)
        });

        socket.on("messageAll", (data: IMessage) => {
            const message = { ...data }
            message.to = "me";
            // message.fromUser = user.userName; // getUserNameById(message.from);
            dispatch(addMessage(message));
            dispatch(incremendNotifications());
        })

        socket.on("messageRoom", (data: IMessage) => {
            const message = { ...data }
            if (message.to === user.roomUrl) {
                message.to = "room";
                // message.fromUser = user.userName;
                dispatch(addMessage(message));
                dispatch(incremendNotifications());
            }
        })

        socket.on("messageUser", (data: IMessage) => {
            const message = { ...data }
            // message.fromUser = user.userName;
            message.from = message.fromUser? message.fromUser : "";
            console.log("socketuse", message);
            dispatch(addMessage(message));
            dispatch(incremendNotifications());
        })

        socket.on("userJoined", data => {
            // props.setUsersChange(true);
        })

        socket.on("userDisconnected", data => {
            // props.setUsersChange(true);
        })

    }

    const getUserNameById = (id: string, users: IUsers) => {
        if (props.users) {
            let obj = props.users.find(o => o.id === id);
            if (obj)
                return obj.userName;
        }
        return "";
    }

    return socketSetup;
}



const addBots = () => {
    for (const barTender of barTenders) {
        socket.emit("setBot", barTender);
    }
}