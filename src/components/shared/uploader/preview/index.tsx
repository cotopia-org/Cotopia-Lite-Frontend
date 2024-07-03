import { AttachmentFileType } from "@/types/file";
import Image from "./Image";
import Doc from "./Doc";
import Video from "./Video";

type Props = {
  file: AttachmentFileType;
};

const imagesFormat = [
  "image/webp",
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];
const videoFormat = ["video/mp4", "video/mpeg"];
const documentFormat = [
  "text/plain",
  "application/vnd.openxmlformats-",
  "application/msword",
];

export default function UploaderPreview({ file }: Props) {
  if (imagesFormat.includes(file.mime_type)) return <Image image={file} />;
  if (documentFormat.includes(file.mime_type)) return <Doc document={file} />;
  if (videoFormat.includes(file.mime_type)) return <Video video={file} />;
}
