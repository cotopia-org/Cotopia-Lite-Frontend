import { AttachmentFileType } from "@/types/file";

type Props = {
  image: AttachmentFileType;
};

export default function Image({ image }: Props) {
  return (
    <div
      className={`w-full uploader-content rounded-full h-[120px] bg-cover cursor-pointer bg-center`}
      style={{
        backgroundImage: `url(${image.url})`,
      }}
    ></div>
  );
}
