import React from "react";
import RoomHeader from "./components/header";
import RoomFooter from "./components/footer";
import RoomDraw from "./components/draw";
import { RoomSpatialWrapper } from "./room-spatial-wrapper";
import RoomSpatialSideBar from "./components/side-bar";
import { Image, MapPin, Settings2 } from "lucide-react";
import ToolbarLeftMiddle from "@/components/shared/room/toolbar/left-middle";

type ButtonStyleType = { base: string, icon: { style: string, size: number } };

export const metadata = {
  title: "Spatial Room",
};

const buttonStyle: ButtonStyleType = {
  base: "bg-white text-gray-400 flex gap-3 py-2 uppercase font-bold",
  icon: { style: "transition-colors p-1 w-8 h-8 hover:bg-gray-300/30 rounded-sm", size: 20 },
};

const iconClass = "text-slate-600 transition-colors hover:text-black cursor-pointer";

const RoomSpatial = React.memo(() => {
  return (
    <RoomSpatialWrapper>
      <main className="bg-slate-950 w-full h-screen grid grid-cols-12">
        <div className="col-span-10 relative">
          <RoomHeader className={buttonStyle.base} iconSize={buttonStyle.icon.size} iconStyle={buttonStyle.icon.style} />
          <RoomDraw />

          <ToolbarLeftMiddle>
            <div className="flex flex-col bg-white shadow-md rounded-md p-2 gap-3">
              <MapPin size={24} className={iconClass} />
              <Image size={24} className={iconClass} />
              <Settings2 size={24} className={iconClass} />
            </div>
          </ToolbarLeftMiddle>
          
          <RoomFooter buttonStyle={buttonStyle} />
        </div>
        <RoomSpatialSideBar />
      </main>
    </RoomSpatialWrapper>
  );
});

export default RoomSpatial;
