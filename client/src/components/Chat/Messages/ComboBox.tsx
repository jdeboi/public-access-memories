/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';

import { IUser, IUsers } from '../../../interfaces';
import { getUserByUserName } from '../../../helpers/helpers';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectUserActive } from '../../../store/store';
import { resetNotifications } from '../../../store/messages';


import { getNewUser } from '../../../helpers/helpers';
import { setUserActiveChat } from '../../../store/userActive';

const initialUsers: IUser[] = [];
initialUsers.push(getNewUser("Everyone","👥", "everywhere"));
initialUsers.push(getNewUser("Room","🚪" , "everywhere"));

interface IComboBox {
    setRecipient: (user: IUser) => void,
    users: IUsers,
    w?: number
}

interface IComboUser {
    userName: string,
    avatar: string
}

const ComboBox = (props: IComboBox) => {
    const dispatch = useDispatch();
    // really I only think this needs to rerender if someone joins/leaves a ROOM
    // or registers/ connects / disconnects
    const user = useSelector(selectUser);
    const userActive = useSelector(selectUserActive);
    const [inputValue, setInputValue] = useState("");
    
    const [localActiveUser, setLocalActiveUser] = useState({
        userName: initialUsers[0].userName, 
        id: initialUsers[0].id, 
        avatar: initialUsers[0].avatar, 
    });

  

    useEffect(() => {
        let label = "";
        if (userActive.active && userActive.active.userName !== "") {
            label = getLabel(userActive.active);
            setInputValue(label);
            setLocalActiveUser(userActive.active);
        } else {
            dispatch(setUserActiveChat(initialUsers[0]));
            label = getLabel(initialUsers[0]);
            setInputValue(label);
            setLocalActiveUser(initialUsers[0])
        }
    }, [userActive.active.userName])

    const getLabel = (user: IComboUser | null) => {
        if (!user)
            return "";
        return `${user.avatar} ${user.userName}`;
    }

    // CHANGES WHEN TYPING INPUT
    const setNewInputValue = (newInputValue: string) => {
        if (newInputValue) {
            setInputValue(newInputValue);
        }
        else {
            setInputValue("");
        }
    }

    const getUsersInRoom = () : IUser[] => {
        const users = [...initialUsers];
        let usersInRoom: IUsers = [];
        if (props.users) {
            usersInRoom = props.users.filter((usr) => {
                return (usr.roomUrl === user.roomUrl || usr.roomUrl === "everywhere");
            })
        }
        let all = users.concat([...usersInRoom]);
        return all;
    }



    // CHANGES WHEN HIT RETURN, CLICK,
    // I.E. SELECTED FROM LIST
    const setValue = (newValue: IComboUser) => {
        let allinroom = [...initialUsers, ...props.users];
        const usr = getUserByUserName(allinroom, newValue.userName);
        if (usr)
            props.setRecipient(usr);
    }




    return (

        <div className="AutoComplete">
            <Autocomplete
                id="combo-box-demo"
                className="autocomplete"
                value={localActiveUser}
                onChange={(event: any, newValue: IComboUser | null) => {
                    if (newValue)
                        setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event: any, newInputValue: string) => {
                    setInputValue(newInputValue);
                }}
                onFocus={() => dispatch(resetNotifications())}
                isOptionEqualToValue={(option: IComboUser, value: IComboUser) => getLabel(option) === getLabel(value)}
                options={getUsersInRoom()}
                getOptionLabel={(option: IComboUser) => getLabel(option)}
                
                fullWidth
                renderInput={(params: any) => {
                    // console.log("PARAMS", params);
                    // const userList = this.getUserListInRoom();

                    let sty: React.CSSProperties = {};
                    if (props.w) {
                        sty.width = props.w - 10;
                    }
                    return (
                        <div ref={params.InputProps.ref} >
                            <input className="autocomplete-input" style={sty} type="text" placeholder="select user" {...params.inputProps} />
                        </div>
                    )
                }}
            />
        </div>
    );
}


export default ComboBox;
