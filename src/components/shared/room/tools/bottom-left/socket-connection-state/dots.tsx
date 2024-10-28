import React, { useEffect, useState } from "react";

export default function Dots() {
  const [dotNumber, setDotNumber] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => {
      setDotNumber((prev) => {
        if (prev < 3) return prev + 1;

        return 1;
      });
    }, 400);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {Array.from(Array(dotNumber).keys()).map((x) => (
        <>.</>
      ))}
    </div>
  );
}
