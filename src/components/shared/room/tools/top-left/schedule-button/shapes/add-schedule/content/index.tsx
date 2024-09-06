"use client";

import { useEffect, useState } from "react";
import Day from "./day";

export type ScheduleDayType = {
  index: number;
  times: { from: string; to: string }[];
};

export default function AddScheduleContent() {
  const days = Array.from(Array(7).keys());

  return (
    <div className='flex flex-col gap-y-2'>
      x
      {days.map((day, index) => (
        <div className='day' key={index}>
          <Day
            day={{
              index: index,
              times: [],
            }}
          />
        </div>
      ))}
    </div>
  );
}
