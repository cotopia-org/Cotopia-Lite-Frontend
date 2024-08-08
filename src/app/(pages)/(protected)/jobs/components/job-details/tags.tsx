import DetailsSection from "./detail-section";
import NewTag from "./add-tag";
import { useCallback, useState } from "react";
import TagItem from "./tag";

type Props = {};

function Tags() {
  const [tags, setTags] = useState<string[]>(["Cotopia"]);
  const handleDelete = useCallback(
    (input: string) => {
      setTags((prev) => prev.filter((tg) => tg !== input));
    },
    [tags]
  );

  return (
    <>
      <DetailsSection
        title="Tags"
        actions={<NewTag tagsList={tags} handleDelete={handleDelete} />}
        content={
          <div className="flex gap-2">
            {tags.map((t) => (
              <TagItem key={t} title={t} handleDelete={handleDelete} />
            ))}
          </div>
        }
      />
      <hr className="my-2" />
    </>
  );
}

export default Tags;
