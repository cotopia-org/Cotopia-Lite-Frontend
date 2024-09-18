import React from "react";
import ScreenShareCard from "../../room/components/screen-share-card";

export default function ShareScreen(props: any) {
  const { data } = props;

  return <ScreenShareCard track={data.track} />;
}
