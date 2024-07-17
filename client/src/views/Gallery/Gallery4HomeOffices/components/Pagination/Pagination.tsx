import React from "react";
import "./Pagination.css";

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
          {layout == 17 ? "gift shop" : layout}
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
