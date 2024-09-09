import { AttachmentFileType } from "@/types/file";
import Uploader from "../uploader";
import { useState } from "react";

type Props = {
  files: AttachmentFileType[];
  isMultiple?: boolean;
  onChange?: (files: AttachmentFileType[]) => void;
  uploaderClass?: string;
};
export default function UploaderList({
  files,
  isMultiple,
  onChange,
  uploaderClass,
}: Props) {
  const [allFiles, setAllFiles] = useState(files);

  const handleDeleteFile = (x: AttachmentFileType) => {
    setAllFiles((prev) => {
      const nValue = prev.filter((i) => i.id !== x.id);

      if (onChange) onChange(nValue);

      return nValue;
    });
  };

  const handleAddFiles = (x: AttachmentFileType[]) =>
    setAllFiles((prev) => {
      const nValue = [...prev, ...x];

      if (onChange) onChange(nValue);

      return nValue;
    });

  const handleAddFile = (x: AttachmentFileType) =>
    setAllFiles((prev) => {
      const nValue = [...prev, x];

      if (onChange) onChange(nValue);

      return nValue;
    });

  return (
    <div className='flex flex-row items-center gap-4 flex-wrap w-full'>
      <div className='w-[120px]'>
        <Uploader
          onUpload={handleAddFile}
          onUploadList={handleAddFiles}
          isMultiple={isMultiple}
          resetAfterUpload
          uploaderClass={uploaderClass}
        />
      </div>
      {allFiles?.length > 0
        ? allFiles?.map((x) => (
            <div className='w-[120px]' key={x.id}>
              <Uploader
                defaultMedia={x}
                onDelete={() => handleDeleteFile(x)}
                uploaderClass={uploaderClass}
              />
            </div>
          ))
        : null}
    </div>
  );
}
