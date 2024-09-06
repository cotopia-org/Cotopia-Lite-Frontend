import React from "react";
import ScreenShareCard from "../../room/components/screen-share-card";

export default function ShareScreen(props: any) {
  const { data, dragging } = props;

  return <ScreenShareCard track={data.track} />;
}
