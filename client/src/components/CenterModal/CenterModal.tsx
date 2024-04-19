import React, { MouseEvent, useEffect, useState } from "react";
import Frame from "../Frame/Frame";
import "./CenterModal.css";
import { getCenterModalDim } from "./helpers";

// store
import { useSelector } from "react-redux";
import { selectWindow } from "../../store/store";

interface CenterModalProps {
  title: string;
  classN: string;
  content: JSX.Element;
  buttons: JSX.Element;
  width?: number;
  height?: number;
  isHidden: boolean;
  z: number;
  isRelative: boolean;
  onHide(): any;
}

export default function CenterModal({
  title,
  classN,
  z,
  height,
  width,
  isHidden,
  content,
  buttons,
  isRelative,
  onHide,
}: CenterModalProps) {
  const windowUI = useSelector(selectWindow);
  const [dimensions, setDimensions] = useState(
    getCalculatedDimensions(windowUI, isRelative, width, height)
  );

  const overlayClass = isHidden ? "" : "GrayedOut";

  useEffect(() => {
    setDimensions(getCalculatedDimensions(windowUI, isRelative, width, height));
  }, [windowUI, isRelative, width, height]);

  function getCalculatedDimensions(
    windowUI: any,
    isRelative: boolean,
    width?: number,
    height?: number
  ) {
    const dim = getCenterModalDim(windowUI, isRelative);
    if (height && width) {
      return {
        w: Math.min(dim.w, width),
        h: Math.min(dim.h, height),
        x: (windowUI.contentW - dim.w) / 2,
        y:
          (windowUI.contentH - dim.h - windowUI.toolbarH) / 2 +
          (isRelative ? 0 : windowUI.headerH),
      };
    }
    return dim;
  }

  return (
    <React.Fragment>
      <div
        className={overlayClass}
        onDoubleClick={(e) => e.stopPropagation()}
        style={{
          visibility: isHidden ? "hidden" : "visible",
          zIndex: z,
        }}
      />
      <Frame
        title={title}
        isHidden={isHidden}
        unbounded={false}
        onHide={onHide}
        windowStyle={{ background: "white" }}
        content={
          <div
            className={`${classN} CenterModal SignInForm`}
            style={{
              width: dimensions.w,
              height: dimensions.h,
              display: isHidden ? "none" : "block",
            }}
          >
            <div
              className="CenterModal-Container"
              style={{
                padding: 20,
                width: dimensions.w - 40,
                height: dimensions.h - 40,
              }}
            >
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
