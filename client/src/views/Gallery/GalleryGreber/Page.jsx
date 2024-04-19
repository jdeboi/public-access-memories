import React from "react";

const Page = ({ index, startPage, children, numPages }) => {
  let classN = `page page${index}`;
  classN += index % 2 == 0 ? " even" : " odd";

  let isFlipped = false;
  if (index < startPage && index % 2 == 1) isFlipped = true;
  else if (index > startPage && index % 2 == 0) isFlipped = true;
  if (isFlipped) {
    classN += " flipped";
  }
  const isHidden = index > startPage + 2;

  const distToStart = Math.abs(startPage - index);
  let zIndex = 20 - distToStart;

  if (index % 2 == 1 && index > startPage) {
    zIndex -= 1;
  } else if (index % 2 == 0 && index > startPage) {
    zIndex += 3;
  }

  const shouldShowPageFlip = () => {
    if (index == 0) return false;
    if (index % 2 == 1 && index == numPages - 1) return false;
    return true;
  };

  const pageNum = Math.floor(index / 2);

  return (
    <div
      className={classN}
      style={{
        zIndex: zIndex,
        backgroundImage: `url(/dave/office_${pageNum}.jpeg)`,
      }}
    >
      {children}

      {shouldShowPageFlip() && (
        <>
          <div className="page-corner"></div>
          <div className="page-corner-up"></div>
        </>
      )}
    </div>
  );
};

export default Page;
