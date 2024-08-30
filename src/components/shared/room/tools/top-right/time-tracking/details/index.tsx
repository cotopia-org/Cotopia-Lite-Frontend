import { useApi } from "@/hooks/swr";
import { convertMinutesToHHMMSS, urlWithQueryParams } from "@/lib/utils";
import React from "react";
import Timer from "../timer";
import { useRoomContext } from "@/components/shared/room/room-context";
import { LeaderboardType } from "@/types/leaderboard";
import UserAvatar from "@/components/shared/user-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Rank from "./rank";
import FullLoading from "@/components/shared/full-loading";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import BlurFade from "@/components/magicui/blur-fade";

export default function TimeTrackingDetails() {
  const { user } = useProfile();

  const { workspace_id } = useRoomContext();

  const { data, isLoading } = useApi(`/workspaces/${workspace_id}/leaderboard`);

  const leaderboard: LeaderboardType[] = data?.data ?? [];

  let content = (
    <>
      {leaderboard
        .sort((a, b) => b.sum_minutes - a.sum_minutes)
        .map((item, key) => {
          const isMe = item.user.id === user.id;

          let clss =
            "flex flex-row items-center justify-between p-2 border-b last:border-0";

          if (isMe) clss += ` bg-sky-300`;

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
                {item?.user?.status === "online" &&
                item.user?.room_id !== null ? (
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

  if (isLoading || data === undefined)
    content = (
      <div className='py-4'>
        <FullLoading />
      </div>
    );

  return (
    <ScrollArea className='h-72 flex flex-col gap-y-4 w-[260px]'>
      {content}
    </ScrollArea>
  );
}
