import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import { cn } from "@/lib/utils";
import { EllipsisVertical, Menu } from "lucide-react";

interface Invite {
  name?: string;
  avatar?: string;
  status: "pendig" | "in progress" | "rejected";
}

interface InviteList {
  list: Invite[];
}

export default function InviteList({ list }: InviteList) {
  return (
    <div className="bg-gray-100 rounded-md p-2">
      {list.map(({ status, avatar, name = "imebneali" }, index) => (
        <>
          <div className="flex items-center justify-between py-2 px-3">
            <div className="flex gap-1 items-center">
              <CotopiaAvatar title="A" />
              <p className="text-sm">{name}</p>
            </div>
            <div className="flex gap-1 items-center">
              <p
                className={cn(
                  status === "pendig"
                    ? "text-gray-500"
                    : status === "rejected"
                    ? "text-red-600"
                    : "text-blue-500"
                )}
              >
                {status}
              </p>
              <EllipsisVertical size={20} />
            </div>
          </div>
          {index + 1 !== list.length && <hr />}
        </>
      ))}
    </div>
  );
}
