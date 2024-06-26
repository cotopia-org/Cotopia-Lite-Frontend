import RoomSpatialWrapper from "@/components/shared/room-spatial-wrapper";
import { notFound } from "next/navigation";

type Props = {
  searchParams: {
    token: string;
  };
  params: {
    slug: string;
    room_id: string;
  };
};

export const metadata = {
  title: "Room",
};

export default function RoomPage({
  searchParams: { token },
  params: { room_id, slug },
}: Props) {
  if (!token) {
    return notFound();
  }

  return (
    <RoomSpatialWrapper token={token} workspace_id={slug} room_id={room_id} />
  );
}
