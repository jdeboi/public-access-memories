

import React, { useState, useEffect } from 'react';
import './ChatMobile.css';

import ComboBox from './Messages/ComboBox';
import MessagesMobile from './Messages/MessagesMobile';
import CenterModal from '../CenterModal/CenterModal';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import {IChat} from '../../interfaces';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectMenu, selectWindow } from '../../store/store';
import { getCenterModalDim } from '../CenterModal/helpers';
import { resetNotifications } from '../../store/messages';
import { setOneMenu, hideChat } from '../../store/menu';

const ChatMobile = (props: IChat) => {

    const dispatch = useDispatch();
    const menu = useSelector(selectMenu);
    const user = useSelector(selectUser);
    const windowUI = useSelector(selectWindow);
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 })
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        const { w, h } = getCenterModalDim(windowUI, false);
        setDimensions({ w, h });
    }, [windowUI])

    const onHide = () => {
        dispatch(hideChat());
        dispatch(setOneMenu(""));
    }


    const getMobileContent = () => {
        return (
            <div className="Chat-messages" style={{ display: "flex", flexDirection: "column", height: dimensions.h }}>
                <div className="Chat-form">
                    <div className="to-form">
                        <div className="to-div">To: </div>
                        <ComboBox
                            users={props.users}
                            setRecipient={props.setRecipient}
                            w={dimensions.w - 40 - 40}
                        />
                    </div>
                    <div className="Chat-send">
                        <div className="Chat-send-item margR">
                            <input
                                id="margin-dense"
                                className={"standardInput form-item"}
                                placeholder="enter message"
                                value={props.textBox}
                                onChange={props.handleTextBoxChange}
                                onFocus={() => dispatch(resetNotifications())}
                                onKeyDown={props.handleKeyDown}
                                style={{ width: dimensions.w - 60 - 40 - 20 }}
                            />
                        </div>
                        <div className="Chat-send-item">
                            <button className="sendButton"
                                disabled={buttonDisabled}
                                onClick={() => props.onSubmit(props.textBox)}>
                                <FontAwesomeIcon icon={faUser} />
                            </button>
                        </div>
                    </div>

                </div>
                {/* <button className="sendButton standardButton primary">send</button> */}
                <MessagesMobile />

            </div>
        );
    }


    const getMobileButtons = () => {
        return (
            // null
            <div className="center-buttons chat-buttons">
                <button className="standardButton primary" onClick={onHide}>close</button>
                {/* <button className="standardButton primary" disabled={this.state.buttonDisabled} onClick={this.onSubmit}>send</button> */}
            </div>
        )
    }


    return (
        <CenterModal
            title="chat"
            z={1000}
            isHidden={menu.mobile !== "chat"}
            onHide={onHide}
            isRelative={false}
            classN="ChatMobile"
            content={getMobileContent()}
            buttons={getMobileButtons()}
        />
    );
}


export default ChatMobile;