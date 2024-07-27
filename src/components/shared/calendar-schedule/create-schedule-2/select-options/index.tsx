import React from "react";
import Availability from "../availability";
import { CBadgeValueType } from "@/components/shared-ui/c-badge-items";
import Days from "../days";
import CotopiaButton from "@/components/shared-ui/c-button";
import { ArrowRight } from "lucide-react";
import { CreateStep, useSchudleCreate } from "..";
import { toast } from "sonner";

type Props = {
  onChangeAvailability: (value?: CBadgeValueType) => void;
  onChangeDays: (value?: CBadgeValueType[]) => void;
};

export default function SelectOptions({
  onChangeAvailability,
  onChangeDays,
}: Props) {
  const { options, setStep } = useSchudleCreate();

  const handleNextStep = () => {
    if (options.days.length === 0) {
      toast.error("Please at least select a day!");
      return;
    }

    setStep(CreateStep.SelectTimes);
  };

  return (
    <div className='flex flex-col gap-y-4'>
      <Availability
        defaultValue={options.availability}
        onChange={(x) => onChangeAvailability(x.length > 0 ? x[0] : undefined)}
      />
      <Days
        defaultValue={options.days}
        onChange={(days) => onChangeDays(days)}
      />
      <div className='flex flex-row items-center justify-end'>
        <CotopiaButton
          onClick={handleNextStep}
          className='min-w-[140px] bg-slate-700 hover:bg-slate-800'
          endIcon={<ArrowRight size={16} />}
        >
          Select Times!
        </CotopiaButton>
      </div>
    </div>
  );
}
