import Uploader from "@/components/shared/uploader";
import React from "react";
import UploadAvatar from "./upload-avatar";
import UserDetailForm from "./form";

export default function AdditionalInformation() {
  return (
    <div className='flex flex-col gap-y-4 items-start'>
      <UploadAvatar />
      <UserDetailForm />
    </div>
  );
}
