import React, { useEffect, useState } from 'react';
import "./Frame.css";

//https://github.com/STRML/react-draggable
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import Toolbar from './Toolbar';



interface PointProps {
    x: number;
    y: number;
}

interface FrameProps extends PointProps {
    z?: number;

    width: number;
    // are there times we don't want to define height?
    // like, we want the div tags to determine  height?
    height: number;

    title?: string;
    name?: string;
    icon?: string,
    className?: string;

    handle?: string;
    window?: string;
    unbounded?: boolean;
    windowStyle?: React.CSSProperties;

    content: React.ReactNode;

    isHidden?: boolean;
    isMinimized?: boolean;

    onDrag?: (p: PointProps) => void;
    onHide?: () => void;
    onMinimized?: () => void;
    onMaximized?: () => void;
    onStart?: () => void;
    onStop?: () => void;
    newFrameToTop?: () => void;
}



const Frame = (props: FrameProps) => {
    const toolBarH = 26;
    const { x, y, unbounded } = props;
    const origCoords = { x: x, y: y };
    const bounds = unbounded ? "" : ".App-Content";

    const [frameClassName, setFrameClassName] = useState("");
    const [frameTitle, setFrameTitle] = useState("");
    const [frameStyle, setFrameStyle] = useState<React.CSSProperties>({});
    // const [activeDrags, setActiveDrags] = useState(0);
    const [isHidden, setIsHidden] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    // const [isMaximized, setIsMaximized] = useState(false);
    const [controlledPosition, setControlledPosition] = useState<PointProps>({ x, y });

    const contentVisibility = {
        display: isMinimized ? "none" : "block",
        height: props.height,
        width: props.width
    }
    const wrapper = React.createRef<HTMLInputElement>();


    useEffect(() => {

        const setTitle = () => {
            const { title } = props;
            const parser = new DOMParser();
            if (title && title !== "") {
                setFrameTitle(title);
            }
            else if (title === "" && props.icon) {
                const parsedString = parser.parseFromString(props.icon, 'text/html');
                setFrameTitle(parsedString.body.innerHTML);
            }
        }

        const setClass = () => {
            let classn = "Frame";
            if (props.isHidden === undefined && isHidden) {
                classn += " hidden";
            }
            else if (props.isHidden) {
                classn += " hidden";
            }
            else if (props.isMinimized || isMinimized) {
                classn += " minimized";
            }

            // if (isMaximized) {
            //     classn += " maximized";
            // }
            if (props.className) {
                classn += " " + props.className;
            }

            setFrameClassName(classn);
        }

        setTitle();
        setClass();
        const frameH = toolBarH + (isMinimized ? 0 : props.height);
        setFrameStyle({
            width: Math.floor(props.width) + 2,
            zIndex: props.z ? props.z : 0,
            height: Math.floor(frameH)
        });
    }, [props.isHidden, isHidden, isMinimized, props.z])

    const onControlledDrag = (e: DraggableEvent, data: DraggableData): void | false => {
        const { x, y } = data;
        setControlledPosition({ x, y });
        if (props.onDrag) {
            props.onDrag({ x, y });
        }
    };

    // const onControlledDragStop = (e: DraggableEvent, data: DraggableData) => {
    //     onControlledDrag(e, data);
    //     onStop();
    // };

    const toggleClosed = (e: MouseEvent) => {
        setIsHidden(true);
        if (props.onHide)
            props.onHide();
        e.stopPropagation();
    }

    const toggleMinimzed = (e: MouseEvent) => {
        setIsMinimized(isM => !isM);
        if (props.onMinimized)
            props.onMinimized();
        e.stopPropagation();
    }

    const toggleMaximized = (e: MouseEvent) => {
        setControlledPosition({ x: origCoords.x, y: origCoords.y })
        if (props.onMaximized)
            props.onMaximized();
        e.stopPropagation()
    }

    // const onStart = () => {
    //     // setActiveDrags(active => active + 1);
    //     if (props.onStart)
    //         props.onStart();
    // };

    // const onStop = () => {
    //     // setActiveDrags(active => active - 1);
    //     if (props.onStop)
    //         props.onStop();
    // };

    const handleStart = () => {
        if (props.newFrameToTop)
            props.newFrameToTop();
    }

    const handleStop = () => {
    }

    const handleClick = (e: MouseEvent) => {
        if (props.newFrameToTop)
            props.newFrameToTop();
        e.stopPropagation();
    }




    return (
        <Draggable
            axis="both"
            handle={props.handle ? (".handle, " + props.handle) : ".handle"}
            defaultPosition={{ x: props.x, y: props.y }}
            position={controlledPosition}
            grid={[1, 1]}
            scale={1}
            bounds={bounds}
            cancel=".close, .minimize, .zoom"
            onStart={handleStart}
            onDrag={onControlledDrag}
            onStop={handleStop}
            nodeRef={wrapper}
        >
            <div ref={wrapper} onClick={() => handleClick} className={frameClassName} style={frameStyle} >
                <div className={props.window ? "window " + props.window : "window"} style={props.windowStyle}>
                    <Toolbar title={frameTitle} toggleClosed={toggleClosed} toggleMinimzed={toggleMinimzed} toggleMaximized={toggleMaximized} />
                    <div className="content" style={contentVisibility}>
                        {props.content}
                    </div>
                </div>
            </div>
        </Draggable>

    );
};

export default Frame;