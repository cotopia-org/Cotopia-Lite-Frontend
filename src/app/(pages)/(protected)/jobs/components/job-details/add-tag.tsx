import CotopiaButton from "@/components/shared-ui/c-button";
import CotopiaInput from "@/components/shared-ui/c-input";
import CotopiaPopover from "@/components/shared-ui/c-popover";
import { Tag } from "lucide-react";
import TagItem from "./tag";

type Props = {
  tagsList: string[];
  handleDelete: (input: string) => void;
};

function NewTag({ tagsList, handleDelete }: Props) {
  return (
    <CotopiaPopover
      contentClassName="w-[318px] p-3 border"
      trigger={
        <CotopiaButton
          startIcon={<Tag size={16} />}
          className="bg-transparent hover:bg-blue-50 transition-colors text-blue-600"
        >
          Add Tags
        </CotopiaButton>
      }
    >
      <p className="text-sm">Tags</p>
      <CotopiaInput className="my-2" placeholder="Search or Create Tags..." />
      <div className="flex gap-1">
        {tagsList.map((tag) => (
          <TagItem
            key={tag}
            size="sm"
            title={tag}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </CotopiaPopover>
  );
}

export default NewTag;
