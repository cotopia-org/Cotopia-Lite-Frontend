import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

type Props = {
  trigger: (open: () => void) => ReactNode;
  children?: (open: () => void, close: () => void) => ReactNode;
  className?: string;
};
export default function ModalBox({ trigger, children, className }: Props) {
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
      <DialogContent className={className ?? ""}>
        {children ? children(handleOpen, handleClose) : null}
      </DialogContent>
    </Dialog>
  );
}

//Export full Modal
export function FullModalBox({ ...props }: Props) {
  let clss = "max-w-full";
  if (props?.className) clss += ` ${props.className}`;

  return <ModalBox {...props} className={clss} />;
}
