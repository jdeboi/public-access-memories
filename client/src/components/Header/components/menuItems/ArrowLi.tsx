import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../../../store/store';

const ArrowLi = () => {
    const { pathname } = useLocation();
    const [arrowClass, setArrowClass] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const ac = pathname === "/" ? "hidden" : "arrow expandable";
        setArrowClass(ac);
    }, [pathname])


    return (
        <li className={arrowClass} onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <FontAwesomeIcon icon={faHome} />
        </li>
    )
};

export default ArrowLi;