import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import FullLoading from "@/components/shared/full-loading";
import useLoading from "@/hooks/use-loading";
import axiosInstance from "@/lib/axios";
import { GalleryItemType } from "@/types/gallery";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  item: GalleryItemType;
  room_id: string;
  workspace_id: string;
};

export default function GalleryItem({ item, room_id, workspace_id }: Props) {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const handleSetBackground = async () => {
    startLoading();
    try {
      await axiosInstance.put(`/room/${room_id}`, {
        background_image: item.source,
        workspace_id,
      });
      toast.success("Room's background has been updated.");
      stopLoading();
    } catch (e) {
      stopLoading();
    }
  };

  return (
    <CotopiaTooltip title={item.title} triggerClassName='w-full'>
      <div
        className='w-full h-[115px] relative cursor-pointer hover:opacity-80'
        onClick={handleSetBackground}
      >
        <Image src={item.source} alt={item.title} fill />
        {isLoading && (
          <FullLoading
            className={
              "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-center"
            }
          />
        )}
      </div>
    </CotopiaTooltip>
  );
}
