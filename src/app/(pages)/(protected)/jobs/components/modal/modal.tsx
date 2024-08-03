import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import CotopiaInput from "@/components/shared-ui/c-input";
import CotopiaTextarea from "@/components/shared-ui/c-textarea";
import {
  Calendar,
  CirclePlay,
  Clock,
  Ellipsis,
  Tag,
  User,
  X,
} from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import Badge from "../badge";
import InviteList from "./invite-list";

const Status = [
  {
    name: "To Do",
    color: "bg-[#0030A8]",
  },
  {
    name: "In Progress",
    color: "bg-[#1B5BFF]",
  },
  {
    name: "Done",
    color: "bg-[#D1DEFF] text-blue-600",
  },
];

type Props = {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
};

export default function JobModal({ title, isOpen, handleClose }: Props) {
  const [selectedStatus, setSelectedStatus] = useState("To Do");

  const status = useMemo(
    () => Status.find((i) => i.name === selectedStatus),
    [selectedStatus]
  );

  return (
    <>
      <div
        className={`grid place-content-center absolute bg-[#191b295d] z-10 w-screen h-screen top-0 left-0 ${
          isOpen ? "inline-block" : "hidden"
        }`}
        onClick={handleClose}
      >
        <div
          onClick={(ev) => ev.stopPropagation()}
          className="w-[80vw] min-h-[70vh] max-h-[90vh] overflow-y-auto bg-white rounded-lg flex flex-col"
        >
          <header className="px-6 py-4 flex justify-between border-b sticky top-0 left-0 bg-white">
            <div className="flex items-center gap-3">
              <p className="text-xl font-semibold">{title}/ Job Details</p>
            </div>
            <div className="flex items-center gap-4">
              <CotopiaButton className="flex bg-[#1B5BFF]">
                <span>
                  <CirclePlay size={16} />
                </span>
                <p className="text-xs">Start the Job</p>
              </CotopiaButton>
              <div className="flex gap-2 justify-between">
                <CotopiaIconButton>
                  <Ellipsis color="black" />
                </CotopiaIconButton>
                <CotopiaIconButton>
                  <X color="black" />
                </CotopiaIconButton>
              </div>
            </div>
          </header>

          <main className="flex-auto grid grid-cols-10">
            <div className="col-span-6 px-6 py-5 h-full border-r">
              <CotopiaInput label="Title" />
              <CotopiaTextarea label="Description" />
            </div>
            <div className="col-span-4 px-6 py-5">
              <p className="mb-2">Status</p>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    <p
                      className={cn(
                        `px-3 py-1 rounded-md text-white ${status?.color}`
                      )}
                    >
                      {status?.name}
                    </p>
                  </MenubarTrigger>
                  <MenubarPortal>
                    <MenubarContent className="z-50 mr-16 p-1 flex flex-col gap-1 text-sm text-gray-500">
                      {Status.map((item) => (
                        <MenubarItem
                          onSelect={() => setSelectedStatus(item.name)}
                          className="flex gap-2 items-center"
                        >
                          <input
                            type="radio"
                            className="size-3"
                            checked={item.name === selectedStatus}
                          />
                          <p className={cn`text-base px-3 py-1 rounded-md`}>
                            {item.name}
                          </p>
                        </MenubarItem>
                      ))}
                    </MenubarContent>
                  </MenubarPortal>
                </MenubarMenu>
              </Menubar>

              <hr className="my-[10px]" />

              <p className="mb-2">Status</p>
              <div className="flex">
                <Badge
                  title="02:23:12"
                  icon={<Calendar size={16} />}
                  className="bg-gray-100 text-gray-600"
                />
              </div>

              <hr className="my-[10px]" />

              <div className="flex justify-between items-center">
                <p className="mb-2">Tags</p>
                <CotopiaButton className="flex bg-transparent hover:bg-blue-50 transition-colors text-blue-600">
                  <span>
                    <Tag size={16} />
                  </span>
                  <p className="text-sm">Add Tags</p>
                </CotopiaButton>
              </div>

              <hr className="my-[10px]" />

              <p className="mb-2">Time Spent</p>
              <div className="flex">
                <Badge
                  title="02:23:12"
                  icon={<Clock size={16} color="#0040E0" />}
                  className="bg-[#EBF0FF] text-blue-600"
                />
              </div>

              <hr className="my-[10px]" />

              <div className="flex justify-between items-center">
                <p className="mb-2">Invited People</p>
                <CotopiaButton className="flex bg-transparent hover:bg-blue-50 transition-colors text-blue-600">
                  <span>
                    <User size={16} />
                  </span>
                  <p className="text-sm">Invite People </p>
                </CotopiaButton>
              </div>
              <InviteList
                list={[
                  { status: "pendig" },
                  { status: "in progress" },
                  { status: "rejected" },
                ]}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
