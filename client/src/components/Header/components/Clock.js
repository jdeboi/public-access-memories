import React, { useState, useEffect } from 'react';

function Clock() {
  
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      updateClock();
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const updateClock = () => {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;

    // var currentSeconds = currentTime.getSeconds();
    // currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

    var timeOfDay = (currentHours < 12) ? "AM" : "PM";
    currentHours = (currentHours > 12) ? currentHours - 12 : currentHours;
    currentHours = (currentHours === 0) ? 12 : currentHours;

    var shortDays = [
      'Sun', //Sunday starts at 0
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ];
    let x = currentTime.getDay(); //This returns a number, starting with 0 for Sunday
    let day = (shortDays[x]);

    let currentTimeString = day + " " + currentHours + ":" + currentMinutes + " " + timeOfDay;

    setTimeString(currentTimeString);
  }

  return (
    <span id="clock">{timeString}</span>
  )

}


export default Clock;
