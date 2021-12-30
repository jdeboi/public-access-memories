// forwardRef
// because we have to call handleSubmit() from a parent (window)
// https://stackoverflow.com/questions/62210286/declare-type-with-react-useimperativehandle
// https://stackoverflow.com/questions/37949981/call-child-method-from-parent

import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import './SignIn.css';

// components
import CenterModal from '../CenterModal/CenterModal';

import { useLocation } from 'react-router-dom';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectWindow, selectMenu } from '../../store/store';
import { hideSignIn } from '../../store/menu';
import { setUserLogin } from '../../store/user';

import socket from "../../helpers/Socket";
import { getEmojis } from '../../helpers/emojis';

// interfaces
import { IUser } from '../../interfaces';

import Cookies from 'js-cookie';

interface SignInProps {
    isFrame: boolean,
    hasAvatar: boolean,
    nextStep?: () => void,
    hasLoadedCookies: boolean,
    ref?: HTMLDivElement
}

export type SignInSubmitType = {
    clicked: () => void,
}

const SignIn = forwardRef<SignInSubmitType, SignInProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
      // start() has type inferrence here
      clicked() {
        handleSubmit();
      },
    }));


    const user = useSelector(selectUser);
    const menu = useSelector(selectMenu);
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [localAvatar, setLocalAvatar] = useState(user.avatar);
    const [localUserName, setLocalUserName] = useState(user.userName);
    const [shouldClose, setShouldClose] = useState(false);
    const [readyToClose, setReadyToClose] = useState(false);
    const [isHidden, setIsHidden] = useState(true);


    // check if the sign in menu should be displayed
    useEffect(() => {
        if (user.roomUrl !== "/") {
            setIsHidden(true);
            return;
        }

        if (windowUI.isMobile || windowUI.hasFooter) {
            setIsHidden(menu.mobile !== "signIn");
        }
        else {
            setIsHidden(menu.signIn.isHidden);
        }
    }, [user.roomUrl, windowUI.isMobile, windowUI.hasFooter, menu.signIn.isHidden, isHidden, menu.mobile])

    // THIS COMES IN IF THE PAGE LOADS AND THERE AREN'T ANY COOKIES,
    // AND THEN COOKIES LOAD
    useEffect(() => {
        if (props.hasAvatar && props.hasLoadedCookies) {
            setLocalAvatar(user.avatar);
            setLocalUserName(user.userName);
        }
    }, [props.hasLoadedCookies])

    // check if it's ok / ready to close the sign in window
    useEffect(() => {
        if (shouldClose && readyToClose) {
            setShouldClose(false);
            setReadyToClose(false);
            dispatch(hideSignIn());
        }
    }, [shouldClose, readyToClose])



    const setAvatarBar = (emoji: string) => {
        setLocalAvatar(emoji);
    }

    const setUserName = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let u = evt.target.value;
        if (u && u.length < 17) {
            setLocalUserName(u);
        }
        else {
            alert("user name is too many letters");
        }
    }


    const onHide = () => {
        setShouldClose(true);
        handleSubmit();
    }


    const userRegister = (response: { isUser: boolean, user: IUser }) => {
        if (response.isUser) {
            setShouldClose(false);
            alert("username already exists. Please enter a new username.");
        }
        else {
            submitSuccess(response.user);
        }
    }

    const submitSuccess = (user: IUser) => {
        dispatch(setUserLogin({ userName: user.userName, avatar: user.avatar }));
        // socket.emit("setUser", user);
        // TODO - are we handling in app.tsx?
        // set the local state to this registered state
        setLocalAvatar(user.avatar);
        setLocalUserName(user.userName);


        if (props.nextStep)
            props.nextStep(); // welcome page
        else
            setReadyToClose(true);
    }

    const userRegisterCheck = (userName: string, avatar: string) => {
        const checkUser: IUser = { ...user };
        checkUser.userName = userName;
        checkUser.avatar = avatar;
        checkUser.roomUrl = pathname;
        socket.emit("registerUser", checkUser, userRegister);
    }

    const handleUserUpdate = () => {
        setShouldClose(true);
        handleSubmit();
    }

    const handleSubmit = () => {
        if (localAvatar === "") {
            setShouldClose(false);
            alert("Please select an emoji avatar");
        }
        else if (localUserName === "") {
            setShouldClose(false);
            alert("Please set a user name");
        }
        else if (localUserName.length < 3) {
            setShouldClose(false);
            alert("Usernames must be at least 3 letters");
        }
        // if we haven't changed names
        else if (localUserName === user.userName) {
            let usr = { ...user };
            usr.avatar = localAvatar;
            submitSuccess(usr);
        }
        // if we have, check username
        else {
            userRegisterCheck(localUserName, localAvatar);
        }
    }

    const resetApp = () => {
        dispatch({type: "reset"});
        Cookies.remove("hasAvatar");
        Cookies.remove("avatar");
        Cookies.remove("userName");
        window.location.href = "/";
    }

    const getButtons = (): JSX.Element => {
        let buttons;
        if (props.isFrame) {
            buttons =
                <div className="center-buttons flexItem">
                    <button className="standardButton secondary" onClick={() => resetApp()}>logout</button>
                    <button className="standardButton primary" onClick={handleUserUpdate}>update</button>
                </div>
        }
        else {
            buttons = <React.Fragment></React.Fragment>;
        }
        return buttons;
    }

    const getFrame = () => {
        return (
            <CenterModal
                title="avatar"
                z={2501}
                isHidden={isHidden}
                onHide={onHide}
                isRelative={false}
                classN="SignIn"
                content={getForm()}
                buttons={getButtons()}
            />
        )
    }

    const getForm = () => {
        const emojis = getEmojis();
        let inputW = windowUI.width < 350 ? 190 : 225;
        return (
            <React.Fragment>
                <div className="userBar flexItem flexPad flexRow">
                    <div className="avatar">{localAvatar}</div>
                    {/* inputprops={{ 'aria-label': 'user name field' }} */}
                    <input style={{ width: inputW }} onChange={setUserName} value={localUserName} placeholder="username" />
                </div>
                <div className="emoji-list flexItem flexPad flex1">
                    {
                        emojis.map((emoji: string, i: number) => {
                            return <button key={i} onClick={() => setAvatarBar(emoji)}>{emoji}</button>
                        })
                    }
                </div>
            </React.Fragment>
        )
    }

    if (props.isFrame)
        return getFrame();
    return getForm()
});



export default SignIn;
