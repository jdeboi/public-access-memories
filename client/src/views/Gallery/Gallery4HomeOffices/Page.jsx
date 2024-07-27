import React from "react";
import {
  getLayoutSlug,
  GIFT_PAGE,
  GUESTBOOK_PAGE,
} from "../../../data/Shows/HomeOffices/PageConstants";

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
    const aspect = 1920 / 1080;
    const screenWidth = windowUI.contentW;
    const screenHeight = windowUI.contentH;
    const screenAspect = screenWidth / screenHeight;

    if (screenAspect < aspect) {
      return "200%";
    } else {
      const newHeight = screenHeight;

      const newWidth = (1920 * newHeight) / 1080;
      const percent = (newWidth / screenWidth) * 200;
      return `${percent}%`;
    }
  };

  const getBackgroundPosition = () => {
    const aspect = 1920 / 1080;
    const screenWidth = windowUI.contentW;
    const screenHeight = windowUI.contentH;
    const screenAspect = screenWidth / screenHeight;

    let dx = 0;
    if (screenAspect < aspect) {
      if (index % 2 == 0) {
        return "center left";
      }
      return "center right";
    } else {
      const newHeight = screenHeight;
      const newWidth = (1920 * newHeight) / 1080;
      dx = (screenWidth - newWidth) / 2;
      if (index % 2 == 1) dx = -newWidth / 2;
    }
    return `${dx}px center`;
  };

  const getBackgroundY = () => {
    const aspect = 1920 / 1080;
    const screenWidth = windowUI.contentW;
    const screenHeight = windowUI.contentH;
    const screenAspect = screenWidth / screenHeight;

    if (screenAspect < aspect) {
      return 0;
    } else {
      return 100;
    }
  };

  const getBackgroundHeight = () => {
    const aspect = 1920 / 1080;
    const screenWidth = windowUI.contentW;
    const screenHeight = windowUI.contentH;
    const screenAspect = screenWidth / screenHeight;

    if (screenAspect < aspect) {
      return 500;
    } else {
      return 300;
    }
  };

  const shouldShowPageFlip = () => {
    if (index == 0) return false;
    if (index % 2 == 1 && index == numLayouts - 1) return false;
    return true;
  };

  const currentLayoutNum = Math.floor(index / 2);
  let url = `url(https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/HomePage/0.jpg)`;
  if (currentLayoutNum == GUESTBOOK_PAGE) {
    let slug = getLayoutSlug(currentLayoutNum);
    url = `url(https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/pages/${slug}/2.jpg)`;
  } else if (currentLayoutNum == GIFT_PAGE) {
    let slug = getLayoutSlug(currentLayoutNum);

    url = `url(https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/pages/guestbook/0.jpg)`;
  } else if (currentLayoutNum > 0) {
    let slug = getLayoutSlug(currentLayoutNum);
    url = `url(https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/pages/${slug}/0.jpg)`;
  }
  return (
    <div
      className={classN}
      style={{
        zIndex: zIndex,
        backgroundRepeat: "no-repeat",
        backgroundSize: getBackgroundSize(),
        backgroundPosition: getBackgroundPosition(),
        backgroundImage: url,
      }}
    >
      {children}
    </div>
  );
};

export default Page;
