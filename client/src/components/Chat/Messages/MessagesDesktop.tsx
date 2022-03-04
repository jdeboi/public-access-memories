import React, { useRef, useEffect } from 'react';
// store
import { useSelector } from 'react-redux';
import { selectMessages } from '../../../store/store';

const MessagesDesktop = () => {

    const messages = useSelector(selectMessages);
    const messagesEnd = useRef<HTMLDivElement>(null);// as React.MutableRefObject<HTMLDivElement>;

    const scrollToBottom = () => {
        if (messagesEnd && messagesEnd.current) {
            //    const m = messagesEnd as unknown as HTMLDivElement;
            messagesEnd.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [[...messages.messages.map(msg => msg.message)]])



    return (
        <div className="Chat-messages-box">
            <div className="Chat-messages-inner-box">
                {messages.messages.map((message, i) => {
                    let classN = "chat-from-" + (message.from === "me" ? "me" : "other");
                    // console.log("MESSAGE", message);
                    let avatarHidden = message.from === "me" ? "hidden" : "";
                    let messageToCol = message.to === "room" || message.to === "all" ? "message-to-red" : "message-to";
                    let msg = (message.to === "room" || message.to === "all") ? message.to : "me";
                    return (
                        <div key={i} className={"bubbleContainer " + classN}>
                            <div className={"avatar" + " " + avatarHidden}>{message.avatar}</div>
                            <div className={"bubble"} key={i}>
                                <div className="message-deets"><span className="message-from">{message.from}</span> <span className={messageToCol}>(to {msg})</span>:</div>
                                <div className="message-txt">{message.message}</div>
                            </div>

                        </div>
                    )
                })}
                <div className="dummyText" style={{ float: "left", clear: "both" }}
                    ref={messagesEnd}>
                </div>
            </div>
        </div>
    );
}

export default MessagesDesktop;