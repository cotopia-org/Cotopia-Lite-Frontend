"use client";

import CDialog, { CDialogProps } from ".";

export default function CRawDialog(props: CDialogProps) {
  let clss = "[&_.right-4]:hidden";
  if (props.dialogContentCss) clss += ` ${props.dialogContentCss}`;

  return <CDialog {...props} dialogContentCss={clss} />;
}
