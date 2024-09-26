"use client";

import { useState, useEffect } from "react";

<<<<<<< HEAD
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
=======
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    windowWidth: number;
    windowHeight: number;
  }>({ windowWidth: 0, windowHeight: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    };

    // Set the initial width when loading the component
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });

    // Add a listener to resize the window
    window.addEventListener("resize", handleResize);
>>>>>>> 8969a45dadcbd794b8088d6aad7c6a5d84899632

    // Cleanup listener on component unmount
    return () => {
<<<<<<< HEAD
      window.removeEventListener("resize", updateSize);
    };
  }, [elementId]); // Ensure updates based on elementId
=======
      window.removeEventListener("resize", handleResize);
    };
  }, []);
>>>>>>> 8969a45dadcbd794b8088d6aad7c6a5d84899632

  return { windowSize };
};

export default useWindowSize;
