"use client";

import { Loader, Plus, Trash, Upload } from "lucide-react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

import { Button } from "@/components/ui/button";
import { urlWithQueryParams } from "@/lib/utils";
import useLoading from "@/hooks/use-loading";
import UploaderPreview from "./preview";
import { AttachmentFileType } from "@/types/file";
import axiosInstance, { FetchDataType } from "@/lib/axios";

type Props = {
  onUpload?: (item: AttachmentFileType) => void;
  onUploadList?: (items: AttachmentFileType[]) => void;
  onDelete?: () => void;
  defaultMedia?: AttachmentFileType;
  defaultMedias?: AttachmentFileType[];
  label?: string;
  upload_text?: string;
  isMultiple?: boolean;
  hasWatermark?: boolean;
  uploaderClass?: string;
  resetAfterUpload?: boolean;
};
export default function Uploader({
  label,
  defaultMedia,
  onUpload,
  onUploadList,
  onDelete,
  upload_text,
  isMultiple,
  hasWatermark = true,
  uploaderClass,
  resetAfterUpload = false,
}: Props) {
  const [fileUploaded, setFileUploaded] = useState<AttachmentFileType | null>(
    null
  );
  useEffect(() => {
    setFileUploaded(defaultMedia ?? null);
  }, [defaultMedia]);
  const handleDelete = useCallback(
    async (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setFileUploaded(null);

      if (defaultMedia) {
        try {
          await axiosInstance.delete(`/files/${defaultMedia.id}`);
        } catch (e) {}
      }

      if (onDelete) onDelete();
    },
    [onDelete, defaultMedia]
  );

  const { startLoading, stopLoading, isLoading } = useLoading();
  const handleUploadFile = async (file: File) => {
    if (!file) {
      toast.error("Please insert valid file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploadPercent(1);
    const res = await axiosInstance<FetchDataType<AttachmentFileType>>({
      url: urlWithQueryParams(`/files`, {
        watermark: hasWatermark,
      }),
      method: "POST",
      data: formData,
      onUploadProgress: (progressEvent) => {
        const progress =
          (progressEvent.loaded * 100) / (progressEvent?.total ?? 0);
        setUploadPercent(parseInt(progress.toFixed(2)));
      },
    });

    if (!resetAfterUpload) setFileUploaded(res.data.data);

    return res;
  };

  const [uploadPercent, setUploadPercent] = useState(0);
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    if (e.target.files.length > 1) {
      //Means it is array
      startLoading();
      let files: AttachmentFileType[] = [];
      try {
        for (let file of e.target.files) {
          const res = await handleUploadFile(file);
          if (res?.data?.data) files = [...files, res?.data?.data];
        }
        stopLoading();
      } catch (e) {
        stopLoading();
      }

      if (onUploadList && files.length > 0) {
        onUploadList(files);
        toast.success("All files uploaded");
      }
      return;
    }

    const targetFile = e.target.files[0];

    try {
      const res = await handleUploadFile(targetFile);

      if (onUpload && res) {
        toast.success("File has been uploaded succesfully!");
        onUpload(res.data.data);
      }
    } catch (e) {}
  };

  let uploaderContent = (
    <div
      className={`uploader-content relative w-full h-[120px] flex flex-col items-center justify-center rounded-full bg-black/[.05] hover:bg-black/10 cursor-pointer ${uploaderClass}`}
    >
      <div className='flex flex-col gap-y-4 items-center'>
        <Upload />
        {!!upload_text && <span>{upload_text}</span>}
      </div>
      <input
        type='file'
        className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
        onChange={handleUpload}
        multiple={isMultiple ?? false}
      />
    </div>
  );

  if (fileUploaded && !resetAfterUpload) {
    uploaderContent = <UploaderPreview file={fileUploaded} />;
  }

  if (isLoading)
    uploaderContent = (
      <div className='uploader-content relative w-full h-[240px] flex flex-col items-center justify-center rounded-md bg-black/[.05]'>
        <Loader className='animate-spin' />
      </div>
    );

  return (
    <div className='flex flex-col w-full gap-y-2'>
      {!!label && <strong>{label}</strong>}
      <div className='relative flex flex-col gap-y-2 w-full'>
        {fileUploaded && (
          <Button
            className='absolute top-2 left-2'
            size={"icon"}
            onClick={handleDelete}
            type='button'
          >
            <Trash />
          </Button>
        )}
        {uploaderContent}
        {uploadPercent > 0 && uploadPercent < 100 && (
          <div className='flex flex-row items-center gap-x-4'>
            <Progress
              className='!bg-white/10 [&_.bg-primary]:!bg-white/10 h-[6px]'
              value={uploadPercent}
            />
            <strong className='text-white'>{`${uploadPercent}%`}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
