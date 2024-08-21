import { Images, MapPin, SlidersHorizontal } from "lucide-react";
import RoomIcon from "../../room-icon";

export default function BasicModeIcons() {
  return (
    <>
      <RoomIcon icon={<MapPin />} />
      <RoomIcon icon={<Images />} />
      <RoomIcon icon={<SlidersHorizontal />} />
    </>
  );
}
