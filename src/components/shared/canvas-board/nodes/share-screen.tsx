import React from "react";
import ScreenShareCard from "../../room/components/screen-share-card";

export default function ShareScreen(props: any) {
  const { data } = props;

  console.log("data", data);

  return <ScreenShareCard track={data.track} id={data?.id} />;
}
