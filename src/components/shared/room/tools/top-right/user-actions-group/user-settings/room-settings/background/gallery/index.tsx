import { useNextApi } from "@/hooks/swr";
import { GalleryItemType } from "@/types/gallery";
import React from "react";
import GalleryItem from "./gallery-item";
import FullLoading from "@/components/shared/full-loading";

type Props = {
  room_id: number;
  workspace_id: string;
};
export default function Gallery({ room_id, workspace_id }: Props) {
  const { data, isLoading } = useNextApi(`/api/room/template/gallery`);
  const galleryItems: GalleryItemType[] = !!data ? data : [];

  let content = (
    <div className='grid grid-cols-12 gap-2'>
      {galleryItems.map((gallery) => (
        <div className='col-span-6 md:col-span-3' key={gallery.id}>
          <GalleryItem
            item={gallery}
            room_id={room_id}
            workspace_id={workspace_id}
          />
        </div>
      ))}
    </div>
  );

  if (galleryItems.length === 0)
    content = <span>There is no gallery template yet.</span>;

  if (isLoading) content = <FullLoading />;

  return <div className='mt-2'>{content}</div>;
}
