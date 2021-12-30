import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectMenu, selectUser } from '../../../../store/store';
import { toggleFaq } from '../../../../store/menu';
import { shouldShowLoggedInComponents } from '../../../../helpers/helpers';


const FaqLi = () => {
    const dispatch = useDispatch();
    const menu = useSelector(selectMenu);
    const user = useSelector(selectUser);
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
        if (shouldShowLoggedInComponents(user))
            dispatch(toggleFaq());
    }

    if (shouldShowLoggedInComponents(user)) {
        return (
            <li className={classN} onClick={faqClicked}>
                <FontAwesomeIcon icon={faQuestionCircle} />
            </li>
        )
    }

    return null;
};

export default FaqLi;