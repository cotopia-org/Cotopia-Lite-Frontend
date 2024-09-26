"use client";

import moment from "moment";

interface Props {
  date: string;
}

const TARGET_DAY_CHANGE = 2;

const TimeOverShower = ({ date }: Props) => {
  const targetDate = moment(date);
  let clss = "text-sm font-medium text-black/[0.78]";
  //calc date days difference
  const daysDiff = moment(date).diff(moment().startOf("day"), "days");
  //calc date  difference in hours
  const hoursDiff = targetDate.diff(moment(), "hours");

  let content = (
    <span className={clss}>{`Ends in ${daysDiff} day${
      daysDiff > 1 ? "s" : ""
    } later`}</span>
  );

  if (daysDiff < TARGET_DAY_CHANGE) {
    content = (
      <span
        className={`${clss} !text-yellow-600`}
      >{`About ${hoursDiff} hours to end`}</span>
    );
  }

  if (hoursDiff <= 0) {
    content = <span className={`${clss} !text-red-600`}>{`Time over`}</span>;
  }

  return content;
};

export default TimeOverShower;
