"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

export type CDialogProps = {
  trigger: (open: () => void) => ReactNode;
  children: (close: () => void) => ReactNode;
  onClose?: () => void;
  dialogContentCss?: string;
};
export default function CDialog({
  trigger,
  children,
  onClose,
  dialogContentCss,
  ...rest
}: CDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogTrigger asChild>{trigger(handleOpen)}</DialogTrigger>
      <DialogContent className={dialogContentCss}>
        {children(handleClose)}
      </DialogContent>
    </Dialog>
  );
}
