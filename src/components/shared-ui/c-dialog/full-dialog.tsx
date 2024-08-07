"use client";

import CDialog, { CDialogProps } from ".";

export default function CFullDialog(props: CDialogProps) {
  let clss =
    "!top-0 !left-0 translate-x-[0] translate-y-[0] w-full max-w-[initial] h-full !rounded-none p-0 [&_.right-4]:hidden";
  if (props.dialogContentCss) clss += ` ${props.dialogContentCss}`;

  return <CDialog {...props} dialogContentCss={clss} />;
}
