"use client";
import { memo, useEffect, useState } from "react";

export const LiveClock = memo(() => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      setCurrentDate(formattedDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="text-xl font-thin opacity-90">{currentDate}</div>;
});

LiveClock.displayName = "LiveClock";
