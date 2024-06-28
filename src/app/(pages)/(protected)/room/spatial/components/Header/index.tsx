import { Button } from "@/components/ui/button";
import { RoomSpatialHeaderType } from "@/types/room-spatial-header";
import { CalendarDays, LayoutGrid, LogOut, Settings, UserRoundPlus } from "lucide-react";

export default function RoomHeader(props : RoomSpatialHeaderType) {
  return (
    <header className="p-2 w-full flex items-center justify-between">

      <Button className={`${props.className} text-black`}><LayoutGrid color="blue" size={props.iconSize} /> Workspace Setting</Button>

      <div className="flex gap-2">
        <Button className={props.className}><UserRoundPlus size={props.iconSize} /> invite</Button>

        <Button className={props.className}><CalendarDays size={props.iconSize} /> meet</Button>

        <Button className={`${props.className} gap-6`}>

          <Settings size={props.iconSize} className={props.iconStyle} />
          <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-blue-500">Y</span>
          <LogOut color="red" size={props.iconSize} className={`${props.iconStyle} hover:bg-red-700/30`} />

        </Button>
      </div>

    </header>
  )
}