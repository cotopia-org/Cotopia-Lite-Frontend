import RoomSpatialWrapper from "@/components/shared/room-spatial-wrapper";
import { notFound } from "next/navigation";

type Props = {
  searchParams: {
    token: string;
  };
};
export default function RoomPage({ searchParams: { token } }: Props) {
  if (!token) {
    return notFound();
  }

  return <RoomSpatialWrapper token={token} />;
}
