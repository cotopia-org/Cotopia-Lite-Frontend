"use client";

import React, { useCallback, useState } from "react";
import Users from "./users";
import { UserMinimalType } from "@/types/user";
import Directs from "./directs";
import { DirectType } from "@/types/direct";
import { useProfile } from "@/app/(pages)/(protected)/protected-wrapper";
import SearchInputShower from "./search/SearchInputViewer";
import RoomDirectEnv from "./direct-chat/RoomDirectEnv";
import LocalDirectEnv from "./direct-chat/LocalDirectEnv";
import { useApi } from "@/hooks/swr";
import { FetchDataType } from "@/lib/axios";
import FullLoading from "@/components/shared/full-loading";
import ChatRoomCtxProvider, {
  RoomEnvironmentType,
} from "@/context/chat-room-context";

export default function UserChatDirect() {
  const { user } = useProfile();
  const [directId, setDirectId] = useState<number | undefined>(undefined);

  const [selectedUser, setSelectedUser] = useState<UserMinimalType>();

  const [searched, setSearched] = useState("");

  const { data, isLoading, mutate } =
    useApi<FetchDataType<DirectType[]>>(`/users/directs`);

  const directs = data !== undefined ? data?.data : [];

  const loading = isLoading || data === undefined;

  const handleBackToList = () => {
    setSearched("");
    setDirectId(undefined);
    setSelectedUser(undefined);
    mutate();
  };

  const selectUserHandler = useCallback(
    (userSelected: UserMinimalType) => {
      const findedDirect = directs.find((direct) => {
        let participant = direct.participants.find(
          (u) => u.id === userSelected.id
        );
        return participant ? direct : undefined;
      });

      setSearched("");
      if (findedDirect) {
        setDirectId(findedDirect.id);
        setSelectedUser(
          findedDirect.participants.find((x) => x.id !== user.id)
        );
      } else {
        setSelectedUser(userSelected);
      }
    },
    [searched, directs]
  );

  const selectDirectHandler = useCallback(
    (direct: DirectType) => {
      const currentRoomId = direct.id;
      const selectedUser = direct.participants.find((u) => u.id !== user.id);
      if (selectedUser) setSelectedUser(selectedUser);
      if (currentRoomId) setDirectId(currentRoomId);
    },
    [user]
  );

  let content = (
    <>
      <div className='flex flex-col gap-y-4 pb-4'>
        <SearchInputShower
          onChange={setSearched}
          content={
            <Users
              search={searched ?? undefined}
              showNotFound={false}
              onSelect={selectUserHandler}
            />
          }
        />
        {loading ? (
          <FullLoading />
        ) : (
          <Directs
            directs={directs}
            search={searched ?? undefined}
            onSelect={selectDirectHandler}
          />
        )}
      </div>
    </>
  );

  if (directId)
    content = (
      <ChatRoomCtxProvider
        environment={RoomEnvironmentType.direct}
        room_id={directId}
      >
        <RoomDirectEnv user={selectedUser} onBack={handleBackToList} />
      </ChatRoomCtxProvider>
    );

  if (selectedUser && !directId) {
    content = (
      <LocalDirectEnv
        onAdd={setDirectId}
        user={selectedUser}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className='relative h-full flex flex-col justify-between pt-4'>
      {content}
    </div>
  );
}
