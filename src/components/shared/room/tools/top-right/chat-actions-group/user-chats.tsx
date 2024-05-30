import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { MessagesSquare } from "lucide-react";

export default function UserChatsSettingsButtonTool() {
  return (
    <CotopiaIconButton className='text-black'>
      <MessagesSquare />
    </CotopiaIconButton>
  );
}
