import React from "react";

const Page = ({ index, startPage, children, numLayouts, windowUI }) => {
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

  const getBackgroundSize = () => {
    let aspect = 1920 / 1080;
    let w = windowUI.width;
    let screenAspect = w / windowUI.contentH;

    if (screenAspect < aspect) {
      return "200%";
    } else {
      let newHeight = windowUI.contentH;

      let newWidth = (1920 * newHeight) / 1080;
      let percent = (newWidth / windowUI.contentW) * 200;
      return `${percent}%`;
    }
  };

  const getBackgroundPosition = () => {
    let aspect = 1920 / 1080;
    let w = windowUI.width;
    let screenAspect = w / windowUI.contentH;

    let dx = 0;
    if (screenAspect < aspect) {
      if (index % 2 == 0) {
        return "center left";
      }
      return "center right";
    } else {
      let newHeight = windowUI.contentH;
      let newWidth = (1920 * newHeight) / 1080;
      dx = (w - newWidth) / 2;
      if (index % 2 == 1) dx = -newWidth / 2;
    }
    return `${dx}px center`;
  };
  const shouldShowPageFlip = () => {
    if (index == 0) return false;
    if (index % 2 == 1 && index == numLayouts - 1) return false;
    return true;
  };

  const pageNum = Math.floor(index / 2);

  return (
    <div
      className={classN}
      style={{
        zIndex: zIndex,
        backgroundRepeat: "no-repeat",
        backgroundSize: getBackgroundSize(),
        backgroundPosition: getBackgroundPosition(),
        backgroundImage: `url(https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/pages/Office_${pageNum}/0.jpg)`,
      }}
    >
      {children}

      {/* {shouldShowPageFlip() && (
        <>
          <div className="page-corner"></div>
          <div className="page-corner-up"></div>
        </>
      )} */}
    </div>
  );
};

export default Page;
