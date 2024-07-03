import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";

import Link from "next/link";
import { AttachmentFileType } from "@/types/file";

type Props = {
  video: AttachmentFileType;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Video({ video }: Props) {
  return (
    <div className='w-full uploader-content h-[120px] bg-cover rounded-full cursor-pointer bg-white/[.05]'>
      <div className='flex flex-col h-full gap-y-4 items-center justify-center'>
        <VideoIcon />
        <span className='whitespace-pre-wrap w-[70%] text-ellipsis overflow-hidden'>
          {video.path.slice(0, 5)}
        </span>
        <Link prefetch={false} href={`${BASE_URL}${video.url}`} target='_blank'>
          <Button type='button'>Open Video</Button>
        </Link>
      </div>
    </div>
  );
}
