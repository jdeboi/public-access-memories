// src/FlippingCalendar.tsx
import React, { useState } from "react";
import "./Calendar.css";

interface Page {
  id: number;
  imgSrc: string;
}

const url =
  "https://jdeboi-public.s3.us-east-2.amazonaws.com/public_access_memories/homeoffices/gifs/calendar/";
const pages: Page[] = [
  { id: 1, imgSrc: url + "0.jpg" },
  { id: 2, imgSrc: url + "1.jpg" },
  { id: 3, imgSrc: url + "2.jpg" },
  { id: 4, imgSrc: url + "3.jpg" },

  // Add more pages as needed
];

const Calendar: React.FC = () => {
  const [flippedPages, setFlippedPages] = useState<number[]>([]);

  const handleClick = (id: number) => {
    setFlippedPages((prevFlippedPages) =>
      prevFlippedPages.includes(id)
        ? prevFlippedPages.filter((pageId) => pageId !== id)
        : [...prevFlippedPages, id]
    );
  };

  return (
    <div className="calendar-container">
      {pages.map((page, index) => (
        <div
          key={page.id}
          className={`calendar-page ${
            flippedPages.includes(page.id) ? "flipped" : ""
          }`}
          style={{ backgroundImage: `url(${page.imgSrc})` }}
          onClick={() => handleClick(page.id)}
        ></div>
      ))}
    </div>
  );
};

export default Calendar;
