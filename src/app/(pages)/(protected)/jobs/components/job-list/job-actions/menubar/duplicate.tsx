import { Copy } from "lucide-react";
import ActionItem from "./action-item";
import { useCallback } from "react";

function DuplicateJob() {
  const handleDuplicate = useCallback(() => {}, []);

  return (
    <ActionItem
      title="Duplicate"
      onClick={handleDuplicate}
      icon={<Copy size={16} />}
    />
  );
}

export default DuplicateJob;
