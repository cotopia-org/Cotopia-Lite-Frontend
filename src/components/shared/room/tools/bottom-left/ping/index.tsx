// PingComponent.tsx
import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { RadioTower } from "lucide-react";
import React, { useEffect, useState } from "react";

const PingShower: React.FC = () => {
  const socket = useSocket();
  const [ping, setPing] = useState<number>();

  useEffect(() => {
    const interval = setInterval(() => {
      const start = Date.now();

      socket?.emit("ping", () => {
        const duration = Date.now() - start;
        setPing(duration);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  let clss = "flex flex-row items-center gap-x-2";

  if (ping) {
    if (ping < 80) {
      clss += ` text-success-500`;
    } else if (ping < 140) {
      clss += ` text-blue-500`;
    } else if (ping < 200) {
      clss += ` text-yellow-700`;
    } else if (ping > 200) {
      clss += ` text-red-500`;
    }
  }

  return (
    <CotopiaTooltip title='Ping'>
      <div className={clss}>
        <RadioTower />
        <span>{ping}</span>
      </div>
    </CotopiaTooltip>
  );
};

export default PingShower;
