import { cn } from "@/lib/utils";
import { ConnectionQuality } from "livekit-client";
import { TriangleAlert } from "lucide-react";

type Props = {
  quality: ConnectionQuality;
};
export default function Layer({ quality }: Props) {
  if (quality === ConnectionQuality.Unknown) return;
  if (quality === ConnectionQuality.Excellent) return;
  if (quality === ConnectionQuality.Good) return;

  let icon = <TriangleAlert size={32} />;

  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-full rounded-full bg-yellow-500/40 text-yellow-700 z-[1000] flex items-center justify-center"
      )}
    >
      {icon}
    </div>
  );
}
