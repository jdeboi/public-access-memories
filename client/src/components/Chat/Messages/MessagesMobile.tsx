import React, { useEffect, useRef } from 'react';

// store
import { useSelector } from 'react-redux';
import { selectMessages } from '../../../store/store';

const MessagesMobile = () => {
    const messages = useSelector(selectMessages);
    const messagesStart = useRef() as React.MutableRefObject<HTMLDivElement>;

    const scrollToTop = () => {
        if (messagesStart) {
            const m = messagesStart as unknown as HTMLElement;
            // m.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }

    useEffect(() => {
        scrollToTop();
    }, [[...messages.messages.map(msg => msg.message)]])


    return (
        <div className="Chat-messages-box">
            <div className="Chat-messages-inner-box">
                <div className="dummyText" style={{ float: "left", clear: "both" }}
                    ref={messagesStart}>
                </div>
                {messages.messages.slice(0).reverse().map((message, i) => {
                    let classN = "chat-from-" + (message.from === "me" ? "me" : "other");
                    // console.log("MESSAGE", message);
                    let avatarHidden = message.from === "me" ? "hidden" : "";
                    let messageToCol = message.to === "room" || message.to === "all" ? "message-to-red" : "message-to";
                    return (
                        <div key={i} className={"bubbleContainer " + classN}>
                            <div className={"avatar" + " " + avatarHidden}>{message.avatar}</div>
                            <div className={"bubble"} key={i}>
                                <div className="message-deets"><span className="message-from">{message.from}</span> <span className={messageToCol}>(to {message.to})</span>:</div>
                                <div className="message-txt">{message.message}</div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );

}

export default MessagesMobile;