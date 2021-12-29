
import React, { useEffect, useState } from 'react';
import './FAQ.css';

// components
import CenterModal from '../CenterModal/CenterModal';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow, selectMenu } from '../../store/store';
import { hideFaq } from '../../store/menu';


interface FAQProps {
    isFrame: boolean,
    nextStep?: () => void
}

const FAQ = (props: FAQProps) => {

    const menu = useSelector(selectMenu);
    const windowUI = useSelector(selectWindow);
    const dispatch = useDispatch();
    const [isHidden, setIsHidden] = useState(true);


    // check if the sign in menu should be displayed
    useEffect(() => {
        if (windowUI.isMobile || windowUI.hasFooter) {
            setIsHidden(menu.mobile !== "faq");
        }
        else {
            setIsHidden(menu.faq.isHidden);
        }
    }, [windowUI.isMobile, windowUI.hasFooter, menu.faq.isHidden, menu.mobile])

    const onHide = () => {
        dispatch(hideFaq());
    }

    const getButtons = (): JSX.Element => {
        let buttons;
        if (props.isFrame) {
            buttons =
                <div className="center-buttons flexItem">
                    <button className="standardButton secondary" onClick={onHide}>ok</button>
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
                title="FAQ"
                z={2501}
                isHidden={isHidden}
                onHide={onHide}
                isRelative={false}
                classN="FAQ"
                content={getForm()}
                buttons={getButtons()}
            />
        )
    }

    const getForm = () => {
        return (
            <div className="Instructions-list flexPad flex1">

                {/* MOVING */}
                <div className="instruction">
                    <div className="faqImg"><img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/gallery/arrows.jpeg" /></div>
                    <div className="instruction-txt">
                        <h4>Move</h4>
                        <hr />
                        <p>Click/tap on tiles or press arrow keys.</p>
                    </div>
                </div>
                {/* enter gallery */}
                <div className="instruction">
                    <div className="faqImg"><img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/gallery/gallery_enter.png" /></div>
                    <div className="instruction-txt">
                        <h4>Enter Gallery</h4>
                        <hr />
                        <p>Enter the gallery through the sliding doors.</p>
                    </div>
                </div>
                <div className="instruction">
                    <div className="faqImg"><img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/gallery/room_enter.png" /></div>
                    <div className="instruction-txt">
                        <h4>Enter Room</h4>
                        <hr />
                        <p>View work by entering rooms via staircases.</p>
                    </div>
                </div>

                {/* CHATTING */}
                <div className="instruction">
                    <div className="faqImg"><img src="https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/gallery/chat.png" /></div>
                    <div className="instruction-txt">
                        <h4>Chat</h4>
                        <hr />
                        <p>Click a user to begin a chat or select the chat icon
                            from the menu.</p>
                    </div>
                </div>
            </div>

        )
    }

    if (props.isFrame)
        return getFrame();
    return getForm()
};



export default FAQ;
