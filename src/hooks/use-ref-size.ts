"use client";

import { useState, useEffect } from "react";

const useRefSize = (ref: any) => {
  const [objectSize, setObjectSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref;

    if (!element) throw new Error("Object didn't find!");

    const w = element?.getBoundingClientRect().width;
    const h = element?.getBoundingClientRect().height;

    const handleResize = () => {
      setObjectSize({
        width: w,
        height: h,
      });
    };

    // Set the initial width when loading the component
    setObjectSize({
      width: w,
      height: h,
    });

    // Add a listener to resize the window
    element.addEventListener("resize", handleResize);

    // Removing the listener when the component is unloaded
    return () => {
      element.removeEventListener("resize", handleResize);
    };
  }, []);

  return { objectSize };
};

export default useRefSize;
