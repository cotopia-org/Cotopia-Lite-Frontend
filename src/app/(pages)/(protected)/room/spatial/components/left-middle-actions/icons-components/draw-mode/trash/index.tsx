import { Trash } from "lucide-react";
import RoomIcon from "../../../room-icon";
import { useRoomSpatialContext } from "@/context/room-spatial-context";

export default function TrashIcon() {
  const { clear } = useRoomSpatialContext();
  return <RoomIcon icon={<Trash color="red" onClick={clear} />} />;
}
