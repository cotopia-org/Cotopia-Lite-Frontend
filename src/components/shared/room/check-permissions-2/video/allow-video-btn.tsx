import CotopiaButton from "@/components/shared-ui/c-button";
import CRawDialog from "@/components/shared-ui/c-dialog/raw-dialog";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function AllowVideoBtn() {
  return (
    <CRawDialog
      trigger={(open) => (
        <CotopiaButton onClick={open}>Allow camera</CotopiaButton>
      )}
      dialogContentCss='w-[780px] max-w-full'
    >
      {(close) => (
        <div className='flex flex-col md:flex-row items-center gap-4 relative'>
          <CotopiaIconButton
            onClick={close}
            className='absolute top-[-8px] right-[-8px]'
          >
            <X className='text-black' />
          </CotopiaIconButton>
          <Image
            src={`/assets/permissions-flag.svg`}
            alt='Permissions flag'
            width={322.5}
            height={322.5}
          />
          <div className='flex flex-col gap-y-4'>
            <strong className='text-xl'>
              Meet is blocked from using your camera!
            </strong>
            <p className='text-base text-black/60'>Please allow that</p>
          </div>
        </div>
      )}
    </CRawDialog>
  );
}
