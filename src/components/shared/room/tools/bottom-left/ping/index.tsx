// PingComponent.tsx
import { useSocket } from "@/app/(pages)/(protected)/protected-wrapper";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { Signal, SignalHigh, SignalLow, SignalMedium } from "lucide-react";
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

  let icon = <Signal />;

  if (ping) {
    if (ping < 80) {
      clss += ` text-green-500`;
      icon = <Signal />;
    } else if (ping < 140) {
      clss += ` text-blue-500`;
      icon = <SignalHigh />;
    } else if (ping < 200) {
      clss += ` text-yellow-700`;
      icon = <SignalMedium />;
    } else if (ping > 200) {
      clss += ` text-red-500`;
      icon = <SignalLow />;
    }
  }

  return (
    <CotopiaTooltip title={`Ping (${ping})`}>
      <div className={clss}>
        {/* <RadioTower /> */}
        {icon}
      </div>
    </CotopiaTooltip>
  );
};

export default PingShower;
