import Duration from "../job-list/job-info/duration";
import DetailsSection from "./detail-section";

function TimeSpent() {
  return (
    <>
      <DetailsSection
        title="Time Spent"
        content={
          <div className="flex">
            <Duration />
          </div>
        }
      />
      <hr className="my-2" />
    </>
  );
}

export default TimeSpent;
