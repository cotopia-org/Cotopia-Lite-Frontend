import CotopiaButton from "@/components/shared-ui/c-button";
import PopupBox from "@/components/shared/popup-box";
import { useApi } from "@/hooks/swr";
import { FetchDataType } from "@/lib/axios";
import { urlWithQueryParams } from "@/lib/utils";
import { CalendarType } from "@/types/calendar";
import { Calendar } from "lucide-react";
import React from "react";
import { useRoomContext } from "../../../room-context";
import Calendars from "./calendars";

export default function ScheduleButton() {
  const { room } = useRoomContext();

  const { data, isLoading, mutate } = useApi<FetchDataType<CalendarType[]>>(
    urlWithQueryParams(`/calendars`, {
      workspace_id: room?.workspace_id,
    }),
    {
      isFetch: !!room?.workspace_id,
    }
  );

  const calendars = data !== undefined ? data?.data : [];

  const onCreateBackend = (calendar: CalendarType) => {
    mutate();
  };

  let buttonText = "Schedule";

  if (calendars.length > 0) buttonText = "Draw up a schedule";

  return (
    <PopupBox
      trigger={(open) => (
        <CotopiaButton
          onClick={open}
          startIcon={<Calendar />}
          className='bg-white hover:bg-white text-black rounded-xl'
          loading={isLoading}
        >
          {buttonText}
        </CotopiaButton>
      )}
    >
      {(triggerPosition, open, close) => (
        <div
          className='bg-white rounded-lg p-4 fixed mt-4 '
          style={{ top: triggerPosition.top, zIndex: triggerPosition.zIndex }}
        >
          <Calendars calendars={calendars} onCreate={onCreateBackend} />
        </div>
      )}
    </PopupBox>
  );
}
