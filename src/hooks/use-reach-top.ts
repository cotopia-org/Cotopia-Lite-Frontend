import { useEffect, useState } from "react";

export const useReachTop = (element?: HTMLElement, offset?: number) => {
  const [diff, setDiff] = useState<number>(0);

  useEffect(() => {
    if (!element) return;

    function scrollManager() {
      const diff = (element?.scrollTop ?? 0) - (offset ?? 0);
      setDiff(diff);
    }

    element?.addEventListener("scroll", scrollManager);

    return () => {
      element?.removeEventListener("scroll", scrollManager);
    };
  }, [element?.scrollTop, offset]);

  return {
    reachTop: diff <= 0,
    diff,
  };
};
