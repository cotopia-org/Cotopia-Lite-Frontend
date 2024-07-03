import { useEffect, useState } from "react";

export const useReachTop = (element?: HTMLElement, offset?: number) => {
  const [reachTop, setReachTop] = useState(false);

  useEffect(() => {
    if (!element) return;

    function scrollManager() {
      setReachTop((element?.scrollTop ?? 0) - (offset ?? 0) <= 0);
    }

    element?.addEventListener("scroll", scrollManager);

    return () => {
      element?.removeEventListener("scroll", scrollManager);
    };
  }, [element?.scrollTop, offset]);

  return reachTop;
};
