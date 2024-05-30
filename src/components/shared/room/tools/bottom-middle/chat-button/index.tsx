import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { MessageSquare } from "lucide-react";

export default function ChatButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <MessageSquare size={20} />
    </CotopiaIconButton>
  );
}
