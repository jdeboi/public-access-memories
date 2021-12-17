import React, { MouseEvent, useEffect, useState } from 'react';
import Frame from '../Frame/Frame';
import './CenterModal.css';
import { getCenterModalDim } from './helpers';

// store
import { useSelector } from 'react-redux';
import { selectWindow } from '../../store/store';

interface CenterModalProps {
    title: string,
    classN: string,
    content: JSX.Element,
    buttons: JSX.Element,
    width?: number,
    height?: number,
    isHidden: boolean,
    z: number,
    isRelative: boolean,
    onHide(): any
}


export default function CenterModal({ title, classN, z, height, width, isHidden, content, buttons, isRelative, onHide }: CenterModalProps) {

    const windowUI = useSelector(selectWindow);
    const [dimensions, setDimensions] = useState(getCenterModalDim(windowUI, isRelative));
    const [classT, setClassT] = useState("");

    useEffect(() => {
        if (height && width) {
            let h = Math.min(dimensions.h, height);
            let w = Math.min(dimensions.w, width);
            let y = (windowUI.contentH - h - windowUI.toolbarH) / 2;
            if (!isRelative)
                y += windowUI.headerH;
            let x = (windowUI.contentW - w) / 2;

            setDimensions({x, y, w, h});
        }
        if (!isHidden)
            setClassT(" GrayedOut");
        else
            setClassT("");
    }, [isHidden])


    // const handleMouse = (e: MouseEvent) => {
    //   e.stopPropagation();
    // }

    const handleDoubleClick = (e: MouseEvent) => {
        e.stopPropagation();
    }

    return (
        <React.Fragment>
            <div className={classT} onDoubleClick={handleDoubleClick} style={{ visibility: (isHidden ? "hidden" : "visible"), zIndex: z }} />
            <Frame
                title={title}
                isHidden={isHidden}
                unbounded={false}
                onHide={onHide}
                windowStyle={{ background: "white" }}
                content={
                    <div className={classN + " CenterModal SignInForm"} style={{ width: dimensions.w, height: dimensions.h }}>
                        <div className="CenterModal-Container" style={{ padding: 20, width: dimensions.w - 40, height: dimensions.h - 40 }}>
                            {content}
                            {buttons}
                        </div>
                    </div>
                }
                width={dimensions.w}
                height={dimensions.h}
                x={dimensions.x}
                y={dimensions.y}
                z={z + 1}
            />
        </React.Fragment>
    );


}
