'use client';

import AddButtonTool from "./add-button";
import BroadcastButtonTool from "./broadcast-button";
import ChatButtonTool from "./chat-button";
import EditButtonTool from "./edit-button";
import ShareScreenButtonTool from "./share-screen-button";
import VideoButtonTool from "./video-button";
import VoiceButtonTool from "./voice-button";
import MegaPhoneButtonTool from "./megaphone-button";
import GridViewButtonTool from "./gridview-button";
import { useRoomSpatialDrawContext } from "@/app/(pages)/(protected)/room/spatial/room-spatial-wrapper";

export default function BottomMiddleTools() {
  const { setDrawMode } = useRoomSpatialDrawContext();

  return (
    <div className='flex flex-row items-center bg-white rounded-xl p-2'>
      <AddButtonTool />
      <EditButtonTool onClick={() => setDrawMode(prevState => !prevState)} />
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
