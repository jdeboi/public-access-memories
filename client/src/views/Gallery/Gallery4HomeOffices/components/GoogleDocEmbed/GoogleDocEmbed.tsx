import React from "react";

const GoogleDocEmbed = () => {
  return (
    <div
      style={{
        position: "absolute",
        marginTop: "15%",
        marginLeft: "15%",
        height: "50%",
        width: "50%",
        zIndex: 40,
        pointerEvents: "none"
      }}
    >
      <iframe
        src={
          "https://docs.google.com/document/d/e/2PACX-1vSbT39oYlGlO6Ht_p0MhoNxz9Jagt-a77AyJjiVNrwKHpTnFAXy0afR8kENJrJG2GoOiN-NatFVhAEI/pub?embedded=true"
        }
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        allowFullScreen
        title="Embedded Google Doc"
      />
    </div>
  );
};

export default GoogleDocEmbed;
