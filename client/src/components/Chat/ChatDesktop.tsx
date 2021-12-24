
import React, { useRef, useState, useEffect } from 'react';

import ComboBox from './Messages/ComboBox';
import MessagesDesktop from './Messages/MessagesDesktop';

import { IChat } from '../../interfaces';

import Frame from '../Frame/Frame';


// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectMenu, selectWindow } from '../../store/store';
import { resetNotifications } from '../../store/messages';
import { hideChat } from '../../store/menu';


const ChatDesktop = (props: IChat) => {
    const dispatch = useDispatch();
    const menu = useSelector(selectMenu);
    const windowUI = useSelector(selectWindow);
    const user = useSelector(selectUser);

    // const [textBox, setTextBox] = useState("");
    const [userHover, setUserHover] = useState(false);
    const [dimensions, setDimensions] = useState({ w: 0, h: 0, y: 0, x: 0 })
    // headerH+bufferH*2+cbarH + usersH

    const chatRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const w = 300;
        let minY = windowUI.edgeSpacing * 2 + windowUI.toolbarH + 120;
        const h = Math.min(windowUI.contentH - minY - windowUI.toolbarH, 800);
        const y = windowUI.height - h - windowUI.edgeSpacing - windowUI.toolbarH;
        const x = windowUI.width - w - windowUI.edgeSpacing;
        setDimensions({ w, h, y, x });
    }, [windowUI.contentH, windowUI.contentW, windowUI.width, windowUI.height ])


    return (
        <Frame title="chat"
            unbounded={false}
            isHidden={menu.chat.isHidden}
            onHide={() => dispatch(hideChat())}
            windowStyle={{ background: "rgba(0, 0, 0, .9)" }}
            content={

                <div className="Chat-Content">

                    <div className="Chat-messages"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: dimensions.h
                        }}>
                        <MessagesDesktop />
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
                                <div className="Chat-send-item">
                                    <input
                                        id="margin-dense"
                                        className={"standardInputWhite form-item"}
                                        placeholder="type message here"
                                        value={props.textBox}
                                        onChange={props.handleTextBoxChange}
                                        onFocus={() => dispatch(resetNotifications)}
                                        onKeyDown={props.handleKeyDown}
                                        ref={chatRef}
                                    />
                                </div>
                                {/* <button className="standardButton form-item blueOutline" disabled={this.state.buttonDisabled} onClick={this.onSubmit}><SendIcon disabled={this.state.buttonDisabled} /></button>*/}
                            </div>
                        </div>

                    </div>
                </div>
            }
            width={dimensions.w}
            height={dimensions.h}
            x={dimensions.x}
            y={dimensions.y}
            z={1000}
        />
    );
}

export default ChatDesktop;