/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';

import { IUser, IUsers } from '../../../interfaces';
import { getUserByUserName } from '../../../helpers/helpers';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectUserActive } from '../../../store/store';
import { resetNotifications } from '../../../store/messages';

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

    const initialUsers = [{ userName: "Everyone", avatar: "👥" }, { userName: "Room", avatar: "🚪" }];

    // if (this.props.room === "home") {
    //   const wineBot = {};
    //   const hostBot = {};
    //   this.initialUsers.push(wineBot);
    //   this.initialUsers.push(hostBot);
    // }🤖





    useEffect(() => {
        let label = "";
        if (userActive.active) {
            label = getLabel(userActive.active);
            setInputValue(label);
        }
    }, [userActive.active.userName])



    const getInitialUserNames = () => {
        const names = [];
        for (const user of initialUsers) {
            names.push(user.userName);
        }
        return names;
    }

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

    const getUserListInRoom = () => {
        var users = getInitialUserNames();
        if (props.users) {
            for (let i = 0; i < props.users.length; i++) {
                const usr = { ...props.users[i] };
                // don't include winebot with id = 1
                if (usr.room === user.room && usr.id !== "1") {
                    users.push(getLabel(user));
                }
            }
        }
        return users;
    }

    const getUsersInRoomTrunc = () => {
        var users = initialUsers;
        if (props.users) {
            for (let i = 0; i < props.users.length; i++) {
                const usr = { ...props.users[i] };
                if (usr.room === user.room && usr.id !== "1") {
                    users.push({ avatar: user.avatar, userName: user.userName });
                }
            }
        }
        return users;
    }

    const getUserObjectByListID = (listID: string) => {
        var users = [...initialUsers];
        if (props.users)
            users = [...users, ...props.users];
        let obj = users.find(usr => listID === getLabel(usr));
        return obj;
    }

    const getUsersInRoom = () => {
        var users = [...initialUsers];
        // if (props.users)
        //     users = [...users, ...props.users];
        let usersInRoom: IUsers = [];
        if (props.users) {
            usersInRoom = props.users.filter((usr, i) => {
                // (i < 10 ) || ??? what was that about?
                return (usr.room === user.room && usr.id);
            })
        }
        let namedUsers: IComboUser[] = usersInRoom.map((usr) => {
            return { userName: usr.userName, avatar: usr.avatar }
        })
        users = [...users, ...namedUsers];
        return users;
    }



    // CHANGES WHEN HIT RETURN, CLICK,
    // I.E. SELECTED FROM LIST
    const setValue = (newValue: IComboUser) => {
        // this.setState({value: newValue});
        const usr = getUserByUserName(props.users, newValue.userName);
        if (usr)
            props.setRecipient(usr);
    }




    return (

        <div className="AutoComplete">
            <Autocomplete
                id="combo-box-demo"
                className="autocomplete"
                value={userActive.active}
                onChange={(event: any, newValue: IComboUser | null) => {
                    if (newValue)
                        setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event: any, newInputValue: string) => {
                    setInputValue(newInputValue);
                }}
                onFocus={() => dispatch(resetNotifications())}
                options={getUsersInRoom()}
                getOptionLabel={(option: IComboUser) => getLabel(option)}
                // getOptionSelected={() => console.log("??")}
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
