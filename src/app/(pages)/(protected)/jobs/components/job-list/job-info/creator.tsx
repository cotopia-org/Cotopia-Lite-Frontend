import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import { Hash } from "lucide-react";

type Props = {
  avatar?: string;
  roomName: string;
  username: string;
};

function JobCreator({ username, avatar, roomName }: Props) {
  return (
    <div className="flex gap-2 items-center justify-between text-gray-400">
      <CotopiaAvatar src={avatar} title="A" className="size-8 static" />
      <span>Created By {username}</span>
      /
      <Hash size={16} />
      <span>{roomName}</span>
    </div>
  );
}

export default JobCreator;
