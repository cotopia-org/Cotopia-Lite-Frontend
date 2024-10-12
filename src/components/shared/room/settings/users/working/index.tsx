import TitleEl from "@/components/shared/title-el";
import { useRoomContext } from "../../../room-context";
import * as emoji from "node-emoji";
import WorkingCard from "./card";

export default function WorkingUsers() {
  const { workingUsers } = useRoomContext();

  return (
    <TitleEl
      title={`Working (${workingUsers.length}) ${emoji.get("sunglasses")}`}
    >
      <div className='flex flex-col gap-y-2'>
        {workingUsers.map((item) => (
          <WorkingCard user={item} key={item.id} />
        ))}
      </div>
    </TitleEl>
  );
}
