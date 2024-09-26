<<<<<<< HEAD
import AddButtonTool from "./add-button";
import BroadcastButtonTool from "./broadcast-button";
import ChatButtonTool from "./chat-button";
import EditButtonTool from "./edit-button";
import ShareScreenButtonTool from "./share-screen-button";
import VideoButtonTool from "./video-button";
import VoiceButtonTool from "./voice-button";
import MegaPhoneButtonTool from "./megaphone-button";
import GridViewButtonTool from "./gridview-button";
import { useRoomSpatialContext } from "@/context/room-spatial-context";
=======
import AddButtonTool from "./add-button"
import BroadcastButtonTool from "./broadcast-button"
import ChatButtonTool from "./chat-button"
import EditButtonTool from "./edit-button"
import ShareScreenButtonTool from "./share-screen-button"
import VideoButtonTool from "./video-button"
import VoiceButtonTool from "./voice-button"
// import MegaPhoneButtonTool from "./megaphonew-button";
>>>>>>> 8969a45dadcbd794b8088d6aad7c6a5d84899632

export default function BottomMiddleTools() {
  return (
    <div className="flex flex-row items-center bg-white rounded-xl p-2">
      <AddButtonTool />
      <EditButtonTool/>
      {/* <ShareScreenButtonTool /> */}
      <ChatButtonTool />
      <BroadcastButtonTool />
<<<<<<< HEAD
      {/* <VideoButtonTool /> */}
      {/* <VoiceButtonTool /> */}
      <MegaPhoneButtonTool />
      <GridViewButtonTool />
=======
      <VideoButtonTool />
      <VoiceButtonTool />
      {/* <MegaPhoneButtonTool /> */}
      {/* <GridViewButtonTool /> */}
>>>>>>> 8969a45dadcbd794b8088d6aad7c6a5d84899632
    </div>
  )
}
