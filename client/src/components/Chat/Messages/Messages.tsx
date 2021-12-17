import React, { useEffect } from 'react';
import MessagesDesktop from './MessagesDesktop';
import MessagesMobile from './MessagesMobile';

const Messages = (props: { isMobile: boolean }) => {

    if (props.isMobile) {
        return <MessagesMobile />
    }
    return <MessagesDesktop />
}

export default Messages;
