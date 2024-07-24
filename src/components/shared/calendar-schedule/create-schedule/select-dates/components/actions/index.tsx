import CotopiaButton from "@/components/shared-ui/c-button";
import { ArrowLeft, Save } from "lucide-react";
import { CreateStep, useSchudleCreate } from "../../..";

type Props = {
  onSubmit: () => void;
  isSubmitDisabled?: boolean;
  isSubmitLoading?: boolean;
};
export default function StepActions({
  onSubmit,
  isSubmitDisabled,
  isSubmitLoading,
}: Props) {
  const { setStep } = useSchudleCreate();

  return (
    <div className='flex flex-row justify-end gap-x-2'>
      <CotopiaButton
        onClick={() => setStep(CreateStep.SelectOptions)}
        startIcon={<ArrowLeft size={16} />}
        className='min-w-[80px]'
      >
        Back
      </CotopiaButton>
      <CotopiaButton
        onClick={onSubmit}
        disabled={isSubmitDisabled}
        loading={isSubmitLoading}
        startIcon={<Save size={16} />}
        className='min-w-[140px]'
      >
        Next
      </CotopiaButton>
    </div>
  );
}
