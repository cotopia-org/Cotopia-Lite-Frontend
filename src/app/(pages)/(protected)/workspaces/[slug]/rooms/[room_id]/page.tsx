import dynamic from "next/dynamic";

const RoomSpatialWrapper = dynamic(
  () => import("@/components/shared/room-spatial-wrapper"),
  {
    ssr: false,
  }
);

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
  return (
    <RoomSpatialWrapper token={token} workspace_id={slug} room_id={+room_id} />
  );
}
