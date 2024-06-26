import React, { useState } from "react";
import Search from "./search";
import Users from "./users";
import { UserMinimalType } from "@/types/user";
import DirectChat from "./direct-chat";

export default function UserChatDirect() {
  const [selectedUser, setSelectedUser] = useState<UserMinimalType>();
  const handleBackToList = () => {
    setSelectedUser(undefined);
  };
  const [searched, setSearched] = useState("");

  let content = (
    <>
      <div className='flex flex-col gap-y-4'>
        <Search onChange={setSearched} />
        <Users search={searched ?? undefined} onSelect={setSelectedUser} />
      </div>
      <div>xx</div>
    </>
  );

  if (selectedUser)
    content = <DirectChat user={selectedUser} onBack={handleBackToList} />;

  return (
    <div className='relative h-full flex flex-col justify-between pt-8'>
      {content}
    </div>
  );
}
