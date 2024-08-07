import React from "react";
import DetailsSection from "./detail-section";
import TimeStamp from "../job-list/job-info/time-stamp";

function DueDate() {
  return (
    <DetailsSection
      title="Due Date"
      content={
        <div className="flex">
          <TimeStamp date={new Date()} />
        </div>
      }
    />
  );
}

export default DueDate;
