import React from "react";

interface ToolbarProps {
  title: string;
  toggleClosed: any;
  toggleMinimized: any;
  toggleMaximized: any;
}

function Toolbar({
  title,
  toggleClosed,
  toggleMinimized,
  toggleMaximized,
}: ToolbarProps) {
  return (
    <div className="titlebar handle">
      <div className="buttons">
        <div className="close circleButton" onClick={toggleClosed}>
          <div className="closebutton">
            <div className="innerC"></div>
          </div>
        </div>
        <div className="minimize circleButton" onClick={toggleMinimized}>
          <div className="minimizebutton">
            <div className="innerC"></div>
          </div>
        </div>
        <div className="zoom circleButton" onClick={toggleMaximized}>
          <div className="zoombutton">
            <div className="innerC"></div>
          </div>
        </div>
      </div>
      <div className="titleTxtContainer">{title}</div>
    </div>
  );
}

export default Toolbar;
