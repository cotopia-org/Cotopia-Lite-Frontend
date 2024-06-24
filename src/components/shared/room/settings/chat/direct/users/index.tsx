import React from "react";
import UserCard from "./card";

export default function Users() {
  return (
    <div className='flex flex-col gap-y-2'>
      {[
        {
          user: {},
          latestMessage: "",
        },
      ].map((item, key) => (
        <UserCard
          key={key}
          user={item.user}
          latestMessage={item.latestMessage}
        />
      ))}
    </div>
  );
}
