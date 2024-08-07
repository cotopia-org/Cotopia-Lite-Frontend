import CotopiaIconButton from "@/components/shared-ui/c-icon-button";
import { Bell } from "lucide-react";
import Drawer from "./drawer";
import { useState } from "react";

function JobInvitation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Drawer
        title="Job Invitations"
        isOpen={isOpen}
        handleClose={handleClose}
      />
      <CotopiaIconButton className="hover:!bg-transparent">
        <Bell onClick={handleOpen} size={28} className="text-gray-400 size-6" />
      </CotopiaIconButton>
    </>
  );
}

export default JobInvitation;
