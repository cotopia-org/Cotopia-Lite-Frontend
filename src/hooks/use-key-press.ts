import { useEffect } from "react";

type Callback = () => void;

function useKeyPress(targetKey: string, callback: Callback) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [targetKey, callback]);
}

export default useKeyPress;
