
import React from 'react';
import './LoadingPage.css';

import { useSelector } from 'react-redux';
import { selectWindow } from '../../store/store';
import { ShowConfig } from '../../data/ShowConfig';

export default function LoadingPage() {
    const windowUI = useSelector(selectWindow);
    const sty = {fontSize: (windowUI.width < 400)?30: 50};
    
    return (
        <div className="backgroundCover">
            <div className="LoadingPage">
                <div className="title" style={sty}>
                   <div>{ShowConfig.showTitle}</div>
                   <p>a <a href="https://thewrong.org/">wrong biennale</a> pavillion</p>
                </div>
            </div>
        </div>
    )
}