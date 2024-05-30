import AddButtonTool from "./add-button";
import BroadcastButtonTool from "./broadcast-button";
import ChatButtonTool from "./chat-button";
import EditButtonTool from "./edit-button";
import ShareScreenButtonTool from "./share-screen-button";
import VideoButtonTool from "./video-button";
import VoiceButtonTool from "./voice-button";
import MegaPhoneButtonTool from "./megaphone-button";
import GridViewButtonTool from "./gridview-button";

export default function BottomMiddleTools() {
  return (
    <div className='flex flex-row items-center bg-white rounded-xl px-2'>
      <AddButtonTool />
      <EditButtonTool />
      <ShareScreenButtonTool />
      <ChatButtonTool />
      <BroadcastButtonTool />
      <VideoButtonTool />
      <VoiceButtonTool />
      <MegaPhoneButtonTool />
      <GridViewButtonTool />
    </div>
  );
}
