import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHome } from "@fortawesome/free-solid-svg-icons";

// store
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../../../store/store';

const ArrowLi = () => {
    const user = useSelector(selectUser);
    const [arrowClass, setArrowClass] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const ac = user.room === "gallery" ? "hidden" : "arrow expandable";
        setArrowClass(ac);
    }, [user.room])


    return (
        <li className={arrowClass} onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <FontAwesomeIcon icon={faHome} />
        </li>
    )
};

export default ArrowLi;