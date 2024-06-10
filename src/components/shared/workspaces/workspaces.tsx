import { Workspace } from "@/types/workspace";
import WorkspaceItem from "./workpsace/workspace";

type Props = {
  items: Workspace[];
};
export default function Workspaces({ items }: Props) {
  //Return nothing when items is empty
  if (items.length === 0) return null;

  return (
    <div className='flex flex-col gap-y-2'>
      {items.map((workspace) => (
        <WorkspaceItem item={workspace} key={workspace.id} />
      ))}
    </div>
  );
}
