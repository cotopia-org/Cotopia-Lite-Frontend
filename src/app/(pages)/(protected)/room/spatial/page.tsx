import RoomHeader from "./components/Header";
import RoomFooter from "./components/Footer";
import RoomDraw from "./components/Draw";
import { RoomSpatialWrapper } from "./room-spatial-wrapper";
type ButtonStyleType = { base: string, icon: { style: string, size: number } };

export const metadata = {
  title: "Spatial Room",
};

export default function RoomSpatial() {
  const buttonStyle: ButtonStyleType = {
    base: "bg-white text-gray-400 flex gap-3 py-2 uppercase font-bold",
    icon: { style: "transition-colors p-1 w-8 h-8 hover:bg-gray-300/30 rounded-sm", size: 20, }
  };

  return (
    <RoomSpatialWrapper>
      <main className="bg-slate-950 w-full h-screen">
        <RoomHeader className={buttonStyle.base} iconSize={buttonStyle.icon.size} iconStyle={buttonStyle.icon.style} />
        <RoomDraw />
        <RoomFooter buttonStyle={buttonStyle} />
      </main>
    </RoomSpatialWrapper>
  )
}