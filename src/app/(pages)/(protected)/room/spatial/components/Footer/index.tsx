'use client';

import ToolbarBottomLeft from "@/components/shared/room/toolbar/bottom-left";
import ToolbarBottomMiddle from "@/components/shared/room/toolbar/bottom-middle";
import ToolbarBottomRight from "@/components/shared/room/toolbar/bottom-right";
import { ChevronUp, Bug, Cast, CirclePlus, Grid2X2, MessageCircleWarning, MessageSquareMore, MicOff, PenLine, Radio, VideoOff, Volume2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RoomSpatialFooterType } from "@/types/room-spatial-footer";
import { useRoomSpatialContext } from "../../room-spatial-wrapper";

export default function RoomFooter(props: RoomSpatialFooterType) {
  const {setDrawColor , setDrawMode} = useRoomSpatialContext()
  const [colorList, setColorList] = useState<boolean>(false);
  const [zoomScreen, setZoomScreen] = useState<number>(100);

  const colors: string[] = ["#5D11FF", "#8D48CF", "#FFE44D", "#F9A000", "#18C77E", "#82E1FF", "#2A96FC", "#FF0000"];

  function handleDrawClick(color : string) {
    setDrawColor(color)
    setDrawMode(true)
  }

  const icons = [
    { icon: <CirclePlus color="blue" />, className: `${props.buttonStyle.icon.style} hover:bg-blue-500/40` },
    {
      icon:
        <span className="flex" onClick={() => setColorList(prevStatus => !prevStatus)}>
          <Button className={`absolute bottom-full my-3 bg-white w-fit h-fit p-2 ${colorList ? "grid" : "hidden"} gap-2 grid-cols-4 before:w-0 before:h-0 before:absolute before:border-x-8 before:border-x-transparent before:border-t-8 before:border-t-white before:top-full`}>
            {colors.map((color, index) => (
              <span key={index} onClick={() => handleDrawClick(color)} className="w-6 h-6 rounded-md border" style={{ backgroundColor: color }}></span>
            ))}
          </Button>
          <PenLine />
        </span>, className: `${props.buttonStyle.icon.style}`
    },
    { icon: <Cast />, className: `${props.buttonStyle.icon.style}` },
    { icon: <MessageSquareMore />, className: `${props.buttonStyle.icon.style}` },
    { icon: <Radio />, className: `${props.buttonStyle.icon.style}` },
    { icon: <VideoOff color="red" />, className: `${props.buttonStyle.icon.style} bg-red-500/40 hover:bg-red-600/50` },
    { icon: <MicOff color="red" />, className: `${props.buttonStyle.icon.style} bg-red-500/40 hover:bg-red-600/50` },
    { icon: <Volume2 />, className: `${props.buttonStyle.icon.style}` },
    { icon: <Grid2X2 />, className: `${props.buttonStyle.icon.style}` },
  ];

  function handleZoomScreen(zoomStatus: string) {
    if (zoomStatus === "increase") {
      setZoomScreen(zoomScreen => zoomScreen < 100 ? zoomScreen + 1 : zoomScreen);
    } else {
      setZoomScreen(zoomScreen => zoomScreen > 0 ? zoomScreen - 1 : zoomScreen);
    }
  }

  return (
    <footer className="col-span-9">
      <ToolbarBottomLeft>
        <Button className={props.buttonStyle.base}>
          <MessageCircleWarning size={props.buttonStyle.icon.size} className={props.buttonStyle.icon.style} />
          <Bug size={props.buttonStyle.icon.size} className={props.buttonStyle.icon.style} />
        </Button>
      </ToolbarBottomLeft>

      <ToolbarBottomMiddle>
        <Button className={`${props.buttonStyle.base} gap-6`}>
          {icons.map((item, index) => (
            <span key={index} className={item.className}>
              {item.icon}
            </span>
          ))}
        </Button>
      </ToolbarBottomMiddle>

      <ToolbarBottomRight>
        <Button className={props.buttonStyle.base}>
          <ChevronUp color="black" onClick={() => handleZoomScreen("increase")} />
          <span>{zoomScreen}%</span>
          <ChevronDown color="black" onClick={() => handleZoomScreen("decrease")} />
        </Button>
      </ToolbarBottomRight>
    </footer>
  );
}
