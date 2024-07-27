import React from "react";

const GoogleDocLink = () => {
  const docUrl =
    "https://docs.google.com/document/d/1TNl6L3Nw-W-I444Lv-4l1Ko9tqbiRESJ3kfo3CY0zVo/edit?usp=sharing";

  return (
    <div
      style={{
        height: "100%",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div>
        <h2>Contribute to Guestbook</h2>

        <a
          style={{ position: "relative", zIndex: 2000, pointerEvents: "all" }}
          className="btn standardButton primary"
          href={docUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit
        </a>
      </div>
    </div>
  );
};

export default GoogleDocLink;
