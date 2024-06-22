import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { MessagesSquare } from "lucide-react";
import { useRoomContext } from "../../../room-context";

export default function UserChatsSettingsButtonTool() {
  const { openSidebar, closeSidebar, sidebar } = useRoomContext();
  const handleOpenChat = () => {
    if (sidebar) {
      closeSidebar();
    } else {
      openSidebar(<></>);
    }
  };

  return (
    <CotopiaIconButton className='text-black' onClick={handleOpenChat}>
      <MessagesSquare />
    </CotopiaIconButton>
  );
}
