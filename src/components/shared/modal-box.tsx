import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

type Props = {
  trigger: (open: () => void) => ReactNode;
  children?: (open: () => void, close: () => void) => ReactNode;
};
export default function ModalBox({ trigger, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger(handleOpen)}</DialogTrigger>
      <DialogContent>
        {children ? children(handleOpen, handleClose) : null}
      </DialogContent>
    </Dialog>
  );
}
