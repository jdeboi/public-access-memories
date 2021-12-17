import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectMenu } from '../../../../store/store';
import { toggleFaq } from '../../../../store/menu';


const FaqLi = () => {
    const dispatch = useDispatch();
    const menu = useSelector(selectMenu);
    const [classN, setClassN] = useState("expandable icon");

    useEffect(() => {
        let classFaq = "expandable icon";
        if (menu.faq.isHidden)
            classFaq += " closed";
        else
            classFaq += " opened";

        setClassN(classFaq);

    }, [menu.faq.isHidden])

    const faqClicked = () => {
        dispatch(toggleFaq());
    }

    return (
        <li className={classN} onClick={faqClicked}>
            <FontAwesomeIcon icon={faQuestionCircle} />
        </li>
    )
};

export default FaqLi;