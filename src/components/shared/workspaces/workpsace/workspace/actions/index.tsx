import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { WorkspaceType } from "@/types/workspace";
import { MoreHorizontal } from "lucide-react";

type Props = {
  item: WorkspaceType;
};
export default function WorkspaceActions({ item }: Props) {
  return (
    <CotopiaIconButton variant={"ghost"} className='!bg-transparent'>
      <MoreHorizontal />
    </CotopiaIconButton>
  );
}
