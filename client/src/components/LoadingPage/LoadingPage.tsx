
import React from 'react';
import './LoadingPage.css';

import { useSelector } from 'react-redux';
import { selectWindow } from '../../store/store';

export default function LoadingPage() {
    const windowUI = useSelector(selectWindow);
    const sty = {fontSize: (windowUI.width < 400)?30: 50};
    
    return (
        <div className="backgroundCover">
            <div className="LoadingPage">
                <div className="title" style={sty}>
                   <div>title goes here</div>
                </div>
            </div>
        </div>
    )
}