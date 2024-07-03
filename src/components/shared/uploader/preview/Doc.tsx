import { Button } from "@/components/ui/button";
import { File, Link2 } from "lucide-react";
import Link from "next/link";
import { AttachmentFileType } from "@/types/file";

type Props = {
  document: AttachmentFileType;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Doc({ document }: Props) {
  return (
    <div className='uploader-content w-full h-[120px] rounded-full bg-cover cursor-pointer bg-white/[.05]'>
      <div className='flex flex-col h-full gap-y-4 items-center justify-center'>
        <File />
        <span className='whitespace-pre-wrap w-[70%] text-ellipsis overflow-hidden'>
          {document.path.slice(0, 5)}
        </span>
        <Link prefetch={false} href={`${BASE_URL}${document.url}`}>
          <Button type='button'>
            <Link2 className='mr-2' size={16} />
            Open File
          </Button>
        </Link>
      </div>
    </div>
  );
}
