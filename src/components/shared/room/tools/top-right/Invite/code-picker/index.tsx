import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CotopiaInput from "@/components/shared-ui/c-input";
import { CopyIcon } from "lucide-react";
import { __VARS } from "@/app/const/vars";
import CotopiaButton from "@/components/shared-ui/c-button";

import copy from "copy-to-clipboard";
import CopyBtn from "@/components/shared/copy-btn";

type Props = {
  code: string;
  onCopy: () => void;
  onCancel: () => void;
};
export function CodePicker({ code, onCopy, onCancel }: Props) {
  const finalCopyUrl = `${__VARS.domain}/invite/${code}`;

  return (
    <Dialog open>
      <DialogContent className='sm:max-w-md [&_.opacity-70]:!hidden'>
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be join to this room.
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <CotopiaInput defaultValue={finalCopyUrl} readOnly />
          <CopyBtn code={finalCopyUrl} />
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild onClick={onCancel}>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
