import RoomSpatialContent from "./components";
import RoomSpatialWrapper from "@/context/room-spatial-context";

export const metadata = {
  title: "Room Spatial",
};

export default function RoomSpatial() {
  return (
    <RoomSpatialWrapper>
      <main className="relative w-screen h-screen grid grid-cols-12">
        <RoomSpatialContent />
      </main>
    </RoomSpatialWrapper>
  );
}
