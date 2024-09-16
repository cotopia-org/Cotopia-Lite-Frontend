import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

type Props = {
  trigger: (open: () => void) => ReactNode;
  children?: (open: () => void, close: () => void) => ReactNode;
  className?: string;
  hasClose?: boolean;
};
export default function ModalBox({
  trigger,
  children,
  className,
  hasClose = true,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  let finalClassName = className ?? "";

  if (!hasClose) finalClassName += ` [&_.right-4]:hidden`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger(handleOpen)}</DialogTrigger>
      <DialogContent className={finalClassName ?? ""}>
        {children ? children(handleOpen, handleClose) : null}
      </DialogContent>
    </Dialog>
  );
}

//Export full Modal
export function FullModalBox({ ...props }: Props) {
  let clss = "max-w-full max-h-[calc(100vh-200px)] overflow-y-auto z-[10]";
  if (props?.className) clss += ` ${props.className}`;

  return <ModalBox {...props} className={clss} />;
}
