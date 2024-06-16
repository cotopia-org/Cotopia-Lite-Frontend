'use client';

import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{ windowWidth: number }>({ windowWidth: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ windowWidth: window.innerWidth });
    };

    // Set the initial width when loading the component
    setWindowSize({ windowWidth: window.innerWidth });

    // Add a listener to resize the window
    window.addEventListener('resize', handleResize);

    // Removing the listener when the component is unloaded
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  return { windowSize };
};

export default useWindowSize;