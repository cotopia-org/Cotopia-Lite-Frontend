import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Menu } from "lucide-react";
import { useRoomContext } from "../../../room-context";
import CBadge from "@/components/shared-ui/c-badge";
import { useAppSelector } from "@/store/redux/store";

export default function UserChatsSettingsButtonTool() {
  const { openSidebar, closeSidebar, sidebar } = useRoomContext();
  const handleOpenChat = () => {
    if (sidebar) {
      closeSidebar();
    } else {
      openSidebar(<></>);
    }
  };

  const roomSlice = useAppSelector((state) => state.roomSlice);

  const messagesCount = roomSlice?.messages_count ?? { room: [], objects: {} };

  const roomIds = messagesCount.room;
  const directsIds = Object?.values(messagesCount.directs).flatMap(
    (item) => item
  );

  const totalCount = roomIds.length + directsIds.length;

  return (
    <div className='relative'>
      <CBadge
        count={totalCount}
        className='absolute right-[1px] text-xs top-[1px] z-[2] '
        size='small'
      />
      <CotopiaIconButton className='text-black' onClick={handleOpenChat}>
        <Menu />
      </CotopiaIconButton>
    </div>
  );
}
