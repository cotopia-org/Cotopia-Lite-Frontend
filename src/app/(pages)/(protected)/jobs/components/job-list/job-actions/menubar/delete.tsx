import { Trash } from "lucide-react";
import ActionItem from "./action-item";
import { useCallback } from "react";

function DeleteJob() {
  const handleDelete = useCallback(() => {}, []);
  return (
    <ActionItem
      title="Delete"
      onClick={handleDelete}
      icon={<Trash size={16} />}
    />
  );
}

export default DeleteJob;
