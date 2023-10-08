
import React, { useEffect, useState } from 'react';
import './FAQ.css';

// components
import CenterModal from '../CenterModal/CenterModal';

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectWindow, selectMenu } from '../../store/store';
import { hideFaq } from '../../store/menu';
import FAQContent from './FAQContent';


interface FAQProps {
    nextStep?: () => void
}

const FAQFrame = (props: FAQProps) => {

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

  

    return (
        <CenterModal
            title="FAQ"
            z={2501}
            isHidden={isHidden}
            onHide={() => dispatch(hideFaq())}
            isRelative={false}
            classN="FAQ"
            content={<FAQContent />}
            buttons={
                <div className="center-buttons flexItem">
                    <button className="standardButton secondary" onClick={() => dispatch(hideFaq())}>ok</button>
                </div>
            }
        />
    )
};



export default FAQFrame;

// memoize windowUI.isMobile, windowUI.hasFooter, menu.faq.isHidden, menu.mobile