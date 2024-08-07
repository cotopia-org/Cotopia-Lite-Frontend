import { Ellipsis } from "lucide-react";
import InviteCard from "./invite-card";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { InviteType } from "@/types/invite";

type Props = {
  title: string;
  //   inviteList: InviteType[];
  inviteList: any[];
};

function InviteList({ title, inviteList }: Props) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">{title}</p>
        <CotopiaIconButton>
          <Ellipsis size={16} color="black" />
        </CotopiaIconButton>
      </div>
      {inviteList.map((invite) => (
        <InviteCard seen {...invite} />
      ))}
    </div>
  );
}

export default InviteList;
