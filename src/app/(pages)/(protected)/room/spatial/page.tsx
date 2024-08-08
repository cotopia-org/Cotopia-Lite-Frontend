import RoomSpatialContent from "./components";
import RoomSpatialWrapper from "./room-spatial-wrapper";

export const metadata = {
  title: "Room Spatial",
};


export default function RoomSpatial() {
  
  return (
    <RoomSpatialWrapper>

      <main className="relative w-screen h-screen bg-[#191B29] grid grid-cols-12">
        <RoomSpatialContent />
      </main>

    </RoomSpatialWrapper>
  );
}
