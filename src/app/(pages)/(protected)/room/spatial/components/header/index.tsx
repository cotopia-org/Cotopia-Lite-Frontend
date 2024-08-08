"use client";
import ToolbarTopLeft from "@/components/shared/room/toolbar/top-left";
import ToolbarTopRight from "@/components/shared/room/toolbar/top-right";
import TopRightTools from "@/components/shared/room/tools/top-right";
import MenuButton from "@/components/shared/room/components/workspace-button";

export default function Header() {
  return (
    <header>
      <ToolbarTopLeft>
        <MenuButton />
      </ToolbarTopLeft>

      <ToolbarTopRight>
        <TopRightTools />
      </ToolbarTopRight>
    </header>
  );
}
