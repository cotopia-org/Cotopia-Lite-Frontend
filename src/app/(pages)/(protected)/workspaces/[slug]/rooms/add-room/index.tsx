import CotopiaButton from "@/components/shared-ui/c-button";
import ModalBox from "@/components/shared/modal-box";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddRoomForm from "./form";

type Props = {
  workspace_id: string;
};
export default function AddRoom({ workspace_id }: Props) {
  return (
    <ModalBox
      trigger={(open) => (
        <CotopiaButton
          className='text-gray-600'
          variant={"ghost"}
          startIcon={<Plus size={16} />}
          onClick={open}
        >
          Add Room
        </CotopiaButton>
      )}
    >
      {(_, close) => {
        return (
          <>
            <DialogTitle>{`Adding room to workspace`}</DialogTitle>
            <DialogDescription>{`You are going to create room in your workspace`}</DialogDescription>
            <AddRoomForm workspace_id={workspace_id} onSubmit={close} />
          </>
        );
      }}
    </ModalBox>
  );
}
