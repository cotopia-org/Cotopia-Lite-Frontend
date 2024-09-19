import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import CotopiaTooltip from "@/components/shared-ui/c-tooltip";
import { Calendar } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { useUserDetail } from "..";
import { capitalizeWords, estimateTotalHoursBySchedules } from "@/lib/utils";
import ModalBox from "@/components/shared/modal-box";
import BoxHolder from "@/components/shared/box-holder";
import SchedulesList from "./list";
import { ScheduleType } from "@/types/calendar";

export default function UserSchedules() {
  const { user } = useUserDetail();

  let userLabel = user?.name;

  if (!!!userLabel) userLabel = user?.username;

  if (userLabel) userLabel = capitalizeWords(userLabel);

  const totalHours = useMemo(() => {
    return estimateTotalHoursBySchedules([]);
  }, []);

  const boxLabel = `${userLabel}'s schedules (${totalHours}h)`;

  return (
    <ModalBox
      hasClose={false}
      trigger={(open) => (
        <CotopiaTooltip title={boxLabel}>
          <CotopiaIconButton
            onClick={open}
            size={"icon"}
            className='text-black w-6 h-6'
          >
            <Calendar size={16} />
          </CotopiaIconButton>
        </CotopiaTooltip>
      )}
      className='w-[424px]'
    >
      {(open, close) => {
        return <SchedulesList justView />;
      }}
    </ModalBox>
  );
}
