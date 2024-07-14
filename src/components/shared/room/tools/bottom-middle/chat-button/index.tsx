import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { MessageSquare } from "lucide-react";
import { useRoomContext } from "../../../room-context";

export default function ChatButtonTool() {
  const { openSidebar, sidebar, closeSidebar } = useRoomContext();

  const handleOpenChat = () => {
    if (sidebar) {
      closeSidebar();
    } else {
      openSidebar(<></>);
    }
  };

  let clss = "text-black";
  if (sidebar) clss += ` !bg-black/5`;

  return (
    <CotopiaIconButton className={clss} onClick={handleOpenChat}>
      <MessageSquare size={20} />
    </CotopiaIconButton>
  );
}
