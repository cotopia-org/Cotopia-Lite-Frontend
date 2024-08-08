import { useMemo, useState } from "react";
import DetailsSection from "./detail-section";
import { cn } from "@/lib/utils";
import CotopiaPopover from "@/components/shared-ui/c-popover";

const Status = [
  {
    name: "To Do",
    color: "bg-blue-800",
  },
  {
    name: "In Progress",
    color: "bg-blue-600",
  },
  {
    name: "Done",
    color: "bg-blue-200 text-blue-600",
  },
];
function JobStatus() {
  const [selectedStatus, setSelectedStatus] = useState("To Do");
  const status = useMemo(
    () => Status.find((i) => i.name === selectedStatus),
    [selectedStatus]
  );
  return (
    <>
      <DetailsSection
        title="Status"
        content={
          <CotopiaPopover
            contentClassName="w-[187px] p-0"
            trigger={
              <p
                className={cn(
                  `px-3 py-1 rounded-md text-white ${status?.color}`
                )}
              >
                {status?.name}
              </p>
            }
          >
            {Status.map((item) => (
              <div
                key={item.name}
                onClick={() => setSelectedStatus(item.name)}
                className="flex gap-2 items-center py-2 px-3 hover:bg-gray-50"
              >
                <input
                  id={item.name}
                  type="radio"
                  className="size-3"
                  checked={item.name === selectedStatus}
                />
                <label htmlFor={item.name} className={cn`text-base rounded-md`}>
                  {item.name}
                </label>
              </div>
            ))}
          </CotopiaPopover>
        }
      />
      <hr className="my-2" />
    </>
  );
}

export default JobStatus;
