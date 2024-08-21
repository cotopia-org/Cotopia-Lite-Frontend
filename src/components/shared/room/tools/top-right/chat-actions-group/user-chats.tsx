import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { MessagesSquare } from "lucide-react";
import { useRoomContext } from "../../../room-context";
import { useRoomSpatialContext } from "@/app/(pages)/(protected)/room/spatial/room-spatial-wrapper";

export default function UserChatsSettingsButtonTool() {
  // const { openSidebar, closeSidebar, sidebar } = useRoomContext();
  const {setOpenSidebar} = useRoomSpatialContext();

  const handleOpenChat = () => {
    // if (sidebar) {
    //   closeSidebar();
    // } else {
    //   openSidebar(<></>);
    // }

    setOpenSidebar(prevState => !prevState);
  };

  return (
    <CotopiaIconButton className='text-black' onClick={handleOpenChat}>
      <MessagesSquare />
    </CotopiaIconButton>
  );
}
