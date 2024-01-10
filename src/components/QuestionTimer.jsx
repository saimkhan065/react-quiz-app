import { useState, useEffect } from "react";

export default function QuestionTimer({ timeOut, onTimeOut }) {
  const [remTime, setRemTime] = useState(timeOut);

  useEffect(() => {
    const timer = setTimeout(onTimeOut, timeOut);
    return () => {
      clearTimeout(timer);
    };
  }, [timeOut, onTimeOut]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemTime((remTime) => {
        remTime - 100;
      });
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress max={timeOut} value={remTime} />;
}
