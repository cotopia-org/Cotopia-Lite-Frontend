"use client";

import { useState, useEffect } from "react";

const useWindowSize = (elementId?: string) => {
  const [windowSize, setWindowSize] = useState<{
    windowWidth: number;
    windowHeight: number;
  }>({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });

  useEffect(() => {
    const updateSize = () => {
      if (elementId) {
        const element = document.getElementById(elementId) as HTMLElement;
        if (element) {
          setWindowSize({ windowWidth: element.clientWidth, windowHeight: element.clientHeight });
        }
      } else {
        setWindowSize({
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
        });
      }
    };

    // Update size initially
    updateSize();

    // Add resize listener
    window.addEventListener("resize", updateSize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [elementId]); // Ensure updates based on elementId

  return { windowSize };
};

export default useWindowSize;
