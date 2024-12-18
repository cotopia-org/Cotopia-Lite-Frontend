import { convertMinutesToHHMMSS } from "@/lib/utils";
import React from "react";
import Timer from "../timer";
import { useRoomContext } from "@/components/shared/room/room-context";
import UserAvatar from "@/components/shared/user-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Rank from "./rank";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import BlurFade from "@/components/magicui/blur-fade";
import { useApi } from "@/hooks/swr";
import { LeaderboardType } from "@/types/leaderboard";

export default function TimeTrackingDetails() {
  const { workspace_id } = useRoomContext();

  const { user } = useProfile();

  const { data: leaderboardData } = useApi(
    `/workspaces/${workspace_id}/leaderboard`
  );

  const leaderboard: LeaderboardType[] = leaderboardData?.data ?? [];

  let content = (
    <>
      {leaderboard
        .sort((a, b) => b.sum_minutes - a.sum_minutes)
        .map((item, key) => {
          const isMe = item.user.id === user.id;

          let clss =
            "flex flex-row items-center justify-between p-2 border-b last:border-0";

          if (isMe) clss += ` bg-sky-300`;

          const hasCount =
            (item?.user?.status === "online" && item.user?.room_id !== null) ||
            isMe;

          return (
            <BlurFade
              inView
              className={clss}
              key={key}
              delay={0.05 + key * 0.05}
            >
              <div className='flex flex-row items-center gap-x-2'>
                <Rank rank={key + 1} />
                <UserAvatar
                  title={item.user?.name}
                  src={item?.user?.avatar?.url}
                />
                <span className='text-xs'>{item.user?.name ?? "-"}</span>
              </div>
              <div>
                {hasCount ? (
                  <Timer initialSeconds={item.sum_minutes * 60}>
                    {(time) => <strong className='text-xs'>{time}</strong>}
                  </Timer>
                ) : (
                  <span className='text-xs opacity-85'>
                    {convertMinutesToHHMMSS(item.sum_minutes)}
                  </span>
                )}
              </div>
            </BlurFade>
          );
        })}
    </>
  );

  return (
    <ScrollArea className='h-72 flex flex-col gap-y-4 w-full'>
      {content}
    </ScrollArea>
  );
}
