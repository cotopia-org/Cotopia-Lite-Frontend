import { useEffect, useState } from "react";

type Props = {
  count: number;
  size?: "small" | "normal" | "large";
  className?: string;
};

let timeout: any = undefined;

export default function CBadge({ count, size = "small", className }: Props) {
  const [hasAnimate, setHasAnimate] = useState(false);

  useEffect(() => {
    function giveAnimate() {
      setHasAnimate(true);

      timeout = setTimeout(() => {
        setHasAnimate(false);
      }, 1000);
    }

    giveAnimate();

    return () => {
      clearTimeout(timeout);
    };
  }, [count]);

  let clss = className ?? "";

  switch (size) {
    case "small":
      clss += ` w-[16px] h-[16px]`;
      break;
    case "normal":
      clss += ` w-[24px] h-[24px]`;
      break;
    case "large":
      clss += ` w-[32px] h-[32px]`;
      break;
  }

  if (count <= 0) return;

  return (
    <div
      className={`rounded-full bg-destructive text-white flex items-center justify-center ${
        hasAnimate ? "animate-scale-custom" : ""
      } ${clss}`}
    >
      {count}
    </div>
  );
}
