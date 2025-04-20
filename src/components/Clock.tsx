import React, { useState, useEffect } from "react";

export default function TimeDisplay(): React.ReactElement {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    // Update the time every minute
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const hours: string = currentTime.getHours().toString().padStart(2, "0");
  const minutes: string = currentTime.getMinutes().toString().padStart(2, "0");

  return (
    <div className="flex items-center backdrop-blur-sm p-2 lg:p-7 rounded-4xl shadow-md font-light mr-4">
      {hours}:{minutes}
    </div>
  );
}
