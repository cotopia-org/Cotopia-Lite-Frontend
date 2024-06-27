import React, { useState } from "react";
import Search from "./search";
import Users from "./users";
import { UserMinimalType } from "@/types/user";
import DirectChat from "./direct-chat";
import Directs from "./directs";
import { DirectType } from "@/types/direct";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";

export default function UserChatDirect() {
  const { user } = useProfile();

  const [selectedDirect, setSelectedDirect] = useState<DirectType>();
  const handleBackToList = () => {
    setSelectedDirect(undefined);
  };
  const [searched, setSearched] = useState("");

  let content = (
    <>
      <div className='flex flex-col gap-y-4'>
        <Search onChange={setSearched} />
        {/* <Users search={searched ?? undefined} onSelect={setSelectedUser} /> */}
        <Directs search={searched ?? undefined} onSelect={setSelectedDirect} />
      </div>
      <div>xx</div>
    </>
  );

  if (selectedDirect)
    content = (
      <DirectChat
        direct_id={selectedDirect.id}
        user={
          selectedDirect.participants.find(
            (x) => x.id !== user.id
          ) as UserMinimalType
        }
        onBack={handleBackToList}
      />
    );

  return (
    <div className='relative h-full flex flex-col justify-between pt-8'>
      {content}
    </div>
  );
}
