'use client';
import ToolbarTopLeft from "@/components/shared/room/toolbar/top-left";
import ToolbarTopRight from "@/components/shared/room/toolbar/top-right";
import { Button } from "@/components/ui/button";
import { AlignJustify, CircleXIcon, LayoutGrid } from "lucide-react";
import TopRightTools from "@/components/shared/room/tools/top-right";
import { useRoomSpatialDrawContext } from "../../room-spatial-wrapper";

export default function RoomHeader() {
  const {setOpenSidebar , openSidebar} = useRoomSpatialDrawContext();

  return (
    <header>
      
      <ToolbarTopLeft>
        <Button className="flex gap-2 bg-white p-1">
          <LayoutGrid color="blue" />
          <h1 className="text-black font-semibold">Workspace Setting</h1>
        </Button>
      </ToolbarTopLeft>

      <ToolbarTopRight>
        <div className="flex gap-2">
          <TopRightTools />

          <Button className="bg-white rounded-lg" onClick={() => setOpenSidebar(prevState => !prevState)}>
            
            {!openSidebar ? (
              <AlignJustify color="black" />
            ) : (
                <CircleXIcon color="black"/>
            )}

          </Button>

        </div>

      </ToolbarTopRight>

    </header>
  )
}