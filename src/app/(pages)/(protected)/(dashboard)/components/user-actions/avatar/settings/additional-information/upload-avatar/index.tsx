import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import Uploader from "@/components/shared/uploader";
import axiosInstance from "@/lib/axios";
import { AttachmentFileType } from "@/types/file";
import { useRouter } from "next/navigation";
import React from "react";

export default function UploadAvatar() {
  const router = useRouter();
  const { user } = useProfile();

  const handleUpdateAvatar = (file: AttachmentFileType) => {
    axiosInstance
      .put(`/users/update`, {
        avatar_id: file.id,
      })
      .then((res) => {
        router.refresh();
      });
  };

  const handleDeleteAvatar = () => {
    axiosInstance
      .put(`/users/update`, {
        avatar_id: undefined,
      })
      .then((res) => {
        router.refresh();
      });
  };

  return (
    <div className='w-[120px] max-w-full'>
      <Uploader
        defaultMedia={user?.avatar ?? undefined}
        onUpload={handleUpdateAvatar}
        onDelete={handleDeleteAvatar}
        label='Avatar'
      />
    </div>
  );
}
