import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Check, Clock, Hash, Pause, PauseCircle, Play } from "lucide-react";
import Badge from "./badge";
import CotopiaAvatar from "@/components/shared-ui/c-avatar";

type Props = {
  seen?: boolean;
  variant?: "divider" | "outline";
};

export default function InviteCard({ seen, variant = "divider" }: Props) {
  return (
    <>
      {variant === "divider" && <p className="text-right text-xs">today</p>}
      <div
        className={`p-3 transition-colors flex gap-3 ${
          variant === "outline" ? "border rounded-xl" : "border-b"
        }`}
      >
        {seen ? null : (
          <div className="w-">
            <span className="inline-block size-3 bg-[#5D11FF] rounded-full"></span>
          </div>
        )}
        <div className="flex-auto">
          <div className="flex justify-between">
            <span className="flex items-center gap-2">
              <CotopiaAvatar title="A" className="size-8" />
              <p className="text-sm">Sara Ranjbar</p>
            </span>
            {variant === "divider" ? (
              <div className="flex gap-1 justify-around">
                <CotopiaAvatar title="A" className="size-6" />
                <CotopiaAvatar title="A" className="size-6" />
              </div>
            ) : (
              <Badge size="sm" title="2 Aug, 2023 - 2:30" />
            )}
          </div>

          <div className="px-2 flex-auto">
            <p className="text-lg mt-1">This is another job title</p>
            <p className="text-gray-300 text-sm mt-1">
              Sometimes Your Jobs need a Description for better understanding
            </p>
            {variant === "outline" && (
              <div className="flex justify-end">
                <div className="flex gap-2 items-center justify-between text-gray-400">
                  <p className="text-xs">Accepted by </p>
                  <CotopiaAvatar title="A" className="size-5" />
                  <CotopiaAvatar title="A" className="size-5" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
