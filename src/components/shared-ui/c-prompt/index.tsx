import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import CotopiaPromptContent, { CotopiaPromptType } from "./content";
import { _BUS } from "@/app/const/bus";
import useBus from "use-bus";

type Props = {
  trigger: (open: () => void) => ReactNode;
  afterDesc?: ReactNode;
} & CotopiaPromptType;
export default function CotopiaPrompt({ trigger, afterDesc, ...rest }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setIsOpen(false);
    if (rest?.onClose) rest.onClose();
  };

  const handleSubmit = () => {
    if (rest?.onSubmit) rest.onSubmit();
  };

  useBus(_BUS.closePrompt, () => {
    handleClose();
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger(handleOpen)}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px] pt-12'>
        <CotopiaPromptContent
          {...rest}
          onSubmit={handleSubmit}
          onClose={handleClose}
          afterDesc={afterDesc}
        />
      </DialogContent>
    </Dialog>
  );
}
