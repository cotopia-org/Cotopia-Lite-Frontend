import React from "react";
import UserSession from "@/app/(pages)/(protected)/session";

const UserNode = (props: any) => {
  const { data, dragging } = props;

  return (
    <UserSession
      track={data?.track}
      draggable={data?.draggable ?? false}
      isDragging={dragging}
    />
  );
};

export default UserNode;
