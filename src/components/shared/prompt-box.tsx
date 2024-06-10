import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import CotopiaButton from "../shared-ui/c-button";

type Props = {
  trigger: (open: () => void) => ReactNode;
  title: string;
  description?: string;
  onSubmit: () => void;
  onClose?: () => void;
};
export default function PropmptBox({
  trigger,
  title,
  description,
  onSubmit,
  onClose,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };
  const handleSubmit = () => {
    setIsOpen(false);
    if (onSubmit) onSubmit();
  };
  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger(handleOpen)}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
          <div className='flex flex-row gap-x-2 !mt-6'>
            <CotopiaButton
              variant={"default"}
              onClick={handleSubmit}
              className='!px-6'
            >
              Submit
            </CotopiaButton>
            <CotopiaButton
              className='!px-6'
              variant={"ghost"}
              onClick={handleClose}
            >
              Cancel
            </CotopiaButton>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
