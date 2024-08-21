import AddButtonTool from "./add-button";
import BroadcastButtonTool from "./broadcast-button";
import ChatButtonTool from "./chat-button";
import EditButtonTool from "./edit-button";
import ShareScreenButtonTool from "./share-screen-button";
import VideoButtonTool from "./video-button";
import VoiceButtonTool from "./voice-button";
import MegaPhoneButtonTool from "./megaphone-button";
import GridViewButtonTool from "./gridview-button";
import { useRoomSpatialContext } from "@/app/(pages)/(protected)/room/spatial/room-spatial-wrapper";

export default function BottomMiddleTools() {
  const {setDrawMode , setOpenSidebar , drawMode} = useRoomSpatialContext();

  function handlerDrawMode() {
    setDrawMode(prevState => !prevState);
    if(!drawMode) {
      setOpenSidebar(prevState => false);
    }

  }

  return (
    <div className='flex flex-row items-center bg-white rounded-xl p-2'>
      <AddButtonTool />
      <EditButtonTool onClick={handlerDrawMode}/>
      {/* <ShareScreenButtonTool /> */}
      <ChatButtonTool />
      <BroadcastButtonTool />
      {/* <VideoButtonTool /> */}
      {/* <VoiceButtonTool /> */}
      <MegaPhoneButtonTool />
      <GridViewButtonTool />
    </div>
  );
}
