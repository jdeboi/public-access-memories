import React from "react";
import "./Pagination.css";
import {
  GIFT_PAGE,
  GUESTBOOK_PAGE,
} from "../../../../../data/Shows/HomeOffices/PageConstants";

interface PaginationProps {
  currentLayoutNum: number;
  numLayouts: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentLayoutNum,
  numLayouts,
}) => {
  const getPaginationButtons = () => {
    let start = Math.max(1, currentLayoutNum - 1);
    let end = Math.min(numLayouts, currentLayoutNum + 2);

    if (currentLayoutNum === 1) {
      end = Math.min(numLayouts, 4);
    } else if (currentLayoutNum === numLayouts) {
      start = Math.max(1, numLayouts - 3);
    }

    const layouts = [];
    for (let i = start; i <= end; i++) {
      layouts.push(i);
    }

    return layouts;
  };

  const getNumberText = (layout: number) => {
    if (layout - 1 == GIFT_PAGE) return "gift shop";
    else if (layout - 1 == GUESTBOOK_PAGE) return "guestbook";
    return layout;
  };

  const paginationButtons = getPaginationButtons();

  return (
    <div className="Pagination">
      {currentLayoutNum > 2 && numLayouts > 4 && (
        <button disabled className="page-button ellipsis">
          ...
        </button>
      )}
      {paginationButtons.map((layout) => (
        <button
          key={layout}
          className={
            layout === currentLayoutNum ? "page-button current" : "page-button"
          }
          disabled
        >
          {getNumberText(layout)}
        </button>
      ))}
      {currentLayoutNum < numLayouts - 2 && numLayouts > 4 && (
        <button disabled className="page-button ellipsis">
          ...
        </button>
      )}
    </div>
  );
};

export default Pagination;
