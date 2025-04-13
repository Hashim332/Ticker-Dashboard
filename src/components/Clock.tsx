import React, { useState, useEffect } from "react";

export default function TimeDisplay(): React.ReactElement {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    // Update the time every minute
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    // Clean up the interval on component unmount
    return () => {
      clearInterval(timerID);
    };
  }, []);

  // Format the time as HH:MM
  const hours: string = currentTime.getHours().toString().padStart(2, "0");
  const minutes: string = currentTime.getMinutes().toString().padStart(2, "0");

  return (
    <div className="flex items-center backdrop-blur-sm p-7 rounded-4xl shadow-md font-light">
      {hours}:{minutes}
    </div>
  );
}
