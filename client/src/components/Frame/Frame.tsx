import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Frame.css";

//https://github.com/STRML/react-draggable
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import Toolbar from "./Toolbar";

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
  icon?: string;
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
  const [isHidden, setIsHidden] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const [controlledPosition, setControlledPosition] = useState<PointProps>({
    x,
    y,
  });
  const [propsPosition, setPropsPosition] = useState({
    x: props.x,
    y: props.y,
  });

  const [pos, setPos] = useState<{ x: number; y: number }>({
    x: props.x,
    y: props.y,
  });

  // ✅ stable ref — do NOT recreate per render
  const nodeRef = useRef<HTMLDivElement>(null);

  const contentVisibility = {
    display: isMinimized ? "none" : "block",
    height: props.height,
    width: props.width,
  };

  useEffect(() => {
    const { title } = props;
    const parser = new DOMParser();
    if (title && title !== "") {
      setFrameTitle(title);
    } else if (title === "" && props.icon) {
      const parsedString = parser.parseFromString(props.icon, "text/html");
      setFrameTitle(parsedString.body.innerHTML);
    }

    let classn = "Frame";
    if (props.isHidden === undefined && isHidden) classn += " hidden";
    else if (props.isHidden) classn += " hidden";
    else if (props.isMinimized || isMinimized) classn += " minimized";
    if (props.className) classn += " " + props.className;
    setFrameClassName(classn);
  }, [
    props.isHidden,
    props.isMinimized,
    props.className,
    props.icon,
    props.title,
    isHidden,
    isMinimized,
  ]);

  useEffect(() => {
    const frameH = toolBarH + (isMinimized ? 0 : props.height);
    setFrameStyle({
      width: Math.floor(props.width) + 2,
      zIndex: props.z ? props.z : 0,
      height: Math.floor(frameH),
    });
  }, [props.z, props.width, props.height, isMinimized]);

  // keep controlledPosition in sync if parent changes x/y
  useEffect(() => {
    const dx = props.x - propsPosition.x;
    const dy = props.y - propsPosition.y;
    if (dx !== 0 || dy !== 0) {
      setPropsPosition({ x: props.x, y: props.y });
      setControlledPosition((cp) => ({ x: cp.x + dx, y: cp.y + dy }));
    }
  }, [props.x, props.y, propsPosition.x, propsPosition.y]);

  const onControlledDrag = useCallback(
    (e: DraggableEvent, data: DraggableData) => {
      const { x, y } = data;
      setControlledPosition({ x, y });
      props.onDrag?.({ x, y });
    },
    [props]
  );

  const toggleClosed = (e: MouseEvent) => {
    setIsHidden(true);
    props.onHide?.();
    e.stopPropagation();
  };

  const toggleMinimized = (e: MouseEvent) => {
    setIsMinimized((isM) => !isM);
    props.onMinimized?.();
    e.stopPropagation();
  };

  const toggleMaximized = (e: MouseEvent) => {
    setControlledPosition({ x: origCoords.x, y: origCoords.y });
    props.onMaximized?.();
    e.stopPropagation();
  };

  const handleStart = () => props.newFrameToTop?.();
  const handleStop = () => {};
  const handleClick = (e: MouseEvent) => {
    props.newFrameToTop?.();
    e.stopPropagation();
  };

  return (
    <Draggable
      axis="both"
      handle={props.handle ? ".handle, " + props.handle : ".handle"}
      defaultPosition={pos}
      position={controlledPosition}
      grid={[1, 1]}
      scale={1}
      bounds={props.unbounded ? undefined : ".App-Content"}
      onStop={(_, data) => setPos({ x: data.x, y: data.y })} // persist final
      cancel=".close, .minimize, .zoom"
      onStart={handleStart}
      onDrag={onControlledDrag}
      nodeRef={nodeRef} // ✅ stable ref passed here
    >
      <div
        ref={nodeRef} // ✅ same stable ref here
        onClick={handleClick as any} // ✅ actually call the handler
        className={frameClassName}
        style={frameStyle}
      >
        <div
          className={props.window ? "window " + props.window : "window"}
          style={props.windowStyle}
        >
          {/* Ensure Toolbar root has className="handle" */}
          <Toolbar
            title={frameTitle}
            toggleClosed={toggleClosed}
            toggleMinimized={toggleMinimized}
            toggleMaximized={toggleMaximized}
            // e.g., <div className="handle"> inside Toolbar for drag grip
          />
          <div className="content" style={contentVisibility}>
            {props.content}
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Frame;
