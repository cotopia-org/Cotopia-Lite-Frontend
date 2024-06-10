import CotopiaAvatar from "@/components/shared-ui/c-avatar";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Workspace } from "@/types/workspace";
import { MoreHorizontal } from "lucide-react";

import moment from "moment";
import Link from "next/link";

type Props = {
  item: Workspace;
};
export default function WorkspaceItem({ item }: Props) {
  let avatarTitle = "";
  if (item.name) avatarTitle = item.name[0].toUpperCase();

  //Created time in ago format
  const createdAtTime = moment(item.created_at).fromNow();

  return (
    <Link
      href={`/workspaces/${item.id}`}
      className='p-4 rounded-3xl bg-gray-50 hover:bg-gray-100 w-full flex flex-row items-center justify-between'
    >
      <div className='flex flex-row items-center gap-x-4'>
        <CotopiaAvatar
          src=''
          title={avatarTitle}
          className='w-[44px] h-[44px]'
        />
        <div className='flex flex-col'>
          <strong className='font-medium text-lg text-gray-800'>
            {item.name}
          </strong>
          <span className='text-xs font-normal text-gray-600'>{`Created ${createdAtTime}`}</span>
        </div>
      </div>
      <div>
        <CotopiaIconButton variant={"ghost"} className='!bg-transparent'>
          <MoreHorizontal />
        </CotopiaIconButton>
      </div>
    </Link>
  );
}
