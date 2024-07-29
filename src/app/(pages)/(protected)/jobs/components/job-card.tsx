import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import {
  Check,
  CircleCheck,
  Clock,
  Copy,
  Ellipsis,
  Hash,
  Pause,
  PauseCircle,
  Play,
  Trash,
} from "lucide-react";
import Badge from "./badge";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarTrigger,
} from "@/components/ui/menubar";
import CotopiaAvatar from "@/components/shared-ui/c-avatar";

type Props = {
  status: "default" | "paused" | "doing";
  variant?: "divider" | "outline";
};

export default function JobCard({ status, variant = "divider" }: Props) {
  return (
    <div
      className={`p-3 flex hover:bg-gray-100 transition-colors ${
        variant === "outline" ? "border rounded-xl" : "border-b"
      }`}
    >
      <div className=" flex justify-around gap-2">
        {["default", "paused"].includes(status) ? (
          <CotopiaIconButton className="!bg-[#1b5cff66] hover:opacity-80 size-8">
            <Play size={17} color="#1B5BFF" />
          </CotopiaIconButton>
        ) : (
          <>
            <CotopiaIconButton className="!bg-[#ad9c0066] hover:opacity-80 size-8">
              <Pause size={17} color="#AD9C00" />
            </CotopiaIconButton>
            <CotopiaIconButton className="!bg-[#00ad2566] hover:opacity-80 size-8">
              <Check size={17} color="#00AD26" />
            </CotopiaIconButton>
          </>
        )}
      </div>
      <div className="px-2 flex-auto">
        <div className="flex justify-between">
          <p className="text-xl font-medium">This is another job title</p>

          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                {/* <CotopiaIconButton className="text-black size-6"> */}
                <Ellipsis size={16} />
                {/* </CotopiaIconButton> */}
              </MenubarTrigger>
              <MenubarPortal>
                <MenubarContent className="mr-16 py-3 px-4 flex flex-col gap-1 text-sm text-gray-500">
                  <MenubarItem className="flex gap-2 items-center">
                    <Copy size={16} />
                    <p>Duplicate</p>
                  </MenubarItem>
                  <MenubarItem className="flex gap-2 items-center">
                    <CircleCheck size={16} />
                    <p>Mark as done</p>
                  </MenubarItem>
                  <MenubarItem className="flex gap-2 items-center">
                    <Trash size={16} />
                    <p>Delete</p>
                  </MenubarItem>
                </MenubarContent>
              </MenubarPortal>
            </MenubarMenu>
          </Menubar>
        </div>
        <p className="text-gray-300 font-medium text-base mt-1">
          Sometimes Your Jobs need a Description for better understanding
        </p>
        <div className="flex justify-between">
          <div className="flex gap-3 mt-1">
            <Badge title="2 Aug, 2023 - 2:30" />
            <Badge
              title="02:23:12"
              icon={<Clock size={16} color="#0040E0" />}
              className="bg-[#EBF0FF] text-blue-600"
            />
            {status === "paused" && (
              <Badge
                title="paused"
                icon={<PauseCircle size={16} color="#E6CF00" />}
                className="bg-[#FFFDEB] text-[#E6CF00] border border-[#E6CF00]"
              />
            )}
          </div>
          <div className="flex gap-2 items-center justify-between text-gray-400">
            <CotopiaAvatar title="A" className="size-8" />
            <p className="">Created By theMMD</p>
            /
            <Hash size={16} />
            <p className="">Cotopia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
