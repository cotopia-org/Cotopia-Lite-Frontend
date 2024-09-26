'use client';
import ToolbarBottomLeft from "@/components/shared/room/toolbar/bottom-left";
import ToolbarBottomMiddle from "@/components/shared/room/toolbar/bottom-middle";
import ToolbarBottomRight from "@/components/shared/room/toolbar/bottom-right";
import BottomLeftTools from "@/components/shared/room/tools/bottom-left";
import BottomMiddleTools from "@/components/shared/room/tools/bottom-middle";
import BottomRightTools from "@/components/shared/room/tools/bottom-right";


export default function Footer() {
  return (
    <footer className="z-40">
      <ToolbarBottomLeft>
        <BottomLeftTools />
      </ToolbarBottomLeft>

      <ToolbarBottomMiddle>
        <BottomMiddleTools />
      </ToolbarBottomMiddle>

      <ToolbarBottomRight>
        <BottomRightTools />
      </ToolbarBottomRight>
    </footer>
  );
}
