import { ConnectionQuality, Participant } from "livekit-client";
import { ReactNode } from "react";
import Layer from "./layer";
import { useConnectionQualityIndicator } from "@livekit/components-react";

type Props = {
  quality: ConnectionQuality;
  children: ReactNode;
};
export default function WithConnectionQuality({ children, quality }: Props) {
  return (
    <div className='relative'>
      <Layer quality={quality} />
      {children}
    </div>
  );
}