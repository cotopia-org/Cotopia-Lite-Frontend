import { ReactNode } from "react";
import ResanaButton from "../../c-button";

export type CotopiaPromptType = {
  title: string;
  description: string;
  onSubmit: () => void;
  onClose: () => void;
  submitText?: string;
  afterDesc?: ReactNode;
  hasNotAction?: boolean;
};
export default function CotopiaPromptContent({
  title,
  description,
  onClose,
  onSubmit,
  submitText = "Submit",
  afterDesc,
  hasNotAction = false,
}: CotopiaPromptType) {
  return (
    <div className='flex flex-col gap-y-8'>
      <div className='flex flex-col gap-y-2'>
        <strong className='text-xl'>{title}</strong>
        {!!description && (
          <p className='text-base text-black/60'>{description}</p>
        )}
        {!!afterDesc && afterDesc}
      </div>
      {hasNotAction === false && (
        <div className='flex flex-row items-center gap-x-2'>
          <ResanaButton onClick={onClose} className='!px-6' variant={"outline"}>
            Close
          </ResanaButton>
          <ResanaButton onClick={onSubmit} className='!px-6'>
            {submitText}
          </ResanaButton>
        </div>
      )}
    </div>
  );
}
