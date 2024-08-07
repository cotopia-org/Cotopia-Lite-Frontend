import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import { useMemo } from "react";
import { useProfile } from "../../../protected-wrapper";
import TimeStamp from "../job-list/job-info/time-stamp";
import { UserType } from "@/types/user";

type Props = {
  seen?: boolean;
  title: string;
  subTitle: string;
  username: string;
  avatar?: string;
  date: Date;
  acceptedBy?: UserType[];
};

export default function InviteCard({
  title,
  subTitle,
  username,
  avatar,
  date,
  acceptedBy,
  seen,
}: Props) {
  const { user } = useProfile();
  const isSelf = useMemo(() => user?.username === username, [user]);
  const createdAt = "today";

  return (
    <>
      {isSelf && <p className="text-right text-xs">{createdAt}</p>}
      <div
        className={`p-3 transition-colors flex gap-3 ${
          !isSelf ? "border rounded-xl" : "border-b"
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
              <CotopiaAvatar src={avatar} title="A" className="size-8" />
              <p className="text-sm">{username}</p>
            </span>
            {isSelf ? (
              <div className="flex gap-1 justify-around">
                <CotopiaAvatar title="A" className="size-6" />
                <CotopiaAvatar title="A" className="size-6" />
              </div>
            ) : (
              <TimeStamp date={date} size="sm" />
            )}
          </div>

          <div className="px-2 flex-auto">
            <p className="text-lg mt-1">{title}</p>
            <p className="text-gray-300 text-sm mt-1">{subTitle}</p>
            {!isSelf && (
              <div className="mt-2 flex justify-end">
                <div className="flex gap-2 items-center justify-between text-gray-400">
                  <p className="text-xs">Accepted by </p>
                  {acceptedBy?.map((user) => (
                    <CotopiaAvatar src={user?.avatar?.url} className="size-5" />
                  ))}
                  {/* test */}
                  <CotopiaAvatar title="a" className="size-5" />
                  <CotopiaAvatar title="a" className="size-5" />
                  {/* test */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
